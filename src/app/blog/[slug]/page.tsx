import { getBlogPost, blogPosts } from "@/data/blog-posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: "文章未找到",
    };
  }
  
  return {
    title: `${post.title} - 我的博客`,
    description: post.description,
  };
}

export default function BlogPost({ params }: Props) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
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
  );
}
