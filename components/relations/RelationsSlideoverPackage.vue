<script lang="ts" setup>
import type { RelationPackage } from '~/types/package'

const props = defineProps<{
  package: RelationPackage | null
}>()

const emits = defineEmits<{
  viewRelations: [string]
}>()

const open = defineModel<boolean>('open', { required: true })

const data = computed(() => [
  {
    title: 'UniHelper 依赖',
    items: props.package?.dependencies || [],
  },
  {
    title: 'UniHelper 开发依赖',
    items: props.package?.devDependencies || [],
  },
])
</script>

<template>
  <USlideover v-model:open="open" side="right">
    <template #header>
      <div class="flex items-center gap-2">
        <SmartIcon v-if="package?.icon" :name="package.icon" :size="20" />
        <span>{{ package?.name }}</span>
      </div>
      <p class="text-muted-foreground mt-1 text-sm">
        {{ package?.description }}
      </p>
    </template>

    <template #body>
      <div class="flex flex-col gap-4">
        <div v-for="value in data" :key="value.title">
          <p>{{ value.title }} ({{ value.items.length }}):</p>
          <ul v-if="value.items.length" class="list-disc pl-5 marker:text-muted-foreground">
            <li v-for="dep in value.items" :key="dep">
              <span class="flex items-center justify-between">
                <span class="text-sm">{{ dep }}</span>
                <UTooltip text="查看关系">
                  <UButton
                    size="xs"
                    color="neutral"
                    variant="ghost"
                    square
                    icon="lucide:play"
                    aria-label="查看关系"
                    @click="emits('viewRelations', dep)"
                  />
                </UTooltip>
              </span>
            </li>
          </ul>
          <p v-else class="mt-2 text-sm">
            <em>无依赖</em>
          </p>
        </div>
      </div>
    </template>
  </USlideover>
</template>
