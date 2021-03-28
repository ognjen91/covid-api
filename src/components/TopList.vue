<template>
  <div class="top-list bottom pt-5 ">

    <!-- SELECT FILTERING -->
    <div class="options f-full flex justify-center mb-4">
        <!-- OPTION TOTAL CONFIRMED -->
        <div
         class="option text-white text-center font-paragraph cursor-pointer border mx-2 px-2 py-1"
         @click="selectedFilter = 'TotalConfirmed'"
         :class="{'active bg-yellow border-yellow default-shadow' : selectedFilter == 'TotalConfirmed'}"
         >
         {{$t('components.topList.optionTotalConfirmed')}}
       </div>
        <!-- OPTION TOTAL DEATHS -->
        <div
         class="option text-white text-center font-paragraph cursor-pointer border mx-2 px-2 py-1"
         @click="selectedFilter = 'TotalDeaths'"
         :class="{'active bg-red border-red default-shadow' : selectedFilter == 'TotalDeaths'}"
         >
         {{$t('components.topList.optionTotalDeaths')}}
       </div>
    </div>

    <!-- SELECT NUMBER TO SHOW -->
    <div class="number f-full flex justify-center items-center py-3 mb-4">
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
      <ul style="list-style:none" class='the-list w-auto flex flex-col' :class="{' lg:flex-wrap  lg:flex-row' : topCountries.length>5}">
        <li
        v-for="(countryData,i) in topCountries"
        :key="'top-'+i"
        class='flex justify-between font-heading mb-2 w-full'
        :class="{'lg:w-full' : topCountries.length <= 5, 'lg:w-1/2 px-3' : topCountries.length > 5, 'x' : i%2==1}"
        >

          <span class="title text-white mr-3 absolute">{{i+1}}.</span>
          <router-link
          class='ml-6 flex text-white whitespace-nowrap'
          :to="{ name: 'country', params: { locale : currentLocale, slug: countryData.Slug }}"
          >
          <img :src="'https://www.countryflags.io/' + countryData.CountryCode.toLowerCase() + '/flat/32.png'" class="mr-3">
          <span class='ml-1 mr-4'>{{countryData.Country}}</span>
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
import reusableData from '../functions/reusableData'


export default{
  setup(){
    const store = useStore()// store instead of `$store`
    const {currentLocale} = reusableData()

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
      getFormatedNumber,
      currentLocale
    }
  }
}
</script>
