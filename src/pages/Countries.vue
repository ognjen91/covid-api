<template>
  <div class='px-5 countries relative'>


    <table class="table-auto border w-full">
      <thead>
        <tr class='text-left'>
          <th class='' v-for="filter in filters" :key="'filter-'+filter">
            <span class='cursor-pointer'>
                <span @click="setOrReverseFilter(filter)" class='mr-2' :class="{'font-bold text-yellow' : filter == selectedFilter, 'text-white' : filter !== selectedFilter}">
                  {{filter}}
                </span>
                <IconDropDownArrow
                @click="setOrReverseFilter(filter)"
                class="h-6 w-6 inline"
                :class="{desc : orderings[filter] !== 'desc'}"
                />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="country in countries" :key='country.ID' class='py-1 border-bottom'>
          <td  v-for="filter in filters" :key="country.slug + 'filter-'+filter" class='text-white'>{{filter == 'Country'? country[filter] : getFormatedNumber(country[filter])}}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>
<script>
  import { defineProps, reactive, ref, computed, onMounted } from 'vue'
  import {useStore} from 'vuex'
  import IconDropDownArrow from '../components/Icons/IconDropDownArrow.vue'

  export default{
    components : {
      IconDropDownArrow
    },

    setup(){
      const store = useStore()// store instead of `$store`
      const filters = reactive([
        'Country',
        'TotalConfirmed',
        'NewConfirmed',
        'TotalDeaths',
        'NewDeaths',
        'TotalRecovered',
      ])
      const selectedFilter = ref('TotalConfirmed')

      //ORDERING FOR EACH FILTER (ASC OR DESC)
      const orderings = reactive({
        Country : 'asc',
        TotalConfirmed : 'desc',
        NewConfirmed : 'desc',
        TotalDeaths : 'desc',
        NewDeaths : 'desc',
        TotalRecovered : 'desc',
      })

      //METHOD FOR SETTING NEW ACTIVE FILTER,
      //OR REVERSING ORDER, IF THE FILTER IS ALREADY SELECTED
      const setOrReverseFilter = filter => {
        if(selectedFilter.value == filter){
          orderings[selectedFilter.value] = orderings[selectedFilter.value] == 'desc'? 'asc' : 'desc'
          return
        }
        selectedFilter.value = filter
      }

      const countries = computed(() => {
        if(selectedFilter.value == 'Country') return orderings['Country'] == 'asc'? store.getters['countries/allCountries'] : store.getters['countries/allCountries'].reverse()
        //as we get descending order from db
        return orderings[selectedFilter.value] == 'desc'? store.getters['countries/topList'](selectedFilter.value, 'all') : store.getters['countries/topList'](selectedFilter.value, 'all').reverse()
      })

      const getFormatedNumber = val => {
        return new Intl.NumberFormat('en-US').format(val)
      }

      return {
        countries,
        filters,
        selectedFilter,
        orderings,
        setOrReverseFilter,
        getFormatedNumber
      }

    }
  }
</script>
