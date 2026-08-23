'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { Textarea } from '@/components/ui/Textarea/Textarea';
import { Card } from '@/components/ui/Card/Card';
import { siteConfig } from '@/config/site';
import styles from './B2BLeadForm.module.css';

export const B2BLeadForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Controlled form states
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [scrapType, setScrapType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [frequency, setFrequency] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call/loading state
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setCompanyName('');
    setContactPerson('');
    setPhone('');
    setEmail('');
    setIndustry('');
    setLocation('');
    setScrapType('');
    setQuantity('');
    setFrequency('');
    setMessage('');
    setIsSubmitted(false);
  };

  // Construct pre-filled WhatsApp Message
  const whatsappMessage = `Hello Scrapiva, I want to request a free B2B scrap assessment.
*Company Name:* ${companyName}
*Contact Person:* ${contactPerson}
*Phone Number:* ${phone}
*Email:* ${email || 'Not provided'}
*Industry:* ${industry}
*Location:* ${location}
*Scrap Type:* ${scrapType}
*Estimated Quantity:* ${quantity || 'Not specified'}
*Pickup Frequency:* ${frequency}
*Additional Message:* ${message || 'None'}`;

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  if (isSubmitted) {
    return (
      <section id="quote" className={styles.section}>
        <div className="container">
          <Card variant="default" className={styles.successCard}>
            <div className={styles.successIcon}>✓</div>
            <h2>Request Details Ready</h2>
            <p>
              Your B2B scrap assessment request has been processed. Please click below to send the details directly to our WhatsApp team to coordinate the pickup.
            </p>
            
            <div className={styles.contactLinks}>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" style={{ width: '100%' }}>
                <Button variant="whatsapp" fullWidth>Confirm via WhatsApp</Button>
              </a>
              <a href={`tel:${siteConfig.contact.phone.replace(/ /g, '')}`} style={{ width: '100%' }}>
                <Button variant="outline" fullWidth>Call Our B2B Team</Button>
              </a>
            </div>

            <Button variant="ghost" onClick={handleReset} className={styles.resetBtn}>
              Submit Another Request
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.content}>
          <h2>Let's Talk About Your Scrap</h2>
          <p>Tell us what you generate and we'll get back to you with the next steps.</p>
          
          <div className={styles.pricingMessage}>
            <h4>Commercial Scrap Pricing</h4>
            <p>Prices depend on material, quantity, quality and prevailing market rates.</p>
          </div>
        </div>
        
        <Card variant="elevated" className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <Input 
                label="Company Name" 
                required 
                placeholder="Enter your company name" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <Input 
                label="Contact Person" 
                required 
                placeholder="Your full name" 
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
              />
            </div>
            
            <div className={styles.formRow}>
              <Input 
                label="Phone Number" 
                type="tel" 
                required 
                placeholder="10-digit number" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input 
                label="Email" 
                type="email" 
                placeholder="Optional" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className={styles.formRow}>
              <Input 
                label="Industry" 
                required 
                placeholder="e.g. Manufacturing, Hotel, etc." 
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
              <Input 
                label="Location" 
                required 
                placeholder="City/Area" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div className={styles.formRow}>
              <Input 
                label="Scrap Type" 
                required 
                placeholder="e.g. Iron, Cardboard, Mixed" 
                value={scrapType}
                onChange={(e) => setScrapType(e.target.value)}
              />
              <Input 
                label="Estimated Quantity" 
                placeholder="e.g. 500kg, 1 Ton" 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            
            <div className={styles.fullWidth}>
              <label className={styles.selectLabel}>Pickup Frequency</label>
              <select 
                className={styles.select} 
                required 
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="" disabled>Select frequency</option>
                <option value="One-time">One-time Pickup</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
              </select>
            </div>
            
            <div className={styles.fullWidth}>
              <Textarea 
                label="Additional Details"
                placeholder="Any specific requirements or details..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            
            <Button type="submit" variant="primary" size="lg" fullWidth disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Request Free Scrap Assessment'}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};
