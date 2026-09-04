/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chalkboard: {
          900: '#0c1b18',
          800: '#142a25',
          700: '#1e3d36',
          600: '#2c534a',
        },
        chalk: {
          white: '#f7faf8',
          yellow: '#fef08a',
          cyan: '#67e8f9',
          pink: '#f472b6',
          green: '#86efac',
          gold: '#f59e0b'
        },
        postit: {
          yellow: '#fef08a',
          blue: '#bae6fd',
          pink: '#fbcfe8',
          green: '#bbf7d0'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        handwritten: ['Caveat', 'cursive'],
        serif: ['Playfair Display', 'serif'],
        mono: ['Fira Code', 'monospace']
      },
      boxShadow: {
        'chalk': '0 0 15px rgba(255, 255, 255, 0.15)',
        'postit': '4px 6px 15px rgba(0, 0, 0, 0.25)',
        'glow-gold': '0 0 25px rgba(245, 158, 11, 0.4)',
        'glow-cyan': '0 0 25px rgba(103, 232, 249, 0.4)'
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
