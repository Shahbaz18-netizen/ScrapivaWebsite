import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { Reveal } from '@/components/ui/Reveal/Reveal';
import styles from './B2BIntro.module.css';

export const B2BIntro = () => {
  return (
    <section className={styles.b2bSection}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.content}>
          <Reveal>
            <p className={styles.eyebrow}>FOR BUSINESSES</p>
            <h2 className={styles.title}>Your Scrap. Our Responsibility.</h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className={styles.description}>
              Businesses generate valuable recyclable materials every day. Scrapiva helps organizations simplify scrap collection, valuation and recycling through a reliable pickup network.
            </p>
          </Reveal>
          
          <Reveal delay={0.4}>
            <div className={styles.ctaGroup}>
              <Link href="/for-businesses">
                <Button size="lg" variant="primary">Talk to Our B2B Team</Button>
              </Link>
              <Link href="/for-businesses#quote">
                <Button size="lg" variant="outline" className={styles.btnOutline}>Request a Free Scrap Assessment</Button>
              </Link>
            </div>
          </Reveal>
        </div>
        
        <Reveal direction="left" delay={0.3}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/b2b-intro.jpg"
              alt="Scrapiva industrial factory environment showing scrap bales, a green truck, and sorting facilities"
              width={640}
              height={480}
              className={styles.heroImage}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
