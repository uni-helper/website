<script lang="ts" setup>
const emits = defineEmits<{
  add: [string]
}>()

const input = defineModel<string>('input', { required: true })
const loading = defineModel<boolean>('loading', { required: true })

function add() {
  emits('add', input.value)
}
</script>

<template>
  <form class="grow mt-1 flex gap-2 items-start flex-col" @submit.prevent="add">
    <div class="text-sm text-muted-foreground">
      从 NPM 添加包
    </div>
    <div class=" flex gap-2 relative w-full items-center">
      <UiInput v-model="input" size="sm" type="text" placeholder="wot-design-uni..." class="pl-8" />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <SmartIcon name="simple-icons:npm" />
      </span>
      <UiButton :disabled="!input">
        <SmartIcon v-if="loading" name="ph:spinner" class="mr-1 animate-spin" />
        添加
      </UiButton>
    </div>
  </form>
</template>
