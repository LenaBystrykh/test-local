<template>
  <p @click="checkLocal">Проверить</p>
  <p @click="sendHi">Скинуть ошибку 'Hi'</p>
  <p>{{ result }}</p>
</template>

<script setup>
import { ref } from 'vue'
import * as Sentry from "@sentry/vue";
// import { createPromiseClient } from '@connectrpc/connect'
// import { createConnectTransport } from '@connectrpc/connect-web'
// import { Job } from '../gen/job_connect'
const result = ref('')

// async function sha256 (message) {
//   const msgBuffer = new TextEncoder().encode(message)
//   const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
//   const hashArray = Array.from(new Uint8Array(hashBuffer))
//   const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

//   return hashHex
// }

function checkLocal () {
  try {
    fetch('https://suijfufqwpajfc.com')
  } catch (error) {
    console.log(error)
  }
}

function sendHi () {
  throw new Error('Hi')
}
</script>

<style lang="scss">
</style>

