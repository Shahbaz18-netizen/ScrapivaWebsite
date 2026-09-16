export interface ScrapMaterialRate {
  id: string;
  name: string;
  category: "Paper Scrap" | "Metal Scraps" | "Plastic Scrap" | "E-waste Scraps";
  price: string;
  unit: string;
  isPopular?: boolean;
}

export interface BillItem {
  id: string;
  name: string;
  category: string;
  rate: number;
  unit: string;
  quantity: number;
  subtotal: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  paymentMode: "Cash" | "UPI" | "Bank Transfer";
  notes?: string;
}

export interface PurchaseBill {
  invoiceNumber: string;
  date: string; // ISO date string
  time: string; // e.g. "02:30 PM"
  customer: CustomerInfo;
  items: BillItem[];
  totalWeightKg: number;
  totalItems: number;
  scrapSubtotal?: number;
  pickupFee?: number;
  grandTotal: number;
  staffName: string;
}
