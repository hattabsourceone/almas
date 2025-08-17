/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "bus-care-bg-dots": "url('src/assets/Contact/bus-care-bg-dots.jpg')",
        "slogan-bg": "url('src/assets/Contact/slogan-bg.png')",
        "new-jewel-head-bg": "url('src/assets/Contact/new-jewel-head-bg.png')",
      },
    },
    transitionDuration: {
      '2000': '2000ms',
      '3000': '3000ms',
      '4000': '4000ms',
      '5000': '5000ms',
    }
  },
  plugins: [],
};
