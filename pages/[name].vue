<script setup lang="ts">
import '~/assets/css/github-light.css'
import '~/assets/css/github-dark.css'

const route = useRoute()
const repoName = route.params.name

const { data: repo } = await useFetch<any>(
  `https://ungh.cc/repos/uni-helper/${repoName}`,
  {
    transform: (res: any) => {
      return res.repo
    },
  },
)

if (!repo.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `The '${repoName}' Project Not Found`,
  })
}

const { data: readme } = await useFetch<any>(
  `https://ungh.cc/repos/uni-helper/${repoName}/readme`,
)

const seoMeta = computed(() => createSeoMetaInput(repo.value))
useSeoMeta(seoMeta.value)

function renderReadme(html: string) {
  return html.replace(
    /((?:src)|(?:href))="(?!http|#)\.?\/?([^"]*)"/gm,
    (_: string, $1: string, $2: string) => {
      if ($1 === 'src')
        return `${$1}="https://raw.githubusercontent.com/${repo.value?.repo}/main/${$2}"`

      return `${$1}="https://github.com/${repo.value?.repo}/blob/main/${$2}"`
    },
  )
}
</script>

<template>
  <div>
    <NuxtLink
      :href="`https://github.com/${repo?.repo}`" target="_blank" mb-6 w-fit flex flex-wrap items-center gap-2
      bg-light p-2 color-primary dark:bg-dark class="<md:w-full"
    >
      <span>在</span> <span i-carbon:logo-github inline-block /> 上查看
      <strong>{{ repo?.name }}</strong>
      &mdash;
      <span i-carbon:star inline-block />
      {{ formatStarCount(repo?.stars) }}
    </NuxtLink>
    <div mx-auto max-w-full text-base prose prose-truegray dark:prose-invert>
      <div v-html="renderReadme(readme.html)" />
    </div>
  </div>
</template>
