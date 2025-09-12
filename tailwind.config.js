/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        brand: {
          'dark-blue': '#35383E',
          primary: '#00ADB5',
          'dark-gray': '#818181',
          'text-gray': '#9a9c9f',
          'light-gray': '#eeeeee',
          white: '#FFFFFF',
          background: '#f8f8f8',
          process: '#FFAA04',
          danger: '#ef4444',
        },
      },
    },
  },
  plugins: [],
}
