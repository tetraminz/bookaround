"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { themeParams, useSignal } from "@telegram-apps/sdk-react"

interface TimePickerProps {
    date: Date
    onSelect: (time: string) => void
}

export function TimePicker({ date, onSelect }: TimePickerProps) {
    // Подписываемся на тему Telegram
    const theme = useSignal(themeParams.state)
    const [availableSlots, setAvailableSlots] = useState<string[]>([])

    useEffect(() => {
        // Пример генерации слотов (9:00-18:00)
        const slots = []
        for (let i = 9; i < 18; i++) {
            slots.push(`${i}:00 - ${i + 1}:00`)
        }
        setAvailableSlots(slots)
    }, [date])

    return (
        <div
            // Добавляем фоновый и текстовый цвет из Telegram
            className="
        space-y-2 p-4 rounded-md
        bg-[var(--tg-theme-bg-color)]
        text-[var(--tg-theme-text-color)]
      "
        >
            <h2 className="text-lg font-semibold">
                Выберите время на {format(date, "dd.MM.yyyy")}
            </h2>
            <div className="grid grid-cols-2 gap-2">
                {availableSlots.map((slot) => (
                    <Button
                        key={slot}
                        onClick={() => onSelect(slot)}
                        variant="outline"
                        // Inline-стиль для обводки и текста на основе Telegram-темы
                        style={{
                            borderColor: theme.buttonColor,
                            color: theme.buttonColor,
                        }}
                    >
                        {slot}
                    </Button>
                ))}
            </div>
        </div>
    )
}