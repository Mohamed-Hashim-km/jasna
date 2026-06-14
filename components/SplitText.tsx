'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SplitTextProps {
  children: string;
  className?: string;
  once?: boolean;
  delay?: number;
}

export function SplitText({ children, className = '', once = true, delay = 0 }: SplitTextProps) {
  const words = children.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: '70%',
    },
    visible: {
      opacity: 1,
      y: '0%',
      transition: {
        type: 'spring' as const,
        damping: 20,
        stiffness: 140,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-20px' }}
    >
      {words.map((word, idx) => (
        <span
          key={idx}
          className="inline-block overflow-hidden mr-[0.22em] py-[0.1em]"
        >
          <motion.span
            variants={child}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
