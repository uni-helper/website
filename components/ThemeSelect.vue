<script setup lang="ts">
const colorMode = useColorMode()
function onClick() {
  const values = ['system', 'light', 'dark']
  const index = values.indexOf(colorMode.preference)
  const next = (index + 1) % values.length
  colorMode.preference = values[next]
}
</script>

<template>
  <button cursor-pointer aria-label="切换主题" @click="onClick">
    <ColorScheme placeholder="...">
      <template v-if="colorMode.preference === 'dark'">
        <div class="i-carbon:moon mr-1" />
      </template>
      <template v-else-if="colorMode.preference === 'light'">
        <div class="i-carbon:sun mr-1" />
      </template>
      <template v-else>
        <div class="i-app:color-mode mr-1" />
      </template>
    </ColorScheme>
  </button>
</template>
