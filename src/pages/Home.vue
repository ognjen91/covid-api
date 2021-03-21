<template>

<h1 class='w-full my-4 text-center'>Covid 19 Data for {{date}}</h1>

<div class='border flex flex-wrap w-full h-full flex justify-center items-center lg:flex-row py-5'>
  <case-window
  class='w-1/2 lg:w-1/4 border my-5'
  v-for="(value, caseType) in cases"
  :class="{danger : dangerTypes.includes(caseType)}"
  :key="caseType"
  :value="value">
  {{caseType}}
  </case-window>

</div>
  <p class='w-full text-center text-lighterBlue'>Last Updated {{updateTime}}</p>
</template>

<script>
import { defineProps, reactive, ref, computed, onMounted } from 'vue'
import {useStore} from 'vuex'
import moment from 'moment'
import CaseWindow from '../components/CaseWindow.vue'

export default {
  components : {
    CaseWindow
  },

  setup(){
    // use store in setup() method
    const store = useStore()// store instead of `$store`

    onMounted(() => {
    })

    const globalData =  computed(() => {
      return store.getters['globalData/allGlobalData']
    })

    const dangerTypes = reactive(['totalConfirmed', 'newConfirmed', 'totalDeaths', 'newDeaths'])

    const cases = computed(() => {
      let data = {}
      let types = [
        'totalConfirmed',
        'newConfirmed',
        'totalDeaths',
        'newDeaths',
        'totalRecovered',
        'newRecovered',
      ]

      for(let i =0; i<types.length; i++){
        data[types[i]] = globalData.value[types[i]]
      }

      return data
    })


    const updateTime = computed(() => {
      let time = store.getters['globalData/updateTime']
      if(!time) return null
      return moment(time).format('MMMM DD YYYY, h:mm:ss a')
    })

    const date = computed(() => {
      return moment().format('MMMM DD YYYY')
    })

    return {
      dangerTypes,
      globalData,
      updateTime,
      date,
      cases
    }
  }
}

</script>

<style>

</style>
