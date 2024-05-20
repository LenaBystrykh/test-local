<template>
  <p @click="checkLocal">Проврить</p>
  <p>{{ result }}</p>
</template>

<script setup>
import { ref } from 'vue'
const result = ref('')


async function checkLocal () {
  const url = 'http://line1a.local'
  const options = {
    headers: { Accept: 'application/json' },
  }
  try {
    const data = await fetch(url, options)
    result.value = data
    console.log(data)
  }
  catch (error) {
    console.log(error)
    result.value = error
  }
}
</script>

<style lang="scss">
</style>

