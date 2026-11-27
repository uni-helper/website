import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { parse } from 'yaml'

/**
 * 构建时生成 Agent 友好的产物：每页一份 Markdown 原文，加上站点根的 llms.txt 索引。
 * 文件写进 AGENT_ASSETS_DIR，由 nuxt.config 的 nitro.publicAssets 原样发布到站点根路径。
 */
export const AGENT_ASSETS_DIR = '.agent-assets'

interface AgentPage {
  /** 站点路由，例如 /uni-network/guide/introduction */
  route: string
  /** 发布 Markdown 的路径，例如 /uni-network/guide/introduction.md */
  mdPath: string
  title: string
  description?: string
  /** 顶层目录名，用来在 llms.txt 里给文档分组；根级页面没有 */
  section?: string
  /** 去掉 frontmatter 的正文；只有 .md 来源的页面才有 */
  body?: string
}

interface Frontmatter {
  title?: string
  description?: string
  projects?: Record<string, { name: string, desc?: string, link?: string }[]>
}

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n?/

/** 与 nuxt.config 的路由规则保持一致：去掉数字前缀，文件名小写。 */
function routeSegment(name: string) {
  return name.replace(/^\d+\./, '').replace(/\.(md|yml)$/, '').toLowerCase()
}

function splitFrontmatter(raw: string): { data: Frontmatter, body: string } {
  const match = FRONTMATTER_RE.exec(raw)
  if (!match)
    return { data: {}, body: raw }
  return { data: (parse(match[1] ?? '') ?? {}) as Frontmatter, body: raw.slice(match[0].length) }
}

/** .yml 文件没有 frontmatter 分隔符，整份内容就是数据。 */
function readContentFile(path: string): { data: Frontmatter, body: string } {
  const raw = readFileSync(path, 'utf8')
  if (path.endsWith('.yml'))
    return { data: (parse(raw) ?? {}) as Frontmatter, body: '' }
  return splitFrontmatter(raw)
}

/**
 * 页面都发布成 `<route>.md`（根页面是 `/index.md`）。站点用的是不带末尾斜杠的 clean URL，
 * Markdown 必须落在同一层目录，正文里的相对链接和图片（./demo.jpg）才会按同样规则解析。
 */
function markdownPath(route: string) {
  return route === '/' ? '/index.md' : `${route}.md`
}

function collectPages(dir: string, base = '', section?: string, pages: AgentPage[] = []) {
  const entries = readdirSync(dir, { withFileTypes: true })
    .filter(entry => !entry.name.startsWith('_') && !entry.name.startsWith('.'))
    .sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }))

  for (const entry of entries) {
    const full = join(dir, entry.name)

    if (entry.isDirectory()) {
      collectPages(full, `${base}/${routeSegment(entry.name)}`, section ?? routeSegment(entry.name), pages)
      continue
    }

    // 1.packages.yml 是数据集合，页面由 pages/packages.vue 负责，单独生成。
    // changelog 是运行时数据，不能写成只有标题的静态 Markdown。
    if (!/\.(md|yml)$/.test(entry.name) || entry.name === '1.packages.yml' || entry.name === '3.changelog.yml')
      continue

    const isIndex = entry.name.startsWith('index.')
    const route = isIndex ? (base || '/') : `${base}/${routeSegment(entry.name)}`
    const { data, body } = readContentFile(full)

    pages.push({
      route,
      mdPath: markdownPath(route),
      title: data.title ?? routeSegment(entry.name),
      description: data.description,
      section,
      body: entry.name.endsWith('.md') ? body.trim() : undefined,
    })
  }

  return pages
}

/** llms.txt 的分组标题取自 _dir.yml，没有就用目录名。 */
function sectionTitle(contentDir: string, segment: string) {
  try {
    const { data } = readContentFile(join(contentDir, segment, '_dir.yml'))
    return typeof data.title === 'string' ? data.title : segment
  }
  catch {
    return segment
  }
}

