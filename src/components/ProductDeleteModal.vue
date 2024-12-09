<script lang="ts" setup>
import type { Product } from '@/types'
import { useStore } from 'vuex'
import router from '@/router'

const { data } = defineProps<{
  data: Product
}>()
const store = useStore()
function handleDelete() {
  store.dispatch('deleteProduct', data.id)
  router.push('/')
}
</script>

<template>
  <v-dialog transition="dialog-bottom-transition" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        v-tooltip:bottom="'Удалить'"
        color="red-lighten-2"
        icon="mdi-delete"
        variant="text"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card :title="`Удаление продукта`">
        <v-card-text> Вы действительно хотите удалить {{ data.name }}? </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" type="button" variant="tonal" @click="isActive.value = false">
            Отмена
          </v-btn>
          <v-btn color="error" @click="handleDelete" variant="tonal"> Удалить </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
