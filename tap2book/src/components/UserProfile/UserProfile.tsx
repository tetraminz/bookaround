'use client';

import {Avatar, Button, Title} from '@telegram-apps/telegram-ui';
import {booking} from "@/core/backend/client";

interface UserProfileProps {
    user: booking.User;
    isOwnProfile: boolean;
}

// TODO i18n
export function UserProfile({ user, isOwnProfile }: UserProfileProps) {
    return (
        <div className="flex flex-col items-center p-6 bg-[var(--tg-theme-secondary-bg-color)]">
            <Avatar size={96} src={user.photo_url} className="mb-4" />
            <Title level="1" className="text-[var(--tg-theme-text-color)] text2xl mb-1">
                {user.first_name} {user.last_name}
            </Title>
            {isOwnProfile && (
                <Button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Редактировать профиль
                </Button>
            )}
        </div>
    );
};

export default UserProfile;