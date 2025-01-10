"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PhoneIcon, MailIcon, GithubIcon, MessageSquareIcon } from 'lucide-react';
import SparklesText from "@/components/magicui/sparkles-text";
import Confetti, { type ConfettiRef } from '@/components/magicui/confetti';

// 定义联系方式图标类型
interface ContactIcon {
  name: string;
  id: string;
  img: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  info: string;
  label: string;
}

// 联系方式数据
const contactIcons: ContactIcon[] = [
  {
    name: "电话",
    id: "phone",
    img: PhoneIcon,
    info: "18884886889",
    label: "电话号码"
  },
  {
    name: "邮箱",
    id: "email", 
    img: MailIcon,
    info: "1226744586@qq.com",
    label: "邮箱地址"
  },
  {
    name: "GitHub",
    id: "github",
    img: GithubIcon,
    info: "126446",
    label: "GitHub账号"
  },
  {
    name: "微信",
    id: "wechat",
    img: MessageSquareIcon,
    info: "点击添加微信",
    label: "微信号"
  }
];

// 工具函数：随机打乱数组
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 工具函数：分配图标到列
const distributeIcons = (allIcons: ContactIcon[], columnCount: number): ContactIcon[][] => {
  const shuffled = shuffleArray(allIcons);
  const columns: ContactIcon[][] = Array.from({ length: columnCount }, () => []);
  
  shuffled.forEach((icon, index) => {
    columns[index % columnCount].push(icon);
  });

  const maxLength = Math.max(...columns.map((col) => col.length));
  columns.forEach((col) => {
    while (col.length < maxLength) {
      col.push(shuffled[Math.floor(Math.random() * shuffled.length)]);
    }
  });

  return columns;
};

// 图标列组件
interface IconColumnProps {
  icons: ContactIcon[];
  index: number;
  currentTime: number;
  onIconClick: (icon: ContactIcon) => void;
}

const IconColumn = React.memo(({ icons, index, currentTime, onIconClick }: IconColumnProps) => {
  const cycleInterval = 2000;
  const columnDelay = index * 200;
  const adjustedTime = (currentTime + columnDelay) % (cycleInterval * icons.length);
  const currentIndex = Math.floor(adjustedTime / cycleInterval);
  const CurrentIcon = icons[currentIndex].img;

  return (
    <motion.div
      className="w-24 h-14 md:w-36 md:h-24 overflow-hidden relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${icons[currentIndex].id}-${currentIndex}`}
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={() => onIconClick(icons[currentIndex])}
          initial={{ y: "10%", opacity: 0, filter: "blur(8px)" }}
          animate={{
            y: "0%",
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
              mass: 1,
              bounce: 0.2,
              duration: 0.5,
            },
          }}
          exit={{
            y: "-20%",
            opacity: 0,
            filter: "blur(6px)",
            transition: {
              type: "tween",
              ease: "easeIn",
              duration: 0.3,
            },
          }}
        >
          <CurrentIcon className="w-16 h-16 md:w-24 md:h-24 max-w-[80%] max-h-[80%] object-contain" />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
});

IconColumn.displayName = "IconColumn";

// 主轮播组件
export function LogoCarousel({ columnCount = 2 }: { columnCount?: number }) {
  const [iconSets, setIconSets] = useState<ContactIcon[][]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedContact, setSelectedContact] = useState<ContactIcon | null>(null);
  const confettiRef = useRef<ConfettiRef>(null);

  const handleIconClick = useCallback((icon: ContactIcon) => {
    setSelectedContact(icon);
    confettiRef.current?.fire({
      spread: 360,
      startVelocity: 45,
      elementCount: 200,
      decay: 0.95
    });
  }, []);

  useEffect(() => {
    const distributedIcons = distributeIcons(contactIcons, columnCount);
    setIconSets(distributedIcons);
  }, [columnCount]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(prevTime => prevTime + 100);
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative">
      <Confetti
        ref={confettiRef}
        className="absolute left-0 top-0 z-0 w-full h-full"
      />
      
      <div className="flex justify-center gap-16">
        {iconSets.map((icons, index) => (
          <IconColumn
            key={index}
            icons={icons}
            index={index}
            currentTime={currentTime}
            onIconClick={handleIconClick}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedContact && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="relative z-10"
            >
              <SparklesText 
                text={`${selectedContact.label}: ${selectedContact.info}`}
                className="text-4xl font-bold"
                color="#FFD700"
              />
            </motion.div>
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setSelectedContact(null)}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
} 