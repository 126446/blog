# 个人博客项目文档

## 1. 项目架构

```
blog/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署配置
├── public/
│   ├── images/                 # 静态图片资源
│   │   ├── marker-icon-2x.png  # Leaflet 地图标记图标
│   │   ├── marker-icon.png     # Leaflet 地图标记图标
│   │   └── marker-shadow.png   # Leaflet 地图标记阴影
│   └── world-map.json         # 世界地图数据
├── src/
│   ├── app/                    # Next.js 13+ App Router
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx   # 博客文章详情页
│   │   │   └── page.tsx       # 博客列表页
│   │   ├── projects/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx   # 项目详情页
│   │   │   └── page.tsx       # 项目列表页
│   │   ├── changelog/
│   │   │   └── page.tsx       # 更新日志页面
│   │   ├── about/
│   │   │   └── page.tsx       # 关于页面（新增个人介绍和旅行地图）
│   │   ├── layout.tsx         # 根布局
│   │   └── page.tsx           # 首页
│   ├── components/            # 可复用组件
│   │   ├── magicui/
│   │   │   └── particles.tsx  # 粒子效果组件
│   │   ├── Navbar.tsx         # 导航栏组件
│   │   ├── ProjectsMenu.tsx   # 项目下拉菜单
│   │   ├── ProjectAnimation.tsx # 项目动画组件
│   │   └── TravelMap.tsx      # 旅行地图组件（新增）
│   ├── data/                  # 数据文件
│   │   └── projects.ts        # 项目数据
│   └── types/                 # 类型定义
│       └── changelog.ts       # 更新日志类型
├── scripts/
│   └── copy-leaflet-images.ts # Leaflet 图标复制脚本（新增）
├── next.config.js             # Next.js 配置
├── package.json               # 项目依赖
├── tailwind.config.js         # Tailwind CSS 配置
└── tsconfig.json             # TypeScript 配置
```

## 2. 主要功能模块

### 2.1 导航系统
- 实现：`src/components/Navbar.tsx`
- 功能：
  - 响应式导航栏
  - 项目下拉菜单
  - 移动端菜单
- 主要路由：
  ```typescript
  const navigation = [
    { name: '首页', href: '/' },
    { name: '博客', href: '/blog' },
    { name: '更新日志', href: '/changelog' },
    { name: '关于', href: '/about' },
  ];
  ```

### 2.2 项目展示系统
- 实现：`src/data/projects.ts`
- 分类：
  ```typescript
  const projectCategories = [
    { id: 'ai', name: '人工智能' },
    { id: 'system', name: '系统开发' },
    { id: 'patent', name: '专利著作' }
  ];
  ```
- 项目数据结构：
  ```typescript
  interface Project {
    id: number;
    name: string;
    href: string;
    description: string;
    category: string;
  }
  ```

### 2.3 博客系统
- 实现：`src/app/blog/`
- 功能：
  - MDX 支持
  - 文章列表
  - 文章详情
  - 动态路由

### 2.4 更新日志
- 实现：`src/app/changelog/`
- 类型定义：`src/types/changelog.ts`
- 功能：
  - 页面更新记录
  - 文件更新记录
  - 分类展示

### 2.5 个人介绍系统（新增）

- 实现：`src/app/about/page.tsx`

- 功能：

  - 个人简介展示
  - 技能矩阵展示
  - 教育经历
  - 交互式旅行地图

- 技能分类：

  ```typescript
  const skills = {
    development: [
      '前端开发',
      '后端开发',
      'ROS开发',
      '数据库设计'
    ],
    professional: [
      '机器视觉',
      '数据分析',
      '深度学习',
      '机器人开发'
    ]
  };
  ```

### 2.6 旅行地图系统（新增）

- 实现：`src/components/TravelMap.tsx`

- 功能：

  - 交互式地图展示
  - 地点分类标记
  - 悬停信息展示
  - 动画效果

- 数据结构：

  ```typescript
  interface Location {
    name: string;
    nameEn: string;
    coordinates: [number, number];
    date: string;
    description?: string;
    category: 'work' | 'travel' | 'study' | 'life';
  }
  ```

- 分类颜色：

  ```typescript
  const categoryColors = {
    work: '#FF6B6B',
    travel: '#4ECDC4',
    study: '#45B7D1',
    life: '#FFB347'
  };
  ```

## 3. 技术栈

### 3.1 核心技术

- Next.js 15.1.4
- React 19
- TypeScript
- Tailwind CSS

### 3.2 UI 组件

- @headlessui/react
- @heroicons/react
- framer-motion
- react-leaflet（新增）
- leaflet（新增）

### 3.3 内容管理

- MDX
- gray-matter

## 4. 部署配置

### 4.1 Next.js 配置
```javascript
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/blog',
  assetPrefix: '/blog/',
  reactStrictMode: false,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true }
}
```

### 4.2 GitHub Pages 部署
- 使用 GitHub Actions
- 部署地址：https://126446.github.io/blog
- 工作流配置：`.github/workflows/deploy.yml`

## 5. 开发指南

### 5.1 本地开发
```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 预览构建结果
npm run start
```

### 5.2 添加新功能
1. 博客文章
   - 在 `src/app/blog/` 添加新的 MDX 文件
   - 更新文章元数据

2. 项目展示
   - 在 `src/data/projects.ts` 添加新项目
   - 按类别组织项目数据

3. 更新日志
   - 在 `src/data/projects.ts` 更新 `pageUpdates` 和 `fileUpdates`

## 6. 注意事项

1. 图片处理
   - 使用未优化的图片配置
   - 图片路径需要考虑 basePath

2. 类型检查
   - 构建时忽略类型错误
   - 开发时保持类型检查

3. 路由处理
   - 使用 basePath 配置
   - 考虑静态导出限制
