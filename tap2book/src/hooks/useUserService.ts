// core/hooks/useUserService.ts
"use client";
import {useBackend} from "@/core/backend/context";
import {APIError, booking} from "@/core/backend/client";
import {useCallback} from "react";

/**
 * Хук для работы с данными пользователя:
 * - Получить пользователя по username
 * - Выполнить UserUpsert (опционально)
 * (или оставляем логику UserUpsert в useAuthService, если нужно)
 */
export function useUserService() {
    const { client, isInitialized } = useBackend();

    /**
     * Получить пользователя по username
     */

    const getUserByUsername = useCallback(async (username: string): Promise<booking.User | undefined> => {
            if (!client || !isInitialized) return;
            try {
                return await client.booking.GetUserByUsename(username);
            } catch (err) {
                if (err instanceof APIError) {
                    console.error(`[ERROR] API Ошибка (код: ${err.status}): ${err.message}`);
                    if (err.details) {
                        console.error(`[ERROR] Детали ошибки:`, JSON.stringify(err.details, null, 2));
                    }
                }

                if (err instanceof Error) {
                    console.error(`[ERROR] Name: ${err.name}`);
                    console.error(`[ERROR] Message: ${err.message}`);

                    if (err.stack) {
                        console.error(`[ERROR] Stack Trace:\n${err.stack}`);
                    }

                    if ('cause' in err && err.cause) {
                        console.error(`[ERROR] Cause:`, err.cause);
                    }

                    // Логируем дополнительные свойства, если они есть
                    const additionalProps = Object.keys(err).filter(key => !['name', 'message', 'stack', 'cause'].includes(key));
                    if (additionalProps.length > 0) {
                        console.error(`[ERROR] Additional Properties:`, JSON.stringify(err, null, 2));
                    }
                }

                if ((err as any)?.response) {
                    console.error(`[API] Ошибочный ответ:`, JSON.stringify((err as any).response, null, 2));
                }

                throw err;
            }
        },
            [client, isInitialized]
    );

    // TODO USER UPSERT
    // /**
    //  * Если требуется, можно продублировать сюда UserUpsert,
    //  * либо оставить в useAuthService (в зависимости от архитектуры).
    //  */
    // const userUpsert = async (): Promise<void> => {
    //     if (!client || !isInitialized) return;
    //     try {
    //         await client.booking.UserUpsert();
    //     } catch (err) {
    //         console.error("Ошибка при апсерте пользователя:", err);
    //         throw err;
    //     }
    // };

    return {
        getUserByUsername,
        // userUpsert,
    };
}
