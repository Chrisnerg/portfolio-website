/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        paper: '#f5f0e8',
        cream: '#ede8dc',
        rust: '#c8440a',
        'rust-light': '#e05a20',
        gold: '#c9973a',
        sage: '#4a6741',
        slate2: '#2d3748',
        muted: '#8a8070',
        border2: '#d4cfc4',
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        dm: ['"DM Serif Display"', 'serif'],
        syne: ['Syne', 'sans-serif'],
        mono2: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
