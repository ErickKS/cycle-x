import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#0046C0",
      "primary-light": "#EEF5FB",
      "primary-dark": "#003DA8",

      gray: "#333A46",
      "gray-light": "#C5CEE0",

      black: "#000000",
      white: "#F2F2F2",
      red: "#DA1A3C",
      green: "#08875A",
      blue: "#00A1FC",

      transparent: "transparent",
    },
    screens: {
      sm: "464px",
      md: "864px",
    },
    extend: {
      boxShadow: {
        main: "0 2px 6px 1px rgba(0, 0, 0, 0.34)",
      },
      backgroundImage: {
        gradient: "linear-gradient(180deg, #0046C0 5.21%, #FFF 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
