/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'comic': ['Comic Neue', 'cursive'],
      },
      animation: {
        'wiggle': 'wiggle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'rainbow': 'rainbow 3s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'magical-rotate': 'magical-rotate 4s ease-in-out infinite',
        'color-shift': 'color-shift 3s ease-in-out infinite',
        'jiggle': 'jiggle 0.3s ease-in-out infinite',
      },
      borderWidth: {
        '3': '3px',
        '5': '5px',
        '6': '6px',
        '8': '8px',
      },
      colors: {
        'rainbow': {
          DEFAULT: 'linear-gradient(45deg, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981)',
        }
      }
    },
  },
  plugins: [],
}