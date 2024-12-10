<script setup lang="ts">
import { computed } from 'vue'
import Header from '@/components/Header.vue'
import Product from '@/components/Product.vue'
import { useStore } from 'vuex'
import ProductCreateModal from '@/components/ProductCreateModal.vue'

const store = useStore()

const products = computed(() => store.getters.getProducts)

store.dispatch('updateProducts')
</script>

<template>
  <Header />
  <main>
    <v-container class="pt-4">
      <v-row dense>
        <h1 class="pl-4">Продукты</h1>
      </v-row>
      <v-row dense class="">
        <ProductCreateModal />
        <Product v-for="product in products?.items" :key="product.id" :data="product" />
      </v-row>
    </v-container>
  </main>
</template>
<style scoped lang="scss">
main {
  margin-top: 60px;
}
</style>
