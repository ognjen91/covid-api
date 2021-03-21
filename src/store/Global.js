import axios from 'axios'

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
      state.globalData.totalConfirmed = payload.totalConfirmed
      state.globalData.newConfirmed = payload.newConfirmed
      state.globalData.newDeaths = payload.newDeaths
      state.globalData.totalDeaths = payload.totalDeaths
      state.globalData.newRecovered = payload.newRecovered
      state.globalData.totalRecovered = payload.totalRecovered
      state.updateTime = payload.updateTime
    },

  },

  actions: {
    setInitialData (context) {
      axios.get('https://api.covid19api.com/summary')
        .then(function ({data}) {
          // console.log(data.Global);
          console.log('from vuex action global/setInitialData', data.Global);
          context.commit('SET_TOTAL_DATA', {
            totalConfirmed : data.Global.TotalConfirmed,
            newConfirmed : data.Global.NewConfirmed,
            newDeaths : data.Global.NewDeaths,
            totalDeaths : data.Global.TotalDeaths,
            newRecovered : data.Global.NewRecovered,
            totalRecovered : data.Global.TotalRecovered,
            updateTime : data.Date
          })
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
