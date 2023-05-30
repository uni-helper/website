<template>
  <footer border="t dark:dark-200" color-gray>
    <div flex="~ col" items-center gap-2 p="4 <sm:x-2">
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

      <div>
        <NuxtLink href="https://github.com/orgs/uni-helper/people" target="_blank" hover:color-primary>
          Copyright &copy; PRESENT Uni Helper Team
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
