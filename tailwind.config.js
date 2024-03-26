/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-left': 'fade-in-left 1s ease-in-out'
      },
      keyframes: {
        'fade-in-left': {
          from: {
            opacity: '0',
            transform: 'translateX(-50px)'
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)'
          }
        }
      }
    },
  },
  plugins: [],
}