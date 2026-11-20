const packageManagersCode = [
  { name: 'npm', command: 'npm ', install: 'i ', run: 'run ', x: 'npx ' },
  { name: 'pnpm', command: 'pnpm ', install: 'i ', run: 'run ', x: 'pnpm dlx ' },
  { name: 'bun', command: 'bun ', install: 'add ', run: 'run ', x: 'bun x ' },
  { name: 'yarn', command: 'yarn ', install: 'add ', run: 'run ', x: 'yarn dlx ' },
]

/**
 * 文档里的包管理器命令。站点只展示 npm / pnpm / bun / yarn 四种。
 */
export function usePm() {
  return {
    packageManagers: computed(() => packageManagersCode),
  }
}
