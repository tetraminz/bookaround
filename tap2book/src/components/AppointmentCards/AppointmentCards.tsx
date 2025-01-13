"use client";

import {Button, Section} from "@telegram-apps/telegram-ui";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { booking } from "@/core/backend/client";

// Интерфейс пропсов принимает массив объектов `booking.Appointment`
interface AppointmentCardsProps {
    appointments: booking.Appointment[];
    isOwnProfile: boolean;
    onEditCard: (id: number) => void;
    onAddCard: () => void;
}

// TODO is18n
export function AppointmentCards({ appointments, isOwnProfile, onEditCard, onAddCard }: AppointmentCardsProps) {

    return (
        <Carousel className="w-full">
            <Section header="Услуги">
                <CarouselContent>
                    {/* Перебираем appointments и рендерим карточки */}
                    {appointments.map((appointment) => (
                        <CarouselItem key={appointment.id}>
                            <div className="p-1">
                                    <div className="p-4">
                                        <div className="rounded-lg overflow-hidden shadow-lg bg-[var(--tg-theme-secondary-bg-color)]">
                                            <img
                                                src={appointment.image_url}
                                                className="w-full h-48 object-cover"
                                                alt={appointment.title}
                                            />
                                            <div className="p-4">
                                                <h3 className="text-lg font-bold text-[var(--tg-theme-text-color)]">
                                                    {appointment.title}
                                                </h3>
                                                <p className="text-[var(--tg-theme-hint-color)] mt-2 text-left">
                                                    {appointment.description}
                                                </p>
                                                <p className="text-[var(--tg-theme-text-color)] font-bold mt-2">
                                                    {appointment.price} ₽
                                                </p>
                                                <Button
                                                    onClick={() => onEditCard(appointment.id)}
                                                    className="
                                                        w-full max-w-xs
                                                        text-lg font-medium px-6 py-3
                                                        bg-[var(--tg-theme-button-color)]
                                                        text-[var(--tg-theme-button-text-color)]
                                                        rounded-lg
                                                    "
                                                >
                                                    {isOwnProfile ? "Редактировать" : "Записаться"}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Section>

            {/* Навигационные кнопки */}
            <CarouselPrevious className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-[var(--tg-theme-bg-color)] rounded-full shadow-md" />
            <CarouselNext className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-[var(--tg-theme-bg-color)] rounded-full shadow-md" />
            {isOwnProfile && (
                <button
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => onAddCard()}
                >
                    Добавить услугу
                </button>
            )}
        </Carousel>
    );
}
