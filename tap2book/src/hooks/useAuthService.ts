'use client';

import { useBackend } from "@/core/backend/context";
import { booking } from "@/core/backend/client";
import {useCallback} from "react";

/**
 * Хук для управления авторизацией и токенами.
 * Здесь можно расширить логику для refresh-token, logout и т.д.
 * Пока нет отдельного метода в клиенте, поэтому оставим заготовку.
 */
export function useAuthService() {
    const { client, isInitialized } = useBackend();

    /**
     * Пример: метод для подписки/регистрации пользователя в системе,
     * если в будущем нужно вызывать UserUpsert при логине.
     */
    const userUpsert = useCallback(async (): Promise<void> => {
        if (!client || !isInitialized) return;
        try {
            // Вызываем метод UserUpsert из booking
            await client.booking.UserUpsert();
        } catch (err) {
            console.error("Ошибка при апсерте пользователя:", err);
            throw err;
        }
    },
        [client, isInitialized]
    );

    /**
     * Пример: метод для установки/обновления Authorization-токена
     * (если ты будешь динамически менять auth у клиента).
     * Сейчас просто заглушка, так как логика зависит от твоей реализации.
     */
    const setAuthToken = useCallback((token: string) => {
        // Здесь можно обновить authParams или запись в localStorage.
        // В контексте useBackend (context) можно переинициализировать client с новым auth.
        console.log("Установили токен:", token);
    },
        [client, isInitialized]
    );

    return {
        userUpsert,
        setAuthToken,
    };
}
