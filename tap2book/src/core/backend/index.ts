'use client';

import Client, {BaseURL, Environment} from './client';

export const ProxyLocal: BaseURL = "https://adopted-platinum-civilian-bt.trycloudflare.com";

export function createClient(initDataRaw: string) {
    let baseClient = process.env.NODE_ENV === "production"
        ? Environment("staging")
        : ProxyLocal;

    try {
        return new Client(baseClient, {
            auth: () => ({
                Authorization: `tma ${initDataRaw}`
            }),
            requestInit: {
                headers: {
                    "ngrok-skip-browser-warning": "true" // 🚀 Добавляем заголовок через конструктор
                }
            }
        });
    } catch (error) {
        console.error("client creation error", error);
        throw error;
    }
}