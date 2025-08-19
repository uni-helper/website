<script setup lang="ts">
const colorMode = useColorMode()

const images = computed(() => {
  return [
    `/create-uni/${colorMode.value}/gui_1.png`,
    `/create-uni/${colorMode.value}/gui_2.png`,
    `/create-uni/${colorMode.value}/gui_3.png`,
    `/create-uni/${colorMode.value}/gui_4.png`,
    `/create-uni/${colorMode.value}/gui_5.png`,
    `/create-uni/${colorMode.value}/gui_6.png`,
  ]
})
</script>

<template>
  <ClientOnly>
    <ui-expandable-gallery :images="images" />
  </ClientOnly>
</template>
