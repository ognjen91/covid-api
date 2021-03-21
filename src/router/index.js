import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Countries from '../pages/Countries.vue'

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
    // {
    //   path: '/contact',
    //   component: Contact
    // }
  ]
})


export default router
