/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'ccmeanwhile': ['CCMEANWHILE', 'cc-meanwhile', 'CC Meanwhile', 'Arial Black', 'system-ui', 'sans-serif'],
        'sans': ['CCMEANWHILE', 'cc-meanwhile', 'CC Meanwhile', 'Arial Black', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};