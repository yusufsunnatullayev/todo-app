/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "rgb(34, 34, 36);",
        lightBlack: "rgb(52, 52, 54)",
      },
    },
  },
  plugins: [],
};
