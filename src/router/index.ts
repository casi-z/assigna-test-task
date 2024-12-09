import { createRouter, createWebHistory } from 'vue-router'
import type {
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
  NavigationGuardNext,
} from 'vue-router'
import Index from '@/pages/Index.vue'
import Login from '@/pages/Login.vue'
import store from '@/store'
import ProductPage from '@/pages/ProductPage.vue'

function checkAuth(
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext,
) {
  const token = store.getters.getToken
  if (!token) {
    next('/login')
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      beforeEnter: checkAuth,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        const token = store.getters.getToken
        if (token) {
          next('/')
        } else {
          next()
        }
      },
    },
    {
      path: '/products/:id',
      name: 'products',
      component: ProductPage,
      beforeEnter: checkAuth,
    },
  ],
})

export default router
