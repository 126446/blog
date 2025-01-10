// src/app/changelog/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';

interface ChangelogItem {
  date: string;
  version: string;
  changes: string[];
  type: 'feature' | 'fix' | 'update';
}

interface FileUpdateItem {
  date: string;
  filename: string;
  description: string;
  type: 'add' | 'modify' | 'delete';
}

const pageUpdates: ChangelogItem[] = [
  {
    date: '2024-01-10',
    version: '1.2.5',
    type: 'fix',
    changes: [
      '在对博客页面进行Hero Parallax视差修改时，出现路由加载问题，静态资源 404 错误，所有页面无法正常显示',
      '从github下载之前的存档，恢复到1.2.5版本'
    ]
  },
  {
    date: '2024-01-10',
    version: '1.3.2',
    type: 'feature',
    changes: [
      '使用 dynamic 导入延迟加载',
      '使用 useMemo 缓存计算结果',
      '使用 priority 优化图片加载',
      '添加缓存控制和安全头',
      '将内联样式移到外部文件',
      '修改 WorldMap 组件使用外部样式',
      '添加了更好的错误处理',
      '添加了 sizes 属性优化响应式图片',
      '改进了组件的生命周期管理',
      '修复了 DottedMap 导入和初始化问题',
    ]
  },
  {
    date: '2024-01-10',
    version: '1.3.1',
    type: 'fix',
    changes: [
      '修复了旅行界面地图的样式',
      '修复了主页面图标显示不完全的问题',
      '修复了粒子不跟随鼠标移动的问题',
    ]
  },
  {
    date: '2024-01-10',
    version: '1.3.0',
    type: 'feature',
    changes: [
      '添加了滚动文本效果',
      '添加了淡入文本效果',
      '添加了可交互的转动信息卡片',
      '更改菜单栏中‘关于’为‘旅游’'
    ]
  },
  {
    date: '2024-01-09',
    version: '1.2.5',
    type: 'feature',
    changes: [
      '添加了项目展示',
      '修改项目展示为三栏',
      '改进了导航栏交互效果'
    ]
  },
  {
    date: '2024-01-09',
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
    date: '2024-01-09',
    version: '1.0.0',
    type: 'update',
    changes: [
      '初始版本发布',
      '完成基础博客功能',
      '添加了文章列表和详情页'
    ]
  },
  // ... 其他更新记录
];

const fileUpdates: FileUpdateItem[] = [
  {
    date: '2024-01-10',
    filename: 'public\\images\\travel',
    description: '添加旅游照片',
    type: 'add'
  },
  // ... 其他文件更新记录
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function getTypeColor(type: ChangelogItem['type']) {
  switch (type) {
    case 'feature':
      return 'bg-green-100 text-green-800';
    case 'fix':
      return 'bg-red-100 text-red-800';
    case 'update':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getFileTypeColor(type: FileUpdateItem['type']) {
  switch (type) {
    case 'add':
      return 'bg-green-100 text-green-800';
    case 'modify':
      return 'bg-yellow-100 text-yellow-800';
    case 'delete':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
              更新日志
            </h1>

            <Tab.Group>
              <Tab.List className="flex space-x-4 rounded-xl bg-gray-100 p-1 mb-8">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                        selected
                          ? 'bg-white text-gray-900 shadow'
                          : 'text-gray-700 hover:bg-white/[0.12] hover:text-gray-900'
                      )}
                    >
                      页面更新
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                        selected
                          ? 'bg-white text-gray-900 shadow'
                          : 'text-gray-700 hover:bg-white/[0.12] hover:text-gray-900'
                      )}
                    >
                      文件更新
                    </button>
                  )}
                </Tab>
              </Tab.List>
              
              <Tab.Panels>
                <Tab.Panel>
                  <div className="flow-root">
                    <ul role="list" className="-mb-8">
                      {pageUpdates.map((update, updateIdx: number) => (
                        <li key={update.version}>
                          <div className="relative pb-8">
                            {updateIdx !== pageUpdates.length - 1 ? (
                              <span
                                className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                              />
                            ) : null}
                            <div className="relative flex space-x-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                                <div className="h-2.5 w-2.5 rounded-full bg-gray-600" />
                              </div>
                              <div className="flex min-w-0 flex-1 justify-between space-x-4">
                                <div>
                                  <div className="text-sm text-gray-500">
                                    版本 {update.version}
                                    <span className={classNames(
                                      'ml-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                                      getTypeColor(update.type)
                                    )}>
                                      {update.type}
                                    </span>
                                  </div>
                                  <ul className="mt-2 text-sm text-gray-700">
                                    {update.changes.map((change: string, idx: number) => (
                                      <li key={idx} className="mb-1">• {change}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                  <time dateTime={update.date}>{update.date}</time>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Tab.Panel>

                <Tab.Panel>
                  <div className="flow-root">
                    <ul role="list" className="-mb-8">
                      {fileUpdates.map((update, updateIdx) => (
                        <li key={update.filename + update.date}>
                          <div className="relative pb-8">
                            {updateIdx !== fileUpdates.length - 1 ? (
                              <span
                                className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                              />
                            ) : null}
                            <div className="relative flex space-x-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                                <div className="h-2.5 w-2.5 rounded-full bg-gray-600" />
                              </div>
                              <div className="flex min-w-0 flex-1 justify-between space-x-4">
                                <div>
                                  <div className="text-sm">
                                    <span className="font-medium text-gray-900">{update.filename}</span>
                                    <span className={classNames(
                                      'ml-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                                      getFileTypeColor(update.type)
                                    )}>
                                      {update.type}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-700">{update.description}</p>
                                </div>
                                <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                  <time dateTime={update.date}>{update.date}</time>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
