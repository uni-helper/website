const packageManagersCode = [
  { name: 'npm', command: 'npm ', install: 'i ', installEmpty: 'install', run: 'run ', x: 'npx ', saveDev: '-D ' },
  { name: 'pnpm', command: 'pnpm ', install: 'i ', installEmpty: 'install', run: 'run ', x: 'pnpm dlx ', saveDev: '-D ' },
  { name: 'bun', command: 'bun ', install: 'add ', installEmpty: 'install', run: 'run ', x: 'bun x ', saveDev: '-d ' },
  { name: 'yarn', command: 'yarn ', install: 'add ', installEmpty: 'install', run: 'run ', x: 'yarn dlx ', saveDev: '-D ' },
]

/**
 * 文档里的包管理器命令。站点只展示 npm / pnpm / bun / yarn 四种。
 */
export function usePm() {
  return {
    packageManagers: computed(() => packageManagersCode),
  }
}
