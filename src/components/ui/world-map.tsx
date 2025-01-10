"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useTheme } from "next-themes";
import '@/styles/world-map.css';

// 动态导入 DottedMap，但确保它在客户端渲染
const DottedMap = dynamic(() => 
  import('dotted-map').then(mod => {
    // 确保我们得到正确的构造函数
    return mod.default || mod;
  }),
  { ssr: false }
);

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { theme } = useTheme();
  const [svgMap, setSvgMap] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // 缓存点的投影计算
  const projectedPoints = useMemo(() => {
    return dots.map(dot => ({
      start: projectPoint(dot.start.lat, dot.start.lng),
      end: projectPoint(dot.end.lat, dot.end.lng)
    }));
  }, [dots]);

  // 缓存路径计算
  const paths = useMemo(() => {
    return projectedPoints.map(point => 
      createCurvedPath(point.start, point.end)
    );
  }, [projectedPoints]);

  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      try {
        if (typeof window === 'undefined') return; // 确保在客户端执行

        setIsLoading(true);
        // 等待 DottedMap 加载
        const DottedMapClass = await DottedMap;
        const map = new DottedMapClass({ 
          height: 80,
          grid: "diagonal",
          spacing: 1.2,
        });
        
        if (map && typeof map.getSVG === 'function' && isMounted) {
          const svg = map.getSVG({
            radius: 0.22,
            color: theme === "dark" ? "#FFFFFF40" : "#00000040",
            shape: "circle",
            backgroundColor: theme === "dark" ? "black" : "white",
          });
          setSvgMap(svg);
        }
      } catch (error) {
        console.error('Map initialization error:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initMap();
    return () => { isMounted = false; };
  }, [theme]);

  function projectPoint(lat: number, lng: number) {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  }

  function createCurvedPath(
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  }

  if (isLoading || !svgMap) {
    return (
      <div className="w-full aspect-[2/1] bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gray-500">地图加载中...</div>
      </div>
    );
  }

  return (
    <div className={`world-map-container ${theme}`}>
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="world-map-image"
        alt="world map"
        width={1056}
        height={495}
        priority
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="world-map-svg"
      >
        {paths.map((path, i) => (
          <g key={`path-group-${i}`}>
            <motion.path
              d={path}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1,
                delay: 0.5 * i,
                ease: "easeOut",
              }}
            />
            <circle
              cx={projectedPoints[i].start.x}
              cy={projectedPoints[i].start.y}
              r="2"
              fill={lineColor}
            >
              <animate
                attributeName="r"
                values="2;4;2"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
