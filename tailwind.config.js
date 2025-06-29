/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'ccmeanwhile': ['cc-meanwhile', 'CC Meanwhile', 'system-ui', 'sans-serif'],
        'sans': ['cc-meanwhile', 'CC Meanwhile', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};