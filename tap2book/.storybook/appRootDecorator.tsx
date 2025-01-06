// .storybook/appRootDecorator.js
import React from 'react';
import { AppRoot } from '@telegram-apps/telegram-ui';

export const withAppRoot = (Story) => (
    <AppRoot>
        <Story />
    </AppRoot>
);