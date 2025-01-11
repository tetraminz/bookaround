'use client';

import { FC } from 'react';
import { Avatar, Title } from '@telegram-apps/telegram-ui';

interface UserProfileProps {
    firstName: string;
    lastName?: string;
    photoUrl: string;
}

const UserProfile: FC<UserProfileProps> = ({ firstName, lastName, photoUrl}) => {
    return (
        <div className="flex flex-col items-center p-6 bg-[var(--tg-theme-secondary-bg-color)]">
            <Avatar size={96} src={photoUrl} className="mb-4" />
            <Title level="1" className="text-[var(--tg-theme-text-color)] text2xl mb-1">
                {firstName} {lastName}
            </Title>
        </div>
    );
};

export default UserProfile;