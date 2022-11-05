/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent': 'rgba(0,0,0,.15)',
        'primary': '#1D4AFF'
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
