import { Button } from '@/components/ui/button'

interface ConfirmationProps {
    date: string
    time: string
    onConfirm: () => void
}

export function Confirmation({ date, time, onConfirm }: ConfirmationProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Подтверждение бронирования</h2>
            <p>Дата: {date}</p>
            <p>Время: {time}</p>
            <Button onClick={onConfirm}>Забронировать</Button>
        </div>
    )
}

