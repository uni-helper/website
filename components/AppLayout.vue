<template>
  <div min-h-screen flex="~ col">
    <TheHeader />

    <main m-auto max-w-140ch flex-1 p="x-10 <sm:4">
      <NuxtLoadingIndicator />
      <div py="2 sm:8">
        <slot />
      </div>
    </main>

    <TheFooter />
  </div>
</template>
