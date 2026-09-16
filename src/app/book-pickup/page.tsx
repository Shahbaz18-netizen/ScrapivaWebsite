'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { Card } from '@/components/ui/Card/Card';
import { scrapPrices, scrapCategories, ScrapMaterial } from '@/data/scrapPrices';
import { siteConfig } from '@/config/site';
import styles from './page.module.css';
import { MapPin, Calculator, ShieldCheck } from 'lucide-react';

export default function BookPickup() {
  const [step, setStep] = useState(1);
  
  // Calculator State: map of item id -> quantity number
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Form State
  const [customQtyNote, setCustomQtyNote] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [pincode, setPincode] = useState('');
  const [date, setDate] = useState('');
  
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');

  // ── Direct Quantity Adjuster for Listed Items ──────────
  const updateDirectQuantity = (id: string, valueStr: string) => {
    const val = parseInt(valueStr, 10);
    const num = isNaN(val) ? 0 : Math.max(0, val);
    setItemQuantities(prev => {
      const updated = { ...prev };
      if (num === 0) {
        delete updated[id];
      } else {
        updated[id] = num;
      }
      return updated;
    });
  };

  // ── Calculation Computations ───────────────────────────
  const selectedItemsList = scrapPrices.filter(item => (itemQuantities[item.id] || 0) > 0);
  
  const grossTotal = selectedItemsList.reduce((sum, item) => {
    const qty = itemQuantities[item.id] || 0;
    return sum + (qty * Number(item.price));
  }, 0);

  const totalItemCount = Object.values(itemQuantities).reduce((a, b) => a + b, 0);

  // Pickup fee rule: Free if grossTotal >= 500, else 100 deducted if > 0
  const isFreePickup = grossTotal >= 500;
  const pickupFee = grossTotal === 0 ? 0 : (isFreePickup ? 0 : 100);
  const netPayout = Math.max(0, grossTotal - pickupFee);
  const amountNeededForFree = 500 - grossTotal;

  // Filtered scrap items for step 1
  const filteredPrices = scrapPrices.filter(item => 
    activeCategory === "All" || item.category === activeCategory
  );

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

  // ── Construct Detailed WhatsApp Message ─────────────────
  const itemsBreakdown = selectedItemsList.map(item => 
    `• ${item.name}: ${itemQuantities[item.id]} ${item.unit} @ ₹${item.price}/${item.unit} = ₹${(itemQuantities[item.id] || 0) * Number(item.price)}`
  ).join('\n');

  const pickupFeeText = isFreePickup 
    ? "FREE Doorstep Pickup 🎉" 
    : `₹100 (Below ₹500 order deduction)`;

  const whatsappMessage = `Hello ${siteConfig.name}, I want to book a scrap pickup.

*📦 Estimated Scrap Items Selected:*
${itemsBreakdown || '• General / Unlisted Scrap Items'}
${customQtyNote ? `Note / Additional Scrap: ${customQtyNote}` : ''}

*💰 Estimated Payout Calculation:*
• Gross Scrap Value: ₹${grossTotal}
• Doorstep Pickup Fee: ${pickupFeeText}
• *NET ESTIMATED PAYOUT: ₹${netPayout} Cash/UPI*

*📍 Pickup Location Details:*
• Name: ${name}
• Phone: ${phone}
• Address: ${address}
• Area: ${area}, Siliguri - ${pincode}
• Preferred Date: ${date}`;

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  if (step === 5) {
    return (
      <div className={`container ${styles.successContainer}`}>
        <Card className={styles.successCard}>
          <div className={styles.successIcon}>✓</div>
          <h1>Pickup Request Received</h1>
          <p>Your pickup request has been submitted. Our team will contact you shortly to confirm the timing.</p>
          
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', width: '100%', textAlign: 'left', fontSize: '0.9rem' }}>
            <strong style={{ color: 'var(--color-dark)', display: 'block', marginBottom: '8px' }}>Estimated Summary:</strong>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Gross Scrap Value:</span>
              <span>₹{grossTotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Pickup Fee:</span>
              <span style={{ color: isFreePickup ? '#15803D' : '#B91C1C', fontWeight: 600 }}>
                {isFreePickup ? 'FREE' : '- ₹100'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '8px', marginTop: '8px', fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-primary)' }}>
              <span>Est. Cash Payout:</span>
              <span>₹{netPayout}</span>
            </div>
          </div>

          <div className={styles.contactLinks}>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <Button variant="whatsapp" fullWidth>Confirm via WhatsApp</Button>
            </a>
            <a href={`tel:${siteConfig.contact.phone.replace(/ /g, '')}`}>
              <Button variant="outline" fullWidth>Call Us</Button>
            </a>
          </div>
          
          <Button variant="ghost" onClick={() => { setStep(1); setItemQuantities({}); }}>
            Book another pickup
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={`container ${styles.formContainer}`}>
      <div className={styles.header}>
        <h1>Book a Pickup & Payout Calculator</h1>
        <p>Estimate your cash payout instantly before booking.</p>
        <div className={styles.progress}>
          Step {step} of 4
        </div>
      </div>

      <Card className={styles.formCard}>
        {/* STEP 1: CALCULATOR & ITEM SELECTION */}
        {step === 1 && (
          <form onSubmit={nextStep}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <Calculator size={22} style={{ color: 'var(--color-primary)' }} />
              <h3 style={{ margin: 0 }}>Select Scrap & Estimate Payout</h3>
            </div>
            <p className={styles.helpText}>Type estimated quantities to calculate your total cash payout.</p>

            {/* Category Filter Pills */}
            <div className={styles.categoryFilter}>
              {scrapCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`${styles.filterBtn} ${activeCategory === cat ? styles.activeFilter : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Catalog Item List */}
            <div className={styles.calculatorList}>
              {filteredPrices.map((item) => {
                const qty = itemQuantities[item.id] || 0;
                return (
                  <div key={item.id} className={`${styles.itemRow} ${qty > 0 ? styles.hasQty : ''}`}>
                    <div className={styles.itemDetails}>
                      <span className={styles.itemName}>{item.name}</span>
                      <span className={styles.itemRate}>
                        <strong>₹{item.price}</strong> / {item.unit}
                      </span>
                    </div>

                    <div className={styles.qtyInputWrapper}>
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        className={styles.qtyInput}
                        value={itemQuantities[item.id] ?? ''}
                        onChange={(e) => updateDirectQuantity(item.id, e.target.value)}
                      />
                      <span className={styles.unitLabel}>{item.unit}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Payout Summary Box */}
            <div className={styles.payoutSummaryCard}>
              <div className={styles.summaryRow}>
                <span>Selected Items ({totalItemCount}):</span>
                <strong>₹{grossTotal}</strong>
              </div>

              <div className={styles.summaryRow}>
                <span>Doorstep Pickup Fee:</span>
                {grossTotal === 0 ? (
                  <span>--</span>
                ) : isFreePickup ? (
                  <span className={styles.freeFeeBadge}>FREE 🎉</span>
                ) : (
                  <span className={styles.paidFeeBadge}>₹100 (Below ₹500)</span>
                )}
              </div>

              {/* Free Pickup Threshold Upgrade Notice */}
              {grossTotal > 0 && !isFreePickup && (
                <div className={styles.upgradeNotice}>
                  💡 <strong>Unlock FREE Doorstep Pickup!</strong> Add <strong>₹{amountNeededForFree}</strong> more scrap to avoid the ₹100 pickup fee.
                </div>
              )}

              {grossTotal >= 500 && (
                <div style={{ fontSize: '0.8125rem', color: '#15803D', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <ShieldCheck size={16} /> 100% Free Doorstep Pickup Unlocked!
                </div>
              )}

              <div className={styles.netPayoutRow}>
                <span className={styles.netLabel}>Est. Net Payout:</span>
                <span className={styles.netAmount}>₹{netPayout}</span>
              </div>
            </div>

            <Button type="submit" variant="primary" fullWidth size="lg" disabled={totalItemCount === 0}>
              Continue with Est. ₹{netPayout} Payout
            </Button>
          </form>
        )}

        {/* STEP 2: QUANTITY CONFIRMATION & NOTES */}
        {step === 2 && (
          <form onSubmit={nextStep}>
            <h3>Additional Scrap Details</h3>
            <p className={styles.helpText}>Have extra unlisted items or heavy scrap?</p>
            
            <div className={styles.inputGroup}>
              <Input 
                label="Additional Notes / Unlisted Scrap (Optional)" 
                placeholder="e.g. 2 extra metal boxes, 1 broken fan, engine parts, etc." 
                value={customQtyNote} 
                onChange={(e) => setCustomQtyNote(e.target.value)} 
              />
            </div>

            {/* Summary preview */}
            <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '1.5rem' }}>
              <strong style={{ color: 'var(--color-dark)', display: 'block', marginBottom: '8px' }}>Selected Items ({selectedItemsList.length}):</strong>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                {selectedItemsList.map(item => (
                  <li key={item.id} style={{ marginBottom: '4px' }}>
                    {item.name}: <strong>{itemQuantities[item.id]} {item.unit}</strong> (₹{(itemQuantities[item.id] || 0) * Number(item.price)})
                  </li>
                ))}
              </ul>
              <div style={{ borderTop: '1px solid #E2E8F0', marginTop: '10px', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                <span>Estimated Cash Payout:</span>
                <span style={{ color: 'var(--color-primary)' }}>₹{netPayout}</span>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button type="submit" variant="primary">Continue to Location</Button>
            </div>
          </form>
        )}

        {/* STEP 3: LOCATION & ADDRESS */}
        {step === 3 && (
          <form onSubmit={nextStep}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>Where should we collect it?</h3>
              <Button type="button" variant="outline" size="sm" onClick={detectLocation} disabled={isLocating} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <MapPin size={16} /> {isLocating ? 'Locating...' : 'Detect Location'}
              </Button>
            </div>
            
            <div className={styles.inputGroup} style={{ marginTop: 0 }}>
              <Input label="Full Name" required placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input label="Phone Number" type="tel" required placeholder="10-digit mobile number" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Input label="Address" required placeholder="House/Flat No, Building, Street" value={address} onChange={(e) => setAddress(e.target.value)} />
              <div className={styles.row}>
                <Input label="Area / Locality" required placeholder={`e.g. Hakimpara, ${siteConfig.locations.primary}`} value={area} onChange={(e) => setArea(e.target.value)} />
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
              <Button type="submit" variant="primary">Continue to Date</Button>
            </div>
          </form>
        )}

        {/* STEP 4: PREFERRED DATE & FINAL CONFIRMATION */}
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

            {/* Complete Payout Review Breakdown */}
            <div style={{ background: '#F1F5F9', border: '1px dashed #CBD5E1', borderRadius: '12px', padding: '16px', marginTop: '1.5rem' }}>
              <h4 style={{ margin: '0 0 10px 0', color: 'var(--color-dark)', fontSize: '0.95rem' }}>📋 Order & Payout Summary</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '6px' }}>
                <span>Gross Scrap Value:</span>
                <span>₹{grossTotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '6px' }}>
                <span>Pickup Fee:</span>
                <span style={{ color: isFreePickup ? '#15803D' : '#B91C1C', fontWeight: 600 }}>
                  {isFreePickup ? 'FREE (Order >= ₹500)' : '- ₹100'}
                </span>
              </div>
              <div style={{ borderTop: '1px solid #CBD5E1', paddingTop: '8px', marginTop: '6px', display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                <span>Net Estimated Cash Payout:</span>
                <span>₹{netPayout}</span>
              </div>
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
