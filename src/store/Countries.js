import axios from 'axios'


export default {
  namespaced: true,

  state : {
    countries : []
  },

  getters : {
    allCountries : state => state.countries,
    topList : (state) => (filter, number) => {
      let sorted = [...state.countries].sort((a,b) => (a[filter] < b[filter]) ? 1 : ((b[filter] < a[filter]) ? -1 : 0))
      return number == 'all'? sorted : sorted.slice(0, number)
    }
  },

  mutations : {

    SET_COUNTRIES_DATA : (state, payload) => {
      state.countries = payload
    },

  },

  actions: {
    // setCountries (context) {
    //   axios.get('https://api.covid19api.com/countries')
    //     .then(function ({data}) {
    //       console.log(data);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     })
    //     .then(function () {
    //       // always executed
    //     });
    // }
  }



}
