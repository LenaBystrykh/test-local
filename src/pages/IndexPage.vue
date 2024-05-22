<template>
  <div class="start-scan-page">
    <p @click="checkLocal">Чтобы начать работу, отсканируйте личный код пользователя</p>
    <p>{{ result }}</p>
    <div class="start-scanner-wrapper">
      <BaseScanner :height="'calc(100% - 32px)'" :width="'auto'" :code-type="'DataMatrix'"></BaseScanner>
    </div>
  </div>
</template>

<script setup>
// import { createPromiseClient } from '@connectrpc/connect'
// import { createConnectTransport } from '@connectrpc/connect-web'
// import { Token } from '../gen/token_connect'
// import protobuf from 'protobufjs'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Token } from '../gen/product_pb'
import BaseScanner from '../components/BaseScanner.vue'
import {
  BarcodeScanner,
  BarcodeFormat
  // LensFacing,
} from '@capacitor-mlkit/barcode-scanning'
const isMobile = ref(false)
const scanActive = ref(false)
const result = ref('')
const scanOptions = {
  formats: [BarcodeFormat.DataMatrix]
}
const isSupported = async () => {
  try {
    const { supported } = await BarcodeScanner.isSupported()
    return supported
  } catch (e) {
    console.log(e)
  }
  return false
}

// async function sha256 (message) {
//   const msgBuffer = new TextEncoder().encode(message)
//   const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
//   const hashArray = Array.from(new Uint8Array(hashBuffer))
//   const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

//   return hashHex
// }

async function checkLocal () {
  console.log('check local')
  // const transport = createConnectTransport({
  //   baseUrl: import.meta.env.VITE_URL
  // })
  // const client = createPromiseClient(Token, transport)
  // const signParams = import.meta.env.VITE_UUID + ':' + import.meta.env.VITE_SECRET
  // const signEncrypted = await sha256(signParams)
  // const response = await client.list({
  //   token: import.meta.env.VITE_UUID,
  //   sign: signEncrypted
  // })
  // console.log('response:')
  // console.log(response)
}

const startScan = async () => {
  document.querySelector('body')?.classList.add('barcode-scanner-active')
  scanActive.value = true
  await BarcodeScanner.addListener(
    'barcodeScanned',
    async result => {
      console.log('startscan result:')
      console.log(result)
      await updateResult(result.barcode.displayValue)
      stopScan()
    }
  )
  await BarcodeScanner.startScan(scanOptions)
}
async function updateResult (val) {
  const product = new Token(val)

  const binData = product.toBinary()
  const asciiData = String.fromCharCode.apply(null, binData)
  console.log(asciiData)
  const decodeBinData = Uint8Array.from(asciiData, c => c.charCodeAt(0))
  const decodeProduct = Token.fromBinary(decodeBinData)
  console.log(`Decode product: ${JSON.stringify(decodeProduct)}`)
}

const stopScan = async () => {
  document.querySelector('body')?.classList.remove('barcode-scanner-active')
  scanActive.value = false
  await BarcodeScanner.removeAllListeners()
  await BarcodeScanner.stopScan()
}

onMounted(async () => {
  isMobile.value = await isSupported()
  if (isMobile.value) {
    await startScan()
  } else {
    await updateResult({token:'123', secret:'1245'})
  }
})

onBeforeUnmount(async () => {
  if (isMobile.value) {
    await stopScan()
  }
})
</script>

<style lang="scss">
</style>

