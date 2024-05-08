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
import { CapacitorHttp } from '@capacitor/core';
import { ref, onMounted, onBeforeUnmount } from 'vue'
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

async function checkLocal () {
  const options = {
    url: 'http://www.peterpet.ru/kot-pjot-iz-pod-krana',
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

const startScan = async () => {
  document.querySelector('body')?.classList.add('barcode-scanner-active')
  scanActive.value = true
  await BarcodeScanner.addListener(
    'barcodeScanned',
    async result => {
      console.log(result)
      result.value = result
      await updateResult(result.barcode)
      stopScan()
    }
  )
  await BarcodeScanner.startScan(scanOptions)
}

async function updateResult (val) {
  console.log(val.bytes)
  console.log(val.displayValue)
  console.log(val.rawValue)
  console.log(val.bytes.toString())
  console.log(val.displayValue.toString())
  console.log(val.rawValue.toString())
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
    await updateResult('Ошибка сканирования этикетки')
  }
})

onBeforeUnmount(async () => {
  if (isMobile.value) {
    await stopScan()
  }
})
</script>

<style lang="scss">
// Hide all elements
body.barcode-scanner-active {
  visibility: hidden;
}

// Show only the barcode scanner modal
.barcode-scanner-modal {
  visibility: visible;
}

.start-scan-page {
  width: 100%;
  height: 100%;
  padding: 48px;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;

  p {
    line-height: 48px;
    font-size: 16px;
    margin-bottom: 24px;
    color: $text;
    visibility: visible;
    z-index: 10010;
    text-align: center;
  }
}

.start-scanner-wrapper {
  width: 100%;
  height: calc(100% - 48px - 24px);
  position: relative;

  .scanner {
    visibility: visible;
    &__wrapper {
      width: 100%;
      height: 100%;
      aspect-ratio: auto;
    }

    &__camera-preview {
      height: 100%;
      border-radius: 12px;
      box-shadow: 0 0 0 100vmax #ededed;
    }

    &__border {
      aspect-ratio: 1/1;
    }
  }
}
</style>

