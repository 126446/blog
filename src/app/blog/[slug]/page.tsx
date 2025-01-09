// src/app/blog/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import BlogPost from '@/components/BlogPost'

// 生成静态页面参数
export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

interface PostPageProps {
  params: {
    slug: string
  }
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        文章不存在
      </div>
    )
  }

  return <BlogPost post={post} />
}
