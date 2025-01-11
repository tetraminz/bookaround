'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// TODO профиль не найден
export default function Page() {
    const router = useRouter();

    console.log(decodeURIComponent(`profile%2FAgeroFlynn`));

    useEffect(() => {
        router.replace('/');
    }, [router]);

    return null; // Можно вернуть пустой компонент, так как редирект выполняется мгновенно
}