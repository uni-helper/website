<script lang="ts" setup>
import type { PackageJson } from 'pkg-types'
import type { RelationPackage } from '~/types/package'
import { toast } from 'vue-sonner'
import { fetchGitHubRepo, fetchPackagesFromGitHubRepo } from '@/utils/github'

const open = defineModel<boolean>('open', { required: true })

const { npmPackages: packages, addNpmPackages, addNpmPackage, removeNpmPackage, removeAllNpmPackages } = useRelationsPackages()
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
    toast.success(`已添加 ${name} 包`)
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
      toast.error(error.message)
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
    toast.success(`已添加 ${packages.length} 个包`)
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
      toast.error(error.message)
    }
  }
  finally {
    githubLoading.value = false
  }
}

/**
 * Packages
 */
const hasRemove = ref(false)
function remove(item: RelationPackage) {
  hasRemove.value = true
  removeNpmPackage(item.name)
  selection.value = selection.value.filter(pkg => pkg.name !== item.name)
  toast.success(`已移除 ${item.name} 包`)
}

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
  if (hasRemove.value)
    updateQuery({ npm: selection.value.map(s => s.npmName) })

  hasRemove.value = false
  open.value = false
}
function validate() {
  updateQuery({ npm: selection.value.map(s => s.npmName) })
  hasRemove.value = false
  open.value = false
}
</script>

<template>
  <UiDialog v-model:open="open">
    <UiDialogContent class="w-full sm:max-w-lg md:max-w-2xl xl:max-w-5xl">
      <UiDialogHeader>
        <UiDialogTitle>管理 NPM 仓库</UiDialogTitle>
        <UiDialogDescription>
          在此处更改您的配置文件，完成后单击验证。
        </UiDialogDescription>
      </UiDialogHeader>
      <div class="flex flex-col lg:flex-row gap-4">
        <RelationsNpmForm v-model:loading="npmLoading" v-model:input="npmName" @add="addNpm" />
        <RelationsGitHubForm v-model:loading="githubLoading" v-model:input="githubName" @add="addGitHub" />
      </div>

      <RelationsPackagesCombobox v-model:selection="selection" :packages="packages" />

      <UiDialogFooter class="sm:justify-between w-full">
        <div class="flex gap-2">
          <UiButton size="sm" type="button" variant="ghost" c-red-400 hover="bg-red-950 c-red-400" @click="clear">
            清除选择
          </UiButton>
          <UiButton size="sm" type="button" variant="ghost" c-red-400 hover="bg-red-950 c-red-400" @click="removeAll">
            删除全部
          </UiButton>
        </div>
        <div class="flex gap-2">
          <UiDialogClose as-child>
            <UiButton size="sm" type="button" variant="ghost" @click="cancel">
              关闭
            </UiButton>
          </UiDialogClose>
          <UiDialogClose as-child>
            <UiButton size="sm" type="button" variant="default" @click="validate">
              验证
            </UiButton>
          </UiDialogClose>
        </div>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
