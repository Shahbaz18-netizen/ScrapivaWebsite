'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const Reveal = ({ children, width = '100%', delay = 0, direction = 'up' }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const getHiddenPosition = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 75 };
      case 'down': return { opacity: 0, y: -75 };
      case 'left': return { opacity: 0, x: 75 };
      case 'right': return { opacity: 0, x: -75 };
      case 'none': return { opacity: 0 };
      default: return { opacity: 0, y: 75 };
    }
  };

  const getVisiblePosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'none':
        return { opacity: 1 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }}>
      <motion.div
        variants={{
          hidden: getHiddenPosition(),
          visible: getVisiblePosition(),
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.6, delay: delay, ease: [0.17, 0.55, 0.55, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};
