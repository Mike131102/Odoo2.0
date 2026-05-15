/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#714B67',
          light: '#8B5E82',
          dark: '#5A3A54',
          50: '#FAF5F9',
          100: '#F2E8EF',
          200: '#E2C9DC',
          300: '#C99EC0',
          400: '#AA6E9D',
          500: '#8B4D7E',
          600: '#714B67',
          700: '#5A3A54',
          800: '#452C40',
          900: '#31202E',
        },
        teal: {
          DEFAULT: '#00A09D',
          light: '#00BDB9',
          dark: '#007E7B',
        },
        odoo: {
          purple: '#714B67',
          teal: '#00A09D',
          dark: '#1F1F1F',
          text: '#383838',
          muted: '#6B7280',
          bg: '#FAFAFA',
          border: '#E5E7EB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 32px rgba(113, 75, 103, 0.16)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
