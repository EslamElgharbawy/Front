/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors:{
        primary:{
          50:"#a3e4d7",
          100:"#8ddece",
          200:"#76d7c4",
          300:"#5fd0ba",
          400:"#48c9b0",
          500:"#31c3a6",
          600:"#1abc9c",
          700:"#17a98c",
          800:"#15967d",
          900:"#12846d",
          950:"#10715e"
        }
      },
      screens: {
        "sm": '330px',
  
        "md": '526px',
  
        "lg": '800px',
  
        "xl": '1220px',
  
        "2xl": "1320px",
      },
      fontFamily:{
        cairo:'Cairo Variable'
      }
    },
  },
  plugins: [],
}

