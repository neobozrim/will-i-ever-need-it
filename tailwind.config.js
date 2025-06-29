/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'barriecito': ['Barriecito', 'cursive'],
        'nunito': ['Nunito', 'system-ui', 'sans-serif'],
        'sans': ['Nunito', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};