import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Countries from '../pages/Countries.vue'
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
      path: '/about',
      component: About
    },
    // {
    //   path: '/contact',
    //   component: About
    // }
  ]
})


export default router
