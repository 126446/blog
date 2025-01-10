export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  thumbnail: string;
  description: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "nextjs-13",
    title: "Next.js 13 新特性解析",
    content: "分享一些 React 开发中遇到的实践经验...",
    date: "2024-01-15",
    thumbnail: "/blog/images/posts/nextjs.jpg",
    description: "探索 Next.js 13 的新特性和最佳实践"
  },
  {
    id: "react-server-components",
    title: "React Server Components 实践",
    content: "探索 RSC 的最佳实践...",
    date: "2024-01-10",
    thumbnail: "/blog/images/posts/react.jpg",
    description: "深入理解 React Server Components 的工作原理"
  }
];

export function getBlogPost(id: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === id);
}