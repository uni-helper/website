import type { ParsedContent } from '@ztl-uwu/nuxt-content'

export interface Package extends Record<string, unknown> {
  id: string
  title: string
  description: string
  icon: string
  npm?: {
    name: string
    dependencies: string[]
    devDependencies: string[]
  }
}

export interface Project {
  name: string
  link: string
  desc: string
  icon: string
  npm?: string
  github?: string
}

export interface PackageContent extends ParsedContent {
  projects: Record<string, Project[]>
}

export type RelationPackageSource = 'npm' | 'uni-helper'
export interface RelationPackage {
  name: string
  icon?: string
  npmName: string
  description?: string
  dependencies: string[]
  devDependencies: string[]
  source: RelationPackageSource
}
