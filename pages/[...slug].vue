<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <DocsPage :path="route.path" />
</template>
