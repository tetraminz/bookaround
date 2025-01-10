"use client";

import { useState } from 'react';
import {Card, Button, Section} from '@telegram-apps/telegram-ui';
import { Check, Copy } from 'lucide-react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import ClassNames from 'embla-carousel-class-names'

interface BusinessCardProps {
    title: string;
    description: string;
    price: string;
    image: string;
}

export function BusinessCard({ image, price, description, title }: BusinessCardProps) {

    return (
        <Carousel
            className="w-full"
        >
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Section header="Услуги" >
                                <div className="p-4">
                                    <div className="rounded-lg overflow-hidden shadow-lg bg-[var(--tg-theme-secondary-bg-color)]">
                                        <img
                                            src={image}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-[var(--tg-theme-text-color)]">
                                                {title}
                                            </h3>
                                            <p className="text-[var(--tg-theme-hint-color)] mt-2 text-left">
                                                {description}
                                            </p>
                                            <p className="text-[var(--tg-theme-text-color)] font-bold mt-2">
                                                {price}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Section>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-[var(--tg-theme-bg-color)] rounded-full shadow-md" />
            <CarouselNext className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-[var(--tg-theme-bg-color)] rounded-full shadow-md" />
        </Carousel>
    );
}

