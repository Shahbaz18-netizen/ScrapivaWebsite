'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { PriceCard } from '@/components/ui/PriceCard/PriceCard';
import { Reveal } from '@/components/ui/Reveal/Reveal';
import { scrapPrices } from '@/data/scrapPrices';
import { siteConfig } from '@/config/site';
import styles from './PopularPrices.module.css';

export const PopularPrices = () => {
  const popularItems = scrapPrices.filter(item => item.isPopular).slice(0, 8);

  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal>
          <div className={styles.header}>
            <h2>Today's Indicative Scrap Prices</h2>
            <p>Check indicative scrap prices in {siteConfig.locations.primary} before booking a pickup.</p>
          </div>
          <div style={{ backgroundColor: 'rgba(166, 217, 91, 0.15)', border: '1px solid var(--color-primary)', borderRadius: '12px', padding: '16px 24px', margin: '0 auto 2.5rem auto', maxWidth: '800px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ margin: 0, color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.125rem' }}>
              <span style={{ fontSize: '1.25rem' }}>🏢</span> Note for Businesses & Factories
            </h3>
            <p style={{ margin: 0, color: 'var(--color-text-light)', fontSize: '0.95rem' }}>
              The prices shown are for household quantities. For B2B partners or bulk industrial scrap, <strong>rates are customized and significantly higher.</strong>
            </p>
            <div style={{ marginTop: '8px' }}>
              <Link href="/for-businesses" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'underline' }}>View B2B Services &rarr;</Link>
            </div>
          </div>
        </Reveal>
        
        <div className={styles.grid}>
          {popularItems.map((item, idx) => (
            <Reveal key={item.id} delay={0.1 * idx}>
              <PriceCard
                name={item.name}
                price={item.price}
                unit={item.unit}
                category={item.category}
                id={item.id}
                icon={item.icon}
                isPopular={item.isPopular}
              />
            </Reveal>
          ))}
        </div>
        
        <Reveal delay={0.4}>
          <div className={styles.footer}>
            <Link href="/scrap-prices-siliguri">
              <Button size="lg" variant="primary">View All Scrap Prices</Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
