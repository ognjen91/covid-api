<template>
  <div class='header default-shadow z-100' :class="{'border-b border-gray' : $route.name == 'country'}">
    <nav class="bg-darkBlue">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">

          <!-- NAVIGATION, BIG SCREEN -->
          <div class="flex items-center">
              <router-link :to="'/'+$i18n.locale" tag='div' class="flex-shrink-0">
                <img class="h-8 w-8" src="../assets/logo.png" alt="Virus">
              </router-link>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <router-link :to="{ name : 'home', params : {locale : $i18n.locale}}" class="text-white px-3 py-2 rounded-md text-sm font-medium">{{$t('header.home')}}</router-link>

                  <router-link :to="{ name : 'countries', params : {locale : $i18n.locale}}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{{$t('header.countries')}}</router-link>

                  <router-link :to="{ name : 'users-feed', params : {locale : $i18n.locale}}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{{$t('header.feed')}}</router-link>

                  <router-link :to="{ name : 'about', params : {locale : $i18n.locale}}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{{$t('header.about')}}</router-link>

                </div>
              </div>
          </div>

          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
                <!-- LANGUAGES, BIG SCREEN -->
                <div class="ml-3 relative">
                    <div>
                      <!-- ACTIVE LANGUAGE FLAG = LANGUAGE DROPDOWN -->
                      <button
                      type="button"
                      class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      @click="showLocalesDropdown = !showLocalesDropdown"
                      >
                        <span class="sr-only">Open user menu</span>
                        <img class="h-8 w-8 rounded-full" :src="'https://www.countryflags.io/' + countryCodes[$i18n.locale] + '/flat/64.png'" alt="">
                      </button>
                    </div>

                    <!-- LANG DROPDOWN, BIG SCREEN -->
                    <div
                     class="lang-dropdown flex items-center flex-col origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                     v-if='showLocalesDropdown'
                     >
                        <!-- ENGLISH -->
                        <router-link @click="showLocalesDropdown = !showLocalesDropdown" to="/en" class='mx-2'>
                          <img class="h-8 w-8 rounded-full" src="https://www.countryflags.io/GB/flat/64.png" alt="">
                        </router-link>
                        <!-- SERBIAN -->
                        <router-link @click="showLocalesDropdown = !showLocalesDropdown" to="/sr" class='mx-2'>
                          <img class="h-8 w-8 rounded-full" src="https://www.countryflags.io/RS/flat/64.png" alt="">
                        </router-link>
                    </div>
                </div>
            </div>
          </div>

          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <button @click="showMenuDropdown = !showMenuDropdown" type="button" class="hamburger inline-flex items-center justify-center p-2">
              <IconHamburger  class='w-full h-full' />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div class="md:hidden" id="mobile-menu" v-if="showMenuDropdown">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 font-heading">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <router-link :to="{ name : 'home', params : {locale : $i18n.locale}}" @click="showMenuDropdown = !showMenuDropdown" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">{{$t('header.home')}}</router-link>

          <router-link :to="{ name : 'countries', params : {locale : $i18n.locale}}" @click="showMenuDropdown = !showMenuDropdown" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{{$t('header.countries')}}</router-link>

          <router-link :to="{ name : 'users-feed', params : {locale : $i18n.locale}}" @click="showMenuDropdown = !showMenuDropdown" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{{$t('header.feed')}}</router-link>

          <router-link :to="{ name : 'about', params : {locale : $i18n.locale}}" @click="showMenuDropdown = !showMenuDropdown" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{{$t('header.about')}}</router-link>

        </div>

        <!-- LOCALE / MOBILE -->
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="flex items-center px-5">
              <!-- ACTIVE LOCALE -->
              <div class="flex-shrink-0">
                <img class="h-10 w-10 rounded-full" :src="'https://www.countryflags.io/' + countryCodes[$i18n.locale] + '/flat/64.png'" alt="">
              </div>
              <button class="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span class="sr-only">View notifications</span>
                <IconDropDownArrow class="h-6 w-6" @click="showLocalesDropdown = !showLocalesDropdown" />
              </button>
          </div>

          <!-- LOCALES DROPDOWN MOBILE -->
          <div class="mt-3 px-2 space-y-1 flex  items-center"  v-if="showLocalesDropdown">
              <router-link to="/en" class='mx-2'>
                <img class="h-8 w-8 rounded-full" src="https://www.countryflags.io/GB/flat/64.png" alt="">
              </router-link>
              <router-link to="/sr" class='mx-2'>
                <img class="h-8 w-8 rounded-full" src="https://www.countryflags.io/RS/flat/64.png" alt="">
              </router-link>
          </div>

        </div>
      </div>
    </nav>
  </div>


</template>

<script>
  import IconDropDownArrow from './Icons/IconDropDownArrow.vue'
  import IconHamburger from './Icons/IconHamburger.vue'

  export default {
    components : {
      IconDropDownArrow,
      IconHamburger
    },

    data(){
      return{
        allLocales : ['sr-RS','en-GB'],
        showMenuDropdown : false,
        showLocalesDropdown : false,
        countryCodes : {
          sr : 'rs',
          en : 'GB',
        }
      }
    },


    methods : {
      setLocale(locale){
        this.$i18n.locale = locale
        this.$router.push(locale.split('-')[0])
      },
    },

    // WATCHER FOR SETTING LOCALE
    watch:{
      $route (to, from){
        let locale = to.params.locale || 'sr'
        this.$i18n.locale = locale
      }
}
  }
</script>
