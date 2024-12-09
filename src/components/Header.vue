<script lang="ts" setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import stringToColor from '@/utils/stringToColor.ts'
import { useRouter } from 'vue-router'

const store = useStore()
const username = computed(() => store.getters.getUsername)
const router = useRouter()
function handleLogout() {
  store.dispatch('logout')
  router.push('/')
}
</script>

<template>
  <v-layout>
    <v-app-bar :elevation="5">
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title class="hidden-xs">Guitar Shop</v-app-bar-title>

      <template v-slot:append>
        <v-btn class="my-5">
          <v-avatar class="avatar" color="surface-variant">{{ username[0] }}</v-avatar>
          <span class="text-h6 text-capitalize">{{ username }}</span>
          <v-menu activator="parent">
            <v-list>
              <v-list-item :value="0">
                <v-list-item-title @click="handleLogout">Выйти</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-app-bar>
  </v-layout>
</template>

<style scoped lang="scss">
.avatar {
  text-transform: uppercase;
  background: v-bind('stringToColor(username)') !important;
}
</style>
