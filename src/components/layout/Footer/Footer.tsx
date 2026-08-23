'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brandCol}>
          <div className={styles.logo}>
            <Image 
              src="/images/logo.png" 
              alt={siteConfig.name} 
              width={160}
              height={60}
              className={styles.logoImage}
            />
            <h3 className={styles.fallbackText}>{siteConfig.name}</h3>
          </div>
          <p className={styles.tagline}>B2B Scrap Management & Recycling</p>
          <p className={styles.description}>
            From everyday recyclables to bulk industrial scrap, we help businesses and households responsibly channel recyclable materials.
          </p>
        </div>
        
        <div className={styles.linksCol}>
          <h4>Services</h4>
          <ul>
            <li><Link href="/for-businesses">B2B Scrap Pickup</Link></li>
            <li><Link href="/for-businesses">Scheduled Collection</Link></li>
            <li><Link href="/for-businesses">Scrap Audit</Link></li>
            <li><Link href="/for-businesses">Scrap Valuation</Link></li>
            <li><Link href="/book-pickup">B2C Scrap Pickup</Link></li>
            <li><Link href="/scrap-prices-siliguri">Scrap Prices</Link></li>
          </ul>
        </div>
        
        <div className={styles.linksCol}>
          <h4>Company</h4>
          <ul>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h4>Contact & Locations</h4>
          <ul>
            <li>{siteConfig.locations.primary}</li>
            <li>{siteConfig.locations.region}</li>
            <li className={styles.contactItem}><a href={`tel:${siteConfig.contact.phone.replace(/ /g, '')}`}>Tel: {siteConfig.contact.phone}</a></li>
            <li className={styles.contactItem}><a href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.contact.whatsappPreFillMessage)}`} target="_blank" rel="noopener noreferrer">WA: {siteConfig.contact.whatsapp}</a></li>
            <li className={styles.contactItem}><a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className="container">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
