<template>

  <!-- BACKGROUND IMAGE -->
  <div class="country-single h-full relative bg-white" v-if="countryData">


  <!-- TITLE -->
  <h1 class='home-title w-full text-center text-darkBlue'><strong>Covid 19 Data for {{countryData.Country}} <br> on {{date}} </strong></h1>

  <!-- CASES -->
  <div class='border flex flex-wrap w-full h-full flex justify-center items-center lg:flex-row py-5 px-3'>
    <case-window
    class='w-1/2 lg:w-1/4 border my-5'
    v-for="(value, caseType) in cases"
    :class="{danger : dangerTypes.includes(caseType)}"
    :key="caseType"
    :value="value">
    {{caseType}}
    </case-window>
  </div>

  <h3 class="text-center" v-if="firstConfirmedCaseDate">
    First Confrimed Case
    {{firstConfirmedCaseDate}}
  </h3>

  <div class="options f-full flex justify-center">
    <div
     @click="activeChart = 'CountryTrends'"
     class="option  cursor-pointer border mx-2 px-2 py-1 border-darkBlue"
     :class="{'active text-white bg-darkBlue' : activeChart == 'CountryTrends', 'text-darkBlue' : activeChart !== 'CountryTrends'}"
     >
      Trends
    </div>
    <div
     @click="activeChart = 'CountryDeathChart'"
     class="option cursor-pointer border mx-2 px-2 py-1 border-darkBlue"
     :class="{'active text-white bg-darkBlue' : activeChart == 'CountryDeathChart', 'text-darkBlue' : activeChart !== 'CountryDeathChart'}"
     >
      Deaths
    </div>
  </div>

  <component
   :is="activeChart"
   :dates="countryData.dates"
   :confirmed="countryData.TotalConfirmed"
   :deaths="countryData.TotalDeaths"
   >
   </component>
  <!-- <div>
    <CountryTrends :dates="countryData.dates" />
  </div> -->

  <!-- <div>
    <CountryDeathChart :confirmed="countryData.TotalConfirmed" :deaths="countryData.TotalDeaths" />
  </div> -->



  </div>
</template>

<script>
  import { defineProps, reactive, ref, computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import moment from 'moment'
  import CaseWindow from '../components/CaseWindow.vue'
  import CountryTrends from '../components/CountryTrends.vue'
  import CountryDeathChart from '../components/CountryDeathChart.vue'


  export default{
    components : {
      CaseWindow,
      CountryTrends,
      CountryDeathChart
    },

    setup(){
      const store = useStore()// store instead of `$store`
      const route = useRoute()// store instead of `$store`

      onMounted(()=>{
        store.dispatch('countries/setCountryFullData', route.params.slug)
      })


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
      const firstConfirmedCaseDate = computed(() => {
        if(!countryData.dates) return null
        return moment(countryData.dates[0].Date).format('MMMM DD YYYY')
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
  }
</script>
