/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        sm: "0.750rem",
        base: "1rem",
        xl: "1.333rem",
        "2xl": "1.777rem",
        "3xl": "2.369rem",
        "4xl": "3.158rem",
        "5xl": "4.210rem",
      },
      fontFamily: {
        heading: "Inter",
        body: "Inter",
      },
      fontWeight: {
        normal: "400",
        bold: "700",
      },
    },
  },
  darkMode: "class", // or 'media' or 'class'
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: "#698bf9",
            secondary: "#516af0",
            accent: "#bacafc",
            muted: "#edf1ff",
            error: "#fa3121",
            warning: "#ffaa00",
            success: "#00d68f",
            info: "#1ea7fd",
            background: "#f6f6f6",
            neutral: {
              100: "#f6f9fe",
              200: "#edf1ff",
              300: "#8290a9",
              400: "#292b2f",
            },
          },
        },
        dark: {
          primary: "#223577",
          secondary: "#1c2d70",
          accent: "#374a5d",
          muted: "#43454a",
          error: "#6e0d00",
          warning: "#704a00",
          success: "#005e42",
          info: "#004080",
          background: "#1a1a1a",
          neutral: {
            100: "#1c1e22",
            200: "#43454a",
            300: "#a1a7b3",
            400: "#f6f6f6",
          },
        },
      },
    }),
  ], // Add a comma here
};
