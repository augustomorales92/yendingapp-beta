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
        primary: '#F1F6F9', // Whitesmoke
        secondary: '#394867', // blue-dark
        primary_b: '#9BA4B5', // grey
        secondary_b: '#212A3E', // dark
        yending_blue: {
          '50': '#f5f7fa',
          '100': '#e9edf5',
          '200': '#cfd8e8',
          '300': '#a4b7d5',
          '400': '#7391bd',
          '500': '#5273a5',
          '600': '#3f5a8a',
          '700': '#344a70',
          '800': '#2e3f5e',
          '900': '#2a3750',
          '950': '#212a3e'
        }
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
