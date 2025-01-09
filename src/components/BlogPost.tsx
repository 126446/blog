'use client'
// src/components/BlogPost.tsx
import { motion } from 'framer-motion'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Post } from '@/types'

interface BlogPostProps {
  post: Post
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <div className="bg-white pt-24 pb-24">
      <article className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/blog"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            返回文章列表
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="mb-16">
            <div className="mb-6">
              <time dateTime={post.date} className="text-gray-500">
                {post.date}
              </time>
            </div>
            <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {post.title}
            </h1>
            <p className="text-xl leading-8 text-gray-500">
              {post.excerpt}
            </p>
          </header>

          <div className="prose prose-lg prose-indigo mx-auto">
            {post.content}
          </div>
        </motion.div>
      </article>
    </div>
  )
}
