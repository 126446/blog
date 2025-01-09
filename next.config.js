/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/blog', // 因为你的仓库名是 blog
}

module.exports = nextConfig 