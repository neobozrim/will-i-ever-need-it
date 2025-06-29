/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'fredoka': ['Fredoka', 'Nunito', 'system-ui', 'sans-serif'],
        'sans': ['Fredoka', 'Nunito', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};