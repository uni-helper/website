<script setup lang="ts">
const route = useRoute();
const { data: repo } = await useFetch<any>(
  `https://ungh.cc/repos/uni-helper/${route.params.name}`
);
const { data: readme } = await useFetch<any>(
  `https://ungh.cc/repos/uni-helper/${route.params.name}/readme`
);

useHead({
  title: repo.value.repo.name,
  meta: [{ name: "description", content: repo.value.repo.description }],
});

const readmeRender = computed(() => {
  return readme.value?.html.replace(
    /src="\./g,
    `src="https://raw.githubusercontent.com/${repo.value.repo.repo}/main/.`
  );
});
</script>

<template>
  <div>
    <NuxtLink
      :href="`https://github.com/${repo.repo.repo}`"
      target="_blank"
      flex
      items-center
      mb-6
      p-2
      bg-light
      dark:bg-dark
      color-primary
      w-fit
      gap-2
      class="<md:w-full"
      ><span>在</span> Github 上查看 <strong>{{ repo.repo.name }}</strong>
      <div i-carbon:logo-github></div>
      &mdash;
      <div i-carbon:star></div>
      stars
      {{ formatStarCount(repo.repo.stars) }}
    </NuxtLink>
    <div text-base prose prose-truegray dark:prose-invert mx-auto max-w-full>
      <div v-html="readmeRender" />
    </div>
  </div>
</template>
