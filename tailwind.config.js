module.exports = {
   purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
     darkBlue: '#12232E',
     lighterBlue: '#007CC7',
     lightestBlue: '#4DA8DA',
     darkBlueShadow: '#203647',
     lightBlueShadow: '#EEFBFB',
     yellow: '#FCD200',
     red : '#e84545',
     white: '#fff',
     gray: '#c2d1cd',
   },
   screens: {
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    'xxl': '1536px',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
