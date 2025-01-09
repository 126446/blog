const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/blog', // 因为你的仓库名是 blog
  // 禁用严格模式以避免开发时的双重渲染
  reactStrictMode: false,
}

module.exports = withMDX(nextConfig) 