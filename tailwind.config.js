module.exports = {
  theme: {
    extend: {
        width: {
            '96' : '24rem'
        }
    }
  },
  variants: {
    float: ['responsive', 'direction'],
    margin: ['responsive', 'direction'],
    padding: ['responsive', 'direction'],
    textAlign: ['responsive', 'direction']
  },
  plugins: [
      require('tailwindcss-dir')()
  ]
}
