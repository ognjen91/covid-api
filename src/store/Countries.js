import axios from 'axios'


export default {
  namespaced: true,

  state : {
    countries : []
  },

  getters : {
    countries : state => state.countries
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
