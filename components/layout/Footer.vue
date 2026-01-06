<script setup lang="ts">
const { footer } = useConfig().value

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
  <footer class="text-muted-foreground py-6 md:px-8 md:py-0">
    <div class="container flex flex-col items-center justify-between gap-2 md:h-16 md:flex-row">
      <MDC :value="$t(footer.credits)" class="text-sm" />
      <span class="flex-1" />
      <div class="flex flex-wrap gap-2 justify-center md:justify-end">
        <NuxtLinkLocale
          v-for="(link, i) in footer.links"
          :key="i"
          :to="link?.to"
          :target="link?.target"
        >
          <UiButton variant="ghost" :size="link?.icon && !link?.title ? 'icon' : 'default'" class="flex gap-2">
            <SmartIcon v-if="link?.icon" :name="link.icon" :size="20" />
            <span v-if="link?.title">{{ $t(link.title) }}</span>
          </UiButton>
        </NuxtLinkLocale>
      </div>
    </div>
    <div class="md:h-16 leading-16 text-sm flex justify-center items-center gap-x-6 flex-wrap [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4">
      <template v-if="isCN">
        <div>托管于 <a rel="noreferrer" href="https://cloud.tencent.com/product/teo" target="_blank"> Tencent Edgeone </a></div>
        <div class="flex items-center gap-2">
          <img src="/police.png" width="20">
          <a href="https://beian.mps.gov.cn/#/query/webSearch?code=44060402003023" rel="noreferrer" target="_blank">粤公网安备44060402003023号</a>
        </div>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
        >
          粤ICP备2025484369号
        </a>
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
