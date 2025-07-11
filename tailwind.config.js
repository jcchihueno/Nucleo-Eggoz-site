/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        'montserrat-alt': ['Montserrat Alternates', 'sans-serif'],
        exo: ['Exo', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0A4D68',
          light: '#088395',
          dark: '#05BFDB',
          contrast: '#00FFCA',
        },
        secondary: {
          DEFAULT: '#D63484',
          light: '#F96CCB',
          dark: '#AA336A',
        },
        neutral: {
          light: '#F5F5F5',
          DEFAULT: '#E0E0E0',
          dark: '#333333',
        },
      },
      height: {
        'screen-90': '90vh',
      },
    },
  },
  plugins: [],
};