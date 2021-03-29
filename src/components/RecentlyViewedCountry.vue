<template>
  <div v-if="country" :class="{'hidden' : $route.name == 'country' &&  currentCountrySlug == country.Slug}">
    <router-link
    tag='div'
    :to="{ name: 'country', params: { locale: $i18n.locale, slug: country.Slug }}"
    class='flex flex-col'
    >
    <img :src="'https://www.countryflags.io/' + country.CountryCode.toLowerCase() + '/flat/64.png'">
    <p class='w-full font-heading text-center'>{{getFormatedNumber(country.TotalConfirmed)}}</p>
    </router-link>
  </div>
</template>
<script>
import formatNumber from '../functions/formatNumber'

  export default{
    props : {
      country : {
        Type : Object,
        required: true
      },
      currentCountrySlug : {
        Type : String,
        required: false,
        default : ""
      }
    },


    methods : {
       getFormatedNumber(val){
        return formatNumber(val)
      }
    }
  }
</script>
