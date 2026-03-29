import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6B35",
          50: "#FFF3ED",
          100: "#FFE4D4",
          200: "#FFC5A8",
          300: "#FFA071",
          400: "#FF6B35",
          500: "#F54A00",
          600: "#CC3D00",
          700: "#A33100",
          800: "#822800",
          900: "#6B2100",
        },
        secondary: {
          DEFAULT: "#1E1B4B",
          50: "#EEEDF8",
          100: "#D4D2EE",
          200: "#A9A5DD",
          300: "#7E78CC",
          400: "#534BBB",
          500: "#3730A3",
          600: "#2D2785",
          700: "#231E67",
          800: "#1E1B4B",
          900: "#141236",
        },
        accent: {
          DEFAULT: "#10B981",
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },
        background: "#FEFCE8",
      },
      fontFamily: {
        heading: ["Fredoka", "system-ui", "sans-serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
