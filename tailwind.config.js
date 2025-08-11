/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#F4A019',
          dark: '#3A3A3A',
          gray: '#6C6C6C',
        },
      },
    },
  },
  plugins: [],
};
