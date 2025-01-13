'use client';

import { type PropsWithChildren, useEffect } from 'react';
import {
  initData,
  miniApp,
  useLaunchParams,
  useSignal,
} from '@telegram-apps/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { AppRoot } from '@telegram-apps/telegram-ui';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';
import { useTelegramMock } from '@/hooks/useTelegramMock';
import { useDidMount } from '@/hooks/useDidMount';
import { useClientOnce } from '@/hooks/useClientOnce';
import { setLocale } from '@/core/i18n/locale';
import { init } from '@/core/init';
import {createClient} from "@/core/backend";
import useTelegramRedirect from "@/core/startParamRedirect";

function RootInner({ children }: PropsWithChildren) {
  useEffect(() => {
    import("eruda").then((eruda) => eruda.default.init());
  }, []);

  const isDev = process.env.NODE_ENV === 'development';

  // Mock Telegram environment in development mode if needed.
  if (isDev) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock();
  }

  const lp = useLaunchParams();
  const debug = isDev || lp.startParam === 'debug';

  // Initialize the library.
  useClientOnce(() => {
    init(debug);
  });

  // Call UserUpsert when component mounts on client side and we have valid launch params
  useEffect(() => {
    if (lp.initDataRaw) {
      let client;

      client = createClient(lp.initDataRaw)

      client.booking.UserUpsert()
          .then(() => {
            console.log('UserUpsert successful');
          }).catch(error => {
        // More detailed error logging

        console.error('UserUpsert failed:', {
          name: error.name,
          message: error.message,
          code: error.code,
          status: error.status,
          response: error.response,
          // For network errors
          type: error instanceof TypeError ? 'Network Error' : 'Other Error',
          // Full error object for debugging
          fullError: error,
          stack: error.stack
        });
      });
    }
  }, [lp.initDataRaw]);

  const isDark = useSignal(miniApp.isDark);
  const initDataUser = useSignal(initData.user);

  // Set the user locale.
  useEffect(() => {
    initDataUser && setLocale(initDataUser.languageCode);
  }, [initDataUser]);

  // TODO при переходе на ссылку профиля - грузит сначала другие компоненты.
  useTelegramRedirect();

  return (
    <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
      <AppRoot
        appearance={isDark ? 'dark' : 'light'}
        platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
      >
        {children}
      </AppRoot>
    </TonConnectUIProvider>
  );
}

export function Root(props: PropsWithChildren) {
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of
  // the Server Side Rendering. That's why we are showing loader on the server
  // side.
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props}/>
    </ErrorBoundary>
  ) : <div className="root__loading">Loading</div>;
}