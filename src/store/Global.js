import axios from 'axios'
import toastr from 'toastr'

export default {
  namespaced: true,

  state : {
    globalData : {
      totalConfirmed : null,
      newConfirmed : null,
      newDeaths : null,
      totalDeaths : null,
      newRecovered : null,
      totalRecovered : null
    },
    updateTime : null
  },

  getters : {
    allGlobalData : state => state.globalData,
    updateTime : state => state.updateTime
  },

  mutations : {

    SET_TOTAL_DATA : (state, payload) => {
      state.globalData.TotalConfirmed = payload.TotalConfirmed
      state.globalData.NewConfirmed = payload.NewConfirmed
      state.globalData.NewDeaths = payload.NewDeaths
      state.globalData.TotalDeaths = payload.TotalDeaths
      state.globalData.NewRecovered = payload.NewRecovered
      state.globalData.TotalRecovered = payload.TotalRecovered
      state.updateTime = payload.updateTime
    },

  },

  actions: {
    setInitialData (context) {
      axios.get('https://api.covid19api.com/summary')
        .then(function ({data}) {
          context.commit('SET_TOTAL_DATA', {
            TotalConfirmed : data.Global.TotalConfirmed,
            NewConfirmed : data.Global.NewConfirmed,
            NewDeaths : data.Global.NewDeaths,
            TotalDeaths : data.Global.TotalDeaths,
            NewRecovered : data.Global.NewRecovered,
            TotalRecovered : data.Global.TotalRecovered,
            updateTime : data.Date
          })

          //set countries, but remove fake ones
          context.commit('countries/SET_COUNTRIES_DATA', data.Countries.filter(country => country.Slug !== 'kosovo'), { root: true })
        })
        .catch(function (error) {
          toastr["error"]("Error Receiving Data. Page will reload now.")

          setTimeout(()=>{
            location.reload();
          }, 2000)
        })
    }
  }

}
