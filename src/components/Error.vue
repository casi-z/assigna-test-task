<script setup lang="ts">
const { code, text } = defineProps<{
  code: number
  text: string
}>()
</script>

<template>
  <v-row align="center" justify="center" class="error bg-red-accent-1">
    <h1 class="text-error">{{ code }}</h1>
    <h2 class="text-error">{{ text }}</h2>
    <v-btn href="/" variant="text">На главную</v-btn>
  </v-row>
</template>
<style lang="scss" scoped>
.error {
  height: 100%;
  flex-direction: column;
}
</style>
