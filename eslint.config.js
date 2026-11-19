import withNuxt from './.nuxt/eslint.config.mjs'

// 解析成普通数组，避免工具链只接受 FlatConfig[] 时误把 .vue 当成 JS 解析。
export default await withNuxt({
  rules: {
    // 站点里大量第三方数据（release、npm、GitHub）结构不稳定，沿用原来的 any 风格。
    '@typescript-eslint/no-explicit-any': 'off',
  },
})
