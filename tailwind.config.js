/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'pt-beige': '#F6F1E9',
      'pt-yellow': '#FFD93D',
      'pt-orange': '#FF8400',
      'pt-brown': '#4F200D',
      'pt-red': '#D23D1C',
      'pt-offwhite': '#FEFDFA'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        '3xl': '20px 20px 0px 0px',
      },
      borderWidth: {
        '6' : '6px'
      }
    },
  },
  plugins: [],
}
