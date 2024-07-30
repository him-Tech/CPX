/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        deepCharcoal: "#030605",
        sunsetRed: "#E2632B",
        graphiteGray: "#5C5E5E",
        sunshineYellow: "#FFD476",
        mistGreen: "#AAADAC",
        seafoamWhite: "#E0E3E1",
        vividCoral: "#E84F21",
        ivoryMist: "#F8FBFA",
      },
    },
  },
  plugins: [],
};
