import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lafa: {
          bg: '#1B1A23',
          surface: '#252B37',
          'surface-hover': '#2D3444',
          sidebar: '#16151E',
          border: '#3A394A',
          accent: '#FF5A00',
          'accent-hover': '#E54E00',
          'text-primary': '#F5F5F5',
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
