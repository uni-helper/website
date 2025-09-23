<script lang="ts" setup>
const open = defineModel<boolean>('open', { required: true })
</script>

<template>
  <UiDialog v-model:open="open">
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle>关于 Uni-Helper Relations</UiDialogTitle>
        <UiDialogDescription />
      </UiDialogHeader>
      <slot />
    </UiDialogContent>
  </UiDialog>
</template>
