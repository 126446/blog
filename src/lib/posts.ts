export interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content?: string;
}

// 示例博客文章数据
const posts: Post[] = [
  {
    id: 'first-post',
    title: '我的第一篇博客',
    date: '2024-01-01',
    excerpt: '这是我的第一篇博客文章，主要介绍...',
    content: '完整的博客内容...'
  },
  {
    id: 'second-post',
    title: '技术分享：React 最佳实践',
    date: '2024-01-15',
    excerpt: '分享一些 React 开发中的最佳实践和经验...',
    content: '完整的博客内容...'
  },
  // 可以添加更多文章
];

export function getAllPosts() {
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getPostById(id: string) {
  return posts.find(post => post.id === id);
} 