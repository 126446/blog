'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

// 修复 Leaflet 默认图标问题
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
});

interface Location {
  name: string;
  nameEn: string;
  coordinates: [number, number];
  date: string;
  description?: string;
  category: 'work' | 'travel' | 'study' | 'life';
}

const locations: Location[] = [
  {
    name: "成都",
    nameEn: "Chengdu",
    coordinates: [30.5728, 104.0668],  // Leaflet 使用 [lat, lng] 顺序
    date: "2023",
    description: "生活",
    category: 'life'
  },
  {
    name: "北海",
    nameEn: "Beihai",
    coordinates: [21.4733, 109.1141],
    date: "2023",
    description: "旅游",
    category: 'travel'
  },
  {
    name: "上海",
    nameEn: "Shanghai",
    coordinates: [31.2304, 121.4737],
    date: "2023",
    description: "旅游",
    category: 'travel'
  },
  {
    name: "北京",
    nameEn: "Beijing",
    coordinates: [39.9042, 116.4074],
    date: "2023",
    description: "工作",
    category: 'work'
  },
  {
    name: "南宁",
    nameEn: "Nanning",
    coordinates: [22.8150, 108.3200],
    date: "2023",
    description: "旅游",
    category: 'travel'
  },
  {
    name: "桂林",
    nameEn: "Guilin",
    coordinates: [25.2742, 110.2990],
    date: "2023",
    description: "旅游",
    category: 'travel'
  }
];

const categoryColors = {
  work: '#FF6B6B',
  travel: '#4ECDC4',
  study: '#45B7D1',
  life: '#FFB347'
};

const categoryNames = {
  work: '工作',
  travel: '旅游',
  study: '学习',
  life: '生活'
};

export default function TravelMap() {
  const [mounted, setMounted] = useState(false);

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
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map((location) => (
            <Marker
              key={location.name}
              position={location.coordinates}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold">{location.name}</h3>
                  <p className="text-sm text-gray-600">{location.nameEn}</p>
                  <p className="text-sm">
                    {categoryNames[location.category]} · {location.date}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* 图例 */}
      <div className="flex justify-center gap-6">
        {Object.entries(categoryNames).map(([category, name]) => (
          <div key={category} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: categoryColors[category as keyof typeof categoryColors] }}
            />
            <span className="text-sm text-gray-600">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 