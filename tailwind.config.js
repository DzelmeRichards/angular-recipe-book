/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {},
    colors: {
      lightBodyBg: "#e2e8f0",
      lightCardBg: "#f9f9f9",
      lightBorder: "#f2f2f2",
      lightText: "#334155",
      lightHeading: "#0f172a",
      lightActive: "#0ea5e9",

      darkBodyBg: "#334155",
      darkCardBg: "#0f172a",
      darkBorder: "",
      darkText: "#94a3b8",
      darkHeading: "#e2e8f0",
      darkActive: "#38bdf8",
    },
    extend: {},
  },
  plugins: [],
};
