import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Countries from '../pages/Countries.vue'
import Country from '../pages/Country.vue'
import About from '../pages/About.vue'
import NotFound from '../pages/404.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/:locale(sr|en|)?',
      name: 'home',
      component: Home
    },
    {
      path: '/:locale(sr|en|)/countries',
      name: 'countries',
      component: Countries
    },
    {
      path: '/:locale(sr|en|)/countries/:slug',
      name: 'country',
      component: Country
    },
    {
      path: '/:locale(sr|en|)/my-feed',
      name: 'users-feed',
      component: Countries
    },
    {
      path: '/:locale(sr|en|)/about',
      name: 'about',
      component: About
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    },
  ]
})


export default router
