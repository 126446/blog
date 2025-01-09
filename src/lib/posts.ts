// src/lib/posts.ts
import { Post } from '@/types'

// 模拟博客文章数据
const posts: Post[] = [
  {
    slug: 'hello-world',
    title: '你好，世界',
    date: '2024-01-09',
    excerpt: '这是我的第一篇博客文章',
    content: `
# 你好，世界

这是我的第一篇博客文章。在这里，我将分享一些有趣的想法和经验。

## 为什么要写博客？

写博客可以帮助我们：
1. 整理思路
2. 分享知识
3. 记录成长

感谢你的阅读！
    `
  },
  {
    slug: 'getting-started',
    title: '开始使用 Next.js',
    date: '2024-01-08',
    excerpt: '学习如何使用 Next.js 构建现代化的网站',
    content: `
# 开始使用 Next.js

Next.js 是一个流行的 React 框架，它提供了许多强大的功能...
    `
  }
]

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostBySlug(slug: string): Post | null {
  const post = posts.find(p => p.slug === slug)
  return post || null
}