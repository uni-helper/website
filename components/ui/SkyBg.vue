<script setup lang="ts">
import { kebabCase } from 'scule'

interface Star {
  x: number
  y: number
  size: number
  twinkleDelay: number
  id: string
}

const props = withDefaults(defineProps<{
  starCount?: number
  color?: string
  size?: { min: number, max: number }
  speed?: 'slow' | 'normal' | 'fast'
}>(), {
  starCount: 50,
  color: 'var(--primary)',
  size: () => ({
    min: 1,
    max: 3,
  }),
  speed: 'normal',
})

const route = useRoute()

// Stars are decorative but must render identically on the server and client.
// A small seeded PRNG keeps the layout stable without a hydration mismatch.
function hashString(value: string) {
  let hash = 2166136261
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6D2B79F5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function generateStars(count: number, seed: number): Star[] {
  const random = mulberry32(seed)

  return Array.from({ length: count }, (_, index) => {
    const x = Math.floor(random() * 100)
    const y = Math.floor(random() * 100)
    const size = random() * (props.size.max - props.size.min) + props.size.min
    const twinkleDelay = random() * 5

    return { x, y, size, twinkleDelay, id: `star-${index}` }
  })
}

// Generate all stars
const stars = useState<Star[]>(`${kebabCase(route.path)}-sky`, () => generateStars(props.starCount, hashString(route.path)))

// Compute twinkle animation duration based on speed
const twinkleDuration = computed(() => {
  const speedMap: Record<string, string> = {
    slow: '4s',
    normal: '2s',
    fast: '1s',
  }
  return speedMap[props.speed]
})
</script>

<template>
  <div class="absolute inset-0 pointer-events-none z-[-1] overflow-hidden">
    <div
      v-for="star in stars"
      :key="star.id"
      class="star absolute"
      :style="{
        'left': `${star.x}%`,
        'top': `${star.y}%`,
        'transform': 'translate(-50%, -50%)',
        '--star-size': `${star.size}px`,
        '--star-color': color,
        '--twinkle-delay': `${star.twinkleDelay}s`,
        '--twinkle-duration': twinkleDuration,
      }"
    />
  </div>
</template>

<style scoped>
.star {
  width: var(--star-size);
  height: var(--star-size);
  background-color: var(--star-color);
  border-radius: 50%;
  animation: twinkle var(--twinkle-duration) ease-in-out infinite;
  animation-delay: var(--twinkle-delay);
  will-change: opacity;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
}
</style>
