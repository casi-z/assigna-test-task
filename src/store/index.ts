import { createStore, Store } from 'vuex'
import type { InjectionKey } from 'vue'
import productsModule from '@/store/products.ts'

interface State {
  token: string | null
  username: string | null
}

const state: State = {
  token: localStorage.getItem('token') || null,
  username: localStorage.getItem('username') || null,
}

const mutations = {
  setToken(state: State, payload: string | null) {
    state.token = payload
  },
  setUsername(state: State, payload: string | null) {
    state.username = payload
  },
}

const actions = {
  setUsername({ commit }: { commit: Function }, newUsername: string) {
    localStorage.setItem('username', newUsername)
    commit('setUsername', newUsername)
  },

  setToken({ commit }: { commit: Function }, newToken: string) {
    localStorage.setItem('token', newToken)
    commit('setToken', newToken)
  },
  logout({ commit }: { commit: Function }) {
    //Удаляем username и token из LocalStorage

    localStorage.removeItem('token')
    localStorage.removeItem('username')

    commit('setToken', null)
    commit('setUsername', null)
  },
}

const getters = {
  getToken(state: State): string | null {
    return state.token
  },
  getUsername(state: State): string | null {
    return state.username
  },
}

export const key: InjectionKey<Store<State>> = Symbol()

const store = createStore<State>({
  modules: {
    products: productsModule,
  },
  state,
  mutations,
  actions,
  getters,
})

export default store
