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
      fontFamily: {
        body: ['FuturaStdLight', 'Helvetica', 'Arial', 'Sans-serif'],
        medium: 'FuturaStdMedium',
      },
      height: {
        '90vh': '90vh',
        card: '200px',
        cardImg: '130px',
        cardD: '270px',
        cardImgD: '200px',
      },
      maxHeight: { '90vh': '90vh' },
      minWidth: { card: '225px' },
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
