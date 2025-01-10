'use client'
// src/app/page.tsx
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { LogoCarousel } from "@/components/ui/logo-carousel";
import VelocityScroll from "@/components/velocity-scroll";
import { TextReveal } from "@/components/magicui/text-reveal";
import Particles from "@/components/magicui/particles";
import type { ConfettiRef } from '@/components/magicui/confetti';

export default function Home() {
  const confettiRef = useRef<ConfettiRef>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-x-hidden">
      <Particles
        className="absolute inset-0 -z-10"
        quantity={100}
        staticity={50}
        ease={50}
        color="#4F46E5"
      />

      <div className="relative flex flex-col items-center gap-8">
        <div className="mb-8 w-full max-w-5xl overflow-hidden">
          <VelocityScroll 
            defaultVelocity={0.5}
            numRows={2}
            className="text-lg md:text-xl font-normal tracking-normal opacity-70"
          >
            <span className="mr-16">
              👋 欢迎来到我的博客空间 
              · 这里记录着我的编程之旅 
              · 分享技术见解与生活感悟 
              · 让我们一起探索和成长
            </span>
          </VelocityScroll>
        </div>

        <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
          你好，我是健宇 👋
        </h1>

        <div className="relative w-[900px] h-[700px] -mb-16">
          <LogoCarousel />
        </div>

        <TextReveal 
          text="热爱编程 热爱生活 专注于前端开发 致力于创造优秀的用户体验"
          className="w-full max-w-2xl px-4"
        />
      </div>
    </div>
  );
}