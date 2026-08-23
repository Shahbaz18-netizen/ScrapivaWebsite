import React from 'react';
import { AlertTriangle, TrendingDown, Clock, ShieldAlert } from 'lucide-react';
import { Card } from '@/components/ui/Card/Card';
import styles from './B2BPainPoints.module.css';

export const B2BPainPoints = () => {
  const painPoints = [
    {
      icon: <TrendingDown size={32} />,
      title: "Opaque & Unfair Pricing",
      description: "Getting lowballed by informal scrap dealers with no transparent weighing process or market-linked rates."
    },
    {
      icon: <Clock size={32} />,
      title: "Unreliable Pickups",
      description: "Vendors failing to show up on time, causing scrap to pile up and consume valuable warehouse space."
    },
    {
      icon: <ShieldAlert size={32} />,
      title: "Compliance Risks",
      description: "Informal disposal leaving your business vulnerable to environmental compliance issues and lack of documentation."
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <AlertTriangle size={24} />
          </div>
          <h2>The Hidden Costs of Bad Scrap Management</h2>
          <p>Most businesses lose money and time dealing with the unorganized scrap sector.</p>
        </div>

        <div className={styles.grid}>
          {painPoints.map((point, index) => (
            <Card key={index} className={styles.painCard}>
              <div className={styles.cardIcon}>{point.icon}</div>
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
