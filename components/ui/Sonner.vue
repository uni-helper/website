<script lang="ts" setup>
import type { ToasterProps } from 'vue-sonner'
import { Toaster as Sonner } from 'vue-sonner'
import 'vue-sonner/style.css'

const props = defineProps<ToasterProps>()
</script>

<template>
  <Sonner
    class="toaster group"
    v-bind="props"
    :style="{
      '--normal-bg': 'hsl(var(--popover))',
      '--normal-text': 'hsl(var(--popover-foreground))',
      '--normal-border': 'hsl(var(--border))',
    }"
  />
</template>
