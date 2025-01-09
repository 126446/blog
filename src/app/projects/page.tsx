'use client';

import { motion } from 'framer-motion';
import { projectItems } from '@/data/projects'; // 导入项目数据
import { Project } from '@/data/projects'; // 导入类型定义

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <h1 className="text-3xl font-bold mb-8">项目展示</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectItems.map((project: Project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
              <p className="text-gray-600">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 