'use client';

import { useBackend } from "@/core/backend/context";
import { booking } from "@/core/backend/client";

/**
 * Хук для работы со слотами/доступностью:
 * - Получить доступность
 * - Получить "bookable" слоты
 * - Задать доступность (SetAvailability)
 */
export function useSlotsService() {
    const { client, isInitialized } = useBackend();

    /**
     * Получить доступность мастера по его TelegramID
     */
    const getAvailability = async (
        masterTelegramID: number
    ): Promise<booking.GetAvailabilityResponse | undefined> => {
        if (!client || !isInitialized) return;
        try {
            return await client.booking.GetAvailability(masterTelegramID);
        } catch (err) {
            console.error("Ошибка при получении доступности:", err);
            throw err;
        }
    };

    /**
     * Получить слоты, в которые можно забронировать услугу
     */
    const getBookableSlots = async (
        masterTelegramID: number,
        fromDateISO: string
    ): Promise<booking.SlotsResponse | undefined> => {
        if (!client || !isInitialized) return;
        try {
            return await client.booking.GetBookableSlots(masterTelegramID, fromDateISO);
        } catch (err) {
            console.error("Ошибка при получении bookable слотов:", err);
            throw err;
        }
    };

    /**
     * Задать доступность (SetAvailability)
     */
    const setAvailability = async (params: booking.SetAvailabilityParams): Promise<void> => {
        if (!client || !isInitialized) return;
        try {
            await client.booking.SetAvailability(params);
        } catch (err) {
            console.error("Ошибка при установке доступности:", err);
            throw err;
        }
    };

    return {
        getAvailability,
        getBookableSlots,
        setAvailability,
    };
}
