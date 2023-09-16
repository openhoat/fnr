import type { Config } from 'tailwindcss'
import * as flowbitePlugin from 'flowbite/plugin'

export default {
  content: [
    './src/**/*.{html,ts,tsx}',
    './assets/index.html',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    plugins: [flowbitePlugin],
  },
} satisfies Config
