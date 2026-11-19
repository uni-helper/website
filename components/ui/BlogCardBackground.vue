<script setup lang="ts">
type Background = 'tetris' | 'liquid' | 'aurora' | 'dither' | 'dotGrid'

const props = withDefaults(defineProps<{
  bg?: Background
}>(), {
  bg: 'liquid',
})

const root = useTemplateRef<HTMLElement>('root')
const visible = useElementVisibility(root)
</script>

<template>
  <div ref="root" class="absolute inset-0">
    <template v-if="visible">
      <UiLiquidBackground v-if="props.bg === 'liquid'" />
      <template v-if="props.bg === 'tetris'">
        <ClientOnly>
          <UiTetris
            class="h-full w-full mask-[radial-gradient(450px_circle_at_center,#00C16A,transparent)]"
            :base="15"
            square-color="#00C16A"
          />
        </ClientOnly>
      </template>
      <UiAurora v-if="props.bg === 'aurora'" />
      <UiDither
        v-if="props.bg === 'dither'"
        :wave-speed="0.05"
        :wave-frequency="3"
        :wave-amplitude="0.3"
        :wave-color="[0.5, 0.5, 0.5]"
        :color-num="4"
        :pixel-size="2"
        :disable-animation="false"
        :enable-mouse-interaction="true"
        :mouse-radius="1"
      />
      <UiDotGrid
        v-if="props.bg === 'dotGrid'"
        :dot-size="5"
        :gap="10"
        base-color="#333333"
        active-color="#27FF64"
        :proximity="40"
        :speed-trigger="100"
        :shock-radius="250"
        :shock-strength="5"
        :max-speed="5000"
        :resistance="750"
        :return-duration="1.5"
      />
    </template>
  </div>
</template>
