'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { ru } from 'date-fns/locale'
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
            className={cn(
                "w-full max-w-[400px] h-auto p-0.1",
                "rounded-lg border",
                "bg-[var(--tg-theme-bg-color)]",
                "text-[var(--tg-theme-text-color)]"
            )}
            classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-xl font-bold",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                    "h-10 w-10 bg-transparent p-0 opacity-50 hover:opacity-100",
                    "text-[var(--tg-theme-text-color)] hover:bg-[var(--tg-theme-secondary-bg-color)]"
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex w-full justify-between",
                head_cell: "text-[var(--tg-theme-hint-color)] rounded-md w-12 font-normal text-lg text-center",
                row: "flex w-full mt-2 justify-between",
                cell: cn(
                    "text-center text-lg p-0 relative",
                    "[&:has([aria-selected])]:bg-[var(--tg-theme-secondary-bg-color)]",
                    "first:[&:has([aria-selected])]:rounded-l-md",
                    "last:[&:has([aria-selected])]:rounded-r-md",
                    "focus-within:relative focus-within:z-20"
                ),
                day: cn(
                    "h-12 w-12 p-0 font-normal aria-selected:opacity-100",
                    "hover:bg-[var(--tg-theme-secondary-bg-color)] rounded-md"
                ),
                day_selected: "bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] hover:bg-[var(--tg-theme-button-color)] hover:text-[var(--tg-theme-button-text-color)]",
                day_today: "bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-text-color)]",
                day_outside: "text-[var(--tg-theme-hint-color)] opacity-50",
                day_disabled: "text-[var(--tg-theme-hint-color)] opacity-50",
                day_range_middle: "aria-selected:bg-[var(--tg-theme-secondary-bg-color)] aria-selected:text-[var(--tg-theme-text-color)]",
                day_hidden: "invisible",
            }}
            components={{
                IconLeft: ({ ...props }) => <ChevronLeft className="h-6 w-6" {...props} />,
                IconRight: ({ ...props }) => <ChevronRight className="h-6 w-6" {...props} />,
            }}
        />
    )
}

