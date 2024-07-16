import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT( {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(0, 60, 67)', 
        secondary: 'rgb(119, 176, 170)', 
        primary_b:'rgb(19, 93, 102)',
        secondary_b:'rgb(227, 254, 247)',
      },
    },
  },
  plugins: [],
});


// Oscuro a violeta 

// colors: {
//   primary: 'rgb(7, 15, 43)', 
//   secondary: 'rgb(27, 26, 85)', 
//   primary_b:'rgb(83, 92, 145)',
//   secondary_b:'rgb(146, 144, 195)',
// },

export default config;