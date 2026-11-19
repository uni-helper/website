<script lang="ts" setup>
const open = defineModel<boolean>('open', { required: true })
</script>

<template>
  <UModal v-model:open="open">
    <template #header>
      <span>关于 Uni-Helper Relations</span>
    </template>
    <template #body>
      <slot />
    </template>
  </UModal>
</template>
