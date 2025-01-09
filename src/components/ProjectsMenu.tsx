'use client';

import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { projectItems, projectCategories } from '@/data/projects';

export default function ProjectsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const projectsByCategory = projectCategories.map(category => ({
    ...category,
    projects: projectItems.filter(project => project.category === category.id)
  }));

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button 
        className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors inline-flex items-center gap-x-1"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        项目展示
        <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
      </Menu.Button>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          static
          className="absolute right-0 z-10 mt-2 w-[800px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="p-4 grid grid-cols-3 gap-4">
            {projectsByCategory.map(category => (
              <div key={category.id} className="space-y-3">
                <h3 className="font-semibold text-gray-900 border-b pb-2">
                  {category.name}
                </h3>
                <div className="space-y-2">
                  {category.projects.map(project => (
                    <Menu.Item key={project.id}>
                      {({ active }) => (
                        <Link
                          href={project.href}
                          className={`
                            ${active ? 'bg-gray-100' : ''}
                            block rounded-md px-3 py-2 text-sm
                          `}
                        >
                          <div className="font-medium text-gray-900">{project.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{project.description}</div>
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}