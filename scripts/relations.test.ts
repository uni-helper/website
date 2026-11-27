import assert from 'node:assert/strict'
import { test } from 'node:test'
import type { RelationPackage } from '~/types/package'
import { getSelectionChildren } from '../utils/relations'

function pkg(name: string, dependencies: string[], devDependencies: string[]): RelationPackage {
  return {
    name,
    npmName: name,
    dependencies,
    devDependencies,
    source: 'npm',
  }
}

const selected = pkg('selected', [], [])
const prodChild = pkg('prod-child', ['selected'], [])
const devChild = pkg('dev-child', [], ['selected'])
const packages = [selected, prodChild, devChild]
const selectionNames = ['selected']

test('child selection follows visible dependency types', () => {
  assert.deepEqual(
    getSelectionChildren(packages, selectionNames, {
      showDependencies: false,
      showDevDependencies: true,
    }).map(pkg => pkg.name),
    ['dev-child'],
  )

  assert.deepEqual(
    getSelectionChildren(packages, selectionNames, {
      showDependencies: true,
      showDevDependencies: false,
    }).map(pkg => pkg.name),
    ['prod-child'],
  )

  assert.deepEqual(
    getSelectionChildren(packages, selectionNames, {
      showDependencies: false,
      showDevDependencies: false,
    }),
    [],
  )
})
