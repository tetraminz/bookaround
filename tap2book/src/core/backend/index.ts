'use client';

import Client, { Environment, Local } from './client';

export function createClient(initDataRaw: string) {
    return new Client(
        (process.env.NODE_ENV === ('production' as string))
            ? Environment('staging')
            : Local,
        {
            auth: () => {
                    return { Authorization: `tma ${initDataRaw}` };
            }
        }
    );
}