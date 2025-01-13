// core/hooks/useBookingService.ts
"use client";
import { useBackend } from "@/core/backend/context";
import { booking } from "@/core/backend/client";

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
    const book = async (masterTelegramID: number, params: booking.BookParams): Promise<void> => {
        if (!client || !isInitialized) return;
        try {
            await client.booking.Book(masterTelegramID, params);
        } catch (err) {
            console.error("Ошибка при бронировании:", err);
            throw err;
        }
    };

    /**
     * Удалить существующую бронь по её ID
     */
    const deleteBooking = async (bookingId: number): Promise<void> => {
        if (!client || !isInitialized) return;
        try {
            await client.booking.DeleteBooking(bookingId);
        } catch (err) {
            console.error("Ошибка при удалении брони:", err);
            throw err;
        }
    };

    /**
     * Получить список всех бронирований (ListBookings)
     */
    const listBookings = async (): Promise<booking.Booking[] | undefined> => {
        if (!client || !isInitialized) return;
        try {
            const { bookings } = await client.booking.ListBookings();
            return bookings;
        } catch (err) {
            console.error("Ошибка при получении списка бронирований:", err);
            throw err;
        }
    };

    return {
        book,
        deleteBooking,
        listBookings,
    };
}
