"use client"

import { Button } from "@/components/ui/button"

interface ConfirmationProps {
    date: string
    time: string
    onConfirm: () => void
}

export function Confirmation({ date, time, onConfirm }: ConfirmationProps) {
    return (
        <div
            className="
        space-y-4 
        bg-[var(--tg-theme-bg-color)]
        text-[var(--tg-theme-text-color)]
        p-4 rounded-md
      "
        >
            <h2 className="text-lg font-semibold flex justify-center">Подтверждение бронирования</h2>
            <p className="flex justify-center">Дата: {date}</p>
            <p className="flex justify-center">Время: {time}</p>
            <Button
                onClick={onConfirm}
                className="w-full max-w-xs
            text-lg font-medium px-6 py-3
            bg-[var(--tg-theme-button-color)]
            text-[var(--tg-theme-button-text-color)]
            rounded-lg"
            >
                Забронировать
            </Button>
        </div>
    )
}