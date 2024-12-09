<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import type { Product } from '@/types'

const props = defineProps<{
  data?: Product
}>()
const store = useStore()
const name = ref<string>('')
const price = ref<string>('')
const isButtonDisabled = ref<boolean>(true)

if (props.data) {
  name.value = props.data.name
  price.value = String(props.data.price)
}

function validateName(nameValue: string) {
  return nameValue && nameValue.length <= 100
}

function validatePrice(priceValue: string) {
  return priceValue && !isNaN(Number(priceValue)) && Number(priceValue) <= 100000
}

function handleSubmit() {
  if (props.data) {
    store.dispatch('editProduct', {
      id: props.data.id,
      name: name.value,
      price: Number(price.value),
    })
  } else {
    store.dispatch('createProduct', {
      name: name.value,
      price: Number(price.value),
    })
  }
}

// watch(price, (newPrice: string, oldPrice: string) => {
//   console.log(validatePrice(newPrice) ? 'valid' : 'invalid', 'price')
// })

function handleInput() {
  isButtonDisabled.value = !(validatePrice(price.value) && validateName(name.value))
}
</script>

<template>
  <v-dialog max-width="500" transition="dialog-bottom-transition">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-if="data"
        v-tooltip:bottom="'Редактировать'"
        color="primary"
        icon="mdi-pencil"
        variant="text"
        v-bind="activatorProps"
      ></v-btn>
      <v-col v-else class="pa-4 product-container border-primary" lg="3" md="4" sm="6" xs="12">
        <v-card
          v-bind="activatorProps"
          density="compact"
          :hover="false"
          elevation="0"
          class="product"
        >
          <h1 class="text-primary">Добавить продукт</h1>
          <v-icon class="text-h1 text-primary" icon="mdi-plus"></v-icon>
        </v-card>
      </v-col>
    </template>

    <template v-slot:default="{ isActive }">
      <v-form @submit.prevent="handleSubmit">
        <v-card :title="`${data ? 'Редактирование' : 'Создание'} продукта`">
          <v-card-text>
            <v-text-field
              @input="handleInput"
              v-model="name"
              label="Название"
              required
            ></v-text-field>
            <v-text-field @input="handleInput" v-model="price" label="Цена" required></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="default" type="button" variant="tonal" @click="isActive.value = false">
              Отмена
            </v-btn>
            <v-btn :disabled="isButtonDisabled" type="submit" color="success" variant="tonal">
              {{ data ? 'Сохранить' : 'Создать' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </template>
  </v-dialog>
</template>

<style scoped lang="scss">
.product-container {
  height: 561px;

  .product {
    border: 2px solid rgb(var(--v-theme-primary));
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>