/** /packages 只是数据集合的渲染结果，这里拼出等价的清单。 */
function packagesPage(contentDir: string, siteUrl: string) {
  const { data } = readContentFile(join(contentDir, '1.packages.yml'))
  const projects = data.projects ?? {}

  const groups = Object.entries(projects).map(([group, items]) => {
    const list = items.map((item) => {
      const target = item.link ?? `${siteUrl}/${item.name}`
      return `- [${item.name}](${target})${item.desc ? `: ${item.desc}` : ''}`
    })
    return { group, list }
  })

  return {
    title: data.title ?? '全部项目',
    description: data.description,
    groups,
  }
}

function agentNote(siteUrl: string) {
  return `> For AI agents: the complete documentation index is at ${siteUrl}/llms.txt. Every static documentation page is also available as Markdown by appending \`.md\` to its URL.`
}

function renderMarkdown(page: AgentPage, siteUrl: string) {
  const parts = [`# ${page.title}`, '']
  if (page.description)
    parts.push(page.description, '')
  // 索引提示放在正文最前面，Agent 读到前几百字符就能找到 llms.txt。
  parts.push(agentNote(siteUrl), '')
  if (page.body)
    parts.push(page.body, '')
  return parts.join('\n')
}

function renderPackagesMarkdown(contentDir: string, siteUrl: string) {
  const { title, description, groups } = packagesPage(contentDir, siteUrl)
  const parts = [`# ${title}`, '']
  if (description)
    parts.push(description, '')
  parts.push(agentNote(siteUrl), '')
  for (const { group, list } of groups)
    parts.push(`## ${group}`, '', ...list, '')
  return parts.join('\n')
}

function renderLlmsTxt(pages: AgentPage[], contentDir: string, siteUrl: string) {
  const lines = [
    '# uni-helper',
    '',
    '> 一套增强 uni-app 系列产品开发体验的开源工具链：HTTP 客户端、路由与页面管理、组件自动引入、类型声明、构建插件和 VS Code 扩展。',
    '',
    `所有页面都能在 URL 后加 \`.md\` 拿到 Markdown 原文，例如 ${siteUrl}/uni-network/guide/introduction.md 。`,
    '',
  ]

  const rootPages = pages.filter(page => !page.section)
  const projects = new Map<string, AgentPage[]>()
  for (const page of pages) {
    if (!page.section)
      continue
    const list = projects.get(page.section) ?? []
    list.push(page)
    projects.set(page.section, list)
  }

  if (rootPages.length > 0) {
    lines.push('## 站点', '')
    for (const page of rootPages)
      lines.push(`- [${page.title}](${siteUrl}${page.mdPath})${page.description ? `: ${page.description}` : ''}`)
    lines.push(`- [更新日志](${siteUrl}/changelog): 实时页面，无静态 Markdown 版本。`)
    lines.push('')
  }

  lines.push('## 文档', '')
  for (const [segment, sectionPages] of projects) {
    lines.push(`### ${sectionTitle(contentDir, segment)}`, '')
    for (const page of sectionPages)
      lines.push(`- [${page.title}](${siteUrl}${page.mdPath})${page.description ? `: ${page.description}` : ''}`)
    lines.push('')
  }

  return lines.join('\n')
}

/**
 * 生成 Agent 产物目录。返回生成的页面数量，方便构建日志确认。
 */
export function generateAgentFiles(contentDir: string, siteUrl: string, outDir = AGENT_ASSETS_DIR) {
  const pages = collectPages(contentDir)
  // /packages 页面由 pages/packages.vue 渲染数据集合，列表内容在下面单独生成。
  const packagesData = packagesPage(contentDir, siteUrl)
  const packages: AgentPage = {
    route: '/packages',
    mdPath: '/packages.md',
    title: packagesData.title,
    description: packagesData.description,
  }

  rmSync(outDir, { recursive: true, force: true })

  const write = (path: string, content: string) => {
    const target = join(outDir, path.slice(1))
    mkdirSync(dirname(target), { recursive: true })
    writeFileSync(target, content, 'utf8')
  }

  for (const page of pages)
    write(page.mdPath, renderMarkdown(page, siteUrl))

  write(packages.mdPath, renderPackagesMarkdown(contentDir, siteUrl))
  write('/llms.txt', renderLlmsTxt([packages, ...pages], contentDir, siteUrl))

  return pages.length + 1
}
