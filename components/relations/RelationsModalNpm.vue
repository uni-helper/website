<script lang="ts" setup>
import type { PackageJson } from 'pkg-types'
import { fetchGitHubRepo, fetchPackagesFromGitHubRepo } from '@/utils/github'

const open = defineModel<boolean>('open', { required: true })
const toast = useToast()

const { npmPackages: packages, addNpmPackages, addNpmPackage, removeAllNpmPackages } = useRelationsPackages()
const { npmSelection } = useRelationsSelection()
const { updateQuery } = useRelationsQuery()

const selection = ref([...npmSelection.value])

watch(() => npmSelection.value, (value) => {
  selection.value = [...value]
})

/**
 * npm
 */
const npmLoading = ref(false)
const npmName = ref('')
async function addNpm(name: string) {
  name = name.trim().toLowerCase()
  try {
    npmLoading.value = true
    const npmPackage = await fetchNpmPackage(name)
    addNpmPackage(npmPackage)
    npmName.value = ''
    toast.add({ title: `已添加 ${name} 包`, color: 'success' })
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
      toast.add({ title: error.message, color: 'error' })
    }
  }
  finally {
    npmLoading.value = false
  }
}

/**
 * GitHub
 */
const githubLoading = ref(false)
const githubName = ref('')
async function addGitHub(name: string) {
  name = name.trim().toLowerCase()
  const isSingleRepo = name.includes('/')

  const packages: PackageJson[] = []
  try {
    githubLoading.value = true

    if (isSingleRepo) {
      const { repo } = await fetchGitHubRepo(name)
      const githubPackages = await fetchPackagesFromGitHubRepo(repo.repo, repo.defaultBranch)
      packages.push(...githubPackages)
    }
    else {
      const { repos } = await fetchGitHubRepos(name)
      const githubPackages = await Promise.all(repos.map(async (repo) => {
        return await fetchPackagesFromGitHubRepo(repo.repo, repo.defaultBranch)
      }))
      packages.push(...githubPackages.flat())
    }

    addNpmPackages(packages)

    githubName.value = ''
    toast.add({ title: `已添加 ${packages.length} 个包`, color: 'success' })
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
      toast.add({ title: error.message, color: 'error' })
    }
  }
  finally {
    githubLoading.value = false
  }
}

/**
 * Packages
 */
/**
 * Footer functions
 */
function clear() {
  selection.value = []
}
function removeAll() {
  removeAllNpmPackages()
  selection.value = []
}
function cancel() {
  open.value = false
}
function validate() {
  updateQuery({ npm: selection.value.map(s => s.npmName) })
  open.value = false
}
</script>

<template>
  <UModal v-model:open="open" :ui="{ content: 'w-full sm:max-w-lg md:max-w-2xl xl:max-w-5xl' }">
    <template #header>
      <span>管理 NPM 仓库</span>
      <p class="text-muted-foreground mt-1 text-sm">在此处更改您的配置文件，完成后单击验证。</p>
    </template>
    <template #body>
      <div class="flex flex-col lg:flex-row gap-4">
        <RelationsNpmForm v-model:loading="npmLoading" v-model:input="npmName" @add="addNpm" />
        <RelationsGitHubForm v-model:loading="githubLoading" v-model:input="githubName" @add="addGitHub" />
      </div>

      <RelationsPackagesCombobox v-model:selection="selection" :packages="packages" />

    </template>

    <template #footer>
      <div class="flex w-full justify-between">
        <div class="flex gap-2">
          <UButton size="sm" type="button" color="error" variant="ghost" @click="clear">
            清除选择
          </UButton>
          <UButton size="sm" type="button" color="error" variant="ghost" @click="removeAll">
            删除全部
          </UButton>
        </div>
        <div class="flex gap-2">
          
            <UButton size="sm" type="button" color="neutral" variant="ghost" @click="cancel">
              关闭
            </UButton>
          
          
            <UButton size="sm" type="button" color="neutral" variant="solid" @click="validate">
              验证
            </UButton>
          
        </div>
      </div>
    </template>
  </UModal>
</template>
