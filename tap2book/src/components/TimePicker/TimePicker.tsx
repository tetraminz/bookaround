'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'

interface TimePickerProps {
    date: Date
    onSelect: (time: string) => void
}

export function TimePicker({ date, onSelect }: TimePickerProps) {
    const [availableSlots, setAvailableSlots] = useState<string[]>([])

    useEffect(() => {
        // Здесь должен быть запрос к API для получения доступных слотов
        // Пример генерации слотов
        const slots = []
        for (let i = 9; i < 18; i++) {
            slots.push(`${i}:00 - ${i + 1}:00`)
        }
        setAvailableSlots(slots)
    }, [date])

    return (
        <div className="space-y-2">
            <h2 className="text-lg font-semibold">
                Выберите время на {format(date, 'dd.MM.yyyy')}
            </h2>
            <div className="grid grid-cols-2 gap-2">
                {availableSlots.map((slot) => (
                    <Button key={slot} onClick={() => onSelect(slot)} variant="outline">
                        {slot}
                    </Button>
                ))}
            </div>
        </div>
    )
}

