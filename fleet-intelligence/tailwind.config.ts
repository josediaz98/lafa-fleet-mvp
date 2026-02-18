import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lafa: {
          bg: '#1B1A23',
          surface: '#252B37',
          border: 'rgba(255, 255, 255, 0.06)',
          accent: '#FF5A00',
          'accent-hover': '#FF7A2E',
          'text-primary': '#e2e2e8',
          'text-secondary': '#9CA3AF',
        },
      },
      fontFamily: {
        sans: ['Inter Tight', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
