import type { Preview } from "@storybook/react";

import { withI18n } from './i18nDecorator';
import { withAppRoot } from './appRootDecorator';

export const decorators = [withI18n, withAppRoot];

import '../src/app/_assets/globals.css';
import '@telegram-apps/telegram-ui/dist/styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
