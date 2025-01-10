"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useSignal } from "@telegram-apps/sdk-react";
import { initData } from "@telegram-apps/sdk-react";
import Client from "./client";
import { createClient } from "./index";

interface BackendContextType {
    client: Client | null;
    isInitialized: boolean;
}

const BackendContext = createContext<BackendContextType | undefined>(undefined);

export function BackendProvider({ children }: { children: ReactNode }) {
    const initDataRaw = useSignal(initData.raw);
    const [client, setClient] = useState<Client | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!initDataRaw) {
            console.warn("initDataRaw is пустой, ждём...");
            return;
        }

        try {
            const newClient = createClient(initDataRaw as string);
            setClient(newClient);
            setIsInitialized(true);
        } catch (error) {
            console.error("client error", error);
        }
    }, [initDataRaw]);

    return (
        <BackendContext.Provider value={{ client, isInitialized }}>
            {children}
        </BackendContext.Provider>
    );
}

export function useBackend() {
    const context = useContext(BackendContext);
    if (!context) {
        throw new Error("useBackend must be used внутри <BackendProvider>");
    }
    return context;
}