import { defineCollection, z } from '@nuxt/content'

const badge = z.object({
  value: z.string().optional(),
  icon: z.string().optional(),
  to: z.string().optional(),
  target: z.string().optional(),
  type: z.string().optional(),
  variant: z.string().optional(),
})

const author = z.object({
  name: z.string(),
  username: z.string().optional(),
  avatar: z.string().optional(),
  to: z.string().optional(),
  target: z.string().optional(),
})

/**
 * 文档页的 frontmatter。字段保持宽松，旧站点用到的配置项都保留下来。
 */
const page = z.object({
  title: z.string(),
  description: z.string().optional(),
  navigation: z.union([
    z.boolean(),
    z.object({
      title: z.string().optional(),
      icon: z.string().optional(),
    }),
  ]).optional(),
  icon: z.string().optional(),
  fullpage: z.boolean().default(false),
  // toc 既可能是布尔值，也可能是 _dir.yml 里的对象（links）。
  toc: z.union([
    z.boolean(),
    z.object({
      links: z.array(z.object({
        title: z.string(),
        icon: z.string().optional(),
        to: z.string(),
        target: z.string().optional(),
      }).passthrough()),
    }).passthrough(),
  ]).default(true),
  aside: z.boolean().default(true),
  breadcrumb: z.boolean().default(true),
  prevNext: z.boolean().default(true),
  editLink: z.boolean().default(true),
  badges: z.array(badge).optional(),
  // 侧栏条目上的角标和标题截断开关。
  navBadges: z.array(badge).optional(),
  navTruncate: z.boolean().optional(),
  // _dir.yml 里控制分组是否默认折叠。
  collapse: z.boolean().optional(),
  authors: z.array(author).optional(),
  header: z.any().optional(),
  banner: z.any().optional(),
  main: z.any().optional(),
}).passthrough()

const packages = z.object({
  title: z.string(),
  description: z.string().optional(),
  projects: z.record(z.string(), z.array(z.object({
    name: z.string(),
    link: z.string().optional(),
    desc: z.string().optional(),
    icon: z.string().optional(),
    npm: z.string().optional(),
    github: z.string().optional(),
  }).passthrough())),
}).passthrough()

export const collections = {
  content: defineCollection({
    type: 'page',
    source: {
      include: '**/*.{md,yml}',
      exclude: ['1.packages.yml'],
    },
    schema: page,
  }),
  packages: defineCollection({
    type: 'data',
    source: '1.packages.yml',
    schema: packages,
  }),
}
