<template>
<div class="deaths-chart-holder">
  <!-- THE CHART -->
  <apexchart type="pie" width="100%" :options="chartOptions" :series="[confirmed-deaths, deaths]"></apexchart>
  <h3 class='w-full text-center text-red'>{{$t('components.countryDeathChart.deathPercentageText')}} : {{deathPercentage}} %</h3>
</div>


</template>

<script>
import VueApexCharts from "vue3-apexcharts";


export default{
  components : {
    apexchart: VueApexCharts,
  },

  props : {
    confirmed : {
      Type : Number,
      required : true
    },
    deaths : {
      Type : Number,
      required : true
    },
  },

  data(){
    return {

    }
},

computed : {
  // CHART OPTIONS
  chartOptions(){ return {
      labels: [this.$t('components.countryDeathChart.activeAndRecovered'), this.$t('components.countryDeathChart.deaths')],
      colors : ['#007CC7', '#e84545'],
      fill: {
        colors: ['#007CC7', '#e84545']
      },
      legend: {
        position: 'bottom'
      }
    }
  },
  // PERCENTAGE CALCULATION
  deathPercentage(){
    return new Intl.NumberFormat('en-US').format((this.deaths/this.confirmed)*100)
  }
}

}
</script>
