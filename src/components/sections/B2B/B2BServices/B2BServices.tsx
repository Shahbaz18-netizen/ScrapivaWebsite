import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import styles from './B2BServices.module.css';

export const B2BServices = () => {
  const services = [
    { title: "Bulk Scrap Pickup", description: "For large-volume commercial and industrial scrap." },
    { title: "Scheduled Collection", description: "Set up recurring collection schedules based on business requirements." },
    { title: "Scrap Audit", description: "Understand your scrap generation and identify opportunities to improve recovery." },
    { title: "On-Site Weighing", description: "Transparent weighing at the time of collection where applicable." },
    { title: "Digital Weight Receipt", description: "Provide a digital record of collected material." },
    { title: "Quick Settlement", description: "Streamlined payment after collection and verification." },
    { title: "Scrap Valuation & Quotation", description: "Receive a quote based on material, quantity, quality and prevailing market conditions." },
    { title: "Custom Scrap Solutions", description: "For businesses with unique or recurring scrap requirements." },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2>Tailored B2B Services</h2>
          <p>Professional services designed to streamline your scrap management process.</p>
        </div>
        
        <div className={styles.grid}>
          {services.map((service, index) => (
            <Card key={index} variant="interactive" className={styles.card}>
              <h4>{service.title}</h4>
              <p>{service.description}</p>
            </Card>
          ))}
        </div>
        
        <div className={styles.ctaWrapper}>
          <Link href="#quote">
            <Button size="lg" variant="primary">Request a Free Scrap Assessment</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
