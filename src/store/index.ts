import { createStore, Store } from 'vuex'
import type { InjectionKey } from 'vue'

interface State {
  token: string | undefined
}

const state: State = {
  token: localStorage.getItem('token') || undefined,
}

const mutations = {
  setToken(state: State, payload: string) {
    state.token = payload
  },
}

const actions = {
  setToken({ commit }: { commit: Function }, newToken: string) {
    localStorage.setItem('token', newToken)
    commit('setToken', newToken);
  },
}

const getters = {
  getToken(state: State): number {
    return state.token
  },
}

export const key: InjectionKey<Store<State>> = Symbol()

const store = createStore<State>({
  state,
  mutations,
  actions,
  getters,
})

export default store
