"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {themeParams, useSignal} from "@telegram-apps/sdk-react";

export function DatePickerDemo() {
    const [date, setDate] = React.useState<Date>()
    const theme = useSignal(themeParams.state)

    // Динамические стили на основе темы Telegram
    const styles = {
        button: {
            backgroundColor: theme.buttonColor,
            color: theme.buttonTextColor,
        } as React.CSSProperties
    }

    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"default"}
                        style={styles.button}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar className="w-auto p-0"
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        classNames={{
                            day_selected: `bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]`,
                            day_today: "bg-[var(--tg-theme-hint-color)] text-[var(--tg-theme-text-color)]",
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
