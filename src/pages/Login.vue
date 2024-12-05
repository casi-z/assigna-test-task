<script setup lang="ts">
import { computed, ref } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const router = useRouter();

const redirectToHome = () => {
  router.push('/'); // Замените '/' на нужный вам путь
};

const username = ref<string>('')
const store = useStore()
const token = computed(() => store.getters.getToken)

function handleSubmit() {
  axios
    .post('http://45.145.4.182:8222/login', { username: username.value })
    .then(({ data, statusText }) => {
      if (statusText === 'OK') {
        console.log(data)
        store.dispatch('setToken', data.access_token)
        redirectToHome()
      }
    })
}
</script>

<template>
  <div class="">
    <h1>Регистрация</h1>
    <div class="">
      <input type="text" v-model="username" />
    </div>
    <button @click="handleSubmit">Зарегистрироваться</button>
  </div>

  {{ token }}
</template>

<style scoped lang="scss"></style>
