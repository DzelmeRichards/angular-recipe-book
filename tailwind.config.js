/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js, ts}"],
  theme: {
    screens: {
      mobile: "350px",
      sm: "640px",
      md: "768px",
      mlg: "1000px",
      lg: "1024px",
    },
    colors: {
      lightBodyBg: "#e2e8f0",
      lightCardBg: "#f9f9f9",
      lightSelectedBg: "#f1f1f1",
      lightBorder: "#dbdbdb",
      lightText: "#334155",
      lightHeading: "#0f172a",
      lightActive: "#0ea5e9",
      lightDanger: "#ff0000",
      lightInputBg: "#f7f7f7",

      lightBtnPrimaryBg: "#4a5e7a",
      lightBtnPrimaryActive: "#2f3b4c",
      lightBtnSecondaryBg: "#b8b200",
      lightBtnSecondaryActive: "#8c8700",
      lightBtnDangerBg: "#8c0000",
      lightBtnDangerActive: "#450000",

      darkBodyBg: "#334155",
      darkCardBg: "#0f172a",
      darkBorder: "#2f3b4d",
      darkText: "#94a3b8",
      darkSelectedBg: "#273043",
      darkHeading: "#e2e8f0",
      darkActive: "#38bdf8",
      darkInputBg: "#344155",
      darkDanger: "#a00000",

      darkBtnPrimaryBg: "#334155",
      darkBtnPrimaryActive: "#2a3545",
      darkBtnSecondaryBg: "#807b00",
      darkBtnSecondaryActive: "#666300",
      darkBtnDangerBg: "#5e0101",
      darkBtnDangerActive: "#450000",
    },
    extend: {
      animation: {
        loader: "animloader 1s linear infinite",
      },
      keyframes: {
        animloader: {
          "0%": { left: "0", transform: "translateX(-100%)" },
          "100%": { left: "100%", transform: "translateX(0%)" },
        },
      },
    },
  },
};
