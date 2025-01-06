import Client from '@/core/backend/client';

// Создаем синглтон клиента
const client = new Client('http://localhost:4000');

export const BookingService = {
    // Получить доступное время
    async getAvailability() {
        return client.booking.GetAvailability();
    },

    // Получить доступные слоты на конкретную дату
    async getBookableSlots(date: string) {
        return client.booking.GetBookableSlots(date);
    },

    // Забронировать слот
    async book(params: { start: string; Email: string }) {
        return client.booking.Book(params);
    },

    // Получить список броней
    async listBookings() {
        return client.booking.ListBookings();
    },
};