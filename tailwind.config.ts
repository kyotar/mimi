import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:   '#1c1a17',
        rust:  '#b84c2a',
        cream: '#f5f0e8',
        tan:   '#d4c4a8',
        vinyl: '#2a2520',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans:  ['var(--font-dm-sans)', 'sans-serif'],
        mono:  ['var(--font-dm-mono)', 'monospace'],
      },
      borderRadius: {
        'mimi': '4px',
        'pill': '99px',
      },
    },
  },
  plugins: [],
}

export default config
