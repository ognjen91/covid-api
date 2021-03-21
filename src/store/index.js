import { createStore } from 'vuex'
import globalData from './Global.js'
import countries from './Countries.js'


export const store = createStore({
  modules : {
    globalData,
    countries,
  },

  state () {
    return {
    }
  },

  getters : {

  },

  mutations: {

  }
})
