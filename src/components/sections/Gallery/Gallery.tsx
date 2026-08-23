import React from 'react';
import { Reveal } from '@/components/ui/Reveal/Reveal';
import styles from './Gallery.module.css';

export const Gallery = () => {
  const images = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    alt: `Recycling operations visual ${i + 1}`,
  }));

  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal>
          <div className={styles.header}>
            <h2>Recycling in Action</h2>
            <p>A glimpse into our daily collection and processing operations.</p>
          </div>
        </Reveal>
        
        <div className={styles.grid}>
          {images.map((img, idx) => (
            <Reveal key={img.id} delay={0.1 * idx}>
              <div className={styles.imageItem}>
                <div className={styles.placeholder}>
                  {img.alt} (Placeholder)
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
