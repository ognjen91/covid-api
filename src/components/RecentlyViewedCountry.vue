<template>
  <div v-if="country" :class="{'hidden' : $route.name == 'country' &&  currentCountrySlug == country.Slug}">
    <router-link
    tag='div'
    :to="{ name: 'country', params: { locale: currentLocaleShorhand, slug: country.Slug }}"
    class='flex flex-col'
    >
    <img :src="'https://www.countryflags.io/' + country.CountryCode.toLowerCase() + '/flat/64.png'">
    <p class='w-full font-heading text-center'>{{getFormatedNumber(country.TotalConfirmed)}}</p>
    </router-link>
    <!-- {{country.CountryCode.toLowerCase()}} -->
  </div>
</template>
<script>
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

    computed : {
        currentLocaleShorhand(){
          return this.$i18n.locale.split('-')[0]
        }
    },


    methods : {
       getFormatedNumber(val){
        return new Intl.NumberFormat('en-US').format(val)
      }
    }
  }
</script>
