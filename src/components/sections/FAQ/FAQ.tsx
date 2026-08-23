import React from 'react';
import styles from './FAQ.module.css';
import { Accordion } from '@/components/ui/Accordion/Accordion';
import { generalFaqs, businessFaqs } from '@/data/faq';
import { ScrollReveal } from '@/components/ui/ScrollReveal/ScrollReveal';

interface FAQProps {
  type?: 'general' | 'business';
}

export const FAQ = ({ type = 'general' }: FAQProps) => {
  const faqs = type === 'business' ? businessFaqs : generalFaqs;
  const subtitle = type === 'business' 
    ? 'Everything you need to know about our B2B industrial scrap services.'
    : 'Answers to the most common questions about selling your scrap.';

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className={styles.section} id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className={`container ${styles.container}`}>
        <ScrollReveal>
          <div className={styles.header}>
            <h2>Frequently Asked Questions</h2>
            <p>{subtitle}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className={styles.faqWrapper}>
            <Accordion items={faqs} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
