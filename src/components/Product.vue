<script setup lang="ts">
import type { Product } from '@/types'
import { computed } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import randomElement from '@/utils/randomElement.ts'
import { imagesURL } from '@/data'

const { data } = defineProps<{
  data: Product
}>()

//Получаем время создания
const formatedTime = computed(() =>
  dayjs(data.created_at).locale('ru').format('DD MMMM YYYY HH:mm'),
)

const image = computed(() => randomElement(imagesURL))
</script>

<template>
  <v-col class="pa-4 product-container" lg="3" md="4" sm="6" xs="12">
    <v-card
      :href="`/products/${data.id}`"
      density="compact"
      :hover="false"
      elevation="0"
      class="product"
    >
      <v-row dense class="image-container mb-3">
        <v-img class="image" :src="`img/products/${image}`" width="100%" height="446px" />
      </v-row>
      <v-col cols="12" class="px-3">
        <h4 class="my-2">{{ data.name }}</h4>
        <v-row dense justify="space-between">
          <h5>{{ data.price }}₽</h5>
          <h5>{{ formatedTime }}</h5>
        </v-row>
      </v-col>
    </v-card>
  </v-col>
</template>

<style lang="scss">
.product-container {
  flex-basis: unset !important;
}
.product {
  position: static;
  img {
    transition: transform 300ms linear;
  }
  &:hover {
    box-shadow: 0 5px 30px rgba(34, 34, 40, 0.08) !important;
    .v-card__overlay {
      display: none !important;
    }
    img {
      transform: scale(1.1);
    }
  }
}

.image-container {
  background: #f7f7f7;
  width: 100%;
  height: 446px;
}
</style>
