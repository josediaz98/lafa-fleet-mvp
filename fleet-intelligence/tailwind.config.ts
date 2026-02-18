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
        status: {
          active: '#3B82F6',
          success: '#22C55E',
          warning: '#F59E0B',
          danger: '#EF4444',
          info: '#8B5CF6',
          alert: '#EAB308',
        },
      },
      fontFamily: {
        sans: ['Inter Tight', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
