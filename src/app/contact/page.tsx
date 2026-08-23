import React from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: "Contact Scrapiva | Book Bulk Scrap Pickup & Appraisals",
  description: "Get in touch with Scrapiva for commercial scrap appraisals, B2B recycling inquiries, or home scrap collection questions in Siliguri, North Bengal, and Sikkim.",
  keywords: [
    "Contact Scrapiva",
    "Scrap buyers contact Siliguri",
    "Recycling center phone number Siliguri",
    "Bulk scrap collection query"
  ]
};

export default function ContactPage() {
  return (
    <div style={{ padding: '6rem 0', backgroundColor: 'var(--color-white)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ color: 'var(--color-dark)', marginBottom: '1.5rem' }}>Let's Recycle Smarter</h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--color-muted)', marginBottom: '3rem' }}>
          Reach out to us for bulk scrap pickups or general queries.
        </p>

        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div style={{ padding: '2rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Contact Information</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--color-text)' }}>
              <li><strong>Phone:</strong> {siteConfig.contact.phone}</li>
              <li><strong>WhatsApp:</strong> {siteConfig.contact.whatsapp}</li>
              <li><strong>Email:</strong> {siteConfig.contact.email}</li>
              <li><strong>Location:</strong> {siteConfig.contact.address}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
