<script setup lang="ts">
const colorMode = useColorMode()

const images = computed(() => {
  return [
    `/create-uni/${colorMode.value}/gui_1.jpg`,
    `/create-uni/${colorMode.value}/gui_2.jpg`,
    `/create-uni/${colorMode.value}/gui_3.jpg`,
    `/create-uni/${colorMode.value}/gui_4.jpg`,
    `/create-uni/${colorMode.value}/gui_5.jpg`,
    `/create-uni/${colorMode.value}/gui_6.jpg`,
  ]
})
</script>

<template>
  <ClientOnly>
    <ui-expandable-gallery :images="images" />
  </ClientOnly>
</template>
