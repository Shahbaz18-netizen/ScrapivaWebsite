'use client';

import React from 'react';
import { siteConfig } from '@/config/site';
import styles from './FloatingWhatsApp.module.css';

export const FloatingWhatsApp = () => {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.contact.whatsappPreFillMessage)}`;

  return (
    <div className={styles.wrapper}>
      {/* Tooltip label */}
      <span className={styles.tooltip}>Chat with us</span>

      {/* WhatsApp button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.floatingButton}
        aria-label="Chat with us on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={styles.icon}
        >
          <path d="M12.004 0C5.375 0 0 5.375 0 12.004c0 2.127.553 4.135 1.554 5.918L.25 23.4l5.632-1.478A11.966 11.966 0 0012.004 24c6.629 0 12.004-5.375 12.004-12.004C24.008 5.375 18.633 0 12.004 0zm0 21.996c-1.802 0-3.518-.465-5.044-1.348l-.36-.208-3.765.986.998-3.666-.228-.363A9.972 9.972 0 012.004 12C2.004 6.48 6.484 2.004 12.004 2.004c5.52 0 10 4.476 10 9.996 0 5.52-4.48 9.996-10 9.996zm5.495-7.513c-.302-.15-1.782-.878-2.057-.978-.276-.1-.476-.15-.677.15-.2.3-.778.978-.953 1.178-.175.2-.35.225-.652.075-.302-.15-1.274-.47-2.427-1.5-.898-.802-1.503-1.792-1.678-2.093-.175-.302-.02-.465.13-.615.137-.137.302-.35.452-.525.15-.175.201-.302.302-.503.1-.2.05-.375-.025-.525-.075-.15-.677-1.625-.927-2.225-.243-.585-.49-.505-.677-.515-.175-.01-.375-.01-.577-.01-.2 0-.527.075-.802.375-.276.3-1.054 1.025-1.054 2.5s1.079 2.9 1.229 3.1c.15.2 2.11 3.225 5.115 4.525.715.31 1.272.495 1.706.635.718.23 1.373.197 1.888.12.576-.086 1.782-.728 2.032-1.428.25-.7.25-1.3.175-1.428-.075-.128-.276-.203-.577-.353z"/>
        </svg>
      </a>
    </div>
  );
};
