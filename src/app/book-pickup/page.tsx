'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { Card } from '@/components/ui/Card/Card';
import { scrapPrices, scrapCategories } from '@/data/scrapPrices';
import { siteConfig } from '@/config/site';
import styles from './page.module.css';
import { 
  MapPin, 
  Calculator, 
  ShieldCheck, 
  Sparkles, 
  Scale, 
  Clock, 
  Phone, 
  Zap, 
  Newspaper, 
  Cable, 
  AirVent, 
  Wine, 
  Layers,
  Navigation,
  Calendar as CalendarIcon,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export interface SiliguriLocality {
  name: string;
  pincode: string;
  zoneId: 'central' | 'sevoke' | 'njp_south' | 'matigara_west';
  zoneName: string;
  recommendedSlot: 'morning' | 'afternoon' | 'evening';
}

export const siliguriZones = {
  central: {
    name: 'Zone 1: Central Siliguri (Hakimpara / Ashrampara)',
    recommendedTime: 'Morning Slot (8:30 AM - 11:30 AM)',
    desc: 'Route Active: Mon, Wed, Sat (Friday Closed)',
    activeDays: ['Mon', 'Wed', 'Sat']
  },
  sevoke: {
    name: 'Zone 2: Sevoke Road Corridor (Sevoke Rd / Bhakti Nagar)',
    recommendedTime: 'Morning or Evening Slot (9:30 AM - 12:30 PM & 4-7 PM)',
    desc: 'Route Active: Mon, Tue, Thu, Sat (Friday Closed)',
    activeDays: ['Mon', 'Tue', 'Thu', 'Sat']
  },
  njp_south: {
    name: 'Zone 3: NJP & South Corridor (Deshbandhupara / Fulbari)',
    recommendedTime: 'Afternoon Slot (12:00 PM - 3:30 PM)',
    desc: 'Route Active: Tue, Thu, Sun (Friday Closed)',
    activeDays: ['Tue', 'Thu', 'Sun']
  },
  matigara_west: {
    name: 'Zone 4: Matigara & West Corridor (Matigara / Shivmandir / Bagdogra)',
    recommendedTime: 'Mid-Day Slot (11:00 AM - 2:00 PM)',
    desc: 'Route Active: Wed, Sat, Sun (Friday Closed)',
    activeDays: ['Wed', 'Sat', 'Sun']
  }
};

export const siliguriLocalities: SiliguriLocality[] = [
  // CENTRAL SILIGURI
  { name: 'Hakimpara', pincode: '734001', zoneId: 'central', zoneName: 'Central Siliguri', recommendedSlot: 'morning' },
  { name: 'Subhashpally', pincode: '734001', zoneId: 'central', zoneName: 'Central Siliguri', recommendedSlot: 'morning' },
  { name: 'Ashrampara', pincode: '734001', zoneId: 'central', zoneName: 'Central Siliguri', recommendedSlot: 'morning' },
  { name: 'College Para', pincode: '734001', zoneId: 'central', zoneName: 'Central Siliguri', recommendedSlot: 'morning' },
  { name: 'Pradhan Nagar', pincode: '734003', zoneId: 'central', zoneName: 'Central Siliguri', recommendedSlot: 'morning' },
  { name: 'Siliguri Junction Area', pincode: '734001', zoneId: 'central', zoneName: 'Central Siliguri', recommendedSlot: 'morning' },
  { name: 'Bidhan Market Area', pincode: '734001', zoneId: 'central', zoneName: 'Central Siliguri', recommendedSlot: 'morning' },

  // SEVOKE ROAD & EAST
  { name: 'Sevoke Road (1st - 3rd Mile)', pincode: '734001', zoneId: 'sevoke', zoneName: 'Sevoke Road Corridor', recommendedSlot: 'morning' },
  { name: 'Bhakti Nagar', pincode: '734007', zoneId: 'sevoke', zoneName: 'Sevoke Road Corridor', recommendedSlot: 'evening' },
  { name: 'Haidarpara', pincode: '734006', zoneId: 'sevoke', zoneName: 'Sevoke Road Corridor', recommendedSlot: 'evening' },
  { name: 'Salugara', pincode: '734008', zoneId: 'sevoke', zoneName: 'Sevoke Road Corridor', recommendedSlot: 'morning' },
  { name: 'Ektiasal', pincode: '734006', zoneId: 'sevoke', zoneName: 'Sevoke Road Corridor', recommendedSlot: 'evening' },
  { name: 'Don Bosco Colony', pincode: '734006', zoneId: 'sevoke', zoneName: 'Sevoke Road Corridor', recommendedSlot: 'evening' },

  // NJP & SOUTH
  { name: 'Deshbandhupara', pincode: '734004', zoneId: 'njp_south', zoneName: 'NJP & South Corridor', recommendedSlot: 'afternoon' },
  { name: 'Saktigarh', pincode: '734005', zoneId: 'njp_south', zoneName: 'NJP & South Corridor', recommendedSlot: 'afternoon' },
  { name: 'Rath Khola', pincode: '734005', zoneId: 'njp_south', zoneName: 'NJP & South Corridor', recommendedSlot: 'afternoon' },
  { name: 'NJP Station Road', pincode: '734004', zoneId: 'njp_south', zoneName: 'NJP & South Corridor', recommendedSlot: 'afternoon' },
  { name: 'Fulbari / Dabgram', pincode: '734015', zoneId: 'njp_south', zoneName: 'NJP & South Corridor', recommendedSlot: 'afternoon' },

  // MATIGARA & WEST
  { name: 'Matigara', pincode: '734010', zoneId: 'matigara_west', zoneName: 'Matigara & West Corridor', recommendedSlot: 'afternoon' },
  { name: 'Champasari', pincode: '734003', zoneId: 'matigara_west', zoneName: 'Matigara & West Corridor', recommendedSlot: 'morning' },
  { name: 'Mallaguri', pincode: '734003', zoneId: 'matigara_west', zoneName: 'Matigara & West Corridor', recommendedSlot: 'morning' },
  { name: 'Shivmandir / NBU Campus', pincode: '734013', zoneId: 'matigara_west', zoneName: 'Matigara & West Corridor', recommendedSlot: 'afternoon' },
  { name: 'Bagdogra', pincode: '734014', zoneId: 'matigara_west', zoneName: 'Matigara & West Corridor', recommendedSlot: 'afternoon' },
];

const quickCategories = [
  { id: 'paper', title: 'Paper & Cardboard', desc: 'Newspaper, Books, Cartons', icon: Newspaper },
  { id: 'metals', title: 'Metals & Cables', desc: 'Copper, Iron, Brass, Aluminium', icon: Cable },
  { id: 'appliances', title: 'E-Waste & Appliances', desc: 'AC, Fridge, TV, Washing Machine, PC', icon: AirVent },
  { id: 'plastics', title: 'Plastics & Bottles', desc: 'Hard/Soft Plastics, Bottles, Buckets', icon: Wine },
  { id: 'general', title: 'Mixed Household Scrap', desc: 'Cleared room, junk items, old tools', icon: Layers },
];

const vehicleSizes = [
  { 
    id: 'small', 
    name: 'Small Load (Scooter / Bike)', 
    icon: '🛵', 
    weight: 'Fits on a Scooter / Bike (~10 - 20 kg)', 
    payout: 'Est. ₹150 - ₹350 Payout',
    isFree: false,
    feeText: '₹100 FEE (UNDER ₹500)'
  },
  { 
    id: 'medium', 
    name: 'Medium Load (Toto / Auto)', 
    icon: '🛺', 
    weight: 'Fits in a Toto / Auto (~20 - 50 kg)', 
    payout: 'Est. ₹350 - ₹800 Payout',
    isFree: true,
    feeText: 'FREE PICKUP (≥ ₹500)'
  },
  { 
    id: 'large', 
    name: 'Large Load (Pickup Van)', 
    icon: '🚚', 
    weight: 'Requires a Pickup Van / Mini Truck (50+ kg)', 
    payout: 'Est. ₹800+ Payout',
    isFree: true,
    feeText: 'FREE PICKUP (≥ ₹500)'
  },
  { 
    id: 'unsure', 
    name: 'Don\'t Know Load Size', 
    icon: '⚖️', 
    weight: 'Will weigh live at doorstep on digital scale', 
    payout: 'Paid live on Digital Scale',
    isFree: true,
    feeText: 'FREE PICKUP'
  }
];

const timeSlots = [
  { id: 'morning', label: 'Morning', time: '8:30 AM - 12 PM' },
  { id: 'afternoon', label: 'Afternoon', time: '12 PM - 4 PM' },
  { id: 'evening', label: 'Evening', time: '4 PM - 7 PM' },
];

export default function BookPickup() {
  const [bookingMode, setBookingMode] = useState<'quick' | 'calculator'>('quick');
  const [step, setStep] = useState(1);
  
  // ── Quick Mode State ──
  const [selectedQuickCats, setSelectedQuickCats] = useState<string[]>(['paper']);
  const [selectedVehicle, setSelectedVehicle] = useState<string>('medium');

  // ── Calculator Mode State ──
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // ── Shared Details State ──
  const [customNotes, setCustomNotes] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [selectedLocalityObj, setSelectedLocalityObj] = useState<SiliguriLocality | null>(siliguriLocalities[0]);
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [date, setDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('morning');
  
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');

  // Generate next 6 dates for date selection
  const upcomingDates = React.useMemo(() => {
    const list = [];
    const today = new Date();
    for (let i = 0; i < 6; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const isoStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = d.getDate();
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      const isToday = i === 0;
      const isTomorrow = i === 1;

      list.push({
        iso: isoStr,
        dayName,
        dayNum,
        monthName,
        displayDay: isToday ? 'Today' : isTomorrow ? 'Tomorrow' : dayName
      });
    }
    return list;
  }, []);

  // Set initial default date (skipping Friday)
  useEffect(() => {
    if (!date && upcomingDates.length > 0) {
      const validInitialDate = upcomingDates.find(d => d.dayName !== 'Fri') || upcomingDates[0];
      setDate(validInitialDate.iso);
    }
  }, [date, upcomingDates]);

  // ── Category Toggle ──
  const toggleQuickCat = (id: string) => {
    setSelectedQuickCats(prev => 
      prev.includes(id) 
        ? (prev.length > 1 ? prev.filter(c => c !== id) : prev) 
        : [...prev, id]
    );
  };

  // ── Locality Dropdown Selection ──
  const handleLocalitySelect = (localityName: string) => {
    setArea(localityName);
    const matched = siliguriLocalities.find(l => l.name === localityName);
    if (matched) {
      setSelectedLocalityObj(matched);
      setSelectedTimeSlot(matched.recommendedSlot);
      
      // Auto-select first active route date for zone (excluding Friday)
      const activeDays = siliguriZones[matched.zoneId].activeDays;
      const firstActiveDate = upcomingDates.find(d => d.dayName !== 'Fri' && activeDays.includes(d.dayName));
      if (firstActiveDate) {
        setDate(firstActiveDate.iso);
      }
    } else {
      setSelectedLocalityObj(null);
    }
  };

  // ── Detect Exact Map GPS Location ──
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    setLocationError('');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          setGpsCoords({ lat: latitude, lng: longitude });

          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          if (data && data.address) {
            const detectedSub = data.address.suburb || data.address.neighbourhood || data.address.city_district || 'Hakimpara';
            setArea(detectedSub);

            const found = siliguriLocalities.find(l => 
              l.name.toLowerCase().includes(detectedSub.toLowerCase()) || 
              detectedSub.toLowerCase().includes(l.name.toLowerCase())
            );
            if (found) {
              setSelectedLocalityObj(found);
              setSelectedTimeSlot(found.recommendedSlot);
            }
          }
        } catch (error) {
          console.error("Error detecting location", error);
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        alert("Unable to retrieve your map location. Please ensure location access is allowed in your browser.");
        setIsLocating(false);
      }
    );
  };

  // ── Calculator Mode Helpers ──
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

  const incrementQty = (id: string) => {
    setItemQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const decrementQty = (id: string) => {
    setItemQuantities(prev => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  // Computations
  const selectedItemsList = scrapPrices.filter(item => (itemQuantities[item.id] || 0) > 0);
  
  const grossTotal = selectedItemsList.reduce((sum, item) => {
    const qty = itemQuantities[item.id] || 0;
    return sum + (qty * Number(item.price));
  }, 0);

  const totalItemCount = Object.values(itemQuantities).reduce((a, b) => a + b, 0);

  const isFreePickupCalc = grossTotal >= 500;
  const pickupFeeCalc = grossTotal === 0 ? 0 : (isFreePickupCalc ? 0 : 100);
  const netPayoutCalc = Math.max(0, grossTotal - pickupFeeCalc);
  const amountNeededForFreeCalc = 500 - grossTotal;

  const filteredPrices = scrapPrices.filter(item => 
    activeCategory === "All" || item.category === activeCategory
  );

  const handleNextToLocation = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  // ── Construct Detailed WhatsApp Message ──
  const chosenCatNames = selectedQuickCats
    .map(id => quickCategories.find(c => c.id === id)?.title)
    .filter(Boolean)
    .join(', ');

  const chosenVehicleObj = vehicleSizes.find(v => v.id === selectedVehicle);
  const chosenSlotObj = timeSlots.find(t => t.id === selectedTimeSlot);

  const itemsBreakdownCalc = selectedItemsList.map(item => 
    `• ${item.name}: ${itemQuantities[item.id]} ${item.unit} @ ₹${item.price}/${item.unit} = ₹${(itemQuantities[item.id] || 0) * Number(item.price)}`
  ).join('\n');

  const modeSummaryText = bookingMode === 'quick'
    ? `*📦 Scrap Details (Quick Booking):*
• Categories: ${chosenCatNames}
• Vehicle Load Needed: ${chosenVehicleObj?.name} (${chosenVehicleObj?.weight})
• Est. Payout Range: ${chosenVehicleObj?.payout}`
    : `*📦 Itemized Calculator Summary:*
${itemsBreakdownCalc || '• General Unlisted Scrap'}
• Gross Value: ₹${grossTotal}
• Pickup Fee: ${isFreePickupCalc ? 'FREE' : '₹100 (Order < ₹500)'}
• *Est. Net Payout: ₹${netPayoutCalc}*`;

  // Generate unique booking reference ID
  const bookingRefId = React.useMemo(() => `PKP-SLG-${Math.floor(1000 + Math.random() * 9000)}`, []);

  // Construct Google Maps search URL or exact GPS pin URL for driver navigation
  const mapsSearchUrl = gpsCoords 
    ? `https://maps.google.com/?q=${gpsCoords.lat},${gpsCoords.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, ${area}, Siliguri`)}`;

  const whatsappMessage = `Hello ${siteConfig.name}, I want to book a scrap pickup!

*🆔 Booking Ref:* ${bookingRefId}

${modeSummaryText}
${customNotes ? `\n*📝 Additional Notes:* ${customNotes}` : ''}

*📍 Pickup Details:*
• Name: ${name}
• Phone: ${phone}
• Address: ${address}
• Area / Locality: ${area} (${selectedLocalityObj?.zoneName || 'Siliguri Route'})
• Preferred Date: ${date}
• Time Slot: ${chosenSlotObj?.label} (${chosenSlotObj?.time})

🗺️ *Exact Map Pin Link for Driver:* ${mapsSearchUrl}

*⚖️ Note:* Digital scale weighing will take place live at doorstep for exact instant payment.`;

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  // ── Submit Order directly via WhatsApp ──
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(whatsappUrl, '_blank');
    setStep(3);
  };

  // ── STEP 3: SUCCESS SCREEN ──
  if (step === 3) {
    return (
      <div className={`container ${styles.successContainer}`}>
        <Card className={styles.successCard}>
          <div className={styles.successIcon}>✓</div>
          <h1>Pickup Request Confirmed!</h1>
          <p>Your pickup request has been placed. Our executive will reach your doorstep on your chosen route slot.</p>
          
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.25rem', width: '100%', textAlign: 'left', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
              <span style={{ color: 'var(--color-muted)', fontSize: '0.825rem', fontWeight: 600 }}>Booking Reference:</span>
              <strong style={{ background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                {bookingRefId}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--color-muted)' }}>Booking Mode:</span>
              <strong style={{ textTransform: 'capitalize' }}>{bookingMode} Mode</strong>
            </div>

            {bookingMode === 'quick' ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--color-muted)' }}>Scrap Types:</span>
                  <span style={{ fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{chosenCatNames}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--color-muted)' }}>Vehicle Load:</span>
                  <span style={{ fontWeight: 600 }}>{chosenVehicleObj?.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '8px', marginTop: '8px', fontWeight: 700, fontSize: '1rem', color: 'var(--color-primary)' }}>
                  <span>Est. Cash Payout:</span>
                  <span>{chosenVehicleObj?.payout}</span>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--color-muted)' }}>Gross Value:</span>
                  <span>₹{grossTotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--color-muted)' }}>Pickup Fee:</span>
                  <span style={{ color: isFreePickupCalc ? '#15803D' : '#B91C1C', fontWeight: 600 }}>
                    {isFreePickupCalc ? 'FREE' : '- ₹100'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '8px', marginTop: '8px', fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-primary)' }}>
                  <span>Est. Cash Payout:</span>
                  <span>₹{netPayoutCalc}</span>
                </div>
              </>
            )}

            <div style={{ borderTop: '1px dashed #E2E8F0', marginTop: '10px', paddingTop: '10px', fontSize: '0.825rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>
              📍 <strong>Location:</strong> {address}, {area} <br />
              🗓️ <strong>Scheduled Route:</strong> {date} ({chosenSlotObj?.label} Slot) <br />
              🗺️ <a href={mapsSearchUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'underline' }}>View Pinned Map Location</a>
            </div>
          </div>

          <div className={styles.contactLinks}>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <Button variant="whatsapp" fullWidth size="lg">Confirm via WhatsApp</Button>
            </a>
            <a href={`tel:${siteConfig.contact.phone.replace(/ /g, '')}`}>
              <Button variant="outline" fullWidth>
                <Phone size={18} style={{ marginRight: 8 }} /> Call Pickup Helpline
              </Button>
            </a>
          </div>
          
          <Button variant="ghost" onClick={() => { setStep(1); setItemQuantities({}); }}>
            Book Another Pickup
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={`container ${styles.formContainer}`}>
      <div className={styles.header}>
        <h1>Book Doorstep Scrap Pickup</h1>
        <p>Don't know the exact weight? Select your vehicle load size & get weighed live at your doorstep.</p>
        
        <div className={styles.trustBadgeRow}>
          <span className={styles.trustChip}><Scale size={14} /> Certified Digital Scale</span>
          <span className={styles.trustChip}><Zap size={14} /> Instant Cash / UPI</span>
          <span className={styles.trustChip}><ShieldCheck size={14} /> FREE Pickup ≥ ₹500 (₹100 fee under ₹500)</span>
        </div>

        {/* Visual Stepper Progress Bar */}
        <div className={styles.stepperRow}>
          <div className={`${styles.stepItem} ${step >= 1 ? styles.activeStep : ''}`}>
            <span className={styles.stepDot}>{step > 1 ? '✓' : '1'}</span>
            <span>Scrap & Load</span>
          </div>
          <span className={styles.stepLine} />
          <div className={`${styles.stepItem} ${step >= 2 ? styles.activeStep : ''}`}>
            <span className={styles.stepDot}>{step > 2 ? '✓' : '2'}</span>
            <span>Location & Schedule</span>
          </div>
          <span className={styles.stepLine} />
          <div className={`${styles.stepItem} ${step === 3 ? styles.activeStep : ''}`}>
            <span className={styles.stepDot}>3</span>
            <span>Confirmation</span>
          </div>
        </div>
      </div>

      {/* Quick Phone Call Helpline Banner */}
      {step < 3 && (
        <div className={styles.phoneCallBanner}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Phone size={18} style={{ color: '#1D4ED8' }} />
            <span>Prefer booking over phone call? Speak to our pickup executive directly.</span>
          </div>
          <a href={`tel:${siteConfig.contact.phone.replace(/ /g, '')}`} style={{ fontWeight: 700, textDecoration: 'underline', color: '#1D4ED8' }}>
            Call {siteConfig.contact.phone} →
          </a>
        </div>
      )}

      {/* Mode Switcher Tabs */}
      {step === 1 && (
        <div className={styles.modeSwitcherContainer}>
          <button 
            className={`${styles.modeTab} ${bookingMode === 'quick' ? styles.activeTab : ''}`}
            onClick={() => setBookingMode('quick')}
            type="button"
          >
            <Sparkles size={18} /> Quick Visual Booking (Easy)
          </button>
          <button 
            className={`${styles.modeTab} ${bookingMode === 'calculator' ? styles.activeTab : ''}`}
            onClick={() => setBookingMode('calculator')}
            type="button"
          >
            <Calculator size={18} /> Itemized Rate Calculator
          </button>
        </div>
      )}

      <Card className={styles.formCard}>
        {/* ── STEP 1: QUICK MODE ── */}
        {step === 1 && bookingMode === 'quick' && (
          <form onSubmit={handleNextToLocation}>
            <div className={styles.stepTitle}>
              <Sparkles className={styles.stepIcon} size={22} />
              1. What scrap do you have?
            </div>
            <p className={styles.helpText}>Select all categories that apply to your scrap pile.</p>

            {/* Category Cards */}
            <span className={styles.sectionLabel}>Select Scrap Categories:</span>
            <div className={styles.categoryGrid}>
              {quickCategories.map(cat => {
                const isSelected = selectedQuickCats.includes(cat.id);
                const IconComp = cat.icon;
                return (
                  <div 
                    key={cat.id} 
                    className={`${styles.categoryCard} ${isSelected ? styles.selectedCategory : ''}`}
                    onClick={() => toggleQuickCat(cat.id)}
                  >
                    {isSelected && <div className={styles.checkBadge}>✓</div>}
                    <div className={styles.categoryIconWrapper}>
                      <IconComp size={20} />
                    </div>
                    <div>
                      <div className={styles.categoryTitle}>{cat.title}</div>
                      <div className={styles.categoryDesc}>{cat.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Vehicle Load Size Cards */}
            <span className={styles.sectionLabel}>Approximately what vehicle size is needed for your scrap?</span>
            <div className={styles.stackGrid}>
              {vehicleSizes.map(vehicle => {
                const isSelected = selectedVehicle === vehicle.id;
                return (
                  <div 
                    key={vehicle.id}
                    className={`${styles.stackCard} ${isSelected ? styles.selectedStack : ''}`}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                  >
                    <div className={vehicle.isFree ? styles.freeBadge : styles.paidFeeBadgeSmall}>
                      {vehicle.feeText}
                    </div>
                    <div className={styles.stackHeader}>
                      <span className={styles.stackIcon}>{vehicle.icon}</span>
                      <span className={styles.stackName}>{vehicle.name}</span>
                    </div>
                    <div className={styles.stackWeight}>{vehicle.weight}</div>
                    <div className={styles.stackPayoutBadge}>{vehicle.payout}</div>
                  </div>
                );
              })}
            </div>

            {/* Free Pickup Upgrade Notice for Small Load */}
            {selectedVehicle === 'small' && (
              <div className={styles.upgradeNotice} style={{ margin: '0 0 1.5rem 0' }}>
                💡 <strong>Tip to avoid ₹100 fee:</strong> Add 1 broken appliance (like a fan/toaster) or 2 extra bundles of books to cross ₹500 scrap value and unlock <strong>100% FREE Doorstep Pickup!</strong>
              </div>
            )}

            {/* Additional Notes */}
            <div className={styles.inputGroup} style={{ margin: '1rem 0 1.5rem' }}>
              <Input 
                label="Any specific items or extra notes? (Optional)"
                placeholder="e.g. 1 broken washing machine, 3 heavy metal pipes, 2 stacks of newspaper"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
              />
            </div>

            <Button type="submit" variant="primary" fullWidth size="lg">
              Continue to Location & Schedule →
            </Button>
          </form>
        )}

        {/* ── STEP 1: CALCULATOR MODE ── */}
        {step === 1 && bookingMode === 'calculator' && (
          <form onSubmit={handleNextToLocation}>
            <div className={styles.stepTitle}>
              <Calculator className={styles.stepIcon} size={22} />
              Calculate Itemized Scrap Payout
            </div>
            <p className={styles.helpText}>Enter estimated item quantities or weights to compute cash payout.</p>

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

                    <div className={styles.qtyControlWrapper}>
                      <button 
                        type="button" 
                        className={styles.qtyBtn} 
                        onClick={() => decrementQty(item.id)}
                      >
                        -
                      </button>
                      
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

                      <button 
                        type="button" 
                        className={styles.qtyBtn} 
                        onClick={() => incrementQty(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.payoutSummaryCard}>
              <div className={styles.summaryRow}>
                <span>Selected Items ({totalItemCount}):</span>
                <strong>₹{grossTotal}</strong>
              </div>

              <div className={styles.summaryRow}>
                <span>Doorstep Pickup Fee:</span>
                {grossTotal === 0 ? (
                  <span>--</span>
                ) : isFreePickupCalc ? (
                  <span className={styles.freeFeeBadge}>FREE 🎉</span>
                ) : (
                  <span className={styles.paidFeeBadge}>₹100 (Below ₹500)</span>
                )}
              </div>

              {grossTotal > 0 && !isFreePickupCalc && (
                <div className={styles.upgradeNotice}>
                  💡 <strong>Unlock FREE Doorstep Pickup!</strong> Add <strong>₹{amountNeededForFreeCalc}</strong> more scrap value to avoid the ₹100 fee.
                </div>
              )}

              {grossTotal >= 500 && (
                <div style={{ fontSize: '0.8125rem', color: '#15803D', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <ShieldCheck size={16} /> 100% Free Doorstep Pickup Unlocked!
                </div>
              )}

              <div className={styles.netPayoutRow}>
                <span className={styles.netLabel}>Est. Net Payout:</span>
                <span className={styles.netAmount}>₹{netPayoutCalc}</span>
              </div>
            </div>

            <Button type="submit" variant="primary" fullWidth size="lg" disabled={totalItemCount === 0}>
              Continue with Est. ₹{netPayoutCalc} Payout →
            </Button>
          </form>
        )}

        {/* ── STEP 2: ADDRESS & SCHEDULE ── */}
        {step === 2 && (
          <form onSubmit={handleFinalSubmit}>
            <div className={styles.stepTitle}>
              <MapPin className={styles.stepIcon} size={22} />
              2. Pickup Location & Schedule
            </div>
            <p className={styles.helpText}>Enter your details so our executive can reach your doorstep.</p>

            <div className={styles.inputGroup} style={{ marginTop: 0 }}>
              <div className={styles.row}>
                <Input 
                  label="Full Name" 
                  required 
                  placeholder="Your full name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
                <Input 
                  label="Mobile Number" 
                  type="tel" 
                  required 
                  placeholder="10-digit phone number" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                />
              </div>

              <Input 
                label="Full Address (House / Flat, Landmark)" 
                required 
                placeholder="e.g. Flat 3B, Sunshine Apartments, Hill Cart Road" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
              />

              {/* Area / Locality Selector */}
              <div>
                <label className={styles.sectionLabel} style={{ marginBottom: 6, fontSize: '0.85rem' }}>
                  Area / Locality (Siliguri)
                </label>
                <select 
                  className={styles.localitySelect}
                  value={area || siliguriLocalities[0].name}
                  onChange={(e) => handleLocalitySelect(e.target.value)}
                >
                  <optgroup label="🔴 Zone 1: Central Siliguri">
                    {siliguriLocalities.filter(l => l.zoneId === 'central').map(l => (
                      <option key={l.name} value={l.name}>{l.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="🔵 Zone 2: Sevoke Road Corridor">
                    {siliguriLocalities.filter(l => l.zoneId === 'sevoke').map(l => (
                      <option key={l.name} value={l.name}>{l.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="🟢 Zone 3: NJP & South Corridor">
                    {siliguriLocalities.filter(l => l.zoneId === 'njp_south').map(l => (
                      <option key={l.name} value={l.name}>{l.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="🟡 Zone 4: Matigara & West Corridor">
                    {siliguriLocalities.filter(l => l.zoneId === 'matigara_west').map(l => (
                      <option key={l.name} value={l.name}>{l.name}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* GPS Map Location Detector Button */}
              <div style={{ marginTop: '0.75rem' }}>
                <button 
                  type="button" 
                  onClick={detectLocation} 
                  disabled={isLocating}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: gpsCoords ? '2px solid #16A34A' : '2px dashed #0284C7',
                    background: gpsCoords ? '#F0FDF4' : '#F0F9FF',
                    color: gpsCoords ? '#15803D' : '#0369A1',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  <MapPin size={18} />
                  {isLocating 
                    ? 'Detecting Map GPS Location...' 
                    : gpsCoords 
                      ? `✓ Exact GPS Pinned (${gpsCoords.lat.toFixed(4)}, ${gpsCoords.lng.toFixed(4)})` 
                      : '📍 Tap to Pin & Detect Exact GPS Map Location'}
                </button>
              </div>

              {/* Dynamic Zone Recognition Badge */}
              {selectedLocalityObj && (
                <div className={styles.zoneBadgeBox}>
                  <Navigation size={18} style={{ color: '#0284C7', flexShrink: 0 }} />
                  <div>
                    <strong>{siliguriZones[selectedLocalityObj.zoneId].name}</strong>
                    <div style={{ fontSize: '0.775rem', opacity: 0.9 }}>
                      {siliguriZones[selectedLocalityObj.zoneId].desc} — Recommended Slot: <strong>{siliguriZones[selectedLocalityObj.zoneId].recommendedTime}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {locationError && (
              <div style={{ padding: '0.85rem 1rem', backgroundColor: '#FEF2F2', border: '1px solid #F87171', color: '#B91C1C', borderRadius: '12px', marginBottom: '1.25rem', fontSize: '0.85rem', lineHeight: 1.4 }}>
                {locationError}
              </div>
            )}

            {/* Interactive Day Cards Selector */}
            <span className={styles.sectionLabel} style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: '1rem' }}>
              <CalendarIcon size={16} /> Select Pickup Day:
            </span>
            <div className={styles.dateCardGrid}>
              {upcomingDates.map(item => {
                const isFriday = item.dayName === 'Fri';
                const isSelected = date === item.iso;
                const isZoneActiveDay = !isFriday && selectedLocalityObj 
                  ? siliguriZones[selectedLocalityObj.zoneId].activeDays.includes(item.dayName)
                  : !isFriday;

                return (
                  <div
                    key={item.iso}
                    className={`${styles.dateCard} ${isSelected ? styles.selectedDateCard : ''} ${isFriday ? styles.closedDateCard : ''}`}
                    onClick={() => {
                      if (!isFriday) setDate(item.iso);
                    }}
                    title={isFriday ? 'Friday is an OFF day / No pickups scheduled' : ''}
                  >
                    {isFriday ? (
                      <div className={styles.closedDateBadge}>
                        🚫 OFF (CLOSED)
                      </div>
                    ) : isZoneActiveDay ? (
                      <div className={styles.activeRouteDateBadge}>
                        ⭐ ROUTE ACTIVE
                      </div>
                    ) : null}
                    <span className={styles.dateCardDay}>{item.displayDay}</span>
                    <span className={styles.dateCardNum}>{item.dayNum}</span>
                    <span className={styles.dateCardMonth}>{item.monthName}</span>
                  </div>
                );
              })}
            </div>

            {/* Time Slots */}
            <span className={styles.sectionLabel}>Select Time Slot:</span>
            <div className={styles.slotGrid}>
              {timeSlots.map(slot => {
                const isRecommended = selectedLocalityObj?.recommendedSlot === slot.id;
                const isSelected = selectedTimeSlot === slot.id;
                return (
                  <div 
                    key={slot.id}
                    className={`${styles.slotBtn} ${isSelected ? styles.selectedSlot : ''} ${isRecommended ? styles.recommendedSlotBtn : ''}`}
                    onClick={() => setSelectedTimeSlot(slot.id)}
                  >
                    {isRecommended && <div className={styles.recommendedSlotBadge}>⭐ RECOMMENDED ROUTE</div>}
                    <Clock size={16} />
                    <span className={styles.slotLabel}>{slot.label}</span>
                    <span className={styles.slotTime}>{slot.time}</span>
                  </div>
                );
              })}
            </div>

            {/* Live WhatsApp Message Preview Box */}
            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '14px', padding: '14px 16px', marginTop: '1.5rem', fontSize: '0.85rem' }}>
              <div style={{ fontWeight: 700, color: '#15803D', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>💬 WhatsApp Booking Message Preview</span>
              </div>
              <div style={{ color: '#166534', fontFamily: 'monospace', fontSize: '0.8rem', whiteSpace: 'pre-line', background: '#FFFFFF', padding: '10px', borderRadius: '8px', border: '1px solid #DCFCE7' }}>
                {whatsappMessage}
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                ← Back
              </Button>
              <Button type="submit" variant="whatsapp" size="lg">
                Confirm & Book on WhatsApp
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
