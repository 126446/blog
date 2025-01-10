"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// 定义旅行地点类型
interface TravelLocation {
  position: [number, number];
  name: string;
  date: string;
  description: string;
  intensity?: number; // 添加强度属性，用于控制圆圈大小和颜色
}

// 旅行地点数据
const travelLocations: TravelLocation[] = [
  {
    position: [39.9042, 116.4074],
    name: "北京",
    date: "2023-10",
    description: "参观故宫、长城等历史文化景点",
    intensity: 0.8 // 0-1 之间的值，表示停留时间或重要程度
  },
  {
    position: [31.2304, 121.4737],
    name: "上海",
    date: "2023-08",
    description: "体验现代都市魅力",
    intensity: 0.6
  },
  {
    position: [30.5728, 104.0668],
    name: "成都",
    date: "2023-12",
    description: "感受天府之国的美食与文化",
    intensity: 0.9
  },
  {
    position: [25.2744, 110.2902],
    name: "桂林",
    date: "2023-07",
    description: "漓江山水甲天下",
    intensity: 0.7
  },
  {
    position: [22.8167, 108.3665],
    name: "南宁",
    date: "2023-06",
    description: "绿城生态宜居",
    intensity: 0.5
  },
  {
    position: [21.4819, 109.1265],
    name: "北海",
    date: "2023-05",
    description: "银滩碧海蓝天",
    intensity: 0.6
  },
  {
    position: [18.2528, 109.5181],
    name: "三亚",
    date: "2023-04",
    description: "热带海滨度假胜地",
    intensity: 0.8
  },
  {
    position: [24.3254, 109.4244],
    name: "柳州",
    date: "2023-09",
    description: "工业与山水的完美融合",
    intensity: 0.5
  }
];

// 定义路线数据
const routes = [
  // 路线1: 成都-三亚-上海-成都
  {
    path: [
      [30.5728, 104.0668], // 成都
      [18.2528, 109.5181], // 三亚
      [31.2304, 121.4737], // 上海
      [30.5728, 104.0668]  // 成都
    ],
    color: '#FF4081'
  },
  // 路线2: 成都-北京-成都
  {
    path: [
      [30.5728, 104.0668], // 成都
      [39.9042, 116.4074], // 北京
      [30.5728, 104.0668]  // 成都
    ],
    color: '#2196F3'
  },
  // 路线3: 成都-桂林-南宁-北海-柳州-南宁-成都
  {
    path: [
      [30.5728, 104.0668], // 成都
      [25.2744, 110.2902], // 桂林
      [22.8167, 108.3665], // 南宁
      [21.4819, 109.1265], // 北海
      [24.3254, 109.4244], // 柳州
      [22.8167, 108.3665], // 南宁
      [30.5728, 104.0668]  // 成都
    ],
    color: '#4CAF50'
  }
];

export default function ClientTravelMap() {
  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={[35.8617, 104.1954]}
        zoom={4}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* 渲染热力图圆圈 */}
        {travelLocations.map((location, index) => (
          <Circle
            key={`circle-${index}`}
            center={location.position}
            pathOptions={{
              fillColor: '#FF1744',
              fillOpacity: location.intensity || 0.5,
              color: '#FF1744',
              weight: 1,
            }}
            radius={50000}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg">{location.name}</h3>
                <p className="text-gray-600">{location.date}</p>
                <p className="mt-2">{location.description}</p>
              </div>
            </Popup>
          </Circle>
        ))}

        {/* 渲染路线 */}
        {routes.map((route, index) => (
          <Curve
            key={`route-${index}`}
            positions={route.path as [number, number][]}
            color={route.color}
            weight={2}
            opacity={0.6}
            dashArray="10,10"
            animate={{
              duration: 3000,
              iterations: Infinity
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}