/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#714B67',
          light:   '#8B5E82',
          dark:    '#5A3A54',
          50:      '#FAF5F9',
          100:     '#F2E8EF',
          200:     '#E2C9DC',
          600:     '#714B67',
          700:     '#5A3A54',
          800:     '#452C40',
          900:     '#31202E',
        },
        teal: {
          DEFAULT: '#00A09D',
          light:   '#00BDB9',
          dark:    '#007E7B',
          50:      '#E6F7F7',
        },
        sunny: {
          DEFAULT: '#F0A500',
          light:   '#FFD166',
          50:      '#FFFBEB',
          100:     '#FEF3C7',
        },
        app: {
          crm:     '#E74C3C',
          sales:   '#F39C12',
          stock:   '#27AE60',
          invoice: '#2980B9',
          hr:      '#8E44AD',
          project: '#16A085',
        },
        odoo: {
          dark:   '#1F1F1F',
          text:   '#383838',
          muted:  '#6B7280',
          bg:     '#FAFAFA',
          border: '#E5E7EB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card:         '0 1px 8px rgba(0,0,0,0.06)',
        'card-hover': '0 6px 24px rgba(113,75,103,0.12)',
        app:          '0 2px 8px rgba(0,0,0,0.10)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};