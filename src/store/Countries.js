import axios from 'axios'
import toastr from 'toastr'


export default {
  namespaced: true,

  state : {
    countries : []
  },

  getters : {
    allCountries : state => state.countries,
    singleCountryData : (state) => (slug) => state.countries.find(country => country.Slug == slug),
    randomSlugs : (state) => (number) => (state.countries.sort(() => Math.random() - 0.5).slice(0, number)).map(country => country.Slug),
    topList : (state) => (filter, number) => {
      let sorted = [...state.countries].sort((a,b) => (a[filter] < b[filter]) ? 1 : ((b[filter] < a[filter]) ? -1 : 0))
      return number == 'all'? sorted : sorted.slice(0, number)
    },
    singleCountryDataValue : (state) => (slug, filter) => {
      let country = state.countries.find(country => country.Slug == slug)
      if(typeof country == 'undefined') return null
      return country[filter]
    },
    getCountryRank : (state) => (filter, slug) => {
      let sorted = [...state.countries].sort((a,b) => (a[filter] < b[filter]) ? 1 : ((b[filter] < a[filter]) ? -1 : 0))
      return sorted.findIndex(country => country.Slug == slug)
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
    async setCountryFullData (context, slug) {
      axios.get('https://api.covid19api.com/total/country/' + slug)
        .then(function ({data}) {
          let payload = {
            dates : [...data],
            slug
          }

          context.commit('SET_COUNTRY_FULL_DATA', payload)
        })
        .catch(function (error) {
          toastr["error"]("Error Receiving Full Data. Page will reload now.")

          setTimeout(()=>{
            location.reload();
          }, 2000)
        })
    }
  }



}
