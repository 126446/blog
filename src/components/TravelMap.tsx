'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

interface Location {
  name: string;
  nameEn: string;
  coordinates: [number, number];
  date: string;
  duration: number;
  category: 'work' | 'travel' | 'study' | 'life';
}

const locations: Location[] = [
  {
    name: "成都",
    nameEn: "Chengdu",
    coordinates: [30.5728, 104.0668],
    date: "2023",
    duration: 365,
    category: 'life'
  },
  {
    name: "北海",
    nameEn: "Beihai",
    coordinates: [21.4733, 109.1141],
    date: "2023",
    duration: 7,
    category: 'travel'
  },
  {
    name: "上海",
    nameEn: "Shanghai",
    coordinates: [31.2304, 121.4737],
    date: "2023",
    duration: 14,
    category: 'travel'
  },
  {
    name: "北京",
    nameEn: "Beijing",
    coordinates: [39.9042, 116.4074],
    date: "2023",
    duration: 180,
    category: 'work'
  },
  {
    name: "南宁",
    nameEn: "Nanning",
    coordinates: [22.8150, 108.3200],
    date: "2023",
    duration: 5,
    category: 'travel'
  },
  {
    name: "桂林",
    nameEn: "Guilin",
    coordinates: [25.2742, 110.2990],
    date: "2023",
    duration: 4,
    category: 'travel'
  }
];

// 热力图颜色渐变
const getHeatColor = (intensity: number) => {
  // 从蓝色到紫色到红色的渐变
  const colors = [
    { threshold: 0.2, color: '#4575b4' },   // 浅蓝
    { threshold: 0.4, color: '#74add1' },   // 蓝色
    { threshold: 0.6, color: '#abd9e9' },   // 浅紫
    { threshold: 0.8, color: '#e8c3b9' },   // 浅红
    { threshold: 1.0, color: '#d73027' }    // 红色
  ];

  for (let i = 0; i < colors.length; i++) {
    if (intensity <= colors[i].threshold) {
      return colors[i].color;
    }
  }
  return colors[colors.length - 1].color;
};

// 根据停留时间计算圆圈样式
const getCircleOptions = (duration: number) => {
  const maxDuration = 365; // 一年作为最大值
  const intensity = Math.min(duration / maxDuration, 1);
  const baseRadius = 30000; // 基础半径
  const maxRadius = 100000; // 最大半径

  return {
    radius: baseRadius + (maxRadius - baseRadius) * intensity,
    color: 'transparent',
    fillColor: getHeatColor(intensity),
    fillOpacity: 0.6,
    weight: 0
  };
};

// 创建多层圆圈效果
const CircleGroup = ({ location }: { location: Location }) => {
  const maxDuration = 365;
  const intensity = Math.min(location.duration / maxDuration, 1);
  const layers = 4; // 圆圈层数

  return Array.from({ length: layers }).map((_, index) => {
    const layerIntensity = intensity * ((layers - index) / layers);
    const options = {
      radius: getCircleOptions(location.duration * ((index + 1) / layers)).radius,
      fillColor: getHeatColor(layerIntensity),
      fillOpacity: 0.2,
      color: 'transparent',
      weight: 0
    };

    return (
      <Circle
        key={`${location.name}-${index}`}
        center={location.coordinates}
        {...options}
      />
    );
  });
};

export default function TravelMap() {
  const [mounted, setMounted] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-[600px] bg-gray-100 rounded-xl animate-pulse" />;
  }

  return (
    <div className="space-y-6">
      <div className="relative w-full h-[600px] rounded-xl shadow-lg overflow-hidden">
        <MapContainer
          center={[35.8617, 104.1954]}
          zoom={5}
          className="w-full h-full"
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {locations.map((location) => (
            <div
              key={location.name}
              onMouseEnter={() => setSelectedLocation(location)}
              onMouseLeave={() => setSelectedLocation(null)}
            >
              <CircleGroup location={location} />
            </div>
          ))}
        </MapContainer>

        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4"
          >
            <h3 className="font-bold text-lg">{selectedLocation.name}</h3>
            <p className="text-gray-600">{selectedLocation.nameEn}</p>
            <p className="text-sm">
              停留时间：{selectedLocation.duration} 天
            </p>
            <p className="text-sm text-gray-500">{selectedLocation.date}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
} 