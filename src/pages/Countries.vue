<template>
  <div class='px-5 countries relative h-full'>

    <form action="" class='w-full py-4 flex justify-center font-paragraph'>
      <label for="query" class='mr-4'>Filter By Country Name {{feed.value}}</label>
      <input type="text" v-model.trim="query" id='query' class='border'>
    </form>

    <table class="countries-table w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5" v-if="countries.length">
			<thead class="text-white font-heading">
				<tr class="bg-darkBlue flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
					<th class="p-3 text-left"  v-for="filter in filters" :key="'filter-'+filter">
            <span class='cursor-pointer'>
                <span @click="setOrReverseFilter(filter)" class='mr-2' :class="{'font-bold text-red' : filter == selectedFilter, 'text-white' : filter !== selectedFilter}">
                  {{$t("pages.countries.table.titles."+filter)}}
                </span>
                <IconDropDownArrow
                v-if="selectedFilter == filter"
                @click="setOrReverseFilter(filter)"
                class="h-6 w-6 hidden lg:inline"
                :class="{desc : orderings[filter] !== 'desc'}"
                />
            </span>
          </th>
          <th class="p-3 text-left">In Feed</th>
				</tr>
				<tr class="bg-darkBlue flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0" v-for="i in countries.length-1" :key="'th-'+i">
          <th class="p-3 text-left"  v-for="filter in filters" :key="'filter-'+filter">
            <span class='cursor-pointer'>
                <span @click="setOrReverseFilter(filter)" class='mr-2' :class="{'font-bold text-red' : filter == selectedFilter, 'text-white' : filter !== selectedFilter}">
                  {{$t("pages.countries.table.titles."+filter)}}
                </span>
                <IconDropDownArrow
                v-if="selectedFilter == filter"
                @click="setOrReverseFilter(filter)"
                class="h-6 w-6 hidden lg:inline"
                :class="{desc : orderings[filter] !== 'desc'}"
                />
            </span>
          </th>
          <th class="p-3 text-left">In Feed</th>
				</tr>
			</thead>
			<tbody class="flex-1 sm:flex-none">
				<tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0" v-for="country in countries" :key='country.ID'>
					<td class="border hover:bg-gray-100 p-3"  v-for="filter in filters" :key="country.slug + 'filter-'+filter" :class=[filter]>
            <router-link
              v-if="filter == 'Country'"
              :to="{ name: 'country', params: { slug: country.Slug }}"
             >
             <strong class='text-darkBlue font-heading'>{{country[filter]}}</strong>
           </router-link>
            <span v-else class='font-paragraph'>{{getFormatedNumber(country[filter])}}</span>
          </td>
					<td class="border hover:bg-gray-100 p-3">
            <div @click='toggleToFeed(country.Slug)'>
              <span v-if="feed.value.includes(country.Slug)">+</span>
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
  import { defineProps, reactive, ref, computed, onMounted, watch } from 'vue'
  import {useStore} from 'vuex'
  import IconDropDownArrow from '../components/Icons/IconDropDownArrow.vue'
  import toastr from 'toastr'

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
        return countries.filter(countryData => countryData.Country.toLowerCase(lowercaseQuery).startsWith() || countryData.Slug.toLowerCase().startsWith(lowercaseQuery))

        //as we get descending order from db
      })

      const getFormatedNumber = val => {
        return new Intl.NumberFormat('en-US').format(val)
      }

      const feed = reactive([])

      onMounted(()=>{
        setFeed()
      })

      watch(
        () => [...feed],
        (newFeed, oldFeed) => {
          localStorage.setItem('feed', JSON.stringify(newFeed))
        })

      const setFeed = () => {
        feed.value =  localStorage.getItem('feed')? localStorage.getItem('feed') : []
      }

      const toggleToFeed = slug => {
        let indexInFeed = feed.indexOf(slug)
        indexInFeed == -1? feed.push(slug) : feed.splice(indexInFeed, 1);
        let toast = indexInFeed == -1? 'Added To Feed' : 'Removed From Feed';
        toastr["success"](toast)
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
        feed
      }

    }
  }
</script>

/* <style>
  html,
  body {
    height: 100%;
  }

  @media (min-width: 640px) {
    table {
      display: inline-table !important;
    }

    thead tr:not(:first-child) {
      display: none;
    }
  }

  td:not(:last-child) {
    border-bottom: 0;
  }

  th:not(:last-child) {
    /* border-bottom: 2px solid rgba(0, 0, 0, .1); */
  }
</style> */
