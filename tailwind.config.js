/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#f4a019',
          gray: '#9aa0a6',
          dark: '#1a1a1a',
        },
      },
    },
  },
  plugins: [],
};
