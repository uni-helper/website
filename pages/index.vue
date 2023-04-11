<script setup lang="ts">
const searchVal = ref("");
const hiddenRepos = new Set([
  ".github",
  "uni-helper.github.io",
  "discussions",
  "website",
  "renovate-config",
]);

const { data: repos } = await useFetch<any>(
  "https://ungh.cc/orgs/uni-helper/repos",
  {
    transform: (res: any) => {
      return res.repos
        .filter((repo: any) => !hiddenRepos.has(repo.name))
        .sort((a: any, b: any) => b.stars - a.stars);
    },
  }
);

const filterSearch = (repos: any) => {
  return repos.filter((repo: any) =>
    repo.name.toLowerCase().includes(searchVal.value.toLowerCase())
  );
};

useHead({
  title: "",
  meta: [
    { name: "description", content: "探索 Uni Helper 工具列表" },
  ],
});
</script>

<template>
  <div>
    <div>
      <input
        type="text"
        placeholder="搜索"
        v-model="searchVal"
        :disabled="repos.length <= 0"
        mb-4
        border
        dark:border-dark-200
        p-5
        text-xl
        w-full
        bg-light-100
        dark-bg-dark
      />
    </div>
    <div gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4>
      <ProjectCard
        v-for="repo in filterSearch(repos)"
        :key="repo.id"
        :repo="repo"
      />
    </div>
  </div>
</template>
