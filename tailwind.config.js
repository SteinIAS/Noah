module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '1rem'
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
