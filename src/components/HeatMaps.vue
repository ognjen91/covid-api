<template>
  <div class="heat-maps">
      <div class="options uppercase flex mt-4 mb-6 justify-center font-heading">
        <div
        class="border border-darkBlue rounded-lg  mx-3  py-1 lg:py-2 px-3  lg:px-4 text-center cursor-pointer font-paragraph"
        :class='{
          "text-darkBlue" : activeFilter !== "Confirmed",
          "text-white bg-darkBlue default-shadow" : activeFilter == "Confirmed"
          }'
          @click="activeFilter = 'Confirmed'"
          >
          {{$t('components.heatMaps.confirmedTitle')}}
         </div>
        <div
        class="border border-red rounded-lg mx-3 py-1 lg:py-2 px-3  lg:px-4  text-center cursor-pointer font-paragraph"
        :class='{
          "text-darkBlue" : activeFilter !== "Deaths",
          "text-white bg-red default-shadow" : activeFilter == "Deaths"}'
          @click="activeFilter = 'Deaths'"
          >
          {{$t('components.heatMaps.deathsTitle')}}
         </div>
      </div>
      <apexchart type="heatmap" height="350" :options="chartOptions" :series="casesByMonth" v-if="show"></apexchart>
  </div>
</template>

<script>
  import { defineProps, reactive, ref, computed, onMounted, watch } from 'vue'
  import { useStore } from 'vuex'
  import VueApexCharts from "vue3-apexcharts";
  import moment from 'moment'


  export default{
    components : {
      apexchart: VueApexCharts,
    },

    props : {
      countrySlug : {
        Type : String,
        required : true
      },
      getDataFromServer : {
        Type : Boolean,
        required : false,
        default : true
      }
    },

    setup(props, context){
      const store = useStore()// store instead of `$store`
      const countryData = computed(()=> store.getters['countries/singleCountryData'](props.countrySlug))
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

      const activeFilter = ref('Confirmed')
      const show = ref(false)

      const casesByMonth = computed(()=>{
        if(!countryData.value) return null

        let monthlyData = []
        let counterHelper = 0;
        for(let i in countryData.value.dates){
          let dataForTheDate = countryData.value.dates[i]
          let dateMonth = moment(dataForTheDate.Date).format('MMMM YYYY')
          let indexOfDateMonth = monthlyData.findIndex(month => month.name == dateMonth)
          let confirmedOnDate = dataForTheDate[activeFilter.value]  - counterHelper

          if(indexOfDateMonth == -1){
            monthlyData.push({ name : dateMonth, data : [confirmedOnDate]})
          } else {
            monthlyData[indexOfDateMonth].data.push(confirmedOnDate)
          }
          counterHelper = dataForTheDate[activeFilter.value]
        }

        //fix for the first month
        if(countryData.value.dates){
          let numberOfDaysInFirstMonth = moment(countryData.value.dates[0].Date).daysInMonth()
          let daysToAdd = numberOfDaysInFirstMonth-monthlyData[0].data.length
          for(let i =0; i<daysToAdd; i++){
            monthlyData[0].data.unshift(0)
          }
        }

        return monthlyData
      })


      const chartOptions = computed(() => {return {
        chart: {
          height: 350,
          type: 'heatmap',
        },
        dataLabels: {
          enabled: false
        },
        colors: [activeFilter.value == 'Confirmed'? "#007CC7" : '#e84545'],
        title: {
          text: ''
        },
      }})


         if(props.getDataFromServer){
           store.dispatch('countries/setCountryFullData', props.countrySlug)
         }
         setTimeout(()=>{
           show.value = true
         }, 500)

      return {
        countryData,
        chartOptions,
        casesByMonth,
        activeFilter,
        show
      }
    }

  }
</script>
