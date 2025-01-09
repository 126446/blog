// src/app/changelog/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { pageUpdates, fileUpdates } from '@/data/projects';
import { ChangelogItem, FileUpdateItem } from '@/types/changelog';

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
