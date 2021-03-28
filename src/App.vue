<template>
  <div id='root' class=''>
    <Header />
    <main class=''>
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



  created(){
    this.$store.dispatch('globalData/setInitialData')
  },

}
</script>

<style>

</style>
