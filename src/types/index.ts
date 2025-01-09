// src/types/index.ts
export interface Post {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
  }

export interface Project {
  id: string;
  title: string;
  description: string;
  type: 'vision' | 'cloud' | 'robotics' | 'ai' | 'visualization' | 'patent' | 'software';
  imageUrl?: string;
  link?: string;
}