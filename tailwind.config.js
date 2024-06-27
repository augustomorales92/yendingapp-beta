/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(0, 141, 218)', 
        secondary: 'rgb(247, 238, 221)', 
        primary_b:'rgb(65, 201, 226)',
        secondary_b:'rgb(172, 226, 225)',
      },
    },
  },
  plugins: [],
};
