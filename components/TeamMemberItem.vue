<script setup lang="ts">
import type { Member } from '~/types'

defineProps<{ member: Member }>()
</script>

<template>
  <div text-center>
    <img
      loading="lazy" width="100" height="100" m-auto h-25 min-h-25 min-w-25 w-25 rounded-full :src="member.avatar"
      :alt="member.name"
    >
    <div mb-1 mt-2 text-xl>
      {{ member.name }}
    </div>
    <div h-50px op60>
      {{ member.bio ?? '这个人很懒，什么都没留下' }}
    </div>
    <div flex="~ inline gap-2" py-2>
      <a
        v-if="member.blog"
        class="i-mdi-web mya inline-block text-current op30 transition duration-200 hover:text-primary hover:op100"
        :href="member.blog" target="_blank" rel="noopener noreferrer" :aria-label="`${member.name}'s blog`"
      />
      <a
        class="i-carbon-logo-github mya inline-block text-current op30 transition duration-200 hover:text-primary hover:op100"
        :href="member.htmlUrl" target="_blank" rel="noopener noreferrer" :aria-label="`${member.name} on GitHub`"
      />
      <a
        v-if="member.twitter"
        class="i-carbon-logo-twitter mya inline-block text-current op30 transition duration-200 hover:text-primary hover:op100"
        :href="`https://twitter.com/${member.twitter}`" target="_blank" rel="noopener noreferrer"
        :aria-label="`${member.name} on Twitter`"
      />
    </div>
  </div>
</template>
