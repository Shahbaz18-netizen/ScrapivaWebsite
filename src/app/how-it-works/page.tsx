import React from 'react';
import type { Metadata } from 'next';
import { B2BHowItWorks } from '@/components/sections/B2B/B2BHowItWorks/B2BHowItWorks';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: "How Scrap Collection Works | Scrapiva",
  description: "Learn how Scrapiva simplifies scrap disposal and recycling with doorstep pickup for homes in Siliguri and bulk commercial waste collection across North Bengal and Sikkim.",
  keywords: [
    "How to sell scrap Siliguri",
    "Scrap collection process",
    "Doorstep scrap collection procedure",
    "Industrial recycling process"
  ]
};

export default function HowItWorksPage() {
  return (
    <>
      <div style={{ padding: '6rem 0', backgroundColor: 'var(--color-white)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ color: 'var(--color-dark)', marginBottom: '1.5rem' }}>A Simpler Way to Recycle</h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--color-muted)' }}>
            We've designed our process to be as straightforward as possible, whether you're a business generating bulk scrap or a household looking to dispose of recyclables.
          </p>
        </div>
      </div>
      
      <B2BHowItWorks />
      
      <div style={{ padding: '4rem 0', backgroundColor: 'var(--color-background)', textAlign: 'center' }}>
        <div className="container">
          <h2>For Households</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div style={{ padding: '2rem', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-lg)' }}>
              <h3>01. Choose Your Scrap</h3>
              <p style={{ marginTop: '0.5rem', color: 'var(--color-muted)' }}>Select what you want to sell.</p>
            </div>
            <div style={{ padding: '2rem', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-lg)' }}>
              <h3>02. Schedule a Pickup</h3>
              <p style={{ marginTop: '0.5rem', color: 'var(--color-muted)' }}>Tell us when and where to collect it.</p>
            </div>
            <div style={{ padding: '2rem', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-lg)' }}>
              <h3>03. Get Paid</h3>
              <p style={{ marginTop: '0.5rem', color: 'var(--color-muted)' }}>Receive payment according to the final verified weight.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
