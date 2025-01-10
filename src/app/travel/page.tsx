"use client";

import { Suspense, lazy } from 'react';
import Image from "next/image";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

const WorldMap = lazy(() => import('@/components/ui/world-map').then(mod => ({ default: mod.WorldMap })));

const travelPhotos = [
  {
    category: "成都之旅",
    title: "熊猫基地",
    src: "/blog/images/travel/chengdu/1.jpg",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative w-full aspect-video">
          <Image
            src="/blog/images/travel/chengdu/1.jpg"
            alt="熊猫基地"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-lg object-cover"
          />
        </div>
        <img
          src="/blog/images/travel/chengdu/3.jpg"
          alt="大熊猫"
          className="rounded-lg w-full h-64 object-cover"
        />
        <img
          src="/blog/images/travel/chengdu/4.jpg"
          alt="凤凰山体育公园"
          className="rounded-lg w-full h-64 object-cover"
        />
        <p className="md:col-span-2 text-gray-600 dark:text-gray-300">
          成都，一个让人来了就不想走的城市，

        </p>
      </div>
    ),
  },
  {
    category: "三亚之旅",
    title: "碧海蓝天",
    src: "/blog/images/travel/sanya/1.jpg",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <img
          src="/blog/images/travel/sanya/2.jpg"
          alt="大东海"
          className="rounded-lg w-full h-64 object-cover"
        />
        <img
          src="/blog/images/travel/sanya/3.jpg"
          alt="亚龙湾"
          className="rounded-lg w-full h-64 object-cover"
        />
        <p className="md:col-span-2 text-gray-600 dark:text-gray-300">
          三亚，一个让人流连忘返的热带天堂。这里有洁白的沙滩，
          湛蓝的海水，茂密的椰林。在大东海感受海浪的节奏，
          在亚龙湾享受阳光浴，让身心都沉浸在这片美丽的海滨风光中。
          不论是观赏日出日落，还是体验海上运动，都能让人感受到大自然的馈赠。
        </p>
      </div>
    ),
  },
  {
    category: "北京之旅",
    title: "故宫与长城",
    src: "/blog/images/travel/beijing/1.jpg",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative w-full aspect-video">
          <Image
            src="/blog/images/travel/beijing/2.jpg"
            alt="故宫"
            fill
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative w-full aspect-video">
          <Image
            src="/blog/images/travel/beijing/3.jpg"
            alt="长城"
            fill
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <p className="md:col-span-2 text-gray-600 dark:text-gray-300">
          去北京的主要是为了开发Jetson搭载奥比中光相机并用
          服务器转发点云数据，所以没有太多时间去游玩，
          但是还是去看了一下圆明园，之前初中来过，但是暑期太热，
          这次来是冬天，但也不是很冷，所以还是去看了看，
          圆明园很大，人也很多，很适合散步，
          但是圆明园的遗址还是让人感到惋惜，
          毕竟这是中国历史上的一块伤疤，
          但是还是让人感到惋惜，下次来的时候希望能看到北京的雪。
        </p>
      </div>
    ),
  },
  {
    category: "上海之旅",
    title: "魔都风情",
    src: "/blog/images/travel/shanghai/1.jpg",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative w-full aspect-video">
          <Image
            src="/blog/images/travel/shanghai/2.jpg"
            alt="外滩"
            fill
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative w-full aspect-video">
          <Image
            src="/blog/images/travel/shanghai/3.jpg"
            alt="陆家嘴"
            fill
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <p className="md:col-span-2 text-gray-600 dark:text-gray-300">
          上海是一座充满活力的国际化大都市。外滩的万国建筑群展现了中西文化的交融，
          而陆家嘴的现代摩天大楼则代表着中国的蓬勃发展。
        </p>
      </div>
    ),
  },
  {
    category: "北海之旅",
    title: "银滩与老街",
    src: "/blog/images/travel/beihai/1.jpg",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative w-full aspect-video">
          <Image
            src="/blog/images/travel/beihai/2.jpg"
            alt="银滩"
            fill
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative w-full aspect-video">
          <Image
            src="/blog/images/travel/beihai/3.jpg"
            alt="老街"
            fill
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <p className="md:col-span-2 text-gray-600 dark:text-gray-300">
          北海的银滩以其细腻的白沙和清澈的海水闻名，漫步在海滩上，感受海风的轻抚。
          老街则保留了独特的骑楼建筑，展现了这座海滨城市的历史风貌。
        </p>
      </div>
    ),
  },
  {
    category: "南宁之旅",
    title: "绿城风光",
    src: "/blog/images/travel/nanning/1.jpg",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <img
          src="/blog/images/travel/nanning/1.jpg"
          alt="高铁站"
          className="rounded-lg w-full h-64 object-cover"
        />
        <p className="md:col-span-2 text-gray-600 dark:text-gray-300">
          南宁，去了几次，但是每次都是匆匆忙忙，
          没有好好感受这座城市的魅力，
          下次来的时候希望能好好感受这座城市的魅力。
        </p>
      </div>
    ),
  },
  {
    category: "柳州之旅",
    title: "绝美山水",
    src: "/blog/images/travel/liuzhou/1.jpg",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <img
          src="/blog/images/travel/liuzhou/2.jpg"
          alt="柳江"
          className="rounded-lg w-full h-64 object-cover"
        />
        <img
          src="/blog/images/travel/liuzhou/3.jpg"
          alt="龙潭公园"
          className="rounded-lg w-full h-64 object-cover"
        />
        <p className="md:col-span-2 text-gray-600 dark:text-gray-300">
          柳州是一座独特的工业山水城市。柳江蜿蜒流过城中，
          群山环抱其间，工业与自然和谐共存。这里的螺蛳粉闻名遐迩，
          而龙潭公园的樱花更是美不胜收，希望下次来的时候能看到樱花盛开。
        </p>
      </div>
    ),
  },
];

export default function TravelPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-10 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          旅行足迹
        </h1>
        
        <Suspense fallback={
          <div className="w-full aspect-[2/1] bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse flex items-center justify-center mb-16">
            <div className="text-gray-500">地图加载中...</div>
          </div>
        }>
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">我的旅行地图</h2>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <WorldMap 
                dots={[
                  {
                    start: { lat: 30.5728, lng: 104.0668, label: "成都" },
                    end: { lat: 30.5728, lng: 104.0668 }
                  },
                  // ... 其他城市
                ]}
                lineColor="#4F46E5"
              />
            </div>
          </div>
        </Suspense>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">旅行相册</h2>
          <Carousel
            items={travelPhotos.map((photo, index) => (
              <Card key={index} card={photo} index={index} layout={true} />
            ))}
          />
        </div>
      </div>
    </div>
  );
} 