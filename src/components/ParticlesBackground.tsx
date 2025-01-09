// src/components/ParticlesBackground.tsx
'use client';

import { useEffect, useState } from 'react';
import Particles from './magicui/particles';

export default function ParticlesBackground() {
  const [mounted, setMounted] = useState(false);
  const [color, setColor] = useState('#000000');

  useEffect(() => {
    setMounted(true);
    // 基于背景色设置粒子颜色
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setColor(isDark ? '#ffffff' : '#000000');
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none">
      <Particles
        className="absolute inset-0"
        quantity={50}
        ease={80}
        color={color}
        refresh={false}
      />
    </div>
  );
}