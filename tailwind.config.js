const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.tsx'],
  darkMode: 'class',
  theme: {
    fontSize: {
      '12px': '1.2rem',
      '13px': '1.3rem',
      '14px': '1.4rem',
      '18px': '1.8rem',
    },
    extend: {
      colors,
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    opacity: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
  },
  plugins: [],
  // xwind options
  xwind: {
    mode: 'objectstyles',
  },
}
