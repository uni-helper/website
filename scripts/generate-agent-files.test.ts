import assert from 'node:assert/strict'
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { generateAgentFiles } from './generate-agent-files'

test('agent output uses directory titles and omits runtime markdown', () => {
  const outDir = mkdtempSync(join(tmpdir(), 'uni-helper-agent-'))

  try {
    generateAgentFiles('./content', 'https://example.test', outDir)

    const llms = readFileSync(join(outDir, 'llms.txt'), 'utf8')

    assert.match(llms, /### plugin-uni-pages/)
    assert.doesNotMatch(llms, /### vite-plugin-uni-pages/)
    assert.match(llms, /\[更新日志\]\(https:\/\/example\.test\/changelog\)/)
    assert.equal(existsSync(join(outDir, 'changelog.md')), false)
  }
  finally {
    rmSync(outDir, { recursive: true, force: true })
  }
})
