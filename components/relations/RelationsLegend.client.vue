<script lang="ts" setup>
const legend = [{
  color: 'bg-brand-soft ring-brand dark:bg-brand-deep dark:ring-brand',
  text: '已选择的包',
}, {
  color: 'bg-cyan-300 ring-cyan-500 dark:bg-cyan-900 dark:ring-cyan-600',
  text: 'uni-helper 包',
}, {
  color: 'bg-pink-300 ring-pink-500 dark:bg-pink-900 dark:ring-pink-800',
  text: '生产依赖项（实线）',
}, {
  color: 'bg-purple-300 ring-purple-500 dark:bg-purple-900 dark:ring-purple-800',
  text: '开发依赖项（虚线）',
}]
</script>

<template>
  <div>
    <div class="bg-card text-card-foreground grid grid-cols-2 rounded-xl border p-4 shadow sm:p-4">
      <template v-for="item in legend" :key="item.text">
        <div class="flex items-center gap-2">
          <span class="block rounded-full w-2 h-2 ring-1" :class="item.color" />
          <span class="text-sm text-muted-foreground"> {{ item.text }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
