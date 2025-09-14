/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#30304d",
        secondary: "#868591"
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },

    },
  },
  plugins: [],
}