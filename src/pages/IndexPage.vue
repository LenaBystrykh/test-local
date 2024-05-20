<template>
  <p @click="checkLocal">Проврить</p>
  <p>{{ result }}</p>
</template>

<script setup>
import { ref } from 'vue'
import { createPromiseClient } from '@connectrpc/connect'
import { createConnectTransport } from '@connectrpc/connect-web'
import { Job } from '../gen/job_connect'
const result = ref('')

async function sha256 (message) {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

  return hashHex
}

async function checkLocal () {
  const transport = createConnectTransport({
    baseUrl: import.meta.env.VITE_URL
  })
  const client = createPromiseClient(Job, transport)
  const signParams = import.meta.env.VITE_UUID + ':' + import.meta.env.VITE_SECRET
  const signEncrypted = await sha256(signParams)
  const response = await client.list({
    token: import.meta.env.VITE_UUID,
    sign: signEncrypted
  })
  console.log(response)
}
</script>

<style lang="scss">
</style>

