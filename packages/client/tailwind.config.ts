import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import tailwindScrollbar from "tailwind-scrollbar"
export default {
  theme: {
    extend: {
      fontFamily: {
        primary: ["Urbanist Variable", "sans-serif"],
      },
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        primary2: "rgb(var(--color-primary2) / <alpha-value>)",
        red: "rgb(var(--color-red) / <alpha-value>)",
        purple: "rgb(var(--color-purple) / <alpha-value>)",
      },
      spacing: {},
    },
  },
  plugins: [typography, tailwindScrollbar],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,astro}",
    "../../node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "../backend/src/**/*.{js,ts,jsx,tsx,astro}",
  ],
} satisfies Config;
