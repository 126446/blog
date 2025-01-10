"use client";

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

interface CurveProps {
  positions: [number, number][];
  color: string;
  weight?: number;
  opacity?: number;
  dashArray?: string;
  animate?: {
    duration: number;
    iterations: number;
  };
}

export function Curve({ 
  positions, 
  color, 
  weight = 2, 
  opacity = 0.6,
  dashArray = "10,10",
  animate
}: CurveProps) {
  const map = useMap();
  const curveRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    if (!map) return;

    // 创建曲线路径
    const controlPoints = positions.map(pos => L.latLng(pos[0], pos[1]));
    const curveLatLngs = generateCurve(controlPoints);
    
    // 创建路线
    curveRef.current = L.polyline(curveLatLngs, {
      color,
      weight,
      opacity,
      dashArray
    }).addTo(map);

    // 添加动画效果
    if (animate) {
      const animateDashOffset = () => {
        const path = curveRef.current?.getElement();
        if (path) {
          path.animate(
            [
              { strokeDashoffset: 0 },
              { strokeDashoffset: -20 }
            ],
            {
              duration: animate.duration,
              iterations: animate.iterations
            }
          );
        }
      };
      animateDashOffset();
    }

    return () => {
      if (curveRef.current) {
        map.removeLayer(curveRef.current);
      }
    };
  }, [map, positions, color, weight, opacity, dashArray, animate]);

  return null;
}

// 生成贝塞尔曲线点
function generateCurve(points: L.LatLng[]): L.LatLng[] {
  const curvePoints: L.LatLng[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const start = points[i];
    const end = points[i + 1];
    
    // 计算控制点
    const controlPoint = L.latLng(
      (start.lat + end.lat) / 2,
      (start.lng + end.lng) / 2 + (end.lng - start.lng) * 0.2
    );
    
    // 生成曲线点
    for (let t = 0; t <= 1; t += 0.01) {
      const lat = Math.pow(1-t, 2) * start.lat + 
                  2 * (1-t) * t * controlPoint.lat + 
                  Math.pow(t, 2) * end.lat;
      const lng = Math.pow(1-t, 2) * start.lng + 
                  2 * (1-t) * t * controlPoint.lng + 
                  Math.pow(t, 2) * end.lng;
      curvePoints.push(L.latLng(lat, lng));
    }
  }
  return curvePoints;
} 