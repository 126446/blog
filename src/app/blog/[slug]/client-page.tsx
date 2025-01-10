"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  thumbnail: string;
}

export default function ClientBlogPost({ post }: { post: Post }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-20"
    >
      <article className="max-w-4xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <time className="text-gray-500">{post.date}</time>
        </header>

        <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none">
          {post.content}
        </div>
      </article>
    </motion.div>
  );
} 