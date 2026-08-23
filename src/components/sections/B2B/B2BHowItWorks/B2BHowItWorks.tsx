import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import styles from './B2BHowItWorks.module.css';

export const B2BHowItWorks = () => {
  const steps = [
    { num: "01", title: "Tell Us About Your Scrap", desc: "Submit your requirement or speak with our B2B team." },
    { num: "02", title: "Scrap Assessment", desc: "We understand the material, quantity, location and collection requirements." },
    { num: "03", title: "Pickup & Weighing", desc: "Our pickup network collects the material and coordinates weighing." },
    { num: "04", title: "Settlement & Recycling", desc: "The material is processed through the appropriate downstream channel and payment is settled." }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2>How It Works</h2>
          <p>A streamlined process designed for businesses.</p>
        </div>
        
        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepNum}>{step.num}</div>
              <div className={styles.stepContent}>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.ctaWrapper}>
          <Link href="#quote">
            <Button size="lg" variant="primary">Start a B2B Conversation</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
