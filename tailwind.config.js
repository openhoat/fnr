import flowbitePlugin from 'flowbite/plugin'
import customColors from './tailwind.colors.config'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/front/main/**/*.{ts,tsx}',
    './assets/index.html',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: customColors,
    },
    plugins: [flowbitePlugin],
  },
}
