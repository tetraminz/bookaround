'use client';

import Client, {BaseURL, Environment} from './client';
import {base} from "next/dist/build/webpack/config/blocks/base";

export const ProxyLocal: BaseURL = "https://da4d-103-156-226-16.ngrok-free.app";

export function createClient(initDataRaw: string) {
    let baseClient = process.env.NODE_ENV === "production"
        ? Environment("staging")
        : ProxyLocal;

    try {
        const client = new Client(baseClient, {
            auth: () => ({
                Authorization: `tma ${initDataRaw}`
            }),
            requestInit: {
                headers: {
                    "ngrok-skip-browser-warning": "true" // 🚀 Добавляем заголовок через конструктор
                }
            }
        });
        return client;
    } catch (error) {
        console.error("client creation error", error);
        throw error;
    }
}