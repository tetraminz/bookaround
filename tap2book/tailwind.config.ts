import type { Config } from "tailwindcss";

const plugin = require('tailwindcss/plugin'); // Добавляем импорт плагина


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.bg-background': {
          backgroundColor: 'hsl(var(--background))',
        },
        '.text-foreground': {
          color: 'hsl(var(--foreground))',
        },
        '.border-border': {
          borderColor: 'hsl(var(--border))',
        },
      });
    }),
  ],
};
export default config;
