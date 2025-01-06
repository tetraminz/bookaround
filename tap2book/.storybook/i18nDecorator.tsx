// .storybook/i18nDecorator.js
import React from 'react';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
    onboarding: {
        slide1: {
            title: 'Welcome',
            description: 'This is the first slide',
        },
        slide2: {
            title: 'Features',
            description: 'Here are some features',
        },
        slide3: {
            title: 'Get Started',
            description: 'Let\'s begin!',
        },
        getStarted: 'Start',
    },
};

export const withI18n = (Story) => (
    <NextIntlClientProvider locale="en" messages={messages}>
        <Story />
    </NextIntlClientProvider>
);