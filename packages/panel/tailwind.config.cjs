/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#F3F4F0',
        'background-dark': '#1E1E1E',
        'border': '#D0D1C9',
        'border-dark': '#2B2C32',
        'accent': '#FFFFFD',
        'accent-dark': '#1D1F27',
        'primary': '#000',
        'primary-dark': '#fff',
      },
      backgroundColor: {
        'light-gray': '#fafaf9',
      },
      fontFamily: {
        code: ['Source Code Pro', 'Menlo', 'Consolas', 'monaco', 'monospace'],
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
