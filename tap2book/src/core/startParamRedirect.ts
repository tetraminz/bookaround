'use client';

import { useEffect } from 'react';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { useRouter } from 'next/navigation';

function useTelegramRedirect() {
    const lp = useLaunchParams();
    const router = useRouter();

    useEffect(() => {
        if (lp.startParam) {
            const username = decodeStartParam(lp.startParam);

            if (username) {
                router.replace(`/profile/${username}`);
            }
        }
    }, [lp.startParam, router]);
}

export default useTelegramRedirect;


export const PROFILE_PREFIX = "profile";

/**
 * Кодирует параметр `startapp` для Telegram Mini Apps.
 * Использует `_` в качестве разделителя вместо `:`, чтобы избежать проблем с кодированием.
 */
export function encodeStartParam(username: string): string {
    return `${PROFILE_PREFIX}_${username}`;
}

/**
 * Декодирует параметр `startapp` из URL и извлекает `username`.
 * Если параметр не начинается с `profile_`, возвращает `null`.
 */
export function decodeStartParam(startParam: string): string | null {
    const decoded = decodeURIComponent(startParam).trim();

    if (decoded.startsWith(`${PROFILE_PREFIX}_`)) {
        return decoded.split("_")[1] || null;
    }

    return null;
}