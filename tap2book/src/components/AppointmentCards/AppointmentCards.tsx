"use client";

import { Button, Section } from "@telegram-apps/telegram-ui";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import { Pencil, CirclePlus } from "lucide-react";
import { booking } from "@/core/backend/client";

interface AppointmentCardsProps {
    appointments: booking.Appointment[];
    isOwnProfile: boolean;
    onEditCard: (id: number) => void;
    onAddCard: () => void;
}

export function AppointmentCards({
                                     appointments,
                                     isOwnProfile,
                                     onEditCard,
                                     onAddCard,
                                 }: AppointmentCardsProps) {
    return (
        <Carousel className="w-full relative">
            <Section
                header={
                    // Важно: позиционируем родительский контейнер как relative
                    <div className="relative flex items-center justify-center w-full pt-5">
                        {/* Кнопка «Назад» (слева) */}
                        <CarouselPrevious
                            className="
                              w-5.5
                              h-5.5
                              absolute
                              left-4
                              top-1/2
                              -translate-y-1/2
                              z-20
                              bg-[var(--tg-theme-bg-color)]
                              rounded-full
                              shadow-md
                              p-2
                              hover:scale-105
                              transition
                              hover:bg-[var(--tg-theme-secondary-bg-color)]
                              hover:text-[var(--tg-theme-button-text-color)]
                              active:bg-[var(--tg-theme-secondary-bg-color)]
                            "
                        />

                        {/* Центральная часть: заголовок + кнопка «Добавить» (если isOwnProfile === true) */}
                        <div className="flex items-center gap-2 top-1/2 -translate-y-1/4">

                            <span className="font-bold text-lg text-[var(--tg-theme-text-color)]">
                              Услуги
                            </span>

                                {isOwnProfile && (
                                    <Button
                                        onClick={onAddCard}
                                        className="flex items-center gap-1 rounded-md"
                                        style={{
                                            backgroundColor: 'var(--tg-theme-bg-color)',
                                            color: 'var(--tg-theme-button-text-color)',
                                        }}
                                    >
                                        <CirclePlus height={38} width={38} strokeWidth={0.5}/>
                                    </Button>
                                )}
                        </div>

                        {/* Кнопка «Вперёд» (справа) */}
                        <CarouselNext
                            className="
                              w-5.5
                              h-5.5
                              absolute
                              right-4
                              top-1/2
                              -translate-y-1/2
                              z-20
                              bg-[var(--tg-theme-bg-color)]
                              rounded-full
                              shadow-md
                              p-2
                              hover:scale-105
                              transition
                              hover:bg-[var(--tg-theme-secondary-bg-color)]
                              hover:text-[var(--tg-theme-button-text-color)]
                              active:bg-[var(--tg-theme-secondary-bg-color)]
                            "
                        />
                    </div>
                }
            >
                <CarouselContent>
                    {appointments.map((appointment) => (
                        <CarouselItem key={appointment.id}>
                            {/* Карточка */}
                            <div className="p-3">
                                <div className="relative rounded-lg overflow-hidden shadow-md bg-[var(--tg-theme-secondary-bg-color)]">
                                    {isOwnProfile && (
                                        <Button
                                            onClick={() => onEditCard(appointment.id)}
                                            className="
                                                absolute
                                                top-2
                                                right-2
                                                bg-[var(--tg-theme-bg-color)]
                                                text-[var(--tg-theme-button-text-color)]
                                                rounded-full
                                                p-1
                                                hover:scale-105
                                                transition
                                              "
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                    )}

                                    <img
                                        src={appointment.image_url}
                                        className="w-full h-48 object-cover"
                                        alt={appointment.title}
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold text-[var(--tg-theme-text-color)]">
                                            {appointment.title}
                                        </h3>
                                        <p className="text-[var(--tg-theme-hint-color)] mt-2 text-left"
                                           style={{ whiteSpace: "pre-wrap" }}
                                        >
                                            {appointment.description}
                                        </p>
                                        <p className="text-[var(--tg-theme-text-color)] font-bold mt-2">
                                            {appointment.price} ₽
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Section>

        </Carousel>
    );
}
