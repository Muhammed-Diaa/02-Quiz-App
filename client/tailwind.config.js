/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import scrollBar from "tailwind-scrollbar";
import { light, dark } from "daisyui/src/theming/themes";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  listStyleType: { decimal: "decimal" },
  theme: {},
  daisyui: {
    themes: [
      {
        light: {
          ...light,
          primary: "#e6e9ff",
          secondary: "#0DFF92",
          accent: "#aaaaaa",
          neutral: "#000000",
          info: "#FFFFFF",
          warning: "#48CAE4",
        },
      },
      {
        dark: {
          ...dark,
          primary: "#323344",
          secondary: "#0DFF92",
          accent: "#FFFFFF",
          neutral: "#aaaaaa",
          info: "#1d232a",
          warning: "#002657",
        },
      },
    ],
  },
  plugins: [daisyui, scrollBar],
};
