<template>
<div class='relative h-full'>


  <section class='relative h-full'>
    <!-- BACKGROUND IMAGE -->
    <div class="bg-holder w-full h-full" style="background-image: url('/bg-main.jpg')">
      <div class="bg-layer w-full h-full"></div>
    </div>
    <!-- TITLE -->
    <h1 class='home-title w-full text-center text-white'><strong>{{$t('pages.home.mainTitle')}} {{date}} </strong></h1>

    <!-- CASES -->
    <div class='border flex flex-wrap w-full h-full flex justify-center items-center lg:flex-row py-5 px-3'>
      <case-window
      class='w-1/2 lg:w-1/4 border my-5'
      v-for="(value, caseType) in cases"
      :class="{danger : dangerTypes.includes(caseType)}"
      :key="caseType"
      :value="value">
      <!-- {{caseType}} -->
      {{$t("pages.home.caseWindows."+caseType)}}
      </case-window>
    </div>

    <!-- UPDATE TIME -->
    <p class='w-full text-center text-white'>{{$t('pages.home.lastUpdateText')}} {{updateTime}}</p>
  </section>


    <!-- TOP LISTS -->
    <section class='bg-darkBlue'>
      <!-- <TopList /> -->
    </section>

    <!-- DEATH CHART -->
    <section class="bg-white flex flex-col lg:flex-row">
      <h3 class="text-red text-center">{{$t('pages.home.totalDeathsTitle')}}</h3>

      <CountryDeathChart
      :confirmed="cases.TotalConfirmed"
      :deaths="cases.TotalDeaths"
      />
    </section>

    <div class="section">
      <RecentlyViewedCountries />
    </div>
</div>

</template>

<script>
import { defineProps, reactive, ref, computed, onMounted } from 'vue'
import {useStore} from 'vuex'
import moment from 'moment'
import CaseWindow from '../components/CaseWindow.vue'
import TopList from '../components/TopList.vue'
import CountryDeathChart from '../components/CountryDeathChart.vue'
import RecentlyViewedCountries from '../components/RecentlyViewedCountries.vue'

export default {
  components : {
    CaseWindow,
    TopList,
    CountryDeathChart,
    RecentlyViewedCountries
  },

  setup(){
    // use store in setup() method
    const store = useStore()// store instead of `$store`


    const globalData =  computed(() => {
      return store.getters['globalData/allGlobalData']
    })

    const dangerTypes = reactive(['TotalConfirmed', 'NewConfirmed', 'TotalDeaths', 'NewDeaths'])

    const cases = computed(() => {
      let data = {}
      let types = [
        'TotalConfirmed',
        'NewConfirmed',
        'TotalDeaths',
        'NewDeaths',
        'TotalRecovered',
        'NewRecovered',
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



    const background  = computed(() => {
      return require('../assets/bg-image.jpg')
    })



    return {
      dangerTypes,
      globalData,
      updateTime,
      date,
      background,
      cases
    }
  }
}

</script>

<style>

</style>
