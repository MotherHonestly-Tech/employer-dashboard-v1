/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    colors: {
      white: "#FFF",
      // primary: '#28404A',
      black: {
        50: "#323A43",
        100: "#000",
        200: "#060606",
        300: "#292521",
        400: "#1C1E2D",
        500: "#11052E",
      },
      gray: {
        100: "#B5B5B5",
        200: "#767575",
        300: "#E4E4E4",
      },
    },
    extend: {
      colors: {
        lilac: {
          100: "#FBF8F5",
          200: "#F6F8F5",
          300: "#F3F4F6",
        },
        sky: {
          400: "#B4B2D7",
        },
        cream: {
          100: "#F9F9F7",
          200: "#FFDA9C",
        },
        pink: {
          600: "#ECEDF9",
          700: "#C27171",
        },
        navy: {
          900: "#194049",
        },
        green: {
          100: "#D2E0CB",
        },
      },
      fontFamily: {
        columbia: ["Columbia-Sans"],
        areaExt: ["Area-Extended"],
        areaNorm: ["Area-Normal"],
        areaBold: ["Area-Normal-Bold"],
        areaSemi: ["Area-Normal-Semibold"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
