// core/hooks/useBookingService.ts
"use client";
import { useBackend } from "@/core/backend/context";
import { booking } from "@/core/backend/client";
import {useCallback} from "react";

/**
 * Хук для работы с бронированиями:
 * - Book (создать бронь)
 * - DeleteBooking (удалить бронь)
 * - ListBookings (получить все брони)
 */
export function useBookingService() {
    const { client, isInitialized } = useBackend();

    /**
     * Забронировать услугу у мастера (по его TelegramID)
     */
    const book = useCallback(async (masterTelegramID: number, params: booking.BookParams): Promise<void> => {
        if (!client || !isInitialized) return;
        try {
            await client.booking.Book(masterTelegramID, params);
        } catch (err) {
            console.error("Ошибка при бронировании:", err);
            throw err;
        }
    },
        [client, isInitialized]
    );

    /**
     * Удалить существующую бронь по её ID
     */
    const deleteBooking = useCallback(async (bookingId: number): Promise<void> => {
        if (!client || !isInitialized) return;
        try {
            await client.booking.DeleteBooking(bookingId);
        } catch (err) {
            console.error("Ошибка при удалении брони:", err);
            throw err;
        }
    },
        [client, isInitialized]
    );

    /**
     * Получить список всех бронирований (ListBookings)
     */
    const listBookings = useCallback(async (): Promise<booking.Booking[] | undefined> => {
        if (!client || !isInitialized) return;
        try {
            const { bookings } = await client.booking.ListBookings();
            return bookings;
        } catch (err) {
            console.error("Ошибка при получении списка бронирований:", err);
            throw err;
        }
    },
        [client, isInitialized]
    );

    return {
        book,
        deleteBooking,
        listBookings,
    };
}
