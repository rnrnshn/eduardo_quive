import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'rich-black': '#0a0a0a',
        'off-white': '#fbfbfb',
        'paper': '#f0f0f0',
        'gray-neutral': '#888888',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter Tight', 'sans-serif'],
        handwriting: ['"Dancing Script"', 'cursive'], // Added for the 'menu' text
      },
      fontSize: {
        'display-huge': ['12rem', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
        'display-large': ['8rem', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        'display-medium': ['4rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
    },
  },
  plugins: [],
} satisfies Config
