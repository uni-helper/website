<template>
  <div class="bg-card text-card-foreground divide-border divide-y overflow-hidden rounded-lg border shadow-sm [&:not(:first-child)]:mt-5">
    <div
      v-for="(child, index) in $slots.default?.() ?? []"
      :key="index"
    >
      <!-- 显式克隆 vnode 传 inStack，不依赖组件对未知属性的透传 -->
      <component :is="cloneVNode(child, { inStack: true })" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { cloneVNode } from 'vue'

defineSlots()
</script>
