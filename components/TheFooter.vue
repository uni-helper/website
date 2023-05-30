<template>
  <footer border="t dark:dark-200">
    <div m-auto max-w-140ch flex items-center justify-between gap-4 p="4 <sm:x-2">
      <div>
        <NuxtLink href="https://github.com/orgs/uni-helper/people" target="_blank" hover:color-primary>
          &copy;Uni Helper Team
        </NuxtLink>
      </div>
      <div flex items-center gap-4>
        <NuxtLink
          href="https://qm.qq.com/cgi-bin/qm/qr?k=hZdEls2BYb9ZPIaXBxZoNnVwthtJKvcP&jump_from=webapi&authKey=X2GTdlKc1MHuTraaQ3q7TXTOwYo0R0cMoU6B9/OKkBTjLckze7u5BR5NlrnHjTss"
          target="_blank" aria-label="加入QQ群" hover:color-primary
        >
          <div i-ri:qq-fill />
        </NuxtLink>
        <NuxtLink
          href="https://github.com/orgs/uni-helper/discussions" target="_blank" aria-label="Discussions"
          hover:color-primary
        >
          <div i-ri:discuss-fill />
        </NuxtLink>
        <NuxtLink
          href="https://github.com/uni-helper/website" target="_blank" aria-label="Contribution"
          hover:color-primary
        >
          <div i-carbon:logo-github />
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
