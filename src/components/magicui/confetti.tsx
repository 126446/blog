'use client';

import { useCallback, useImperativeHandle, useRef, forwardRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import type { CreateTypes } from 'canvas-confetti';

interface ConfettiOptions {
  spread?: number;
  startVelocity?: number;
  elementCount?: number;
  decay?: number;
  angle?: number;
  colors?: string[];
  ticks?: number;
  origin?: { x: number; y: number };
  scalar?: number;
  shapes?: ("square" | "circle")[];
  zIndex?: number;
  disableForReducedMotion?: boolean;
}

export type ConfettiRef = {
  fire: (opts?: ConfettiOptions) => void;
};

const Confetti = forwardRef<ConfettiRef, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, style, ...props }, ref) => {
    const confettiRef = useRef<any>(null);

    const getInstance = useCallback((confetti: any) => {
      confettiRef.current = confetti?.confetti;
    }, []);

    useImperativeHandle(ref, () => ({
      fire: (opts = {}) => {
        if (confettiRef.current) {
          confettiRef.current({
            spread: 90,
            startVelocity: 30,
            elementCount: 150,
            decay: 0.9,
            origin: { x: 0.5, y: 0.5 },
            ...opts,
          });
        }
      },
    }));

    return (
      <div className={className} style={style} {...props}>
        <ReactCanvasConfetti
          onInit={getInstance}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            pointerEvents: 'none'
          }}
        />
      </div>
    );
  }
);

Confetti.displayName = "Confetti";

export default Confetti; 