'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
  "Hello",
  "Namaskaram",
  "Python",
  "Design",
  "Backend",
  "Create",
  "Jesna.dev"
];

export function Preloader() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Fast random counter from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 450);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + step);
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!mounted || index === words.length - 1) return;
    const delay = index === 0 ? 300 : index === 1 ? 250 : index === 2 ? 200 : 150;
    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, delay);
    return () => clearTimeout(timeout);
  }, [index, mounted]);

  const slideUp = {
    initial: {
      y: 0
    },
    exit: {
      y: "-100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.1 }
    }
  };

  const textReveal = {
    initial: {
      opacity: 0,
      y: 35
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.215, 0.61, 0.355, 1] as const }
    },
    exit: {
      opacity: 0,
      y: -35,
      transition: { duration: 0.25, ease: [0.215, 0.61, 0.355, 1] as const }
    }
  };

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          variants={slideUp}
          initial="initial"
          exit="exit"
          className="fixed left-0 top-0 z-[10000] flex h-screen w-screen flex-col items-center justify-between bg-[oklch(0.07_0.015_235)] px-8 py-10 text-white select-none pointer-events-auto"
        >
          {/* Header */}
          <div className="flex w-full max-w-6xl items-center justify-between text-xs tracking-[0.25em] text-muted-foreground/60 uppercase">
            <span>Jesna Beegum S</span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1 w-1 rounded-full bg-primary animate-pulse" />
              Initializing
            </span>
          </div>

          {/* Changing Greeting Words */}
          <div className="relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={words[index]}
                variants={textReveal}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-4xl font-extralight tracking-tight md:text-6xl text-white flex items-center gap-3.5"
              >
                <span className="text-[oklch(0.55_0.22_235)] font-bold">//</span>
                {words[index]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Footer percentage */}
          <div className="flex w-full max-w-6xl items-end justify-between">
            <div className="h-[2px] w-32 md:w-48 bg-white/5 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.05, ease: 'easeOut' }}
              />
            </div>
            <span className="font-mono text-5xl font-light text-[oklch(0.55_0.22_235)] md:text-7xl leading-none">
              {progress}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
