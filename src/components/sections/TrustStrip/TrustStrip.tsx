import React from 'react';
import styles from './TrustStrip.module.css';

const TrustItems = [
  {
    title: "Bulk Collection",
    stat: "10,000+ kg/mo",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Truck body */}
        <rect x="4" y="18" width="26" height="18" rx="3" fill="var(--color-primary)" opacity="0.15"/>
        <rect x="4" y="18" width="26" height="18" rx="3" stroke="var(--color-primary)" strokeWidth="2" strokeLinejoin="round"/>
        {/* Cab */}
        <path d="M30 26 L30 36 L44 36 L44 28 L38 18 L30 18 Z" fill="var(--color-primary)" opacity="0.2"/>
        <path d="M30 26 L30 36 L44 36 L44 28 L38 18 L30 18 Z" stroke="var(--color-primary)" strokeWidth="2" strokeLinejoin="round"/>
        {/* Window */}
        <path d="M32 20 L37 20 L42 27 L32 27 Z" fill="var(--color-accent)" opacity="0.6"/>
        {/* Wheels */}
        <circle cx="13" cy="37" r="4" fill="var(--color-primary)" opacity="0.3"/>
        <circle cx="13" cy="37" r="4" stroke="var(--color-primary)" strokeWidth="2"/>
        <circle cx="13" cy="37" r="1.5" fill="var(--color-primary)"/>
        <circle cx="37" cy="37" r="4" fill="var(--color-primary)" opacity="0.3"/>
        <circle cx="37" cy="37" r="4" stroke="var(--color-primary)" strokeWidth="2"/>
        <circle cx="37" cy="37" r="1.5" fill="var(--color-primary)"/>
        {/* Load lines */}
        <line x1="10" y1="24" x2="24" y2="24" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="10" y1="28" x2="24" y2="28" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Scheduled Pickup",
    stat: "On-time, every time",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Calendar body */}
        <rect x="6" y="10" width="36" height="32" rx="4" fill="var(--color-primary)" opacity="0.12"/>
        <rect x="6" y="10" width="36" height="32" rx="4" stroke="var(--color-primary)" strokeWidth="2"/>
        {/* Header bar */}
        <rect x="6" y="10" width="36" height="10" rx="4" fill="var(--color-primary)" opacity="0.25"/>
        <rect x="6" y="17" width="36" height="3" fill="var(--color-primary)" opacity="0.25"/>
        {/* Calendar pins */}
        <line x1="16" y1="6" x2="16" y2="14" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="32" y1="6" x2="32" y2="14" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Grid dots */}
        <circle cx="16" cy="27" r="2" fill="var(--color-primary)" opacity="0.5"/>
        <circle cx="24" cy="27" r="2" fill="var(--color-primary)" opacity="0.5"/>
        <circle cx="32" cy="27" r="2" fill="var(--color-primary)" opacity="0.5"/>
        <circle cx="16" cy="35" r="2" fill="var(--color-primary)" opacity="0.5"/>
        <circle cx="24" cy="35" r="2" fill="var(--color-primary)" opacity="0.5"/>
        {/* Checkmark on one date */}
        <circle cx="32" cy="35" r="5" fill="var(--color-accent)" opacity="0.9"/>
        <path d="M29.5 35 L31.5 37 L35 33" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Transparent Weighing",
    stat: "Certified Scales",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Scale base */}
        <rect x="18" y="38" width="12" height="3" rx="1.5" fill="var(--color-primary)" opacity="0.5"/>
        <rect x="18" y="38" width="12" height="3" rx="1.5" stroke="var(--color-primary)" strokeWidth="1.5"/>
        {/* Pole */}
        <line x1="24" y1="10" x2="24" y2="38" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Balance beam */}
        <line x1="8" y1="18" x2="40" y2="18" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Left pan strings */}
        <line x1="11" y1="18" x2="9" y2="28" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="18" x2="18" y2="28" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Left pan */}
        <path d="M7 28 Q13.5 32 20 28" stroke="var(--color-primary)" strokeWidth="2" fill="var(--color-primary)" fillOpacity="0.15"/>
        {/* Right pan strings */}
        <line x1="32" y1="18" x2="30" y2="28" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="37" y1="18" x2="39" y2="28" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Right pan */}
        <path d="M28 28 Q34.5 32 41 28" stroke="var(--color-primary)" strokeWidth="2" fill="var(--color-accent)" fillOpacity="0.3"/>
        {/* Checkmark in center */}
        <circle cx="24" cy="10" r="5" fill="var(--color-accent)"/>
        <path d="M21.5 10 L23.5 12 L27 8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Quick Settlement",
    stat: "Same-day Payment",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Wallet body */}
        <rect x="6" y="14" width="36" height="26" rx="5" fill="var(--color-primary)" opacity="0.15"/>
        <rect x="6" y="14" width="36" height="26" rx="5" stroke="var(--color-primary)" strokeWidth="2"/>
        {/* Wallet flap */}
        <path d="M6 22 L42 22" stroke="var(--color-primary)" strokeWidth="2"/>
        {/* Card pocket */}
        <rect x="28" y="25" width="12" height="9" rx="3" fill="var(--color-accent)" opacity="0.5"/>
        <rect x="28" y="25" width="12" height="9" rx="3" stroke="var(--color-primary)" strokeWidth="1.5"/>
        {/* Coin circle */}
        <circle cx="34" cy="29.5" r="2" fill="var(--color-primary)" opacity="0.6"/>
        {/* Rupee symbol */}
        <text x="9" y="33" fontSize="11" fontWeight="700" fill="var(--color-primary)" fontFamily="sans-serif">₹</text>
        {/* Arrow up = payment going out */}
        <circle cx="38" cy="12" r="6" fill="var(--color-accent)"/>
        <path d="M38 15 L38 9 M35.5 11.5 L38 9 L40.5 11.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export const TrustStrip = () => {
  return (
    <section className={styles.trustStrip}>
      <div className={`container ${styles.grid}`}>
        {TrustItems.map((item, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.iconWrap}>
              {item.icon}
            </div>
            <div className={styles.textGroup}>
              <h4 className={styles.title}>{item.title}</h4>
              <p className={styles.stat}>{item.stat}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
