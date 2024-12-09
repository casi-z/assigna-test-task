<script setup lang="ts">
import { computed, type ComputedRef, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Product } from '@/types'
import { useStore } from 'vuex'
import icons from '@mdi/js'
import ProductDeleteModal from '@/components/ProductDeleteModal.vue'
import ProductCreateModal from '@/components/ProductCreateModal.vue'
import Error from '@/components/Error.vue'
import randomElement from '@/utils/randomElement.ts'
import { imagesURL } from '@/data'
import { AuthClient } from '@/api/ApiClient.ts'
import getHttpError from '@/utils/getHttpError.ts'

const store = useStore()
const route = useRoute()

store.dispatch('updateProducts')

// Получаем ID из url
const productId = Number(route.params.id)
const product = ref<Product | null>(null)
const errorCode = ref<number | null>(null)
const error = ref<string | null>(null)

AuthClient.get(`/products/${productId}`)
  .then(({ data, status }) => {
    if (status === 200) {
      product.value = data
    }
  })
  .catch(({ status }) => {
    errorCode.value = status
    error.value = getHttpError(status)
  })

const image = computed(() => randomElement(imagesURL))
</script>
<template>
  <v-container v-if="product">
    <v-row dense>
      <v-col xl="10" lg="8" md="7" sm="6" xs="12" justify="center">
        <v-img class="image" :src="`img/products/${image}`" />
      </v-col>
      <v-col xl="2" lg="4" md="5" sm="6" xs="12">
        <v-card class="product-card">
          <v-card-item>
            <v-card-title>{{ product.name }}</v-card-title>

            <v-card-subtitle>{{ product.price }} ₽</v-card-subtitle>
          </v-card-item>

          <v-card-text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis
            est labore voluptatibus! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Commodi, ratione debitis quis est labore voluptatibus! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus!
          </v-card-text>
          <v-card-actions>
            <ProductDeleteModal :data="product" />
            <ProductCreateModal :data="product" />

            <v-btn class="cart-add-button text-subtitle-1" variant="tonal">
              <v-icon icon="mdi-cart" start></v-icon>
              В корзину
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <Error v-else-if="errorCode && error" :text="error" :code="errorCode" />
</template>
<style lang="scss" scoped>
.cart-add-button {
  background: black;
  color: white;
}

.product-card {
  background: #f7f7f7;
}
</style>
