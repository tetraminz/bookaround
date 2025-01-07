'use client';

import Client, { Environment, Local } from './client';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

export function createClient() {
    return new Client(
        (process.env.NODE_ENV === ('staging' as string))
            ? Environment('staging')
            : Local,
        {
            auth: () => {
                try {
                    const { launchParams } = retrieveLaunchParams();
                    console.log(launchParams.initDataRaw);
                    return { Authorization: `tma ${launchParams.initDataRaw}` };
                } catch (error) {
                    console.error('Failed to retrieve TMA launch params:', error);
                    return undefined;
                }
            }
        }
    );
}