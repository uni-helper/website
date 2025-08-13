<script setup lang="ts">
// Reviews data
const reviews = [
  {
    name: '不如摸鱼去',
    username: '@wot-design-uni',
    body: 'uni-app 有你们是它的三生修来的福分',
    img: 'https://avatars.githubusercontent.com/u/26426873?v=4',
  },
  {
    name: 'Epiphany',
    username: '@User',
    body: '自从用了 uni-helper，我感觉自己不是在驾驭 uniapp，而是在遛 uniapp。它让我往东，它不敢往西',
    img: 'https://inspira-ui.com/images/x-logo.svg',
  },
  {
    name: 'Mattia Guariglia',
    username: '@matt_guariglia',
    body: 'Omg 🥰',
    img: 'https://inspira-ui.com/images/x-logo.svg',
  },
  {
    name: 'Nelson🐐',
    username: '@Mathiasokafor3',
    body: 'Thank you so much for all you do for the Vue/nuxt eco system.',
    img: 'https://inspira-ui.com/images/x-logo.svg',
  },
  {
    name: 'Premdas Vm',
    username: '@premdasvm',
    body: 'Man, this is soo good! I\'ve been jealous of React because their eco-system had Magic UI and other ones like this. Inspira UI is 🔥🙌🏼',
    img: 'https://inspira-ui.com/images/x-logo.svg',
  },
  {
    name: 'Pierre',
    username: '@PierreHenryBap',
    body: 'It looks really awesome! Just noticed it a couple of days ago and I can’t wait to try it out.',
    img: 'https://inspira-ui.com/images/x-logo.svg',
  },
  {
    name: 'Waldemar Enns',
    username: '@WaldemarEnns',
    body: 'Awesome! ⭐️ed it immediately',
    img: 'https://inspira-ui.com/images/x-logo.svg',
  },
]

// Rows
const firstRow = ref(reviews)
</script>

<template>
  <div class="flex w-full max-w-7xl flex-col items-center justify-center p-4">
    <div class="py-12 text-5xl font-semibold">
      深受社区喜爱<span class="text-4xl"> ❤️</span>
    </div>
    <div
      class="relative h-[430px] w-full overflow-hidden rounded-xl border bg-white shadow-lg dark:bg-background"
    >
      <!-- Center Text -->
      <div
        class="absolute inset-0 z-10 mt-10 flex flex-col items-center justify-center px-4 text-center"
      >
        <h3 class="mb-2 text-4xl font-bold sm:text-5xl">
          你还在等待什么？
        </h3>
        <p class="m-4 text-base sm:text-lg">
          开始构建现代化的 Uni App 😄
        </p>
        <NuxtLink to="/packages">
          <UiInteractiveHoverButton
            text="进入"
          />
        </NuxtLink>
      </div>

      <!-- Tilted Marquees -->
      <div class="absolute inset-0 overflow-hidden">
        <UiMarquee
          :style="{ transform: 'translateY(-11.5rem) rotate(-16deg)' }"
          class="marquee"
          :pause-on-hover="false"
        >
          <UiReviewCard
            v-for="review in firstRow"
            :key="review.username"
            :img="review.img"
            :name="review.name"
            :username="review.username"
            :body="review.body"
          />
        </UiMarquee>

        <UiMarquee
          :style="{ transform: 'translateY(1rem) rotate(-16deg)' }"
          reverse
          class="marquee"
          :pause-on-hover="false"
        >
          <UiReviewCard
            v-for="review in firstRow"
            :key="review.username"
            :img="review.img"
            :name="review.name"
            :username="review.username"
            :body="review.body"
          />
        </UiMarquee>

        <UiMarquee
          :style="{ transform: 'translateY(13.5rem) rotate(-16deg)' }"
          class="marquee"
          :pause-on-hover="false"
        >
          <UiReviewCard
            v-for="review in firstRow"
            :key="review.username"
            :img="review.img"
            :name="review.name"
            :username="review.username"
            :body="review.body"
          />
        </UiMarquee>

        <UiMarquee
          :style="{ transform: 'translateY(26rem) rotate(-16deg)' }"
          reverse
          class="marquee"
          :pause-on-hover="false"
        >
          <UiReviewCard
            v-for="review in firstRow"
            :key="review.username"
            :img="review.img"
            :name="review.name"
            :username="review.username"
            :body="review.body"
          />
        </UiMarquee>
      </div>

      <!-- Gradient overlay to fade to white at the bottom -->
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-t from-white to-transparent dark:from-background"
      />
    </div>
  </div>
</template>

<style scoped>
.marquee {
  --duration: 40s;
  position: absolute;
  left: -10%;
  width: 120%;
  padding: 0.5rem 0;
}
</style>
