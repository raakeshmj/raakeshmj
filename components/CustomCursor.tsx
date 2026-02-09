import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Smooth spring physics for the main ring
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Stiffer spring for the dot
  const dotSpringConfig = { damping: 35, stiffness: 1500, mass: 0.1 };
  const dotXSpring = useSpring(dotX, dotSpringConfig);
  const dotYSpring = useSpring(dotY, dotSpringConfig);

  const [isHovering, setIsHovering] = useState(false);
  const hoveringRef = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const updateHoverState = (target: HTMLElement) => {
       const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' ||
        target.closest('a') !== null || 
        target.closest('button') !== null ||
        target.closest('[role="button"]') !== null;

       if (isClickable !== hoveringRef.current) {
         hoveringRef.current = isClickable;
         setIsHovering(isClickable);
       }
    };

    const mouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame to throttle updates
      if (rafId.current) return;
      
      rafId.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX - 16);
        cursorY.set(e.clientY - 16);
        dotX.set(e.clientX - 4);
        dotY.set(e.clientY - 4);

        const target = e.target as HTMLElement;
        if (target.tagName === 'A' || target.tagName === 'BUTTON') {
           if (!hoveringRef.current) {
              hoveringRef.current = true;
              setIsHovering(true);
           }
        } else {
          updateHoverState(target);
        }
        
        rafId.current = null;
      });
    };

    window.addEventListener("mousemove", mouseMove, { passive: true });
    return () => {
        window.removeEventListener("mousemove", mouseMove);
        if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-[9999] hidden md:block mix-blend-difference will-change-transform"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'var(--accent)' : 'transparent',
          borderColor: 'var(--accent)'
        }}
        transition={{
          scale: { type: "spring", damping: 20, stiffness: 300 },
          backgroundColor: { duration: 0.2 },
          borderColor: { duration: 0.2 }
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] hidden md:block will-change-transform"
        style={{
          x: dotXSpring,
          y: dotYSpring,
        }}
      />
    </>
  );
};