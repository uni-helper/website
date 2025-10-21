<script setup lang="ts">
</script>

<template>
  <div class="m-4 mt-20 text-md flex flex-col items-center">
    <UiSparklesText
      text="免费 &amp; 开源"
      :colors="{ first: '#9E7AFF', second: '#FE8BBB' }"
      :sparkles-count="10"
      class="my-8 text-nowrap"
    />
    <div class="text-center opacity-65">
      <div>
        Uni Helper 基于 MIT 许可发布，并将始终保持免费和开源。
      </div>
      <div>
        社区的赞助和贡献使其成为可能
      </div>
    </div>
  </div>
  <NuxtLinkLocale to="/about" class="sponsor-btn">
    <UiRainbowButton>
      成为赞助商 <span class="text-red-500 ml-1">♥️</span>
    </UiRainbowButton>
  </NuxtLinkLocale>
</template>
