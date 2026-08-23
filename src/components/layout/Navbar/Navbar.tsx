'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button/Button';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '/for-businesses', label: 'For Businesses' },
  { href: '/scrap-prices-siliguri', label: 'Scrap Prices' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeMenu]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
        <div className={`container ${styles.navContainer}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <img
              src="/images/logo.png"
              alt={siteConfig.name}
              className={styles.logoImage}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.classList.add(styles.textFallback);
              }}
            />
            <span className={styles.fallbackText}>{siteConfig.name}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.navLinkActive : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className={styles.ctaGroup}>
            <Link href="/for-businesses#quote">
              <Button variant="outline" size="sm" className={styles.hideMobile}>
                Get a Scrap Quote
              </Button>
            </Link>
            <Link href="/book-pickup">
              <Button variant="primary" size="sm">Book Pickup</Button>
            </Link>

            {/* Hamburger button */}
            <button
              className={styles.mobileMenuBtn}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={openMenu}
            >
              {/* Animated hamburger icon */}
              <span className={`${styles.bar} ${isMenuOpen ? styles.barOpen1 : ''}`} />
              <span className={`${styles.bar} ${isMenuOpen ? styles.barOpen2 : ''}`} />
              <span className={`${styles.bar} ${isMenuOpen ? styles.barOpen3 : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ────────────────────────────────────────── */}
      {/* Backdrop overlay */}
      <div
        className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Slide-in drawer */}
      <nav
        id="mobile-menu"
        className={`${styles.mobileDrawer} ${isMenuOpen ? styles.drawerOpen : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
      >
        {/* Drawer header */}
        <div className={styles.drawerHeader}>
          <span className={styles.drawerBrand}>{siteConfig.name}</span>
          <button
            className={styles.closeBtn}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <ul className={styles.drawerLinks}>
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} style={{ '--i': i } as React.CSSProperties}>
              <Link
                href={link.href}
                className={`${styles.drawerLink} ${pathname === link.href ? styles.drawerLinkActive : ''}`}
                onClick={closeMenu}
              >
                {link.label}
                <svg className={styles.drawerArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>

        {/* Drawer CTAs */}
        <div className={styles.drawerCtas}>
          <Link href="/book-pickup" onClick={closeMenu}>
            <Button variant="primary" size="lg" fullWidth>📦 Book a Pickup</Button>
          </Link>
          <Link href="/for-businesses#quote" onClick={closeMenu}>
            <Button variant="outline" size="lg" fullWidth>💼 Get a Scrap Quote</Button>
          </Link>
        </div>

        {/* Drawer footer contact */}
        <div className={styles.drawerFooter}>
          <a href={`tel:${siteConfig.contact.phone.replace(/ /g, '')}`} className={styles.drawerContact}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.12 2.18 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
            </svg>
            {siteConfig.contact.phone}
          </a>
        </div>
      </nav>
    </>
  );
};
