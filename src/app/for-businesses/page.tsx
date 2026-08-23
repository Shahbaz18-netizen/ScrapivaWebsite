import { siteConfig } from "@/config/site";
import { B2BIndustries } from "@/components/sections/B2B/B2BIndustries/B2BIndustries";
import { B2BMaterials } from "@/components/sections/B2B/B2BMaterials/B2BMaterials";
import { B2BServices } from "@/components/sections/B2B/B2BServices/B2BServices";
import { B2BHowItWorks } from "@/components/sections/B2B/B2BHowItWorks/B2BHowItWorks";
import { B2BLeadForm } from "@/components/sections/B2B/B2BLeadForm/B2BLeadForm";
import styles from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industrial Scrap Buyers & B2B Recycling in Siliguri | Scrapiva",
  description: "Reliable commercial and industrial scrap management solutions for businesses, factories, and warehouses in Siliguri, North Bengal, and Sikkim.",
  keywords: [
    "Industrial scrap buyers in Siliguri",
    "Bulk scrap buyers in North Bengal",
    "Factory scrap collection",
    "Industrial scrap recycling",
    "Scrap buyers in Sikkim",
    "Bulk scrap pickup"
  ]
};

export default function ForBusinesses() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>FOR BUSINESSES</p>
            <h1 className={styles.title}>Your Scrap. Our Responsibility.</h1>
            <p className={styles.description}>
              Businesses generate valuable recyclable materials every day. Scrapiva helps organizations simplify scrap collection, valuation and recycling through a reliable pickup network.
            </p>
          </div>
        </div>
      </section>

      <B2BIndustries />
      <B2BMaterials />
      <B2BServices />
      <B2BHowItWorks />
      <B2BLeadForm />
    </>
  );
}
