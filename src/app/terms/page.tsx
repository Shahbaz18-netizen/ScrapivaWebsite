import React from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
};

export default function TermsPage() {
  return (
    <div style={{ padding: '6rem 0', backgroundColor: 'var(--color-white)' }}>
      <div className="container" style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h1 style={{ color: 'var(--color-dark)', marginBottom: '1rem' }}>Terms and Conditions</h1>
        <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
        
        <p>Welcome to {siteConfig.name}. By accessing our website or using our services, you agree to these Terms and Conditions.</p>
        
        <h2 style={{ marginTop: '1rem' }}>1. Scrap Pricing and Valuation</h2>
        <p>Prices displayed on the website are indicative. Final valuation depends on the material type, quality, quantity, condition, and prevailing market rates at the time of weighing.</p>

        <h2 style={{ marginTop: '1rem' }}>2. Pickups</h2>
        <p>We reserve the right to decline a pickup based on material type, location, or quantity.</p>

        <h2 style={{ marginTop: '1rem' }}>3. Restricted Materials</h2>
        <p>Certain hazardous materials, e-waste, and batteries are subject to specific handling requirements and may not be accepted in all circumstances.</p>

        <p style={{ marginTop: '2rem' }}><em>This is a placeholder document for demonstration purposes. It should be replaced with a legally compliant document before launch.</em></p>
      </div>
    </div>
  );
}
