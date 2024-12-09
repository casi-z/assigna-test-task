import axios from 'axios'
import { useRouter } from 'vue-router'

const token = localStorage.getItem('token')
import store from '@/store'
import router from '@/router'

const API_URL = 'http://45.145.4.182:8222'
export const Client = axios.create({
  baseURL: API_URL,
})
export const AuthClient = axios.create({
  baseURL: API_URL,
})

AuthClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${store.getters.getToken}`
  return config
})

AuthClient.interceptors.response.use(
  (config) => {
    return config
  },
  (error) => {
    console.log(error)
    //Ошибка авторизации
    if (error.response.status === 401) {
      //Удаляем токен
      store.dispatch('logout')

      //Переходим на страницу логина
      router.push('/login')
    }
    throw error
  },
)
