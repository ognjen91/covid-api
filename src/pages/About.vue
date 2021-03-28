<template>
  <div class='w-full h-full flex flex-col justify-center items-center pt-5 px-5'>
    <h1 class='heading-size my-5 text-center'>{{$t('pages.about.madeText')}} Vue.js 3 <br> {{$t('pages.about.and')}}
      <a href="http://api.covid19api.com/" class='text-red'>Covid 19 api</a>
    </h1>

    <h2 class='text-center'>{{$t('pages.about.specialThanks')}}</h2>

    <div class="py-3 flex justify-center">
      <IconVirus
      v-for="i in 5"
      :key="'icon-virus-'+i"
      class='w-6 h-6 mx-2'
      />
    </div>

    <p class="text-center subheading-size">{{$t('pages.about.pluginsUsed')}}:</p>
    <a href="https://next.router.vuejs.org/" class='underline'>Vue Router</a>
    <a href="https://github.com/intlify/vue-i18n-next" class='underline'>Vue i18n</a>
    <a href="https://github.com/apexcharts/vue3-apexcharts" class='underline'>Vue 3 Apex Charts</a>
    <a href="https://vuex.vuejs.org/" class='underline'>Vuex</a>
    <a href="https://github.com/CodeSeven/toastr" class='underline'>Toastr</a>

    <div class="py-5 flex justify-center items-center">
      <a href="http://osam.marketing" class="text-red">Osam Marketing &copy; 2021</a>
    </div>
  </div>
</template>
<script>
  import IconVirus from '../components/Icons/IconVirus.vue'
  export default{
    components : {
      IconVirus
    }
  }
</script>
