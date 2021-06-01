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
        '32px': '32px',
        '90vh': '90vh',
        card: '200px',
        cardImg: '130px',
        cardD: '270px',
        cardImgD: '200px',
        tooltip: '144px',
        asideBody: `calc(100vh - (130px + 90px))`,
        map: '50vh',
      },
      spacing: { logoFooter: '130px' },

      maxHeight: {
        '90vh': '90vh',
        '50vh': '50vh',
        asideBody: `calc(100vh - (130px + 90px))`,
      },
      minWidth: { card: '225px' },
      maxWidth: { card: '225px', '48%': '48%', '49%': '49%' },
      width: {
        '32px': '32px',
        tooltip: '224px',
      },
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
