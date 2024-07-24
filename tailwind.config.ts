import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(241, 246, 249)', // Whitesmoke
        secondary: 'rgb(57, 72, 103)', // blue-dark
        primary_b: 'rgb(155, 164, 181)',// grey 
        secondary_b: 'rgb(33, 42, 62)', // dark
      }
    }
  },
  plugins: []
}

// Oscuro a violeta

// colors: {
//   primary: 'rgb(7, 15, 43)',
//   secondary: 'rgb(27, 26, 85)',
//   primary_b:'rgb(83, 92, 145)',
//   secondary_b:'rgb(146, 144, 195)',
// },

export default config
