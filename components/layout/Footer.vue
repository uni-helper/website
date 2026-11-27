<script setup lang="ts">
const config = useAppConfig()

const isCN = computed(() => {
  if (typeof window === 'undefined')
    return false

  const hostname = window.location.hostname
  return hostname === 'uni-helper.cn' || hostname.endsWith('.uni-helper.cn')
})
const isNetlify = computed(() => {
  if (typeof window === 'undefined')
    return false
  const hostname = window.location.hostname
  return hostname === 'uni-helper.js.org' || hostname.endsWith('.uni-helper.js.org')
})
const isCloudflare = computed(() => {
  if (typeof window === 'undefined')
    return false
  const hostname = window.location.hostname
  return hostname === 'uni-helper.pages.dev' || hostname.endsWith('.uni-helper.pages.dev')
})
</script>

<template>
  <footer class="text-muted-foreground py-6 md:py-0">
    <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 md:h-16 md:flex-row md:px-8">
      <span class="text-sm">
        This site is powered by
        <a :href="config.footer.creditsLink" target="_blank" rel="noreferrer" class="font-semibold underline underline-offset-4">Nuxt</a>
      </span>
      <span class="flex-1" />
      <div class="flex flex-wrap justify-center gap-2 md:justify-end">
        <UButton
          v-for="link in config.footer.links"
          :key="link.to"
          :to="link.to"
          :target="link.target"
          color="neutral"
          variant="ghost"
          square
          :aria-label="link.icon"
        >
          <SmartIcon :name="link.icon" :size="20" />
        </UButton>
      </div>
    </div>
    <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 px-4 text-sm leading-16 md:h-16 md:px-8 [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4">
      <template v-if="isCN">
        <div>托管于 <a rel="noreferrer" href="https://cloud.tencent.com/product/teo" target="_blank"> Tencent Edgeone </a></div>
        <div class="flex items-center gap-2">
          <img src="/police.png" width="20" alt="">
          <a href="https://beian.mps.gov.cn/#/query/webSearch?code=44060402003023" rel="noreferrer" target="_blank">粤公网安备44060402003023号</a>
        </div>
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">粤ICP备2025484369号</a>
      </template>
      <template v-else-if="isNetlify">
        <div>托管于 <a rel="noreferrer" href="https://netlify.com" target="_blank"> Netlify </a></div>
      </template>
      <template v-else-if="isCloudflare">
        <div>托管于 <a rel="noreferrer" href="https://www.cloudflare.com/" target="_blank"> Cloudflare </a></div>
      </template>
    </div>
  </footer>
</template>
