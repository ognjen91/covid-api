<template>
  <div class='px-5 countries relative h-full'>

    <form action="" class='w-full py-4 flex justify-center font-paragraph'>
      <label for="query" class='mr-4'>Filter By Country Name</label>
      <input type="text" v-model.trim="query" id='query' class='border'>
    </form>

    <table class="table-auto w-full h-full" v-if="countries.length">
      <thead>
        <tr class='text-left font-heading'>
          <th class='' v-for="filter in filters" :key="'filter-'+filter">
            <span class='cursor-pointer'>
                <span @click="setOrReverseFilter(filter)" class='mr-2' :class="{'font-bold text-red' : filter == selectedFilter, 'text-darkBlue' : filter !== selectedFilter}">
                  {{filter}}
                </span>
                <IconDropDownArrow
                v-if="selectedFilter == filter"
                @click="setOrReverseFilter(filter)"
                class="h-6 w-6 inline"
                :class="{desc : orderings[filter] !== 'desc'}"
                />
            </span>
          </th>
          <th>In Feed</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="country in countries" :key='country.ID' class='pt-1 pb-3 border-b-2 border-lightBlue font-paragraph'>
          <td  v-for="filter in filters" :key="country.slug + 'filter-'+filter" class='text-darkBlue'>
            <router-link
              v-if="filter == 'Country'"
              :to="{ name: 'country', params: { slug: country.Slug }}"
             >
             <strong class='text-darkBlue'>{{country[filter]}}</strong>
            </router-link>
             <span v-else>{{getFormatedNumber(country[filter])}}</span>
          </td>
          <td>
            <div @click='toggleToFeed(country.Slug)'>
              <span v-if="checkIsInFeed(country.Slug)">+</span>
              <span v-else>-</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <h2 class="w-full text-center text-red" v-else >Sorry, No Matching Countries For The Query</h2>

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
      const query = ref('')
      const show = ref(false)

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
        if(!query){
          if(selectedFilter.value == 'Country') return orderings['Country'] == 'asc'? store.getters['countries/allCountries'] : store.getters['countries/allCountries'].reverse()
          return orderings[selectedFilter.value] == 'desc'? store.getters['countries/topList'](selectedFilter.value, 'all') : store.getters['countries/topList'](selectedFilter.value, 'all').reverse()
        }
        // return countries
        let lowercaseQuery = query.value.toLowerCase()
        let countries = orderings[selectedFilter.value] == 'desc'? store.getters['countries/topList'](selectedFilter.value, 'all') : store.getters['countries/topList'](selectedFilter.value, 'all').reverse()
        let usersFeed = localStorage.getItem('feed')? JSON.parse(localStorage.getItem('feed')) : []

        countries = countries.filter(country => usersFeed.includes(country.Slug))
        return countries.filter(countryData => countryData.Country.toLowerCase(lowercaseQuery).startsWith() || countryData.Slug.toLowerCase().startsWith(lowercaseQuery))

        //as we get descending order from db
      })

      const getFormatedNumber = val => {
        return new Intl.NumberFormat('en-US').format(val)
      }

      const toggleToFeed = slug => {
        let feed = localStorage.getItem('feed')? JSON.parse(localStorage.getItem('feed')) : []
        let indexInFeed = feed.indexOf(slug)
        indexInFeed == -1? feed.push(slug) : feed.splice(indexInFeed, 1);

        localStorage.setItem('feed', JSON.stringify(feed))
      }

      const myFeed = computed(()=>{

      })

      const checkIsInFeed = slug => {
        let feed = localStorage.getItem('feed')? JSON.parse(localStorage.getItem('feed')) : []
        let indexInFeed = feed.indexOf(slug)
        return indexInFeed !== -1
      }

      return {
        query,
        countries,
        filters,
        selectedFilter,
        orderings,
        setOrReverseFilter,
        getFormatedNumber,
        toggleToFeed,
        checkIsInFeed
      }

    }
  }
</script>
