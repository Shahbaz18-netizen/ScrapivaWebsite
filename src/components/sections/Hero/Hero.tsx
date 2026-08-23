import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { siteConfig } from '@/config/site';
import { Leaf, Box, Recycle, Coins } from 'lucide-react';
import styles from './Hero.module.css';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      {/* Decorative Floating Elements */}
      <div className={styles.floatingElements} aria-hidden="true">
        <div className={`${styles.floatItem} ${styles.float1}`}><Coins className={styles.floatIcon} /></div>
        <div className={`${styles.floatItem} ${styles.float2}`}><Leaf className={styles.floatIcon} /></div>
        <div className={`${styles.floatItem} ${styles.float3}`}><Box className={styles.floatIcon} /></div>
        <div className={`${styles.floatItem} ${styles.float4}`}><Recycle className={styles.floatIcon} /></div>
      </div>

      <div className={`container ${styles.grid} ${styles.heroContent}`}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{siteConfig.locations.primary.toUpperCase()} • {siteConfig.locations.region.toUpperCase()}</p>
          <h1 className={styles.title}>Scrap Collection & Recycling Made Simple</h1>
          <p className={styles.subtitle}>
            Scrapiva is a scrap collection and recycling company serving households in Siliguri and businesses across North Bengal and Sikkim.
          </p>
          <p className={styles.description}>
            Select how you would like to recycle with us today. We provide professional, reliable solutions tailored for both homes and enterprises.
          </p>
        </div>

        <div className={styles.gatewayWrapper}>
          <Link href="/book-pickup" className={styles.gatewayCard}>
            <div className={styles.gatewayIcon}>🏠</div>
            <div className={styles.gatewayContent}>
              <h3>For Homes</h3>
              <p><strong>Siliguri Doorstep Scrap Pickup</strong><br />Sell household recyclables easily from the comfort of your home.</p>
              <span className={styles.gatewayLink}>Book a Pickup →</span>
            </div>
          </Link>

          <Link href="/for-businesses" className={`${styles.gatewayCard} ${styles.gatewayCardB2B}`}>
            <div className={styles.gatewayIcon}>🏭</div>
            <div className={styles.gatewayContent}>
              <h3>For Businesses</h3>
              <p><strong>Bulk & Industrial Scrap Collection</strong><br />Enterprise waste management & pickup serving North Bengal & Sikkim.</p>
              <span className={styles.gatewayLink}>Get a Quote →</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
