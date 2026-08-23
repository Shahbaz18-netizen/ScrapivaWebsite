'use client';

import React from 'react';
import { ScrapIcon } from './ScrapIcon';
import styles from './PriceCard.module.css';

interface PriceCardProps {
  name: string;
  price: string;
  unit: string;
  category: string;
  id: string;
  icon: React.ElementType;
  isPopular?: boolean;
}

export const PriceCard: React.FC<PriceCardProps> = ({ name, price, unit, category, id, isPopular }) => {
  return (
    <div className={styles.card}>
      {/* Popular badge — top right */}
      {isPopular && (
        <span className={styles.popularBadge}>🔥 Popular</span>
      )}

      {/* Name at the top — matching reference layout */}
      <div className={styles.nameSection}>
        <h3 className={styles.name}>{name}</h3>
      </div>

      {/* Large product image in center */}
      <div className={styles.imageSection}>
        <ScrapIcon id={id} category={category} className={styles.image} />
      </div>

      {/* Price at the bottom */}
      <div className={styles.priceSection}>
        <div className={styles.priceRow}>
          <span className={styles.currency}>₹</span>
          <span className={styles.price}>{price}</span>
          <span className={styles.unit}>/{unit.toLowerCase()}</span>
        </div>
        <button className={styles.refreshBtn} aria-label="Refresh price">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 21v-5h5" />
          </svg>
        </button>
      </div>
    </div>
  );
};
