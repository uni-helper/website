<template>
  <div min-h-screen flex flex-col>
    <header sticky top-0 z-2 border-b bg-inherit bg-light-100 dark:border-dark-200 dark:bg-dark-800>
      <div class="<sm:p-3" m-auto mx-auto max-w-140ch flex items-center justify-between py-2 sm:py-4>
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
    <main class="<sm:p-3" m-auto mx-auto max-w-140ch flex-1 px-10>
      <NuxtLoadingIndicator />
      <div py-2 sm:py-8>
        <slot />
      </div>
    </main>

    <TheFooter />
  </div>
</template>
