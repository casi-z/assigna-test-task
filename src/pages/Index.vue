<script setup lang="ts">
import axios from 'axios'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const token = computed(() => store.getters.getToken)
const executePostRequest = async () => {
  const url = 'http://45.145.4.182:8222/products'
  try {
    const result = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
      },
    })
    console.log('POST request result:', result)
  } catch (error) {
    console.error('Error during POST request:', error)
  }
}

// Выполняем запрос при создании компонента
executePostRequest()
</script>

<template>
  <main>
    index
  </main>
</template>
