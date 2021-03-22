import axios from 'axios'


export default {
  namespaced: true,

  state : {
    countries : []
  },

  getters : {
    allCountries : state => state.countries,
    singleCountryData : (state) => (slug) => state.countries.find(country => country.Slug == slug),
    topList : (state) => (filter, number) => {
      let sorted = [...state.countries].sort((a,b) => (a[filter] < b[filter]) ? 1 : ((b[filter] < a[filter]) ? -1 : 0))
      return number == 'all'? sorted : sorted.slice(0, number)
    }
  },

  mutations : {

    SET_COUNTRIES_DATA : (state, payload) => {
      state.countries = payload
    },
    SET_COUNTRY_FULL_DATA : (state, payload) => {
      let index = state.countries.findIndex(country => country.Slug == payload.slug)
      state.countries[index] = {...state.countries[index], dates : payload.dates}
    }

  },

  actions: {
    setCountryFullData (context, slug) {
      axios.get('https://api.covid19api.com/total/country/'+slug)
        .then(function ({data}) {
          let payload = {
            dates : [...data],
            slug
          }

          context.commit('SET_COUNTRY_FULL_DATA', payload)
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
  }



}
