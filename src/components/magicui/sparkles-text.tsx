'use client';

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, MotionValue } from "framer-motion";

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
const range = (start: number, end: number) => Array.from({ length: end - start }, (_, k) => k + start);

const generateSparkle = (color: string = "#FFC700") => {
  return {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(10, 20),
    style: {
      top: random(-20, 120) + '%',
      left: random(-20, 120) + '%',
      zIndex: 2
    }
  };
};

interface SparkleProps {
  size: number;
  color: string;
  style: React.CSSProperties;
}

const Sparkle = ({ size, color, style }: SparkleProps) => {
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      style={{
        ...style,
        position: "absolute",
        display: "block",
        pointerEvents: "none",
        width: size + "px",
        height: size + "px",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
          fill={color}
        />
      </svg>
    </motion.span>
  );
};

interface SparklesTextProps {
  text: string;
  className?: string;
  color?: string;
}

const SparklesText = ({ text, className = "", color = "#FFC700" }: SparklesTextProps) => {
  const [sparkles, setSparkles] = useState<ReturnType<typeof generateSparkle>[]>([]);

  useEffect(() => {
    const createSparkle = () => {
      const now = Date.now();
      const sparkle = generateSparkle(color);
      const cleanup = () => {
        setSparkles(sparkles => sparkles.filter(s => s.id !== sparkle.id));
      };
      setSparkles(sparkles => [...sparkles, sparkle]);
      setTimeout(cleanup, 500);
    };

    const interval = setInterval(createSparkle, 100);
    return () => clearInterval(interval);
  }, [color]);

  return (
    <motion.span
      className={"relative inline-block " + className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <Sparkle
            key={sparkle.id}
            color={sparkle.color}
            size={sparkle.size}
            style={sparkle.style}
          />
        ))}
      </AnimatePresence>
      <motion.strong
        className="font-bold relative z-1 animate-jump"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 10
        }}
      >
        {text}
      </motion.strong>
    </motion.span>
  );
};

export default SparklesText; 