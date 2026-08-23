import React from 'react';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import styles from './ServiceArea.module.css';

export const ServiceArea = () => {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <h2>Serving {siteConfig.locations.primary}, {siteConfig.locations.region}</h2>
          <p className={styles.description}>
            We coordinate a flexible pickup network to serve businesses and households across our operating areas. 
          </p>
          
          <div className={styles.locations}>
            <div className={styles.locationItem}>
              <div className={styles.icon}>📍</div>
              <div>
                <h4>{siteConfig.locations.primary}</h4>
                <p>Primary Service Area</p>
              </div>
            </div>
            <div className={styles.locationItem}>
              <div className={styles.icon}>📍</div>
              <div>
                <h4>North Bengal</h4>
                <p>Extended Region</p>
              </div>
            </div>
            <div className={styles.locationItem}>
              <div className={styles.icon}>📍</div>
              <div>
                <h4>Sikkim</h4>
                <p>Extended Region</p>
              </div>
            </div>
          </div>
          
          <p className={styles.disclaimer}>
            * Service availability varies by location and material.
          </p>
        </div>
        
        <div className={styles.mapGraphic}>
          <Image
            src="/images/service-area-map.jpg"
            alt={`Service coverage map of ${siteConfig.locations.primary}, North Bengal, and Sikkim`}
            width={1000}
            height={667}
            className={styles.mapImage}
            sizes="(max-width: 991px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};
