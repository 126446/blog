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
  basePath: '/blog',
  assetPrefix: '/blog/',
  reactStrictMode: false,
  eslint: {
    // 警告不会导致构建失败
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 类型错误不会导致构建失败
    ignoreBuildErrors: true,
  },
}

module.exports = withMDX(nextConfig) 