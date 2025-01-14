'use client';

import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import { useTranslations } from 'next-intl';

import { Link } from '@/components/Link/Link';
import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher';
import { Page } from '@/components/Page';
import { OnboardingSlider } from '@/components/OnboardingSlider/OnboardingSlider';

import tonSvg from './_assets/ton.svg';
import {initData, useLaunchParams, useSignal} from "@telegram-apps/sdk-react";

export default function Home() {
  const t = useTranslations('i18n');

  const user = useSignal(initData.user);

  return (
      <Page back={false}>
        <OnboardingSlider />

        <List>
          {/* Добавляем новую секцию для профиля пользователя */}
          {user?.username && (
              <Section header="Мой профиль">
                <Link href={`/profile/${user.username}`}>
                  <Cell
                      before={
                        <Image
                            src={user.photoUrl}
                            style={{ borderRadius: '50%' }}
                        />
                      }
                      subtitle="Перейти в профиль"
                  >
                    {user.firstName} {user.lastName}
                  </Cell>
                </Link>
              </Section>
          )}

          <Section
              header="Features"
              footer="You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects"
          >
            <Link href="/ton-connect">
              <Cell
                  before={
                    <Image
                        src={tonSvg.src}
                        style={{ backgroundColor: '#007AFF' }}
                    />
                  }
                  subtitle="Connect your TON wallet"
              >
                TON Connect
              </Cell>
            </Link>
          </Section>
          <Section
              header="Application Launch Data"
              footer="These pages help developer to learn more about current launch information"
          >
            <Link href="/init-data">
              <Cell subtitle="User data, chat information, technical data">
                Init Data
              </Cell>
            </Link>
            <Link href="/launch-params">
              <Cell subtitle="Platform identifier, Mini Apps version, etc.">
                Launch Parameters
              </Cell>
            </Link>
            <Link href="/theme-params">
              <Cell subtitle="Theme parameters information">
                Theme Parameters
              </Cell>
            </Link>
            <Link href="/booking-wizard">
              <Cell subtitle="Booking wizard system">
                Booking wizard system
              </Cell>
            </Link>
          </Section>
          <Section header={t('header')} footer={t('footer')}>
            <LocaleSwitcher/>
          </Section>
        </List>
      </Page>
  );
}