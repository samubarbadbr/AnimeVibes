/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'Segoe UI',
          'sans-serif',
        ],
      },
      colors: {
        ink: '#0b0b0e',
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        'accent-2': 'rgb(var(--accent-2-rgb) / <alpha-value>)',
      },
      keyframes: {
        'gradient-drift': {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '33%': { transform: 'translate(8%, -6%) scale(1.12)' },
          '66%': { transform: 'translate(-6%, 8%) scale(1.05)' },
        },
        'gradient-drift-2': {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1.1)' },
          '50%': { transform: 'translate(-10%, 10%) scale(1.18)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'gradient-drift': 'gradient-drift 20s ease-in-out infinite',
        'gradient-drift-2': 'gradient-drift-2 24s ease-in-out infinite',
        'fade-in': 'fade-in 0.4s ease forwards',
      },
    },
  },
  plugins: [],
};
