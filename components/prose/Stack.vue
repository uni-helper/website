<template>
  <div class="bg-card text-card-foreground divide-border divide-y overflow-hidden rounded-xl border shadow [&:not(:first-child)]:mt-5">
    <div
      v-for="(slot, index) in $slots.default?.() ?? []"
      :key="index"
    >
      <component :is="slot" :in-stack="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineSlots()
</script>
