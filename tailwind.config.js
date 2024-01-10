import colors from "tailwindcss/colors"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: {
          DEFAULT: colors.neutral[100],
          hover: colors.neutral[200],
          border: colors.neutral[300],
          text: colors.neutral[400],
          dark: colors.neutral[700],
          ["dark-hover"]: colors.neutral[800],
        },
      },
    },
  },
  plugins: [],
}
