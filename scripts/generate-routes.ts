import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

export async function generatePrerenderRoutes(contentDir: string = './content') {
  const routes = new Set(['/', '/packages', '/api/_content/packages.json'])

  /**
   * 递归扫描目录
   */
  async function scanDirectory(dir: string, basePath = '') {
    try {
      const items = await readdir(dir)

      for (const item of items) {
        const fullPath = join(dir, item)
        const itemStat = await stat(fullPath)

        if (itemStat.isDirectory()) {
          if (!item.startsWith('_')) {
            // 移除目录名的数字前缀
            const cleanDirName = item.replace(/^\d+\./, '')
            // 添加目录本身的路由
            const dirRoute = basePath ? `/${basePath}/${cleanDirName}` : `/${cleanDirName}`
            routes.add(dirRoute)

            // 递归扫描子目录，使用清理后的目录名作为基础路径
            await scanDirectory(fullPath, basePath ? `${basePath}/${cleanDirName}` : cleanDirName)
          }
        }
        else if (item.endsWith('.md') && item !== 'index.md') {
          // 处理具体的 markdown 文件
          const fileName = item.replace('.md', '')
          // 移除文件名的数字前缀
          const cleanName = fileName.replace(/^\d+\./, '')
          const routePath = basePath ? `/${basePath}/${cleanName}` : `/${cleanName}`
          routes.add(routePath)
        }
      }
    }
    catch (error) {
      console.error(`扫描目录失败: ${dir}`, (error as Error).message)
    }
  }

  await scanDirectory(contentDir)

  // 排序并返回
  return Array.from(routes).sort()
}
