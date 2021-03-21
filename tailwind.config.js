module.exports = {
   purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
     // dark-blue: '#12232E',
     // lighter-blue: '#007CC7',
     // lightest-blue: '#4DA8DA',
     // dark-blue-shadow: '#203647',
     // light-blue-shadow: '#EEFBFB',
     darkBlue: '#12232E',
     lighterBlue: '#007CC7',
     lightestBlue: '#4DA8DA',
     darkBlueShadow: '#203647',
     lightBlueShadow: '#EEFBFB',
     yellow: '#FCD200',
     red : '#e84545',
     white: '#fff',
   },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
