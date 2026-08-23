'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PackageOpen, Building2, MessageCircle, IndianRupee } from 'lucide-react';
import { siteConfig } from '@/config/site';
import styles from './BottomNav.module.css';

export const BottomNav = () => {
  const pathname = usePathname();
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`;

  const navItems = [
    { href: '/', label: 'Home', icon: <Home size={24} /> },
    { href: '/scrap-prices-siliguri', label: 'Scrap Prices', icon: <IndianRupee size={24} /> },
    { href: '/book-pickup', label: 'Households', icon: <PackageOpen size={24} /> },
    { href: '/for-businesses', label: 'Businesses', icon: <Building2 size={24} /> },
  ];

  return (
    <nav className={styles.bottomNav} aria-label="Mobile Bottom Navigation">
      <div className={styles.navContent}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <div className={styles.iconWrapper}>{item.icon}</div>
              <span className={styles.label}>{item.label}</span>
            </Link>
          );
        })}
        
        {/* Special WhatsApp Action */}
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noreferrer" 
          className={`${styles.navItem} ${styles.whatsappItem}`}
        >
          <div className={styles.iconWrapper}>
            <MessageCircle size={24} />
          </div>
          <span className={styles.label}>WhatsApp</span>
        </a>
      </div>
    </nav>
  );
};
