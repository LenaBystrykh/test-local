<template>
  <p @click="checkLocal">Проврить</p>
  <p>{{ result }}</p>
</template>

<script setup>
import { CapacitorHttp } from '@capacitor/core'
import { ref } from 'vue'
const result = ref('')


async function checkLocal () {
  const options = {
    url: 'http://line1a.local',
    headers: { Accept: 'application/json' },
  }
  try {
    const data = await CapacitorHttp.get(options)
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

