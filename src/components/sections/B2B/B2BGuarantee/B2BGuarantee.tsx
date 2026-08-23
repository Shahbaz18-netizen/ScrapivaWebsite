import React from 'react';
import { ShieldCheck } from 'lucide-react';
import styles from './B2BGuarantee.module.css';

export const B2BGuarantee = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <ShieldCheck size={48} />
          </div>
          <div className={styles.content}>
            <h2>The 100% Transparency Guarantee</h2>
            <p>
              We know that trust is the biggest issue in the scrap industry. That's why we use state-of-the-art digital scales calibrated weekly. 
              <strong> You see the weight exactly as we do, and you receive an instant digital receipt.</strong> If you ever find a discrepancy in our weighing process, we will cover the difference—no questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
