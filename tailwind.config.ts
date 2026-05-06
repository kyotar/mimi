import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:     '#0a0a0a',
        rust:    '#b84c2a',
        cream:   '#ffffff',
        tan:     '#1f1f1f',
        vinyl:   '#0a0a0a',
        surface: '#141414',
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
