import React from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn more about ${siteConfig.name} and our mission to streamline scrap recycling.`,
};

export default function AboutPage() {
  return (
    <div style={{ padding: '6rem 0', backgroundColor: 'var(--color-white)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ color: 'var(--color-dark)', marginBottom: '1.5rem' }}>Making Scrap Collection Simpler</h1>
        <div style={{ fontSize: '1.125rem', lineHeight: 1.6, color: 'var(--color-text)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>
            {siteConfig.name} is a {siteConfig.locations.primary}-based scrap collection and recycling business built to make scrap disposal simpler for businesses and households.
          </p>
          <p>
            Starting from {siteConfig.locations.primary}, our vision is to build a reliable recycling network across {siteConfig.locations.region}.
          </p>
          <p>
            We believe that responsible scrap management shouldn't be complicated. By introducing transparent pricing, scheduled pickups, and reliable B2B and B2C services, we are changing how recyclable materials are processed locally.
          </p>
        </div>
      </div>
    </div>
  );
}
