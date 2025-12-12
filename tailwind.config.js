/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4E54C8',
        secondary: '#8F94FB',
        'text-main': '#2c3e50',
        'text-secondary': '#64748b',
        'surface': '#f8f9fc',
        'border': '#edf2f7',
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #4E54C8, #8F94FB)',
      },
    },
  },
  plugins: [],
}
