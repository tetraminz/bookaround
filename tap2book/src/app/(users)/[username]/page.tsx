"use client";

import { useSignal, initData } from '@telegram-apps/sdk-react';
import {Avatar, Button, Card, Cell, List, Section, Title} from '@telegram-apps/telegram-ui';
import { useParams } from 'next/navigation';
import { Page } from '@/components/Page';
import { ShareProfile } from '@/components/ShareProfile/ShareProfile';
import {Bell, MoreHorizontal, Phone, Search, Video} from "lucide-react";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {BusinessCard} from "@/components/BusinessCard/BusinessCard";

export default function UserProfilePage() {
    const params = useParams();
    const user = useSignal(initData.user);

    // В будущем здесь будет запрос к API для получения данных о услугах пользователя
    const mockServiceData = {
        title: "Маникюр",
        description: "Профессиональный маникюр с использованием качественных материалов",
        price: "от 2000 ₽",
        image: "https://placehold.co/600x400"
    };

    if (!user) {
        return (
            <Page>
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-[var(--tg-theme-text-color)]">Loading...</p>
                </div>
            </Page>
        );
    }

    return (
        <Page>
            <div className="flex flex-col items-center p-6 bg-[var(--tg-theme-secondary-bg-color)]">
                <Avatar
                    size={80}
                    src={user.photoUrl}
                    className="mb-4"
                />
                <Title level="1" className="text-[var(--tg-theme-text-color)] text2xl mb-1">
                    {user.firstName} {user.lastName}
                </Title>
            </div>

            <div className="flex flex-col min-h-screen bg-[var(--tg-theme-bg-color)] text-center items-center">
                <BusinessCard
                    title={mockServiceData.title}
                    description={mockServiceData.description}
                    price={mockServiceData.price}
                    image={mockServiceData.image}
                />
            </div>
        </Page>
    );
}