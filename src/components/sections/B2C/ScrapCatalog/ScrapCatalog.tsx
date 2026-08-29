'use client';

import React, { useState } from 'react';
import { PriceCard } from '@/components/ui/PriceCard/PriceCard';
import { scrapPrices, scrapCategories, ScrapMaterial } from '@/data/scrapPrices';
import { Button } from '@/components/ui/Button/Button';
import Link from 'next/link';
import styles from './ScrapCatalog.module.css';

export const ScrapCatalog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPrices = scrapPrices.filter((item: ScrapMaterial) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className={styles.section}>
      <div className="container">
        
        <div style={{ backgroundColor: 'rgba(166, 217, 91, 0.15)', border: '1px solid var(--color-primary)', borderRadius: '12px', padding: '16px 24px', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3 style={{ margin: 0, color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.125rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🏢</span> Are you a Business or Factory?
          </h3>
          <p style={{ margin: 0, color: 'var(--color-text-light)', fontSize: '0.95rem' }}>
            The rates listed below are standard household rates for small quantities. For B2B partners and bulk industrial scrap, <strong>rates are significantly higher.</strong>
          </p>
          <div style={{ marginTop: '8px' }}>
            <Link href="/b2b" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'underline' }}>View B2B Services &rarr;</Link>
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchWrapper}>
            <input 
              type="text" 
              placeholder="Search scrap items..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.categories}>
            {scrapCategories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryBtn} ${activeCategory === category ? styles.active : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredPrices.length > 0 ? (
          <div className={styles.grid}>
            {filteredPrices.map((item) => (
              <PriceCard
                key={item.id}
                name={item.name}
                price={item.price}
                unit={item.unit}
                category={item.category}
                id={item.id}
                icon={item.icon}
                isPopular={item.isPopular}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>No scrap items found matching your criteria.</p>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}>
              Clear Filters
            </Button>
          </div>
        )}

        <div className={styles.ctaWrapper}>
          <Link href="/book-pickup">
            <Button size="lg" variant="primary">Book This Scrap Pickup</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
