module.exports = {
   purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
     darkBlue: 'color',
     lighterBlue: 'color',
     lightestBlue: 'color',
     darkBlueShadow: 'color',
     lightBlueShadow: 'color',
   },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
