import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

// uni-use 的文档已经迁到仓库的 docs/api/ 下，每个文件对应一个 API。
const TEMP_DIR = '/tmp/uni-use-temp'
const TARGET_DIR = `${process.cwd()}/content/uni-use/2.api`
const REPO_URL = 'https://github.com/uni-helper/uni-use.git'
const SOURCE_DIR = `${TEMP_DIR}/docs/api`

function cleanTempDir() {
  if (existsSync(TEMP_DIR))
    execSync(`rimraf -rf ${TEMP_DIR}`, { stdio: 'inherit' })
}

function cloneRepo() {
  console.log('克隆 uni-use 仓库...')
  execSync(`git clone --depth 1 ${REPO_URL} ${TEMP_DIR}`, { stdio: 'inherit' })
  console.log('仓库克隆完成')
}

function normalizeLinks(content: string) {
  return content
    // VitePress 的 /api/xxx 链接
    .replace(/\]\(\/api\/([\w-]+)(?:\.md)?(#[^)]*)?\)/g, (_match, name, hash) => `](/uni-use/api/${String(name).toLowerCase()}${hash ?? ''})`)
    // ./useStorageSync 或 ../api/useStorageSync.md
    .replace(/\]\(\.\/([\w-]+)(?:\.md)?(#[^)]*)?\)/g, (_match, name, hash) => `](/uni-use/api/${String(name).toLowerCase()}${hash ?? ''})`)
    .replace(/\]\(\.\.\/api\/([\w-]+)(?:\.md)?(#[^)]*)?\)/g, (_match, name, hash) => `](/uni-use/api/${String(name).toLowerCase()}${hash ?? ''})`)
    // 旧 README 里的 /uni-use/useXxx
    .replace(/\]\(\/uni-use\/(use|try)([^)\s#]*)/g, '](/uni-use/api/$1$2')
}

function copyDocs() {
  const files = readdirSync(SOURCE_DIR).filter(file => file.endsWith('.md'))
  console.log(`找到 ${files.length} 个 API 文档`)

  // 只清理站点生成出来的 Markdown，保留手写的 _dir.yml。
  for (const file of readdirSync(TARGET_DIR)) {
    if (file.endsWith('.md'))
      unlinkSync(join(TARGET_DIR, file))
  }

  for (const file of files) {
    let content = readFileSync(join(SOURCE_DIR, file), 'utf8')
    // 把首个 H1 提成 frontmatter 标题，避免页面标题和正文 H1 重复。
    const titleMatch = content.match(/^#\s+(.+)\r?\n+/)
    if (titleMatch) {
      const title = titleMatch[1]!.trim()
      content = content.replace(/^#\s+.+\r?\n+/, '')
      content = `---\ntitle: ${JSON.stringify(title)}\n---\n\n${content}`
    }
    content = normalizeLinks(content)
    writeFileSync(join(TARGET_DIR, file), content, 'utf8')
    console.log(`  复制 ${file}`)
  }
}

function main() {
  try {
    console.log('开始处理 uni-use 文件...')
    cleanTempDir()
    cloneRepo()
    if (!existsSync(TARGET_DIR))
      mkdirSync(TARGET_DIR, { recursive: true })
    copyDocs()
    cleanTempDir()
    console.log('处理完成!')
  }
  catch (error) {
    console.error('处理失败:', error)
    cleanTempDir()
    process.exit(1)
  }
}

main()
