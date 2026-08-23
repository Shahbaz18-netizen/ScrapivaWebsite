import React from 'react';
import { Card } from '@/components/ui/Card/Card';
import styles from './B2BIndustries.module.css';

export const B2BIndustries = () => {
  const industries = [
    { title: "Manufacturing & Factories", description: "Bulk metal, machinery, packaging and recyclable industrial materials.", icon: "🏭" },
    { title: "Tea Factories", description: "Specialized collection for tea estate scrap and machinery.", icon: "🍃" },
    { title: "Fabrication & Engineering", description: "Metal offcuts, turnings, and fabrication waste.", icon: "⚙️" },
    { title: "Warehouses & Logistics", description: "Cardboard, plastic wrap, and damaged packaging materials.", icon: "📦" },
    { title: "Hotels & Restaurants", description: "Glass bottles, bulk cartons, plastics, and cooking oil tins.", icon: "🏨" },
    { title: "Construction", description: "Rebars, scaffolding scrap, cables, and structural steel.", icon: "🏗️" },
    { title: "Hospitals", description: "Non-hazardous general recyclable waste and e-waste.", icon: "🏥" },
    { title: "Schools & Colleges", description: "Books, paper, old furniture, and outdated electronics.", icon: "🏫" },
    { title: "Offices", description: "Paper waste, IT equipment, and general recyclables.", icon: "🏢" },
    { title: "Automobile Workshops", description: "Auto parts, batteries, and metal components.", icon: "🚗" },
    { title: "E-commerce & Retail", description: "Bulk packaging materials and returns scrap.", icon: "🛒" },
    { title: "Other Businesses", description: "Custom scrap solutions for any commercial entity.", icon: "🏢" },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2>Built for Businesses That Generate Scrap</h2>
          <p>Whether you operate a factory, hotel, warehouse or office, we help you manage recyclable materials efficiently.</p>
        </div>
        
        <div className={styles.grid}>
          {industries.map((industry, index) => (
            <Card key={index} variant="default" className={styles.card}>
              <div className={styles.icon}>{industry.icon}</div>
              <h4>{industry.title}</h4>
              <p>{industry.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
