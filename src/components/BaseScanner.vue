<template>
    <div class="scanner">
<!--        <button v-if="lightSwitcher" class="scanner__light-button" :class="[isLightOn ? 'active' : '']" @click="onCameraLightButton" data-testid="button"/>-->
        <div class="scanner__wrapper">
            <div class="scanner__camera-preview" />
            <div class="scanner__border" :style="style">
            <!-- <div class="scanner__border" :style="{width: props.width, height: props.height}"> -->
                <img v-if="codeType === 'Code128'" src="../assets/images/scan-border-wide.png" alt="Scan border">
                <img v-else src="../assets/images/scan-border-square.png" alt="Scan border">
            </div>
        </div>
    </div>

</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** Переключение света */
  lightSwitcher: { type: Boolean, default: false },
  /** Ширина сканера */
  width: { type: String, default: '50%' },
  /** Высота сканера */
  height: { type: String, default: 'auto' },
  /** Вариант изображения кода */
  codeType: { type: String, default: 'Code128' }
})

const style = computed(() => {
  if (props.codeType === 'Code128') {
    return {
      width: '100%',
      height: 'auto',
      aspectRatio: 'auto'
    }
  } else {
    return {
      width: 'auto',
      height: 'calc(100% - 32px)',
      aspectRatio: '1/1'
    }
  }
})
</script>

<style lang="scss" scoped>
.scanner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    &__wrapper {
        position: relative;
        height: 100%;
        min-width: 100px;
        aspect-ratio: 1/1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__camera-preview {
        position: relative;
        width: 100%;
        aspect-ratio: 1/1;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    &__border {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        z-index: 10002;

        img {
            width: 100%;
            height: 100%;
        }
    }
}

@media (orientation: portrait) {
    .scanner {
        flex-direction: column;
        justify-content: center;

        &__light-button {
            margin-right: 0;
        }
    }
}
</style>
