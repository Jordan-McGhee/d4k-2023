const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      keyframes: {
        sheen: {
          '0%': { backgroundPosition: '-200% 0' },
          '50%': { backgroundPosition: '125% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        sheen: 'sheen 4s linear infinite',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(
    {
      themes: {
        light: {
          colors: { 'success': 'rgb(5 150 105)' }
        }
      }
    }
  )],
};
