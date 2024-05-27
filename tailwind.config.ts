/* eslint-disable import/no-extraneous-dependencies */
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import tailwindForms from '@tailwindcss/forms';
import { gray } from 'tailwindcss/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '500px',
        md: '800px',
        lg: '1200px',
        zxl: '1536px',
      },
      colors: {
        brand: {
          accent: '#8A2BE2', // Dark Violet
          main: '#4B0082', // Indigo
          graylght: '#3E4C59',
        },
        text: {
          primary: '#DCDCDC', // Gainsboro
          secondary: '#8B008B', // Dark Magenta
        },
        background: {
          primary: '#2E2E2E', // Darker Grey for background
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        mono: [...defaultTheme.fontFamily.mono],
        poppins: ['var(--font-poppins)'],
      },
      spacing: {
        5: '4px',
        9: '8px',
        11: '14px',
      },
    },
  },
  plugins: [tailwindForms],
};
export default config;
