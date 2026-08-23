import React from 'react';
import styles from './B2BMaterials.module.css';

export const B2BMaterials = () => {
  const materials = [
    {
      title: "Metals",
      items: ["Iron", "Steel", "Aluminium", "Copper", "Brass", "Stainless Steel"]
    },
    {
      title: "Recyclables",
      items: ["Paper", "Cardboard", "Plastic", "Glass", "Packaging materials"]
    },
    {
      title: "Industrial",
      items: ["Used Machinery", "Industrial components", "Metal offcuts", "Fabrication scrap"]
    },
    {
      title: "Electronics",
      items: ["E-waste", "Computers", "Printers", "Electronic equipment", "Batteries"]
    }
  ];

  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.content}>
          <h2>We Handle Your Scrap Stream</h2>
          <p className={styles.description}>
            From metals and machinery to packaging and electronic waste, we help businesses manage a wide range of recyclable materials.
          </p>
          <div className={styles.disclaimer}>
            <p><strong>Note for Batteries & E-waste:</strong></p>
            <p>Accepted subject to material type, quantity and applicable handling requirements.</p>
          </div>
        </div>
        
        <div className={styles.categories}>
          {materials.map((category, index) => (
            <div key={index} className={styles.categoryCard}>
              <h3>{category.title}</h3>
              <ul>
                {category.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
