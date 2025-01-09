'use client';

import Client, {BaseURL, Environment} from './client';
import {base} from "next/dist/build/webpack/config/blocks/base";

export const ProxyLocal: BaseURL = "https://0e0f-103-156-226-16.ngrok-free.app";

export function createClient(initDataRaw: string) {
    let baseClient = (process.env.NODE_ENV === ('production' as string))
        ? Environment('staging')
        : ProxyLocal;

    return new Client(
        baseClient,
        {
            auth: () => {
                return {Authorization: `tma ${initDataRaw}`};
            }
        }
    );
}