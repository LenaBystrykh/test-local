<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
    <p @click="checkLocal">проверить</p>
    <p>{{ result }}</p>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const result = ref('')

async function checkLocal () {
  const options = {
    method: 'GET',
    url: 'https://line1a.local',
    headers: { Accept: 'application/json' },
  }
  try {
    const data = await axios.request(options)
    result.value = data
    console.log(data)
  }
  catch (error) {
    console.log(error)
    result.value = error
  }
}
</script>
