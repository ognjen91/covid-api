<template>

  <!-- BACKGROUND IMAGE -->
  <div class="country-single h-full relative bg-white" v-if="countryData">

  <!-- TITLE -->
  <section class='section-small-x-padding bg-darkBlue'>
    <h1 class='home-title w-full text-center text-white'><strong>{{$t('pages.country.title')}} {{countryData.Country}} <br> {{$t('pages.country.on')}} {{date}} </strong></h1>
    <h3 class="text-center text-white" v-if="firstConfirmedCaseDate">
      {{$t('pages.country.firstConfirmed')}}:
      {{firstConfirmedCaseDate}}
    </h3>

  <!-- CASES -->
  <div class=' flex flex-wrap w-full h-full flex justify-center items-center lg:flex-row py-5 px-3'>
    <case-window
    class='w-1/2 lg:w-1/4 p-2 my-5'
    v-for="(value, caseType) in cases"
    :class="{danger : dangerTypes.includes(caseType)}"
    :key="caseType"
    :value="value">
    {{$t("pages.home.caseWindows."+caseType)}}
    </case-window>
  </div>
  </section>

  <!-- CHARTS -->
  <section class="charts section-medium-y-padding section-small-x-padding">
    <h2 class="mb-4 w-full text-center subheading-size">{{$t('pages.country.trendsTitle')}}</h2>


    <div class="options mb-5 w-full  flex justify-center">
      <div
       @click="activeChart = 'CountryTrends'"
       class="option rounded-lg  cursor-pointer  mx-2 px-2 lg:px-4 py-1 lg:py-2 border border-darkBlue"
       :class="{'active text-white bg-darkBlue default-shadow' : activeChart == 'CountryTrends', 'text-darkBlue' : activeChart !== 'CountryTrends'}"
       >
        {{$t("pages.country.trends")}}
      </div>
      <div
       @click="activeChart = 'CountryDeathChart'"
       class="option rounded-lg cursor-pointer  mx-2 px-2 lg:px-4 py-1 lg:py-2 border border-red"
       :class="{'active text-white bg-red default-shadow' : activeChart == 'CountryDeathChart', 'text-red' : activeChart !== 'CountryDeathChart'}"
       >
        {{$t("pages.country.deaths")}}
      </div>



    </div>
    <component
    :is="activeChart"
    :dates="countryData.dates"
    :confirmed="countryData.TotalConfirmed"
    :deaths="countryData.TotalDeaths"
    >
    </component>
    </section>


    <!-- HEAT MAPS -->
    <section class="section-small-y-padding section-small-x-padding">
      <HeatMaps :country-slug="$route.params.slug" :get-data-from-server="false" />
    </section>

   <RecentlyViewedCountries :show-current="false" />



  </div>
</template>

<script>
  import { defineProps, reactive, ref, computed, onUpdated } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import moment from 'moment'
  import CaseWindow from '../components/CaseWindow.vue'
  import CountryTrends from '../components/CountryTrends.vue'
  import HeatMaps from '../components/HeatMaps.vue'
  import CountryDeathChart from '../components/CountryDeathChart.vue'
  import RecentlyViewedCountries from '../components/RecentlyViewedCountries.vue'

  export default{
    components : {
      CaseWindow,
      CountryTrends,
      CountryDeathChart,
      RecentlyViewedCountries,
      HeatMaps
    },

    setup(){
      const store = useStore()// store instead of `$store`
      const route = useRoute()// store instead of `$store`

      // onUpdated(()=>{
      // })
      store.dispatch('countries/setCountryFullData', route.params.slug)


      const countryData = computed(()=> store.getters['countries/singleCountryData'](route.params.slug))
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

        if(countryData){
          for(let i =0; i<types.length; i++){
            data[types[i]] = countryData.value[types[i]]
          }
        }

        return data
      })

      const activeChart = ref('CountryTrends')
      const dangerTypes = reactive(['TotalConfirmed', 'NewConfirmed', 'TotalDeaths', 'NewDeaths'])

      const date = computed(() => {
        if(!countryData) return null
        return moment(countryData.Date).format('MMMM DD YYYY')
      })

      // DATE OF THE FIRST CONFIRMED CASE
      const firstConfirmedCaseDate = computed(() => {
        if(!countryData.value.dates) return null
        if(!countryData.value.dates.length) return null
        return moment(countryData.value.dates[0].Date).format('MMMM DD YYYY')
      })


      return {
        countryData,
        dangerTypes,
        cases,
        date,
        firstConfirmedCaseDate,
        activeChart
      }
    },

    beforeRouteEnter (to, from, next) {
      let recentlyViewed = localStorage.getItem('recentlyViewed')? JSON.parse(localStorage.getItem('recentlyViewed')) : []
      let index = recentlyViewed.indexOf(to.params.slug)
      if(index !== -1) recentlyViewed.splice(index, 1);
      recentlyViewed.unshift(to.params.slug)

      localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed))

      next()
    },


    beforeRouteUpdate (to, from, next) {
      this.activeChart = 'CountryTrends'
      let recentlyViewed = localStorage.getItem('recentlyViewed')? JSON.parse(localStorage.getItem('recentlyViewed')) : []
      let index = recentlyViewed.indexOf(to.params.slug)
      if(index !== -1) recentlyViewed.splice(index, 1);
      recentlyViewed.unshift(to.params.slug)



      this.$store.dispatch('countries/setCountryFullData', to.params.slug)
      localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed))
      next()
    },
  }
</script>
