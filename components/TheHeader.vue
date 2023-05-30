<template>
  <header sticky top-0 z-2 border="b dark:dark-200" bg="light-100 dark:dark-800">
    <div p="4 <sm:x-2" m-auto max-w-160ch flex items-center justify-between>
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
</template>
