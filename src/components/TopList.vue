<template>
  <div class="top-list bottom pt-5 ">
    <h2 class='home-subtitle w-full text-center text-white my-4'>{{$t('components.topList.title')}}</h2>

    <!-- SELECT FILTERING -->
    <div class="options f-full flex justify-center">
        <div
         class="option text-white cursor-pointer border mx-2 px-2 py-1"
         @click="selectedFilter = 'TotalConfirmed'"
         :class="{'active bg-yellow border-yellow' : selectedFilter == 'TotalConfirmed'}"
         >
         {{$t('components.topList.optionTotalConfirmed')}}
       </div>
        <div
         class="option text-white cursor-pointer border mx-2 px-2 py-1"
         @click="selectedFilter = 'TotalDeaths'"
         :class="{'active bg-red border-red' : selectedFilter == 'TotalDeaths'}"
         >
         {{$t('components.topList.optionTotalDeaths')}}
       </div>
    </div>

    <!-- SELECT NUMBER TO SHOW -->
    <div class="number f-full flex justify-center items-center py-3">
      <p class='text-white'>{{$t('components.topList.show')}}:</p>
      <div
      class="number-option cursor-pointer mx-3 px-3 py-1 bg-darkBlue"
      v-for="numberOption in numberOptions"
      :key="'show-'+numberOption"
      :class="{'active text-yellow border-yellow border-2 ' : numberOption == selectedNumber, 'text-white' : numberOption !== selectedNumber}"
      @click="selectedNumber = numberOption"
      >
      {{numberOption}}
      </div>
    </div>


    <!-- THE LIST -->
    <div class="flex w-full justify-center px-5">
      <ul style="list-style:none" class='border the-list w-auto' :class="{'flex flex-wrap' : topCountries.length>5}">
        <li
        v-for="(countryData,i) in topCountries"
        :key="'top-'+i"
        class='flex justify-between font-heading mb-2'
        :class="{'w-full' : topCountries.length <= 5, 'w-1/2 px-3' : topCountries.length > 5, 'x' : i%2==1}"
        >

          <span class="title text-white mr-1 absolute">{{i+1}}.</span>
          <router-link
          class='ml-5'
          :to="{ name: 'country', params: { slug: countryData.Slug }}"
          >
          <img :src="'https://www.countryflags.io/' + countryData.CountryCode.toLowerCase() + '/flat/32.png'" class="mr-3">
          </router-link>
          <span class="value">{{getFormatedNumber(countryData[selectedFilter])}}</span>
        </li>
      </ul>
    </div>

  </div>

</template>

<script>
import { defineProps, reactive, ref, computed } from 'vue'
import {useStore} from 'vuex'

export default{
  setup(){
    const store = useStore()// store instead of `$store`

    //FILTERS
    const filters = reactive([
      'TotalConfirmed',
      'TotalDeaths',
    ])
    const selectedFilter = ref('TotalConfirmed')
    const numberOptions = [3, 5, 10]
    const selectedNumber = ref(3)

    const topCountries = computed(() => {
      return store.getters['countries/topList'](selectedFilter.value, selectedNumber.value)
    })

    const getFormatedNumber = val => {
      return new Intl.NumberFormat('en-US').format(val)
    }

    return {
      topCountries,
      selectedFilter,
      numberOptions,
      selectedNumber,
      getFormatedNumber
    }
  }
}
</script>
