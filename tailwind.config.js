/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "space-mono": ["Space Mono", "monospace"],
      },
      letterSpacing: {
        widest: ".1em",
      },
      backgroundColor: {
        "black-rgba": "rgba(0, 0, 0, 0.54)",
      },
    },
  },
  plugins: [],
};
