'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useBookings } from '@/hooks/useBookings';
import { useAvailability } from '@/hooks/useAvailability';

type BackendContextType = ReturnType<typeof useBookings> & ReturnType<typeof useAvailability>;

const BackendContext = createContext<BackendContextType | null>(null);

export function BackendProvider({ children }: { children: ReactNode }) {
    const bookingsHook = useBookings();
    const availabilityHook = useAvailability();

    return (
        <BackendContext.Provider value={{ ...bookingsHook, ...availabilityHook }}>
            {children}
        </BackendContext.Provider>
    );
}

export function useBackend() {
    const context = useContext(BackendContext);
    if (!context) {
        throw new Error('useBackend must be used within a BackendProvider');
    }
    return context;
}