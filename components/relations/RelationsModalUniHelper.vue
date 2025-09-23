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
  <UiDialog v-model:open="open">
    <UiDialogContent class="w-full sm:max-w-lg md:max-w-2xl xl:max-w-5xl">
      <UiDialogHeader>
        <UiDialogTitle>管理 UniHelper 仓库</UiDialogTitle>
        <UiDialogDescription>
          在此处更改您的配置文件，完成后单击验证。
        </UiDialogDescription>
      </UiDialogHeader>

      <RelationsPackagesCombobox v-model:selection="selection" :packages="packages" />

      <UiDialogFooter class="sm:justify-between w-full">
        <div class="flex gap-2">
          <UiButton size="sm" type="button" variant="destructive" @click="clear">
            清除选择
          </UiButton>
          <UiButton size="sm" type="button" variant="outline" @click="selectAll">
            全选
          </UiButton>
        </div>
        <div class="flex gap-2">
          <UiDialogClose as-child>
            <UiButton size="sm" type="button" variant="secondary" @click="cancel">
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
