'use client';

import React, { useRef, useEffect } from 'react';
import { Truck, Layers, Factory, Leaf } from 'lucide-react';
import { motion, useInView, useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal/Reveal';
import styles from './SustainabilityImpact.module.css';

// A helper component to count up to a number when it scrolls into view
const CountUp = ({ to, duration = 1.5, suffix = '' }: { to: number; duration?: number; suffix?: string }) => {
  const count = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();
  
  const rounded = useTransform(count, (latest) => {
    if (to % 1 !== 0) {
      return latest.toFixed(1) + suffix;
    }
    return Math.round(latest).toLocaleString() + suffix;
  });
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      const controls = animate(count, to, { duration, ease: "easeOut" as any });
      return controls.stop;
    } else if (prefersReducedMotion) {
      count.set(to);
    }
  }, [count, to, isInView, duration, prefersReducedMotion]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

// Card Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as any }
  }
};

export const SustainabilityImpact = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Reveal>
          <div className={styles.header}>
            <p className={styles.eyebrow}>How Scrapiva Creates Impact</p>
            <h2 className={styles.title}>From discarded material<br/>to measurable impact.</h2>
            <p className={styles.subtitle}>
              Every kilogram of scrap we recover moves through a responsible recycling journey and creates measurable environmental value.
            </p>
          </div>

          <div className={styles.brandStatement}>
            <span>SCRAP → RESOURCE</span>
            <p>Every kilogram has a second life.</p>
          </div>
        </Reveal>

        <motion.div 
          className={styles.grid}
          variants={!prefersReducedMotion ? containerVariants : undefined}
          initial={!prefersReducedMotion ? "hidden" : "visible"}
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Card 01: Collect */}
          <motion.div className={styles.card} variants={!prefersReducedMotion ? cardVariants : undefined}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <Truck />
              </div>
              <div className={styles.cardTitle}>
                <span className={styles.cardNumber}>01</span> WE COLLECT
              </div>
            </div>
            <div className={styles.cardValue}>
              <CountUp to={24580} />
            </div>
            <p className={styles.cardDescription}>
              Scrap collected
            </p>
          </motion.div>

          {/* Card 02: Sort */}
          <motion.div className={styles.card} variants={!prefersReducedMotion ? cardVariants : undefined}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <Layers />
              </div>
              <div className={styles.cardTitle}>
                <span className={styles.cardNumber}>02</span> WE SORT
              </div>
            </div>
            <div className={styles.cardValue}>
              <CountUp to={23940} />
            </div>
            <p className={styles.cardDescription}>
              Successfully sorted
            </p>
          </motion.div>

          {/* Card 03: Recycle */}
          <motion.div className={styles.card} variants={!prefersReducedMotion ? cardVariants : undefined}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <Factory />
              </div>
              <div className={styles.cardTitle}>
                <span className={styles.cardNumber}>03</span> WE RECYCLE
              </div>
            </div>
            <div className={styles.cardValue}>
              <CountUp to={22810} />
            </div>
            <p className={styles.cardDescription}>
              Sent for recycling
            </p>
          </motion.div>

          {/* Card 04: Impact */}
          <motion.div className={styles.card} variants={!prefersReducedMotion ? cardVariants : undefined}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <Leaf />
              </div>
              <div className={styles.cardTitle}>
                <span className={styles.cardNumber}>04</span> WE CREATE IMPACT
              </div>
            </div>
            <div className={styles.cardValue}>
              <CountUp to={18.7} suffix=" tonnes" />
            </div>
            <p className={styles.cardDescription}>
              Estimated CO₂ avoided
            </p>
          </motion.div>
        </motion.div>
        
        <Reveal delay={0.4}>
          <p className={styles.disclaimer}>
            Impact figures are calculated from material recovery and recycling activity.
          </p>
        </Reveal>
      </div>
    </section>
  );
};
