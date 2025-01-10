"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { DatePicker } from "../DatePicker/DatePicker"
import { TimePicker } from "../TimePicker/TimePicker"
import { Confirmation } from "../Confirmation/Confirmation"
import { Button } from '@telegram-apps/telegram-ui';
import { themeParams, useSignal } from "@telegram-apps/sdk-react"

type Step = "date" | "time" | "confirmation"

export function BookingWizard() {
    const theme = useSignal(themeParams.state)

    const [step, setStep] = useState<Step>("date")
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date)
        setStep("time")
    }

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time)
        setStep("confirmation")
    }

    const handleConfirm = () => {
        // Здесь будет логика отправки данных на сервер
        alert("Бронирование успешно!")
        setStep("date")
        setSelectedDate(null)
        setSelectedTime(null)
    }

    const handleBack = () => {
        if (step === "time") setStep("date")
        if (step === "confirmation") setStep("time")
        if (step === "date") window.history.back()
    }

    return (
        <div
            // Контейнер на всю высоту экрана, по центру
            className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-[var(--tg-theme-bg-color)]
        text-[var(--tg-theme-text-color)]
      "
        >
            <div
                // «Карточка» в центре
                className="
          w-full
          max-w-md
          p-6
          rounded-lg
          shadow-lg
        "
                // При желании можно использовать ещё и inline-стиль,
                // если нужно точно подхватить какую-то конкретную переменную из `theme`.
                style={{
                    backgroundColor: theme.secondaryBgColor,
                }}
            >
                <h1 className="text-2xl font-bold mb-6 flex justify-center">Бронирование услуги</h1>

                {step === "date" && <DatePicker onSelect={handleDateSelect}/>}

                {step === "time" && selectedDate && (
                    <TimePicker date={selectedDate} onSelect={handleTimeSelect}/>
                )}

                {step === "confirmation" && selectedDate && selectedTime && (
                    <Confirmation
                        date={format(selectedDate, "dd MMMM yyyy", {locale: ru})}
                        time={selectedTime}
                        onConfirm={handleConfirm}
                    />
                )}


                <div className="flex justify-center mt-4">
                    <Button
                        onClick={handleBack}
                        className="
            w-full max-w-xs
            text-lg font-medium px-6 py-3
            bg-[var(--tg-theme-button-color)]
            text-[var(--tg-theme-button-text-color)]
            rounded-lg
        "
                    >
                        Назад
                    </Button>
                </div>
            </div>
        </div>
    )
}