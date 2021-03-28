<template>
<div class='relative h-full'>


  <section class='relative h-full'>
    <!-- BACKGROUND IMAGE -->
    <div class="bg-holder w-full h-full" style="background-image: url('/bg-main.jpg')">
      <div class="bg-layer w-full h-full"></div>
    </div>
    <!-- TITLE -->
    <h1 class='home-title w-full text-center text-white pt-6'><strong>{{$t('pages.home.mainTitle')}} {{date}} </strong></h1>

    <!-- CASES -->
    <div class=' flex flex-wrap w-full h-full flex justify-center items-center lg:flex-row py-5 px-3'>
      <case-window
      class='w-1/2  md:w-1/3 lg:w-1/4  my-5'
      v-for="(value, caseType) in cases"
      :class="{danger : dangerTypes.includes(caseType)}"
      :key="caseType"
      :value="value">
      {{$t("pages.home.caseWindows."+caseType)}}
      </case-window>
    </div>

    <!-- UPDATE TIME -->
    <p class='w-full text-center text-white'>{{$t('pages.home.lastUpdateText')}} {{updateTime}}</p>
  </section>



    <!-- DEATH CHART -->
    <section class="deaths section-medium-y-padding bg-white flex flex-col lg:flex-row">
      <div class="lg:w-1/2">
        <h2 class="text-red text-center heading-size">{{$t('pages.home.totalDeathsTitle')}}</h2>
        <p class="font-paragraph paragraph-size text-center">
          <span class="text-red">{{formatNumber(cases.TotalDeaths, $i18n.locale)}}</span> lifes lost since the day one. <br>
          <span class="text-red mb-5">{{averageDeathsPerDay}}</span> lifes lost each day, on average. <br>

          <span class="hidden lg:flex justify-center my-5 py-5">
            <IconVirus
            v-for="i in 5"
            :key="'icon-virus-'+i"
            class='w-12 h-12 mx-2'
            />
          </span>
        </p>
      </div>


      <CountryDeathChart
      class='lg:w-1/2 lg:pl-1'
      :confirmed="cases.TotalConfirmed"
      :deaths="cases.TotalDeaths"
      />
    </section>


    <!-- TOP LISTS -->
    <section class='bg-darkBlue section-small-y-padding section-small-x-padding'>
      <h2 class='home-subtitle w-full text-center text-white my-4'>{{$t('components.topList.title')}}</h2>
      <TopList />
    </section>

    <!-- SERBIA DATA -->
    <section class="my-country-feed section-medium-y-padding section-medium-x-padding mb-5">
      <h2 class='heading-size text-red text-center lg:text-red mb-3'>Serbia vs Covid19</h2>
      <p class="paragraph-size text-center lg:text-left mb-5">
      With total of <span class="text-red">{{serbiaData.totalConfirmed}}</span> confirmed cases,
      Serbia is ranked <span class="text-red">{{serbiaRankings.totalConfirmed}}.</span> in the world. <br>
      Unfortunately, since the day one, <span class="text-red">{{serbiaData.totalDeaths}}</span> citizens lost their battle with the virus,
      and this ranks Serbia as <span class="text-red">{{serbiaRankings.totalDeaths}}.</span> globally.
      </p>

      <h3 class="text-darkBlue subheading-size text-center">
        Serbia Stats By Date
      </h3>

      <p class="paragraph-size text-center lg:text-left mb-3">
        <span class="lg:hidden">Click on a heatmap squares to get data for the date </span>
        <span class="hidden lg:inlile">Hover over heatmap squares to get data for the date </span>
      </p>

      <HeatMaps country-slug="serbia" />
    </section>

    <!-- RECENTLY VIEWED -->
    <div class="section">
      <RecentlyViewedCountries :show-random='true' />
    </div>
</div>

</template>

<script>
import { defineProps, reactive, ref, computed, onMounted } from 'vue'
import {useStore} from 'vuex'
import moment from 'moment'
import CaseWindow from '../components/CaseWindow.vue'
import TopList from '../components/TopList.vue'
import HeatMaps from '../components/HeatMaps.vue'
import CountryDeathChart from '../components/CountryDeathChart.vue'
import RecentlyViewedCountries from '../components/RecentlyViewedCountries.vue'
import IconVirus from '../components/Icons/IconVirus.vue'
import formatNumber from '../functions/formatNumber'
import reusableData from '../functions/reusableData'

export default {
  components : {
    CaseWindow,
    TopList,
    HeatMaps,
    IconVirus,
    CountryDeathChart,
    RecentlyViewedCountries
  },

  setup(){
    // use store in setup() method
    const store = useStore()// store instead of `$store`
    const {currentLocale} = reusableData()

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

    const serbiaRankings = computed(() => {
      return {
        totalDeaths : store.getters['countries/getCountryRank']('TotalDeaths', 'serbia'),
        totalConfirmed : store.getters['countries/getCountryRank']('TotalConfirmed', 'serbia')
      }
    })

    const serbiaData = computed(()=>{
      return {
        totalDeaths : store.getters['countries/singleCountryDataValue']('serbia', 'TotalDeaths', 'serbia'),
        totalConfirmed : store.getters['countries/singleCountryDataValue']('serbia', 'TotalConfirmed', 'serbia')
      }
    })

    const averageDeathsPerDay = computed(()=>{
      let firstCaseEverDate = moment([2019, 11, 31]);
      let totalDays = moment().diff(firstCaseEverDate, 'days') + 1
      return formatNumber(cases.value.TotalDeaths / totalDays)
    })


    return {
      dangerTypes,
      globalData,
      updateTime,
      date,
      background,
      cases,
      averageDeathsPerDay,
      serbiaRankings,
      serbiaData,
      formatNumber,
      currentLocale
    }
  },



}

</script>

<style>

</style>
