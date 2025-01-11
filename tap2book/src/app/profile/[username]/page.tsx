"use client";

import { useSignal, initData } from '@telegram-apps/sdk-react';
import { Page } from '@/components/Page';
import { ShareProfile } from '@/components/ShareProfile/ShareProfile';
import { AppointmentCards } from "@/components/AppointmentCards/AppointmentCards";
import UserProfile from "@/components/UserProfile/UserProfile";

export default function UserProfilePage() {
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
            <UserProfile
                firstName={user.firstName}
                lastName={user.lastName}
                photoUrl={user.photoUrl}
            />

            <div className="flex flex-col min-h-screen bg-[var(--tg-theme-bg-color)] text-center items-center">
                <AppointmentCards
                    title={mockServiceData.title}
                    description={mockServiceData.description}
                    price={mockServiceData.price}
                    image={mockServiceData.image}
                />
            </div>

            <div>
                <ShareProfile username={user.username} />
            </div>
        </Page>
    );
}