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
