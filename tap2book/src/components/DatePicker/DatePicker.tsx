'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { ru } from 'date-fns/locale'

interface DatePickerProps {
    onSelect: (date: Date) => void
}

export function DatePicker({ onSelect }: DatePickerProps) {
    const [date, setDate] = useState<Date | undefined>(undefined)

    const handleSelect = (newDate: Date | undefined) => {
        if (newDate) {
            setDate(newDate)
            onSelect(newDate)
        }
    }

    // Здесь должна быть логика для определения доступности дат
    const isDateUnavailable = (date: Date) => {
        // Пример: выходные недоступны
        return date.getDay() === 0 || date.getDay() === 6
    }

    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            locale={ru}
            disabled={isDateUnavailable}
            className="rounded-md border w-auto p-0"
        />
    )
}

