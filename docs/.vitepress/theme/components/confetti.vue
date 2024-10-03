<script setup lang="ts">
import confetti from 'canvas-confetti'
import { ref, onMounted} from 'vue'

const confettiFunc = ref<any>(null)

onMounted(async () => {
  const confettiModule = await import('canvas-confetti')
  confettiFunc.value = confettiModule.default
  if(confettiFunc.value) {
    confettiFunc.value({
      particleCount: 100,
      spread: 170,
      origin: { y: 0.6 },
    })
  }
})
</script>

<template>
  
</template>