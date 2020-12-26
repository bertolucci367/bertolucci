const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.tsx'],
  darkMode: 'class',
  theme: {
    fontSize: {
      '13px': '1.3rem',
      '18px': '1.8rem',
    },
    extend: {
      colors,
    },
  },
  variants: {},
  plugins: [],
  // xwind options
  xwind: {
    mode: 'objectstyles',
  },
}
