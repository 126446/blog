import { projectItems } from '@/data/projects';
import ProjectAnimation from '@/components/ProjectAnimation';

// 生成静态路由参数
export async function generateStaticParams() {
  return projectItems.map((project) => ({
    id: project.href.split('/').pop()
  }));
}

// 服务器端组件
export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = projectItems.find(p => p.href.endsWith(params.id));

  if (!project) {
    return <div className="container mx-auto px-4 pt-24">项目不存在</div>;
  }

  return (
    <ProjectAnimation>
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
        <p className="text-gray-600 mb-8">{project.description}</p>
      </div>
    </ProjectAnimation>
  );
} 