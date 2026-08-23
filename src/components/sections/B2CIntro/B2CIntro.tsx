import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import styles from './B2CIntro.module.css';

export const B2CIntro = () => {
  return (
    <section className={styles.b2cSection}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.imageWrapper}>
          <Image
            src="/images/household-recycling.jpg"
            alt="Household scrap recycling — green bin filled with recyclable metals, copper wire and tin cans"
            width={640}
            height={480}
            className={styles.heroImage}
            priority
          />
        </div>
        
        <div className={styles.content}>
          <p className={styles.eyebrow}>FOR HOMES</p>
          <h2 className={styles.title}>Got Scrap at Home?</h2>
          <p className={styles.description}>
            Turn your recyclable waste into value without the hassle.
          </p>
          
          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.stepNum}>01</span>
              <div>
                <h4>Choose Your Scrap</h4>
                <p>Select what you want to sell.</p>
              </div>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>02</span>
              <div>
                <h4>Schedule a Pickup</h4>
                <p>Tell us when and where to collect it.</p>
              </div>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>03</span>
              <div>
                <h4>Get Paid</h4>
                <p>Receive payment according to the final verified weight.</p>
              </div>
            </div>
          </div>

          <div className={styles.ctaGroup}>
            <Link href="/book-pickup">
              <Button size="lg" variant="primary">Book a Pickup</Button>
            </Link>
            <Link href="/scrap-prices-siliguri">
              <Button size="lg" variant="outline">View Scrap Prices</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
