// src/components/BlogCard.jsx
'use client'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export function BlogCard({ title, excerpt, date, slug }) {
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="p-6 bg-white rounded-lg border hover:shadow-lg"
    >
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {title}
          </h2>
          <time className="text-sm text-gray-500">{date}</time>
        </div>
        
        <p className="text-gray-600">
          {excerpt}
        </p>
        
        <Link 
          href={`/blog/${slug}`}
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <span>阅读更多</span>
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  )
}