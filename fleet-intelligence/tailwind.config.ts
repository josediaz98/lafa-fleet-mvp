import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lafa: {
          bg: '#0a0a0f',
          surface: '#13131a',
          border: '#1e1e2a',
          accent: '#6366f1',
          'accent-hover': '#818cf8',
          'text-primary': '#e2e2e8',
          'text-secondary': '#71717a',
        },
      },
      fontFamily: {
        sans: ['Inter Tight', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
