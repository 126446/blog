'use client';

import dynamic from 'next/dynamic';

const TravelMap = dynamic(() => import('./TravelMap'), {
  ssr: false, // 禁用服务器端渲染
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 rounded-xl animate-pulse flex items-center justify-center">
      <p className="text-gray-500">加载地图中...</p>
    </div>
  ),
});

export default TravelMap; 