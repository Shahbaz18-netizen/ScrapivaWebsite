import React from 'react';
import styles from './Testimonials.module.css';
import { Card } from '@/components/ui/Card/Card';

export const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Customer Name",
      role: "Business Owner",
      location: "Siliguri",
      content: "Sample testimonial — replace before launch. This space is reserved for a genuine customer review regarding our B2B scrap pickup services.",
    },
    {
      id: 2,
      name: "Customer Name",
      role: "Household",
      location: "Siliguri",
      content: "Sample testimonial — replace before launch. This space is reserved for a genuine customer review regarding our household pickup services.",
    },
    {
      id: 3,
      name: "Customer Name",
      role: "Factory Manager",
      location: "Jalpaiguri",
      content: "Sample testimonial — replace before launch. This space is reserved for a genuine customer review regarding our industrial scrap services.",
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2>What Our Customers Say</h2>
          <p>Real experiences from businesses and households.</p>
        </div>
        
        <div className={styles.grid}>
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} variant="default" className={styles.card}>
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.content}>{testimonial.content}</p>
              <div className={styles.author}>
                <div className={styles.avatarPlaceholder} />
                <div className={styles.authorInfo}>
                  <h4 className={styles.name}>{testimonial.name}</h4>
                  <p className={styles.role}>{testimonial.role} • {testimonial.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
