import { ChangelogItem, FileUpdateItem } from '@/types/changelog';

export interface Project {
  id: number;
  name: string;
  href: string;
  description: string;
  category: string;
}

export const projectCategories = [
  { id: 'ai', name: '人工智能' },
  { id: 'system', name: '系统开发' },
  { id: 'patent', name: '专利著作' }
] as const;

export const projectItems: Project[] = [
  {
    id: 1,
    name: '西瓜成熟度视觉识别',
    href: '/projects/watermelon-vision',
    description: '基于计算机视觉的西瓜成熟度智能识别系统',
    category: 'ai'
  },
  {
    id: 2,
    name: '智能车载点云传输',
    href: '/projects/cloud-transmission',
    description: '智能车载环境下的点云数据高效传输方案',
    category: 'system'
  },
  {
    id: 3,
    name: '机械臂系统复现',
    href: '/projects/robotic-arm',
    description: '工业级机械臂控制系统的设计与实现',
    category: 'system'
  },
  {
    id: 4,
    name: '智能预测与分类',
    href: '/projects/ai-prediction',
    description: '基于机器学习的智能预测分类系统',
    category: 'ai'
  },
  {
    id: 5,
    name: '大坝数字孪生可视化',
    href: '/projects/dam-twin',
    description: '大坝数字孪生系统的三维可视化软件',
    category: 'system'
  },
  {
    id: 6,
    name: '西瓜数据采集专利',
    href: '/projects/watermelon-patent',
    description: '西瓜生长数据智能采集系统专利',
    category: 'patent'
  },
  {
    id: 7,
    name: '大坝数字孪生软著',
    href: '/projects/dam-software',
    description: '大坝数字孪生系统软件著作权',
    category: 'patent'
  }
];

export const fileUpdates: FileUpdateItem[] = [
  {
    date: '2024-01-10',
    filename: 'src/data/projects.ts',
    description: '添加项目分类系统',
    type: 'modify'
  },
  {
    date: '2024-01-10',
    filename: 'src/components/ProjectsMenu.tsx',
    description: '实现分类式项目展示下拉菜单',
    type: 'modify'
  },
  {
    date: '2024-01-09',
    filename: 'src/components/Particles.tsx',
    description: '添加粒子效果组件',
    type: 'add'
  },
  {
    date: '2024-01-09',
    filename: 'src/app/layout.tsx',
    description: '集成粒子背景效果',
    type: 'modify'
  },
  {
    date: '2024-01-08',
    filename: 'src/components/BlogCard.tsx',
    description: '改进文章卡片样式',
    type: 'modify'
  }
];

export const pageUpdates: ChangelogItem[] = [
  {
    date: '2024-01-10',
    version: '1.2.0',
    type: 'feature',
    changes: [
      '实现项目分类展示系统',
      '优化项目展示下拉菜单',
      '添加项目详情页面'
    ]
  },
  {
    date: '2024-01-09',
    version: '1.1.0',
    type: 'feature',
    changes: [
      '添加了粒子背景效果',
      '优化了博客文章展示样式',
      '改进了导航栏交互效果'
    ]
  },
  {
    date: '2024-01-08',
    version: '1.0.1',
    type: 'fix',
    changes: [
      '修复了移动端样式问题',
      '优化了页面加载性能'
    ]
  },
  {
    date: '2024-01-07',
    version: '1.0.0',
    type: 'update',
    changes: [
      '初始版本发布',
      '完成基础博客功能',
      '添加了文章列表和详情页'
    ]
  }
]; 