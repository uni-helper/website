<script lang="ts" setup>
import type { RelationPackage } from '~/types/package'

const props = defineProps<{
  package: RelationPackage | null
}>()

const emits = defineEmits<{
  viewRelations: [string]
}>()

const open = defineModel<boolean>('open', { required: true })

const data = computed(() => {
  return [
    {
      title: 'UniHelper 依赖',
      items: props.package?.dependencies || [],
    },
    {
      title: 'UniHelper 开发依赖',
      items: props.package?.devDependencies || [],
    },
  ]
})
</script>

<template>
  <UiSheet v-model:open="open" side="right">
    <UiSheetContent v-if="package">
      <UiSheetHeader>
        <UiSheetTitle class="flex items-center">
          <SmartIcon v-if="package.icon" :name="package.icon" class="mr-2" />
          {{ package.name }}
        </UiSheetTitle>
        <UiSheetDescription>
          {{ package.description }}
        </UiSheetDescription>
      </UiSheetHeader>
      <div class="py-4 flex flex-col gap-4">
        <UiTooltipProvider>
          <div v-for="value in data" :key="value.title">
            <p>
              {{ value.title }} ({{ value.items.length }}):
            </p>
            <ul v-if="value.items.length" class="list-disc pl-5 marker:text-muted-foreground">
              <li v-for="dep in value.items" :key="dep">
                <span class=" flex items-center justify-between">
                  <span class="text-sm">
                    {{ dep }}
                  </span>
                  <span class=" flex gap-2">
                    <UiTooltip>
                      <UiTooltipTrigger as-child>
                        <ButtonLink
                          size="icon" left-icon="i-heroicons-play" variant="ghost"
                          @click="emits('viewRelations', dep)"
                        />
                      </UiTooltipTrigger>
                      <UiTooltipContent>
                        查看关系
                      </UiTooltipContent>
                    </UiTooltip>
                  </span>
                </span>
              </li>
            </ul>
            <p v-else class="mt-2 text-sm">
              <em>
                无依赖
              </em>
            </p>
          </div>
        </UiTooltipProvider>
      </div>
    </UiSheetContent>
  </UiSheet>
</template>
