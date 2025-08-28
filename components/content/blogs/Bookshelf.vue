<script setup lang="ts">
defineProps<{ blogs: {
  title: string
  description: string
  to: string
  footer: string
  bg?: 'tetris' | 'liquid' | 'aurora'
  author?: string
}[] }>()
</script>

<template>
  <div
    class="group grid gap-4 [&:not(:first-child)]:mt-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
  >
    <UiBlogCard
      v-for="blog in blogs"
      :key="blog.title"
      :title="blog.title"
      :description="blog.description"
      :to="blog.to"
      :footer="blog.footer"
      :bg="blog.bg"
      :author="blog.author"
    />
  </div>
</template>
