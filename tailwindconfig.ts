import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    
    './src/**/*.{js,ts,jsx,tsx}', //  if using src/
  ],
  theme: {
    extend: {
      // Optional: Add fonts, animations, etc.
    },
  },
  plugins: [],
}

export default config