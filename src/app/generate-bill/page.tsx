import { Metadata } from "next";
import { BillingSection } from "@/components/sections/Billing/BillingSection";

export const metadata: Metadata = {
  title: "Generate Scrap Purchase Bill | Scrapiva Staff",
  description: "Generate customer scrap purchase bill and invoice.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GenerateBillPage() {
  return <BillingSection />;
}
