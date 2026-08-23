import React from 'react';
import { Card } from '@/components/ui/Card/Card';
import styles from './B2BIndustries.module.css';
import { Factory, Warehouse, Building2, Store } from 'lucide-react';

export const B2BIndustries = () => {
  const industries = [
    { title: "Factories & Manufacturing", description: "Bulk metal, machinery, packaging and industrial offcuts.", icon: <Factory size={28} /> },
    { title: "Warehouses & Logistics", description: "Cardboard, plastic wrap, and damaged packaging materials.", icon: <Warehouse size={28} /> },
    { title: "Corporate & IT Parks", description: "E-waste, paper, outdated electronics, and furniture.", icon: <Building2 size={28} /> },
    { title: "Hotels & Retail", description: "Glass, bulk cartons, plastics, and cooking oil tins.", icon: <Store size={28} /> },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2>Built for Businesses at Scale</h2>
          <p>We provide tailored scrap solutions across every major sector in North Bengal.</p>
        </div>
        
        <div className={styles.grid}>
          {industries.map((industry, index) => (
            <Card key={index} variant="default" className={styles.card}>
              <div className={styles.iconWrapper}>{industry.icon}</div>
              <div className={styles.content}>
                <h4>{industry.title}</h4>
                <p>{industry.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
