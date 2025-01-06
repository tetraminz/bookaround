'use client';

import { useState, useCallback } from 'react';
import { client } from '@/core/backend';
import type { Availability, BookableSlot } from '@/core/backend/types';

export function useAvailability() {
    const [availability, setAvailability] = useState<Availability[]>([]);
    const [slots, setSlots] = useState<BookableSlot[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchAvailability = useCallback(async () => {
        try {
            setLoading(true);
            const response = await client.booking.GetAvailability();
            setAvailability(response.Availability);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch availability'));
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchSlots = useCallback(async (from: string) => {
        try {
            setLoading(true);
            const response = await client.booking.GetBookableSlots(from);
            setSlots(response.Slots);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch slots'));
        } finally {
            setLoading(false);
        }
    }, []);

    const setAvailabilityTime = useCallback(async (newAvailability: Availability[]) => {
        try {
            setLoading(true);
            await client.booking.SetAvailability({ Availability: newAvailability });
            await fetchAvailability(); // Refresh after setting
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to set availability'));
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchAvailability]);

    return {
        availability,
        slots,
        loading,
        error,
        fetchAvailability,
        fetchSlots,
        setAvailabilityTime,
    };
}