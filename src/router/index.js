import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Countries from '../pages/Countries.vue'
import UsersFeed from '../pages/UsersFeed.vue'
import Country from '../pages/Country.vue'
import About from '../pages/About.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/countries',
      component: Countries
    },
    {
      path: '/countries/:slug',
      name: 'country',
      component: Country
    },
    {
      path: '/my-feed',
      component: UsersFeed
    },
    {
      path: '/about',
      component: About
    },
  ]
})


export default router
