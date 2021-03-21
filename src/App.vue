<template>
  <div id='root' class='border'>
    <Header />
    <main class='border'>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import axios from 'axios'

export default {
  components : {
    Header,
    Footer
  },



  methods : {

  },

  created(){

    this.$store.dispatch('globalData/setInitialData')
    // this.setCountries()
    // console.log(this.$store.getters['general/counter'])
  }

}
</script>

<style>

</style>
