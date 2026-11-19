<script setup lang="ts">
withDefaults(defineProps<{
  links: any[]
  activeId: string
  level?: number
}>(), {
  level: 0,
})
</script>

<template>
  <ul :class="level > 0 && 'pl-4'">
    <li v-for="link in links" :key="link.id" class="relative">
      <a
        :href="`#${link.id}`"
        class="block py-1 pl-4.5 transition-colors"
        :class="link.id === activeId ? 'text-primary' : 'text-muted-foreground hover:text-primary'"
      >
        <span
          v-if="link.id === activeId"
          class="bg-border absolute inset-y-0 left-0 w-px"
          aria-hidden="true"
        />
        {{ link.text }}
      </a>
      <LayoutTocList
        v-if="link.children?.length"
        :links="link.children"
        :active-id="activeId"
        :level="level + 1"
      />
    </li>
  </ul>
</template>
