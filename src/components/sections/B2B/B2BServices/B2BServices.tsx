import React from 'react';
import { Truck, Scale, FileCheck, IndianRupee } from 'lucide-react';
import { Card } from '@/components/ui/Card/Card';
import styles from './B2BServices.module.css';

export const B2BServices = () => {
  const values = [
    { 
      icon: <Truck size={32} />, 
      title: "Effortless Logistics", 
      description: "We dispatch the trucks and do the heavy lifting. Scheduled collections or on-demand pickups tailored to your operations." 
    },
    { 
      icon: <Scale size={32} />, 
      title: "100% Transparent Weighing", 
      description: "Digital, calibrated scales used right in front of you. You get a digital weight receipt instantly." 
    },
    { 
      icon: <IndianRupee size={32} />, 
      title: "Instant GST-Compliant Payments", 
      description: "No more chasing payments. We offer instant NEFT/RTGS settlements linked to market rates." 
    },
    { 
      icon: <FileCheck size={32} />, 
      title: "Environmental Compliance", 
      description: "Receive formal documentation for your ISO/environmental audits proving responsible recycling." 
    },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2>Why Top Businesses Choose Scrapiva</h2>
          <p>We engineered our process to maximize your revenue while minimizing your effort.</p>
        </div>
        
        <div className={styles.grid}>
          {values.map((value, index) => (
            <Card key={index} variant="interactive" className={styles.card}>
              <div className={styles.icon}>{value.icon}</div>
              <h4>{value.title}</h4>
              <p>{value.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
