<template>
  <div class="">
    <h4 class="w-full text-center">{{$t('components.recentlyViewed.title')}}</h4>
    <div class="flex justify-center">
      <RecentlyViewedCountry
      :current-country-slug="$route.params.slug"
      v-for="(country,i) in recentlyViewedCountries"
      :key="'rview-'+i"
      :country="country"
      class='mx-3'
      />
    </div>
  </div>
</template>

<script>
  import { defineProps, reactive, ref, computed, onMounted } from 'vue'
  import {useStore} from 'vuex'
  import RecentlyViewedCountry from './RecentlyViewedCountry.vue'

  export default {

    components : {
      RecentlyViewedCountry
    },



    setup(){
      const store = useStore()// store instead of `$store`
      const arrayOfSlugsOfRecentlyViewedCountries = computed(()=>{
        let recentlyViewedArraySlugs = localStorage.getItem('recentlyViewed')? JSON.parse(localStorage.getItem('recentlyViewed')) : []
        return recentlyViewedArraySlugs
      })

      const recentlyViewedCountries = computed(()=>{
        let countries = [];
        for(let i=0; i<=arrayOfSlugsOfRecentlyViewedCountries.value.length; i++){
          let theCountry = store.getters['countries/singleCountryData'](arrayOfSlugsOfRecentlyViewedCountries.value[i])
          countries.push(theCountry)
        }

        return countries
      })


      return {
        arrayOfSlugsOfRecentlyViewedCountries,
        recentlyViewedCountries
      }
    }
  }
</script>
