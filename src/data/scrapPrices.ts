import { 
  Newspaper, BookOpen, Package, 
  Box, Cylinder, Cable, Coins, Zap,
  Wine, Container, Trash2, 
  AirVent, Refrigerator, Microwave,
  Fan, Settings, Battery, BatteryWarning,
  Monitor, Laptop, Tv, Printer, Droplets
} from 'lucide-react';
import React from 'react';

export interface ScrapMaterial {
  id: string;
  name: string;
  category: "Paper Scrap" | "Metal Scraps" | "Plastic Scrap" | "E-waste Scraps";
  price: string;
  unit: string;
  icon: React.ElementType;
  isPopular?: boolean;
}

export const scrapCategories = ["All", "Paper Scrap", "Metal Scraps", "Plastic Scrap", "E-waste Scraps"];

export const scrapPrices: ScrapMaterial[] = [
  // PAPER
  { id: "newspaper", name: "Newspaper", category: "Paper Scrap", price: "14", unit: "kg", icon: Newspaper, isPopular: true },
  { id: "books", name: "Books", category: "Paper Scrap", price: "10", unit: "kg", icon: BookOpen, isPopular: true },
  { id: "cartoon-gatta", name: "Cartoon/Gatta", category: "Paper Scrap", price: "8", unit: "kg", icon: Package, isPopular: true },
  { id: "magazine", name: "Magazine", category: "Paper Scrap", price: "11", unit: "kg", icon: BookOpen, isPopular: false },

  // METAL
  { id: "iron", name: "Iron", category: "Metal Scraps", price: "22", unit: "kg", icon: Box, isPopular: true },
  { id: "steel", name: "Steel", category: "Metal Scraps", price: "40", unit: "kg", icon: Box, isPopular: true },
  { id: "aluminium", name: "Aluminium", category: "Metal Scraps", price: "110", unit: "kg", icon: Cylinder, isPopular: true },
  { id: "copper", name: "Copper", category: "Metal Scraps", price: "400", unit: "kg", icon: Cable, isPopular: true },
  { id: "brass", name: "Brass", category: "Metal Scraps", price: "300", unit: "kg", icon: Coins, isPopular: false },
  { id: "tin", name: "Tin", category: "Metal Scraps", price: "18", unit: "kg", icon: Cylinder, isPopular: false },
  { id: "aluminium-cable", name: "Aluminium Cable", category: "Metal Scraps", price: "25", unit: "kg", icon: Cable, isPopular: false },
  { id: "copper-cable", name: "Copper Cable", category: "Metal Scraps", price: "60", unit: "kg", icon: Cable, isPopular: false },

  // PLASTIC
  { id: "soft-plastic", name: "Soft Plastic", category: "Plastic Scrap", price: "12", unit: "kg", icon: Wine, isPopular: true },
  { id: "hard-plastic", name: "Hard Plastic", category: "Plastic Scrap", price: "3", unit: "kg", icon: Container, isPopular: false },
  { id: "mix-plastic", name: "Mix Plastic", category: "Plastic Scrap", price: "6", unit: "kg", icon: Trash2, isPopular: false },

  // E-WASTE
  { id: "ac-copper-1", name: "AC Copper Wiring 1 Ton", category: "E-waste Scraps", price: "2000", unit: "piece", icon: AirVent, isPopular: false },
  { id: "ac-copper-1.5", name: "AC Copper Wiring 1.5 Ton", category: "E-waste Scraps", price: "3000", unit: "piece", icon: AirVent, isPopular: false },
  { id: "ac-copper-2", name: "AC Copper Wiring 2 Ton", category: "E-waste Scraps", price: "4000", unit: "piece", icon: AirVent, isPopular: false },
  { id: "ac-aluminium-1", name: "AC Aluminium Wiring 1 Ton", category: "E-waste Scraps", price: "1800", unit: "piece", icon: AirVent, isPopular: false },
  { id: "ac-aluminium-1.5", name: "AC Aluminium Wiring 1.5 Ton", category: "E-waste Scraps", price: "2800", unit: "piece", icon: AirVent, isPopular: false },
  { id: "ac-aluminium-2", name: "AC Aluminium Wiring 2 Ton", category: "E-waste Scraps", price: "3200", unit: "piece", icon: AirVent, isPopular: false },
  { id: "fridge-single", name: "Refrigerator Single Door", category: "E-waste Scraps", price: "700", unit: "piece", icon: Refrigerator, isPopular: false },
  { id: "fridge-dual", name: "Refrigerator Dual Door", category: "E-waste Scraps", price: "1200", unit: "piece", icon: Refrigerator, isPopular: false },
  { id: "washing-machine-al", name: "Washing Machine (Al Wiring)", category: "E-waste Scraps", price: "400", unit: "piece", icon: Zap, isPopular: false },
  { id: "washing-machine-cu", name: "Washing Machine (Cu Wiring)", category: "E-waste Scraps", price: "600", unit: "piece", icon: Zap, isPopular: false },
  { id: "microwave", name: "Microwave", category: "E-waste Scraps", price: "200", unit: "piece", icon: Microwave, isPopular: false },
  { id: "fan", name: "Fan", category: "E-waste Scraps", price: "25", unit: "kg", icon: Fan, isPopular: false },
  { id: "motor", name: "Motor", category: "E-waste Scraps", price: "30", unit: "kg", icon: Settings, isPopular: false },
  { id: "inverter-wiring", name: "Inverter Copper Wiring", category: "E-waste Scraps", price: "40", unit: "kg", icon: Cable, isPopular: false },
  { id: "black-battery", name: "Black Battery", category: "E-waste Scraps", price: "70", unit: "kg", icon: Battery, isPopular: true },
  { id: "white-battery", name: "White Battery", category: "E-waste Scraps", price: "80", unit: "kg", icon: Battery, isPopular: false },
  { id: "geyser-steel", name: "Geyser Steel/Iron", category: "E-waste Scraps", price: "18", unit: "kg", icon: Cylinder, isPopular: false },
  { id: "geyser-copper", name: "Geyser Copper 25L", category: "E-waste Scraps", price: "30", unit: "kg", icon: Cylinder, isPopular: false },
  { id: "lcd-kg", name: "LCD", category: "E-waste Scraps", price: "20", unit: "kg", icon: Monitor, isPopular: false },
  { id: "laptop", name: "Laptop", category: "E-waste Scraps", price: "200", unit: "piece", icon: Laptop, isPopular: true },
  { id: "crt-monitor", name: "CRT Monitor", category: "E-waste Scraps", price: "180", unit: "piece", icon: Monitor, isPopular: false },
  { id: "ups", name: "UPS", category: "E-waste Scraps", price: "160", unit: "piece", icon: BatteryWarning, isPopular: false },
  { id: "cpu", name: "CPU", category: "E-waste Scraps", price: "150", unit: "piece", icon: Box, isPopular: false },
  { id: "crt-tv", name: "CRT Tv", category: "E-waste Scraps", price: "150", unit: "piece", icon: Tv, isPopular: false },
  { id: "printer", name: "Printer/Scanner/Fax", category: "E-waste Scraps", price: "14", unit: "kg", icon: Printer, isPopular: false },
  { id: "plastic-cooler", name: "Plastic Cooler", category: "E-waste Scraps", price: "15", unit: "kg", icon: Fan, isPopular: false },
  { id: "iron-cooler", name: "Iron Cooler", category: "E-waste Scraps", price: "30", unit: "kg", icon: Fan, isPopular: false },
  { id: "metal-ewaste", name: "Metal E-Waste", category: "E-waste Scraps", price: "25", unit: "kg", icon: Zap, isPopular: false },
  { id: "plastic-ewaste", name: "Plastic E-Waste", category: "E-waste Scraps", price: "15", unit: "kg", icon: Zap, isPopular: false },
  { id: "ro", name: "RO", category: "E-waste Scraps", price: "18", unit: "kg", icon: Droplets, isPopular: false },
];
