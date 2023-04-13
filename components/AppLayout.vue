<template>
  <div flex flex-col min-h-screen>
    <header
      sticky
      top-0
      bg-inherit
      z-2
      border-b
      dark:border-dark-200
      bg-light-100
      dark:bg-dark-800
    >
      <div
        container
        mx-auto
        flex
        items-center
        justify-between
        py-2
        sm:py-4
        class="<sm:p-3"
      >
        <div flex items-center>
          <NuxtLink href="/" mr-2 aria-label="Uni Helper Logo">
            <div i-app-logo text-8 sm:text-12></div>
          </NuxtLink>
          <div>
            <NuxtLink href="/"
              ><h1 sm:text-xl font-bold>Uni Helper</h1></NuxtLink
            >
            <p flex items-center gap-2 text-3 md:text-4>
              <span>旨在增强 uni-app 系列产品的开发体验</span>
            </p>
          </div>
        </div>
        <div flex gap-4 items-center>
          <ThemeSelect />
          <NuxtLink
            aria-label="Uni Helper GitHub homepage"
            href="https://github.com/uni-helper"
            target="_blank"
          >
            <div i-carbon:logo-github></div>
          </NuxtLink>
        </div>
      </div>
    </header>
    <main container mx-auto class="<sm:p-3" flex-1>
      <NuxtLoadingIndicator />
      <div py-2 sm:py-8>
        <slot />
      </div>
    </main>
    <footer py-4 border-t dark:border-dark-200>
      <div
        container
        mx-auto
        flex
        items-center
        gap-4
        justify-between
        class="<sm:p-3"
      >
        <div>
          <NuxtLink
            href="https://github.com/orgs/uni-helper/people"
            target="_blank"
            hover:color-primary
          >
            &copy;Uni Helper Team
          </NuxtLink>
        </div>
        <div flex gap-4 items-center>
          <NuxtLink
            href="https://qm.qq.com/cgi-bin/qm/qr?k=hZdEls2BYb9ZPIaXBxZoNnVwthtJKvcP&jump_from=webapi&authKey=X2GTdlKc1MHuTraaQ3q7TXTOwYo0R0cMoU6B9/OKkBTjLckze7u5BR5NlrnHjTss"
            target="_blank"
            aria-label="加入QQ群"
            hover:color-primary
          >
            <div i-ri:qq-fill></div>
          </NuxtLink>
          <NuxtLink
            href="https://github.com/orgs/uni-helper/discussions"
            target="_blank"
            aria-label="Discussions"
            hover:color-primary
          >
            <div i-ri:discuss-fill></div>
          </NuxtLink>
          <NuxtLink
            href="https://github.com/uni-helper/website"
            target="_blank"
            aria-label="Contribution"
            hover:color-primary
          >
            <div i-carbon:logo-github></div>
          </NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>
