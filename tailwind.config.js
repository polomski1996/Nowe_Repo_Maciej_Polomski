/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#e8d8c9",
        slate: "#4b607f",
        ember: "#f3701e",
        ink: "#0f3460",
        ink2: "#0a2448",
      },
      fontFamily: {
        display: ["'Archivo Black'", "Impact", "sans-serif"],
        sans: ["'Space Grotesk'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
}
