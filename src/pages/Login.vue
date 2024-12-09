<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Client } from '@/api/ApiClient.ts'

const isButtonDisabled = ref<boolean>(true)
const isLoading = ref<boolean>(false)
const usernameCaption = ref<string>('')

const router = useRouter()

const redirectToHome = () => {
  router.push('/') // Замените '/' на нужный вам путь
}

const username = ref<string>('')
const store = useStore()

function handleSubmit() {
  isLoading.value = true
  Client.post(`/login`, { username: username.value }).then(({ data, status }) => {
    if (status === 200) {
      store.dispatch('setToken', data.access_token)
      store.dispatch('setUsername', username.value)
      redirectToHome()
    }
  })
}
function validateUsername(nameValue: string): { valid: boolean; caption: string } {
  if (nameValue.length >= 50) {
    return { valid: false, caption: 'Логин должен быть короче 50 символов' }
  }

  if (nameValue.length < 3) {
    return { valid: false, caption: 'Логин должен быть длиннее 2 символов' }
  }

  // Проверяем что username состоит только из английских букв и не содержит пробелов
  const regex = /^[a-zA-Z]+$/
  const test = regex.test(nameValue)

  if (!test) {
    return { valid: false, caption: 'Логин должен состоять из английских букв (без пробелов)' }
  }

  return { valid: true, caption: '' }
}

function handleInput() {
  const { valid, caption } = validateUsername(username.value)
  usernameCaption.value = caption
  isButtonDisabled.value = !valid
}
</script>

<template>
  <v-container tag="main" justify="center" align="center" fill-height>
    <v-row align="center" justify="center">
      <v-col lg="3" md="5" sm="6" xs="12">
        <v-card elevation="2" class="py-5">
          <v-card-title class="text-h5 pb-5">Создайте аккаунт</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSubmit">
              <v-text-field
                v-model="username"
                @input="handleInput"
                label="Логин"
                required
              ></v-text-field>
              <span class="text-caption text-error">{{ usernameCaption }}</span>

              <v-text-field disabled label="Пароль" type="password" required></v-text-field>
              <span class="text-caption text-success"
                >Это тестовое задание, пароль вводить не надо)</span
              >

              <v-btn
                :loading="isLoading"
                :disabled="isButtonDisabled"
                block
                color="#000"
                type="submit"
              >
                Зарегистрироваться
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
main {
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
}
</style>
