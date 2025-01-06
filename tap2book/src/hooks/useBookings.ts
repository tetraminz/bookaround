'use client';

import { useState, useCallback } from 'react';
import { client } from '@/core/backend';
import type { Booking, BookParams } from '@/core/backend/types';

export function useBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchBookings = useCallback(async () => {
        try {
            setLoading(true);
            const response = await client.booking.ListBookings();
            setBookings(response.bookings);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch bookings'));
        } finally {
            setLoading(false);
        }
    }, []);

    const createBooking = useCallback(async (params: BookParams) => {
        try {
            setLoading(true);
            await client.booking.Book(params);
            await fetchBookings(); // Refresh the list after creating
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to create booking'));
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchBookings]);

    const deleteBooking = useCallback(async (id: number) => {
        try {
            setLoading(true);
            await client.booking.DeleteBooking(id);
            await fetchBookings(); // Refresh the list after deleting
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to delete booking'));
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchBookings]);

    return {
        bookings,
        loading,
        error,
        fetchBookings,
        createBooking,
        deleteBooking,
    };
}