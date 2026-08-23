'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { Card } from '@/components/ui/Card/Card';
import { scrapCategories } from '@/data/scrapPrices';
import { siteConfig } from '@/config/site';
import styles from './page.module.css';
import { MapPin } from 'lucide-react';

export default function BookPickup() {
  const [step, setStep] = useState(1);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  
  // Form State
  const [qty, setQty] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [pincode, setPincode] = useState('');
  const [date, setDate] = useState('');
  
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');

  const handleMaterialToggle = (cat: string) => {
    if (cat === 'All') return;
    if (selectedMaterials.includes(cat)) {
      setSelectedMaterials(selectedMaterials.filter(m => m !== cat));
    } else {
      setSelectedMaterials([...selectedMaterials, cat]);
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // OpenStreetMap Nominatim API for reverse geocoding
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          if (data && data.address) {
            setPincode(data.address.postcode || '');
            setArea(data.address.suburb || data.address.neighbourhood || data.address.city_district || '');
          }
        } catch (error) {
          console.error("Error detecting location", error);
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        alert("Unable to retrieve your location");
        setIsLocating(false);
      }
    );
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 3) {
      const cleanPincode = pincode.trim();
      if (!cleanPincode.startsWith('734')) {
        setLocationError("Sorry, individual doorstep pickup is currently only available within Siliguri (Pincodes starting with 734). For bulk business inquiries, please visit our B2B page.");
        return;
      }
      setLocationError('');
    }
    setStep(step + 1);
  };

  // Construct WhatsApp Message
  const whatsappMessage = `Hello ${siteConfig.name}, I want to book a scrap pickup.
*Materials:* ${selectedMaterials.join(', ')}
*Quantity:* ${qty}
*Name:* ${name}
*Address:* ${address}, ${area} - ${pincode}
*Preferred Date:* ${date}`;
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  if (step === 5) {
    return (
      <div className={`container ${styles.successContainer}`}>
        <Card className={styles.successCard}>
          <div className={styles.successIcon}>✓</div>
          <h1>Pickup Request Received</h1>
          <p>Your pickup request has been submitted. Our team will contact you shortly to confirm the timing.</p>
          
          <div className={styles.contactLinks}>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <Button variant="whatsapp" fullWidth>Confirm via WhatsApp</Button>
            </a>
            <a href={`tel:${siteConfig.contact.phone.replace(/ /g, '')}`}>
              <Button variant="outline" fullWidth>Call Us</Button>
            </a>
          </div>
          
          <Button variant="ghost" onClick={() => { setStep(1); setSelectedMaterials([]); }}>
            Book another pickup
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={`container ${styles.formContainer}`}>
      <div className={styles.header}>
        <h1>Book a Pickup</h1>
        <p>Turn your scrap into value in a few simple steps.</p>
        <div className={styles.progress}>
          Step {step} of 4
        </div>
      </div>

      <Card className={styles.formCard}>
        {step === 1 && (
          <form onSubmit={nextStep}>
            <h3>What do you want to sell?</h3>
            <p className={styles.helpText}>Select all that apply</p>
            <div className={styles.materialGrid}>
              {scrapCategories.filter(c => c !== 'All').map(cat => (
                <div 
                  key={cat} 
                  className={`${styles.materialOption} ${selectedMaterials.includes(cat) ? styles.selected : ''}`}
                  onClick={() => handleMaterialToggle(cat)}
                >
                  {cat}
                </div>
              ))}
            </div>
            <Button type="submit" variant="primary" fullWidth size="lg" disabled={selectedMaterials.length === 0}>
              Continue
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={nextStep}>
            <h3>How much scrap do you have?</h3>
            <div className={styles.inputGroup}>
              <Input label="Estimated Quantity" required placeholder="e.g. 10 kg, 2 cartons, etc." value={qty} onChange={(e) => setQty(e.target.value)} />
            </div>
            <div className={styles.buttonGroup}>
              <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button type="submit" variant="primary">Continue</Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={nextStep}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>Where should we collect it?</h3>
              <Button type="button" variant="outline" size="sm" onClick={detectLocation} disabled={isLocating} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <MapPin size={16} /> {isLocating ? 'Locating...' : 'Detect my Location'}
              </Button>
            </div>
            
            <div className={styles.inputGroup} style={{ marginTop: 0 }}>
              <Input label="Full Name" required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input label="Phone Number" type="tel" required placeholder="10-digit number" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Input label="Address" required placeholder="House/Flat No, Building, Street" value={address} onChange={(e) => setAddress(e.target.value)} />
              <div className={styles.row}>
                <Input label="Area/Locality" required placeholder={`e.g. Hakimpara, ${siteConfig.locations.primary}`} value={area} onChange={(e) => setArea(e.target.value)} />
                <Input label="Pincode" required placeholder="e.g. 734001" value={pincode} onChange={(e) => { setPincode(e.target.value); setLocationError(''); }} />
              </div>
            </div>
            
            {locationError && (
              <div style={{ padding: '1rem', backgroundColor: '#FEF2F2', border: '1px solid #F87171', color: '#B91C1C', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: 1.5 }}>
                {locationError}
              </div>
            )}

            <div className={styles.buttonGroup}>
              <Button type="button" variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button type="submit" variant="primary">Continue</Button>
            </div>
          </form>
        )}

        {step === 4 && (
          <form onSubmit={(e) => {
            e.preventDefault();
            window.open(whatsappUrl, '_blank');
            setStep(5);
          }}>
            <h3>Choose a preferred pickup date</h3>
            <div className={styles.inputGroup}>
              <Input label="Date" type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className={styles.buttonGroup} style={{ marginTop: '2rem' }}>
              <Button type="button" variant="outline" onClick={() => setStep(3)}>Back</Button>
              <Button type="submit" variant="whatsapp">Confirm on WhatsApp</Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
