<template>
  <div class="my-6">
    <h4 class="w-full text-center subheading-size text-darkBlue">{{showRandom || !arrayOfSlugsOfRecentlyViewedCountries.length || arrayOfSlugsOfRecentlyViewedCountries.length == 1? $t('components.recentlyViewed.suggestionsTitle') : $t('components.recentlyViewed.viewedTitle') }}</h4>
    <div class="flex justify-center">
      <RecentlyViewedCountry
      :current-country-slug="$route.params.slug"
      v-for="(country,i) in countries"
      :key="'rview-'+i"
      :country="country"
      class='mx-3'
      />
    </div>
  </div>
</template>

<script>
  import { defineProps, ref, computed } from 'vue'
  import {useStore} from 'vuex'
  import RecentlyViewedCountry from './RecentlyViewedCountry.vue'


  export default {

    props : {
      showRandom : {
        Type : Boolean,
        requried : false,
        default : false
      }
    },

    components : {
      RecentlyViewedCountry
    },



    setup(props, context){
      const store = useStore()// store instead of `$store`
      const arrayOfSlugsOfRecentlyViewedCountries = computed(()=>{
        let recentlyViewedArraySlugs = localStorage.getItem('recentlyViewed')? JSON.parse(localStorage.getItem('recentlyViewed')) : []
        return recentlyViewedArraySlugs
      })

      // COUNTRIES
      const countries = computed(()=>{
        let countries = [];
          let slugsArray = props.showRandom || !arrayOfSlugsOfRecentlyViewedCountries.value.length || arrayOfSlugsOfRecentlyViewedCountries.value.length ==1 ?  store.getters['countries/randomSlugs'](3) : arrayOfSlugsOfRecentlyViewedCountries.value
          for(let i=0; i<=slugsArray.length; i++){
            if(i == 3) break
            let theCountry = store.getters['countries/singleCountryData'](slugsArray[i])
            countries.push(theCountry)
          }

        return countries
      })


      return {
        arrayOfSlugsOfRecentlyViewedCountries,
        countries
      }
    }
  }
</script>
