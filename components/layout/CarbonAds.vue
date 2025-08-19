<script setup lang="ts">
// 发邮件的函数
function handleClick() {
  window.open('mailto:flippedround@qq.com')
}
</script>

<template>
  <div
    class="border-border bg-background text-muted-foreground flex flex-col items-center rounded-lg border px-4 py-6 cursor-pointer"
    hover:bg-muted
    @click="handleClick"
  >
    {{ '成为赞助商' }}
  </div>
</template>

<style>
</style>
