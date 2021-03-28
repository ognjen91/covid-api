<template>
  <div class='px-5 countries relative h-full'>

    <!-- INTRO TEXT -->
    <div class="flex py-5 flex-col text-center">
      <template v-if="$route.name == 'countries'">
        <h1 class='subheading-size text-red'>{{$t('pages.countries.topText.countries.title')}}</h1>
        <p class="paragraph-size">{{$t('pages.countries.topText.countries.text1')}} <br>{{$t('pages.countries.topText.countries.text2')}}</p>
      </template>
      <template v-else>
        <h1 class='subheading-size text-red'>{{$t('pages.countries.topText.feed.title')}}</h1>
        <p class="paragraph-size">{{$t('pages.countries.topText.feed.text1')}} <br>{{$t('pages.countries.topText.feed.text2')}}</p>
      </template>
    </div>

    <!-- filtering form -->
    <form action="" class='w-full py-4 mb-5 hidden lg:flex justify-center font-heading'>
      <label for="query" class='mr-4'>{{$t('pages.countries.filterText')}}</label>
      <input type="text" v-model.trim="query" id='query' class='border px-2'>
    </form>

    <!-- TABLE -->
    <table class="countries-table table-auto w-full h-full" v-if="countries.length">
      <thead class='bg-darkBlue text-heading table-head hidden lg:table-header-group'>
        <tr class='text-left font-heading'>
          <th class='pl-1 py-3' v-for="filter in filters" :key="'filter-'+filter" :class="{'big-only' : ['NewDeaths'].includes(filter)}">
            <span class='cursor-pointer flex items-center'>
                <span @click="setOrReverseFilter(filter)" class='mr-2' :class="{'font-bold text-red' : filter == selectedFilter, 'text-white' : filter !== selectedFilter}">
                  {{$t('pages.countries.table.titles.'+filter)}}
                </span>
                <IconDropDownArrow
                v-if="selectedFilter == filter"
                @click="setOrReverseFilter(filter)"
                class="h-6 w-6 inline"
                :class="{desc : orderings[filter] !== 'desc'}"
                />
            </span>
          </th>
          <th class='text-white'>In Feed</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="country in countries" :key='country.ID' class='pt-1 pb-3 lg:py-4 border-b-2  mb-2 lg:mb-0 border-lightBlue font-paragraph  w-full flex flex-col lg:table-row'>
          <td @click="$router.push({ name: 'country', params: {locale: $i18n.locale.split('-')[0], slug: country.Slug }})" class='cursor-pointer pl-1 text-darkBlue lg:py-2' v-for="filter in filters" :key="country.Slug + 'filter-'+filter" :class="[country.Slug]">
             <strong   v-if="filter == 'Country'" class='text-darkBlue text-heading underline lg:no-underline country-title'>
               {{country[filter]}}
             </strong>
             <span v-else class='text-paragraph flex w-full'>
               <span class="lg:hidden w-1/2 text-darkBlue font-bold">{{$t('pages.countries.table.titles.'+filter)}}</span>
               <span class="data text-red lg:text-darkBlue ml-3 lg:ml-0">{{getFormatedNumber(country[filter])}}</span>
             </span>
          </td>
          <td class='flex items-center lg:py-2'>
            <span class='lg:hidden w-1/2 mr-3' @click='toggleToFeed(country.Slug)'>{{!checkIsInFeed(country.Slug)? $t('Add to Feed') : $t('Remove from Feed')}}</span>
            <div
            @click='toggleToFeed(country.Slug)'
            class='cursor-pointer rounded-full border feed-btn flex justify-center items-center relative text-white'
            :class="{
              'bg-darkBlue' : !checkIsInFeed(country.Slug),
              'bg-red' : checkIsInFeed(country.Slug),
              'added-to-feed' : checkIsInFeed(country.Slug) && recentlyToggledToFeed == country.Slug,
              'removed-from-feed' : !checkIsInFeed(country.Slug) && recentlyToggledToFeed == country.Slug
              }"
              >
              <span v-if="checkIsInFeed(country.Slug)">-</span>
              <span v-else>+</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- NO MATCH TEXT -->
    <h2 class="w-full text-center text-red my-5 py-5" v-else>{{$t('pages.countries.noMatch')}}</h2>

    <!-- RECENTLY VIEWED -->
    <div class="section">
      <RecentlyViewedCountries :show-random='true' />
    </div>
  </div>
</template>
<script>
  import { defineProps, reactive, ref, computed, onUpdated, watch } from 'vue'
  import {useStore} from 'vuex'
  import { useRoute } from 'vue-router'
  import RecentlyViewedCountries from '../components/RecentlyViewedCountries.vue'
  import reusableData from '../functions/reusableData'



  import IconDropDownArrow from '../components/Icons/IconDropDownArrow.vue'
  import toastr from 'toastr'

  export default{
    components : {
      IconDropDownArrow,
      RecentlyViewedCountries
    },


    setup(){
      const store = useStore()// store instead of `$store`
      const route = useRoute()// store instead of `$route`
      const {currentLocale} = reusableData()


      const filters = reactive([
        'Country',
        'TotalConfirmed',
        'TotalDeaths',
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

      const feed = reactive([])

      const countries = computed(() => {
        if(!query){
          if(selectedFilter.value == 'Country') return orderings['Country'] == 'asc'? store.getters['countries/allCountries'] : store.getters['countries/allCountries'].reverse()
          return orderings[selectedFilter.value] == 'desc'? store.getters['countries/topList'](selectedFilter.value, 'all') : store.getters['countries/topList'](selectedFilter.value, 'all').reverse()
        }
        // return countries
        let lowercaseQuery = query.value.toLowerCase()
        let countries = orderings[selectedFilter.value] == 'desc'? store.getters['countries/topList'](selectedFilter.value, 'all') : store.getters['countries/topList'](selectedFilter.value, 'all').reverse()

        if(route.name == 'users-feed') countries = countries.filter(country => feed.value.includes(country.Slug))
        return countries.filter(countryData => countryData.Country.toLowerCase(lowercaseQuery).startsWith() || countryData.Slug.toLowerCase().startsWith(lowercaseQuery))

        //as we get descending order from db
      })

      const getFormatedNumber = val => {
        return new Intl.NumberFormat('en-US').format(val)
      }


      const recentlyToggledToFeed = ref('')

      const setFeed = () => {
        feed.value = localStorage.getItem('feed')? JSON.parse(localStorage.getItem('feed')) : []
      }
      // in Vue2, this would be in created hook
      if(window.innerWidth < 1024) selectedFilter.value = 'Country'
      setFeed()


      const toggleToFeed = slug => {
        let indexInFeed = feed.value.indexOf(slug)
        indexInFeed == -1? feed.value.push(slug) : feed.value.splice(indexInFeed, 1);
        let toast = indexInFeed == -1? 'Added To Feed' : 'Removed From Feed';
        toastr["success"](toast)
        localStorage.setItem('feed', JSON.stringify(feed.value))

        recentlyToggledToFeed.value = slug
        setTimeout(()=>{recentlyToggledToFeed.value = ''}, 1100)

      }

      const checkIsInFeed = slug => {
        if(!feed) return false
        return feed.value.includes(slug)
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
        checkIsInFeed,
        feed,
        recentlyToggledToFeed,
        currentLocale
      }

    }
  }
</script>
