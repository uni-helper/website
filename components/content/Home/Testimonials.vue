<script setup lang="ts">
// Reviews data
const reviews = [
  {
    name: 'Epiphany',
    username: '@User',
    body: '自从用了 uni-helper，我感觉自己不是在驾驭 uniapp，而是在遛 uniapp。它让我往东，它不敢往西',
    img: 'https://github.com/Epiphany.png',
  },
  {
    name: '不如摸鱼去',
    username: '@wot-design-uni',
    body: 'uni-app 有你们是它的三生修来的福分',
    img: 'https://github.com/Moonofweisheng.png',
  },
  {

    name: 'Sunpm',
    username: '@高级炒饭技术专家',
    body: '你们是群用爱发电的开源者，uni-app 因为你们而更美好，Respect!!!',
    img: 'https://github.com/sunpm.png',
  },
  {
    name: '陈随易',
    username: '前端之虎陈随易',
    body: '我用 uni-helper 开发了一个小程序，它的性能非常好，我很满意',
    img: 'https://github.com/chenbimo.png',
  },
  {
    name: 'sKy',
    username: 'skiyee',
    body: 'uni-helper 使我旋转',
    img: 'https://github.com/skiyee.png',
  },
  {
    name: '辛宝Otto',
    username: 'Otto-J',
    body: '喔，做得很棒，支持',
    img: 'https://github.com/Otto-J.png',
  },
  {
    name: 'Sunpm',
    username: '@高级炒饭技术专家',
    body: '天不生 uni-helper，uni-app 万古长如夜',
    img: 'https://github.com/sunpm.png',
  },
  {
    name: 'sKy',
    username: 'skiyee',
    body: 'uni-helper 使我旋转',
    img: 'https://github.com/skiyee.png',
  },
  {
    name: 'xiaohe0601',
    username: '@xiaohe0601',
    body: 'uni-helper 让 uni-app 拥有了现代化的 Web 开发体验',
    img: 'https://github.com/xiaohe0601.png',
  },
]

// Rows
const firstRow = ref(reviews)
</script>

<template>
  <div class="flex w-full max-w-7xl flex-col items-center justify-center p-4">
    <h2 class="py-12 uh-type-display text-nowrap">
      深受社区喜爱<span> ❤️</span>
    </h2>
    <div
      class="relative h-[430px] w-full overflow-hidden rounded-xl border bg-card shadow-lg"
    >
      <!-- Center Text -->
      <div
        class="absolute inset-0 z-10 mt-10 flex flex-col items-center justify-center px-4 text-center"
      >
        <h3 class="mb-2 uh-type-heading-1">
          你还在等待什么？
        </h3>
        <p class="m-4 uh-type-body">
          开始构建现代化的 uni-app 😄
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
        class="pointer-events-none absolute inset-0 bg-linear-to-t from-background to-transparent"
      />
    </div>
    <div class="text-sm text-muted-foreground self-end pt-0.5">
      信息收集自互联网，如果有错误或侵权，请联系我们删除
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
