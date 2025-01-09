# Next.js 博客项目文档

## 项目结构
```
my-blog/
├── src/
│   ├── app/                      # Next.js App Router 目录
│   │   ├── blog/                 # 博客相关页面
│   │   │   ├── [slug]/          # 文章详情页
│   │   │   │   └── page.tsx     # 动态路由页面
│   │   │   └── page.tsx         # 博客列表页
│   │   ├── changelog/           # 更新日志页面
│   │   │   └── page.tsx
│   │   ├── layout.tsx           # 根布局
│   │   ├── page.tsx             # 首页
│   │   └── globals.css          # 全局样式
│   ├── components/              # 组件目录
│   │   ├── BlogCard.tsx        # 博客卡片组件
│   │   ├── BlogPost.tsx        # 博客文章详情组件
│   │   ├── Navbar.tsx          # 导航栏组件
│   │   ├── Footer.tsx          # 页脚组件
│   │   └── magicui/            # UI 特效组件
│   │       └── particles.tsx    # 粒子效果组件
│   ├── lib/                     # 工具函数目录
│   │   └── posts.ts            # 文章数据处理
│   ├── types/                   # 类型定义目录
│   │   └── index.ts            # 类型声明
│   └── content/                 # MDX 文章目录
│       └── hello-world.mdx     # 示例文章
├── public/                      # 静态资源目录
├── next.config.js              # Next.js 配置
├── package.json                # 项目依赖
├── tsconfig.json               # TypeScript 配置
└── README.md                   # 项目说明
```

## 主要文件内容说明

### 1. 配置文件

#### next.config.js
```javascript
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
  reactStrictMode: false,
}

module.exports = withMDX(nextConfig)
```
- 配置了 MDX 支持
- 启用静态导出
- 关闭图片优化（静态导出需要）
- 关闭严格模式

### 2. 核心类型定义

#### src/types/index.ts
```typescript
export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}
```

### 3. 数据处理

#### src/lib/posts.ts
- 目前使用静态数据
- 提供获取所有文章和单篇文章的功能
- 支持按日期排序

### 4. 布局和页面

#### src/app/layout.tsx
- 全局布局
- 集成粒子背景效果
- 包含导航栏和页脚

#### src/app/page.tsx
- 首页设计
- 展示最新文章
- 包含动画效果

#### src/app/blog/page.tsx
- 博客列表页
- 展示所有文章
- 支持分页（待实现）

#### src/app/changelog/page.tsx
- 更新日志页面
- 分别展示页面和文件更新
- 时间线样式

### 5. 核心组件

#### src/components/BlogCard.tsx
- 文章卡片组件
- 动画效果
- 响应式设计

#### src/components/BlogPost.tsx
- 文章详情组件
- MDX 内容渲染
- 阅读体验优化

#### src/components/Navbar.tsx
- 响应式导航栏
- 移动端菜单
- 页面切换动画

#### src/components/magicui/particles.tsx
- 粒子背景效果
- 鼠标交互
- 性能优化

## 样式管理

### globals.css
- Tailwind 基础配置
- 自定义主题颜色
- 排版样式

## 特色功能

1. **现代化 UI**:
   - 响应式设计
   - 平滑动画
   - 粒子背景效果

2. **博客功能**:
   - 文章列表
   - 文章详情
   - 更新日志

3. **性能优化**:
   - 静态页面生成
   - 组件代码分割
   - 图片优化

## 开发指南

### 环境设置
```bash
npm install        # 安装依赖
npm run dev       # 启动开发服务器
```

### 添加新文章
1. 在 `src/content` 创建新的 .mdx 文件
2. 添加文章元数据（frontmatter）
3. 确保包含所有必需字段：title, date, excerpt

### 构建和部署
```bash
npm run build     # 构建项目
```
- 输出位于 `out` 目录
- 可部署到静态主机

## 注意事项

1. **数据管理**:
   - 当前使用静态数据
   - 后续可迁移到 CMS 或数据库

2. **类型安全**:
   - 使用 TypeScript
   - 确保类型完整性

3. **样式约定**:
   - 使用 Tailwind CSS
   - 保持统一的设计风格

## 待实现功能

1. **内容功能**:
   - [ ] 文章分类
   - [ ] 标签系统
   - [ ] 搜索功能

2. **用户体验**:
   - [ ] 评论系统
   - [ ] 文章分享
   - [ ] 阅读进度条

3. **性能提升**:
   - [ ] 图片懒加载
   - [ ] SEO 优化
   - [ ] 性能监控

## 技术栈

- **框架**: Next.js 15.1.4
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **组件库**: 
  - @headlessui/react（UI 组件）
  - @heroicons/react（图标）
  - framer-motion（动画）
- **构建工具**: Turbopack
- **数据处理**: MDX

## 维护建议

1. **代码规范**:
   - 遵循 TypeScript 严格模式
   - 保持组件的单一职责
   - 注意代码复用

2. **性能考虑**:
   - 优化图片资源
   - 控制包大小
   - 监控运行时性能

3. **可访问性**:
   - 语义化 HTML
   - 键盘导航支持
   - 适当的颜色对比度

4. **SEO 优化**:
   - 完善元数据
   - 语义化结构
   - 性能优化

## 常见问题解决

1. **开发环境问题**:
   ```bash
   # 清理依赖
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

2. **类型错误**:
   - 确保 tsconfig.json 配置正确
   - 检查类型定义完整性

3. **样式问题**:
   - 检查 Tailwind 配置
   - 确保类名正确

## 贡献指南

1. 创建新功能:
   - 遵循现有代码风格
   - 添加必要的类型定义
   - 更新相关文档

2. 提交代码:
   - 清晰的提交信息
   - 相关测试用例
   - 文档更新

## 联系方式

如有问题或建议，请通过以下方式联系：
- GitHub Issues
- 项目讨论区