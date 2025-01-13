'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {Button} from "@telegram-apps/telegram-ui";

// TODO профиль не найден
export default function Page() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/');
    }, [router]);

    return null; // Можно вернуть пустой компонент, так как редирект выполняется мгновенно
}