import type { Product, ProductResponse } from '@/types'
import { AuthClient } from '@/api/ApiClient.ts'

interface State {
  products: ProductResponse | null
}

const state: State = {
  products: null,
}

const mutations = {
  updateProducts(state: State, payload: ProductResponse) {
    state.products = payload
  },

  createProduct(state: State, payload: Product) {
    if (state.products) {
      state.products.items = [payload, ...state.products?.items]
    }
  },
  editProduct(state: State, payload: Product) {
    if (state.products) {
      state.products.items = state.products.items.map((product) => {
        if (product.id === payload.id) {
          return payload
        }
        return product
      })
    }
  },
  deleteProduct(state: State, payload: number) {
    if (state.products) {
      state.products.items = state.products.items.filter(({ id }) => id !== payload)
    }
  },
}

const actions = {
  async updateProducts({ commit }: { commit: Function }) {
    try {
      const result = await AuthClient.get('/products')

      commit('updateProducts', result.data)
    } catch (error) {
      console.error('Error during GET request:', error)
    }
  },

  async createProduct({ commit }: { commit: Function }, payload: { name: string; price: number }) {
    try {
      const result = await AuthClient.post('/products', payload)

      commit('createProduct', result.data)
    } catch (error) {
      console.error('Error during POST request:', error)
    }
  },
  async editProduct(
    { commit }: { commit: Function },
    payload: { id: number; name: string; price: number },
  ) {
    try {
      const result = await AuthClient.put(`/products/${payload.id}`, {
        name: payload.name,
        price: payload.price,
      })

      commit('editProduct', result.data)
    } catch (error) {
      console.error('Error during POST request:', error)
    }
  },

  async deleteProduct({ commit }: { commit: Function }, id: number) {
    try {
      await AuthClient.delete(`/products/${id}`)

      commit('deleteProduct', id)
    } catch (error) {
      console.error('Error during DELETE request:', error)
    }
  },
}

const getters = {
  getProducts(state: State): ProductResponse | null {
    return state.products
  },
  getProductById:
    (state: State) =>
    (productId: number): Product | undefined => {
      if (state.products) {
        return state.products?.items.find(({ id }) => id === productId)
      }
      return undefined
    },
}

const productsModule = {
  state,
  actions,
  mutations,
  getters,
}

export default productsModule
