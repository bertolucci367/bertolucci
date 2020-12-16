const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.tsx'],
  darkMode: 'class',
  theme: {
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
