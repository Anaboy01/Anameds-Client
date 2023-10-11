/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        epilogue: ['Epilogue', 'sans-serif'],
        openSan: [ 'Open Sans', 'sans-serif'],
      },
      boxShadow: {
        secondary: '10px 10px 20px rgba(2, 2, 2, 0.25)',
      },
      screens: {
        '2xl': {'min': '1400px'},
  
        'xl': {'min': '1279px'},
  
        'lg': {'min': '1023px'},
  
        'md': {'min': '767px'},
  
        'sm': {'min': '639px'}, 

        'ns': {'min': '460px'},

        'vs': {'min': '200px'},

        'vl': {'max': '300px'}
        },
    },
  },
  plugins: [],
}




