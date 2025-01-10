import dynamic from 'next/dynamic';

// 动态导入地图组件，禁用 SSR
const ClientTravelMap = dynamic(() => import('@/components/ClientTravelMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
      <p>Loading map...</p>
    </div>
  )
});

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-12">
        <section>
          <h1 className="text-3xl font-bold mb-6">关于我</h1>
          <div className="prose prose-lg">
            <p>
              热爱技术，喜欢探索新事物。在软件开发领域有着丰富的经验和持续学习的热情。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">我的足迹</h2>
          <ClientTravelMap />
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">技能</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">开发技能</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>前端开发</li>
                  <li>后端开发</li>
                  <li>ROS开发</li>
                  <li>数据库设计</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">专业技能</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>机器视觉</li>
                  <li>数据分析</li>
                  <li>深度学习</li>
                  <li>机器人开发</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">教育经历</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">计算机科学与技术</h3>
                <p className="text-gray-600">2019 - 2023</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 