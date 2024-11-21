/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
        "3xl": "1736px",
        // => @media (min-width: 1536px) { ... }
      },
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
