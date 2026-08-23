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
