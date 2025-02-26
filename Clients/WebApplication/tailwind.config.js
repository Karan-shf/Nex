/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'modal-backdrop': '#ffffff',
      }
    },
    colors: {
      "darkGray": "#434343",
      "chatBubblePrimary": "#AF042E",
      "chatBubbleSecondary": "#2E2E2E",
      "replyPrimary": "#680D24",
      "black": "#000000",
      "white": "#ffffff",
      "backdropp": "rgba(255, 255, 255, 0.3)",
      "backdropDark": "rgba(6, 6, 18, 0.7)",
      "cyan": "#0aa88e",
      "blue": "#0a76a8",
      "purple": "#6c0aa8",
      "green": "#0aa869",
      "grayPrime": "#232B2B"


    }
  },
  daisyui: {
    themes: [
      {
        light: {

          "primary": "#FF295D",
          "secondary": "#6A6A6A", //text-secondary
          "accent": "#434343", //border
          "neutral": "#060612", //text-primary
          "base-100": "#ffffff",


        },

        dark: {


          "primary": "#FF295D",
          "secondary": "#6A6A6A", //text-secondary
          "accent": "#434343", //border
          "neutral": "#ffffff", //text-primary
          "base-100": "#060612",
          // "base-200": "#0F111A",
          // "base-300": "#31374A",
          "base-content": "#Ffffff",


        },
      },
    ],
  },
  plugins: [
    require('daisyui')
  ],
}

