<script lang="ts" setup>
const open = defineModel<boolean>('open', { required: true })

const { uniHelperPackages: packages } = useRelationsPackages()
const { uniHelperSelection } = useRelationsSelection()
const { updateQuery } = useRelationsQuery()

const selection = ref([...uniHelperSelection.value])

watch(() => uniHelperSelection.value, (value) => {
  selection.value = [...value]
})

function clear() {
  selection.value = []
}

function cancel() {
  open.value = false
}

function validate() {
  updateQuery({ uniHelper: selection.value.map(s => s.npmName) })
  open.value = false
}

function selectAll() {
  selection.value = [...packages.value]
}
</script>

<template>
  <UModal v-model:open="open" :ui="{ content: 'w-full sm:max-w-lg md:max-w-2xl xl:max-w-5xl' }">
    <template #header>
      <span>管理 UniHelper 仓库</span>
      <p class="text-muted-foreground mt-1 text-sm">在此处更改您的配置文件，完成后单击验证。</p>
    </template>
    <template #body>

      <RelationsPackagesCombobox v-model:selection="selection" :packages="packages" />

    </template>

    <template #footer>
      <div class="flex w-full justify-between">
        <div class="flex gap-2">
          <UButton size="sm" type="button" color="error" variant="ghost" @click="clear">
            清除选择
          </UButton>
          <UButton size="sm" type="button" color="neutral" variant="outline" @click="selectAll">
            全选
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
