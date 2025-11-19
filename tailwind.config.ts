import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#00918C',
        secondary: '#266DC1',
        amber: {
          250: '#FFF7E1',
        },
        cyan: {
          250: '#D2FAFF',
        },
        yellow: {
          250: '#E6E893',
        },
        teal: {
          250: '#90EAE7',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
} as Config;
