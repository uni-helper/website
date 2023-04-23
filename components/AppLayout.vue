<template>
  <div min-h-screen flex flex-col>
    <header sticky top-0 z-2 border-b bg-inherit bg-light-100 dark:border-dark-200 dark:bg-dark-800>
      <div mx-auto flex items-center justify-between py-2 container sm:py-4 class="<sm:p-3">
        <div flex items-center>
          <NuxtLink href="/" mr-2 aria-label="Uni Helper Logo">
            <div i-app-logo text-8 sm:text-12 />
          </NuxtLink>
          <div>
            <NuxtLink href="/">
              <div font-bold sm:text-xl>
                <h1 v-if="$route.path === '/'">
                  Uni Helper
                </h1>
                <div v-else>
                  Uni Helper
                </div>
              </div>
            </NuxtLink>
            <p flex items-center gap-2 text-3 md:text-4>
              <span>旨在增强 uni-app 系列产品的开发体验</span>
            </p>
          </div>
        </div>
        <div flex items-center gap-4>
          <ThemeSelect />
          <NuxtLink aria-label="Uni Helper GitHub homepage" href="https://github.com/uni-helper" target="_blank">
            <div i-carbon:logo-github />
          </NuxtLink>
        </div>
      </div>
    </header>
    <main class="<sm:p-3" mx-auto flex-1 container>
      <NuxtLoadingIndicator />
      <div py-2 sm:py-8>
        <slot />
      </div>
    </main>
    <footer border-t py-4 dark:border-dark-200>
      <div mx-auto flex items-center justify-between gap-4 container class="<sm:p-3">
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
  </div>
</template>
