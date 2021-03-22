<template>
<div class="deaths-chart-holder">
  <apexchart type="pie" width="100%" :options="chartOptions" :series="[confirmed-deaths, deaths]"></apexchart>
  <h3 class='w-full text-center text-red'>Total Deaths Percentage : {{deathPercentage}} %</h3>
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

          chartOptions: {
            labels: ['Active & Recovered', 'Deaths'],
            colors : ['#007CC7', '#e84545'],
            fill: {
              colors: ['#007CC7', '#e84545']
            },
            // background : ['red', 'blue'],
            legend: {
              position: 'bottom'
            }
          },
  }
},

computed : {
  deathPercentage(){
    return new Intl.NumberFormat('en-US').format((this.deaths/this.confirmed)*100)
  }
}

}
</script>
