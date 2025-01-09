'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { DatePicker } from '../DatePicker/DatePicker'
import { TimePicker } from '../TimePicker/TimePicker'
import { Confirmation } from '../Confirmation/Confirmation'
import { Button } from '@/components/ui/button'

type Step = 'date' | 'time' | 'confirmation'

export function BookingWizard() {
    const [step, setStep] = useState<Step>('date')
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date)
        setStep('time')
    }

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time)
        setStep('confirmation')
    }

    const handleConfirm = () => {
        // Здесь будет логика отправки данных на сервер
        alert('Бронирование успешно!')
        setStep('date')
        setSelectedDate(null)
        setSelectedTime(null)
    }

    const handleBack = () => {
        if (step === 'time') setStep('date')
        if (step === 'confirmation') setStep('time')
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Бронирование услуги</h1>
            {step === 'date' && <DatePicker onSelect={handleDateSelect} />}
            {step === 'time' && selectedDate && (
                <TimePicker date={selectedDate} onSelect={handleTimeSelect} />
            )}
            {step === 'confirmation' && selectedDate && selectedTime && (
                <Confirmation
                    date={format(selectedDate, 'dd MMMM yyyy', { locale: ru })}
                    time={selectedTime}
                    onConfirm={handleConfirm}
                />
            )}
            {step !== 'date' && (
                <Button onClick={handleBack} className="mt-4">
                    Назад
                </Button>
            )}
        </div>
    )
}

