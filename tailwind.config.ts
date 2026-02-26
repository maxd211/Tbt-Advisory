import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14181e",
        charcoal: "#222831",
        ivory: "#f7f5ef",
        accent: "#5f738a"
      },
      boxShadow: {
        soft: "0 12px 30px rgba(20, 24, 30, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
