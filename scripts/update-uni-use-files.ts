import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

// 配置
const TEMP_DIR = '/tmp/uni-use-temp'
const TARGET_DIR = '/Users/flippedround/Documents/uni-website/content/uni-use/2.api'
const REPO_URL = 'https://github.com/uni-helper/uni-use.git'
const SOURCE_DIR = `${TEMP_DIR}/src`

// 清理临时目录
function cleanTempDir() {
  if (existsSync(TEMP_DIR)) {
    execSync(`rm -rf ${TEMP_DIR}`, { stdio: 'inherit' })
  }
}

// 克隆仓库
function cloneRepo() {
  console.log('克隆 uni-use 仓库...')
  execSync(`git clone ${REPO_URL} ${TEMP_DIR}`, { stdio: 'inherit' })
  console.log('仓库克隆完成')
}

// 获取所有以"use"或"try"开头的文件夹
function getTargetFolders(dir: string): string[] {
  const folders = readdirSync(dir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => name.startsWith('use') || name.startsWith('try'))

  return folders
}

// 确保目标目录存在
function ensureTargetDir() {
  if (!existsSync(TARGET_DIR)) {
    mkdirSync(TARGET_DIR, { recursive: true })
  }
}

// 复制并重命名文件
function copyAndRenameFiles() {
  const folders = getTargetFolders(SOURCE_DIR)
  console.log(`找到 ${folders.length} 个目标文件夹`)

  for (const folder of folders) {
    const sourceDir = join(SOURCE_DIR, folder)
    const sourceFiles = readdirSync(sourceDir)

    // 查找README.md或index.md文件
    let sourceFile = ''
    if (sourceFiles.includes('index.md')) {
      sourceFile = 'index.md'
    }
    else {
      console.log(`  跳过 ${folder} - 未找到 README.md 或 index.md`)
      continue
    }

    const sourcePath = join(sourceDir, sourceFile)
    const targetPath = join(TARGET_DIR, `${folder}.md`)

    try {
      const content = readFileSync(sourcePath, 'utf8')
      writeFileSync(targetPath, content, 'utf8')
      console.log(`  复制 ${folder}/${sourceFile} -> ${folder}.md`)
    }
    catch (error) {
      console.error(`  复制 ${folder} 失败:`, error)
    }
  }
}

// 主函数
function main() {
  try {
    console.log('开始处理 uni-use 文件...')

    // 清理临时目录
    cleanTempDir()

    // 克隆仓库
    cloneRepo()

    // 确保目标目录存在
    ensureTargetDir()

    // 复制并重命名文件
    copyAndRenameFiles()

    // 清理临时目录
    cleanTempDir()

    console.log('处理完成!')
  }
  catch (error) {
    console.error('处理失败:', error)
    // 确保清理临时目录
    cleanTempDir()
    process.exit(1)
  }
}

// 运行主函数
main()
