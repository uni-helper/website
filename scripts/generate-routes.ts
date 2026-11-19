import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

export async function generatePrerenderRoutes(contentDir: string = './content') {
  const routes = new Set(['/', '/packages'])

  /**
   * 递归扫描目录，返回该目录下是否存在可渲染的 Markdown 页面。
   * 只有 _dir.yml 的目录（比如还没同步 uni-use 文档的 2.api）没有页面，
   * 也没有可供重定向的子页面，不能注册成预渲染路由。
   */
  async function scanDirectory(dir: string, basePath = ''): Promise<boolean> {
    let hasPage = false

    try {
      const items = await readdir(dir)

      for (const item of items) {
        const fullPath = join(dir, item)
        const itemStat = await stat(fullPath)

        if (itemStat.isDirectory()) {
          if (item.startsWith('_'))
            continue

          // 移除目录名的数字前缀
          const cleanDirName = item.replace(/^\d+\./, '')
          const childBase = basePath ? `${basePath}/${cleanDirName}` : cleanDirName

          // 目录里没有页面就没有可预渲染的内容，也没有重定向目标
          if (await scanDirectory(fullPath, childBase)) {
            routes.add(`/${childBase}`)
            hasPage = true
          }
        }
        else if (item.endsWith('.md')) {
          hasPage = true

          if (item !== 'index.md') {
            // 移除文件名的数字前缀
            const cleanName = item.replace('.md', '').replace(/^\d+\./, '')
            routes.add(`/${basePath ? `${basePath}/${cleanName}` : cleanName}`.toLowerCase())
          }
        }
      }
    }
    catch (error) {
      console.error('扫描目录失败:', dir, (error as Error).message)
    }

    return hasPage
  }

  await scanDirectory(contentDir)

  // 排序并返回
  return Array.from(routes).sort((a, b) => a.localeCompare(b))
}
