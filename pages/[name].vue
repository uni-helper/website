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

useHead({
  title: repo.value?.name,
  meta: [{ name: 'description', content: repo.value?.description }],
})

const readmeRender = computed(() => {
  return readme.value?.html.replace(
    /src="\./g,
    `src="https://raw.githubusercontent.com/${repo.value?.repo}/main/.`,
  )
})
</script>

<template>
  <div>
    <NuxtLink
      :href="`https://github.com/${repo?.repo}`"
      target="_blank"

      mb-6 w-fit flex flex-wrap items-center gap-2 bg-light p-2 color-primary dark:bg-dark
      class="<md:w-full"
    >
      <span>在</span> <span i-carbon:logo-github inline-block /> 上查看
      <strong>{{ repo?.name }}</strong>
      &mdash;
      <span i-carbon:star inline-block />
      {{ formatStarCount(repo?.stars) }}
    </NuxtLink>
    <div mx-auto max-w-full text-base prose prose-truegray dark:prose-invert>
      <div v-html="readmeRender" />
    </div>
  </div>
</template>
