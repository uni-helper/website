<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  icon?: string
  type?: 'default' | 'info' | 'note' | 'warning' | 'success' | 'danger' | 'secondary'
  to?: string
  target?: string
  inStack?: boolean
}>(), {
  title: '',
  icon: '',
  type: 'default',
  to: '',
  target: '',
  inStack: false,
})

const color = computed(() => {
  switch (props.type) {
    case 'info':
    case 'note': return 'info'
    case 'warning': return 'warning'
    case 'success': return 'success'
    case 'danger': return 'error'
    default: return 'neutral'
  }
})

const variant = computed(() => props.type === 'default' || props.type === 'secondary' ? 'outline' : 'subtle')

const borderClass = computed(() => {
  switch (props.type) {
    case 'info': return 'border-info-500/50'
    case 'warning': return 'border-warning-500/50'
    case 'success': return 'border-success-500/50'
    case 'danger': return 'border-error-500/50'
    default: return ''
  }
})
</script>

<template>
  <NuxtLink v-if="to" :to :target>
    <UAlert
      :title="title"
      :icon="icon"
      :color="color"
      :variant="variant"
      class="border"
      :class="[borderClass, inStack && 'rounded-none border-0 shadow-none']"
    >
      <slot />
    </UAlert>
  </NuxtLink>
  <UAlert
    v-else
    :title="title"
    :icon="icon"
    :color="color"
    :variant="variant"
    class="border"
    :class="[borderClass, inStack && 'rounded-none border-0 shadow-none']"
  >
    <slot />
  </UAlert>
</template>
