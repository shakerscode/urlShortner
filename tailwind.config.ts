import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "var(--font-poppins)",
      },
      colors: {
        white: "#fffdf8",
        borderColor: "#fffdf8",
        colorDark: "#031f39",
        blue: "#031f39",
        blue200: "#D6E6FF",
        blue300: "#A8D1FF",
        sky: "#7dd3fc",
      },
    },
  },
  plugins: [],
} satisfies Config;
