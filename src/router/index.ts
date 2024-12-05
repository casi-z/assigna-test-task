import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/Index.vue'
import Login from '@/pages/Login.vue'
import store from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      beforeEnter: (to, from, next) => {
        const token = store.getters.getToken;
        if (!token) {
          next('/login')
        } else {
          next()
        }
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        const token = store.getters.getToken;
        if (token) {
          next('/')
        } else {
          next()
        }
      },
    },

  ],
})

export default router
