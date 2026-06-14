'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'project'>('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Coordinate motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Springs for outer ring
  const springConfig = { stiffness: 200, damping: 22, mass: 0.15 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device is touch-based (hide cursor on touch)
    if (typeof window !== 'undefined') {
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      if (isTouch) return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const cursorTextAttr = target.closest('[data-cursor-text]');
      if (cursorTextAttr) {
        setCursorType('project');
        setCursorText(cursorTextAttr.getAttribute('data-cursor-text') || '');
        return;
      }

      const isPointer = target.closest('a') || target.closest('button') || target.closest('[role="button"]') || target.classList.contains('cursor-pointer');
      if (isPointer) {
        setCursorType('pointer');
        setCursorText('');
        return;
      }

      setCursorType('default');
      setCursorText('');
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide actual cursor
    document.documentElement.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.style.cursor = 'auto';
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed left-0 top-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border flex items-center justify-center overflow-hidden"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          width: cursorType === 'pointer' ? 44 : cursorType === 'project' ? 70 : 22,
          height: cursorType === 'pointer' ? 44 : cursorType === 'project' ? 70 : 22,
          backgroundColor: cursorType === 'project' ? 'oklch(0.55 0.22 235)' : 'rgba(0, 0, 0, 0)',
          borderColor: cursorType === 'pointer' ? 'oklch(0.68 0.16 200)' : cursorType === 'project' ? 'oklch(0.55 0.22 235)' : 'rgba(255, 255, 255, 0.25)',
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      >
        {cursorType === 'project' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center text-[10px] text-white font-bold uppercase tracking-wider select-none px-2"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed left-0 top-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: cursorType === 'pointer' ? 2 : cursorType === 'project' ? 0 : 1,
          backgroundColor: cursorType === 'pointer' ? 'oklch(0.68 0.16 200)' : 'oklch(0.55 0.22 235)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </>
  );
}
