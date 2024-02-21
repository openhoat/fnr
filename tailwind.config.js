import flowbitePlugin from 'flowbite/plugin'
import withMT from '@material-tailwind/react/utils/withMT'

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    './src/frontend/main/**/*.{ts,tsx}',
    './assets/index.html',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      //   colors: customColors,
    },
    plugins: [flowbitePlugin],
  },
})
