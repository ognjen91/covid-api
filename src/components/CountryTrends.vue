<template>
  <div class='px-5' v-if="series">
    <apexchart
      v-if="chartOptions"
      width="100%"
      type="area"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
<script>
  import VueApexCharts from "vue3-apexcharts";


  export default{
    components : {
      apexchart: VueApexCharts,
    },

    props : {
      dates : {
        Type : Array,
        required : false,
        default : []
      }
    },

    computed : {

      // CHART OPTIONS
      chartOptions(){
        if(!this.dates) return {}

        return {
          chart: {
            id: "vuechart-example",
          },
          dataLabels: {
             enabled: false
           },
           colors: ['#007CC7', '#e84545', '#4DA8DA'],
           fill: {
             colors: ['#007CC7', '#e84545', '#4DA8DA']
           },
           stroke: {
             curve: 'smooth',
             colors: ['#007CC7', '#e84545', '#4DA8DA']
           },
           xaxis: {
            type: 'datetime',
            categories: this.dates.map(dateData => dateData.Date)
          },
          animations: {
                  enabled: true,
                  easing: 'easeinout',
                  speed: 800,
                  animateGradually: {
                      enabled: true,
                      delay: 150
                  },
                  dynamicAnimation: {
                      enabled: true,
                      speed: 350
                  }
              }        }
      },

      // DATA FOR DISPLAY
      series(){
        if(!this.dates) return {}
        return [
          {
            name: "Confirmed Cases",
            data: this.dates.map(dateData => dateData.Confirmed)
          },
          {
            name: "Deaths",
            data: this.dates.map(dateData => dateData.Deaths)
          },
          {
            name: "Recovered",
            data: this.dates.map(dateData => dateData.Recovered)
          },
        ]
      }
    }
  }
</script>
