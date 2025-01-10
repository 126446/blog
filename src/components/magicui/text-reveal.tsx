"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
}

const Word: FC<{
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mx-1 lg:mx-2.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span
        style={{ opacity }}
        className="text-gray-800 dark:text-gray-200"
      >
        {children}
      </motion.span>
    </span>
  );
};

export const TextReveal: FC<TextRevealProps> = ({
  text,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  
  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 min-h-[50vh]", className)}>
      <div className="sticky top-1/2 -translate-y-1/2 mx-auto flex max-w-4xl items-center bg-transparent px-4">
        <p className="flex flex-wrap text-xl md:text-2xl lg:text-3xl font-medium">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
}; 