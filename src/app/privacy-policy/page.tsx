import React from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ padding: '6rem 0', backgroundColor: 'var(--color-white)' }}>
      <div className="container" style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h1 style={{ color: 'var(--color-dark)', marginBottom: '1rem' }}>Privacy Policy</h1>
        <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
        
        <p>This Privacy Policy describes how {siteConfig.name} collects, uses, and discloses your personal information when you use our website or services.</p>
        
        <h2 style={{ marginTop: '1rem' }}>Information We Collect</h2>
        <p>When you request a pickup or a quote, we may collect:</p>
        <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc' }}>
          <li>Name and Contact Information (Phone number, Email)</li>
          <li>Address and Location details</li>
          <li>Business details (for B2B customers)</li>
        </ul>

        <h2 style={{ marginTop: '1rem' }}>How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc' }}>
          <li>Coordinate scrap pickups</li>
          <li>Provide quotes and estimates</li>
          <li>Communicate with you regarding our services</li>
        </ul>

        <p style={{ marginTop: '2rem' }}><em>This is a placeholder privacy policy for demonstration purposes. It should be replaced with a legally compliant document before launch.</em></p>
      </div>
    </div>
  );
}
