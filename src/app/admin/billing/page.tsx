import { Metadata } from "next";
import { BillingSection } from "@/components/sections/Billing/BillingSection";

export const metadata: Metadata = {
  title: "Purchase Bill & Receipt Generator | Scrapiva Internal",
  description: "Internal scrap purchase bill generator and scrap rate manager for Scrapiva staff.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminBillingPage() {
  return <BillingSection />;
}
