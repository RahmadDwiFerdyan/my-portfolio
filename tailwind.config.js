/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    color: {
      primary: "var(--primary)",
      secondary: "var(--secondary)",
      black: "#000",
      white: "#fff",
      transparent: "transparent",
      current: "currentColor",
    },
    fontFamily: {
      sora: ["Sora", "sans-serif"],
      manrope: ["Manrope", "sans-serif"],
    }
  }
};
