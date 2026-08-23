import { siteConfig } from "@/config/site";
import { AuroraBackground } from "@/components/ui/AuroraBackground/AuroraBackground";
import { B2BPainPoints } from "@/components/sections/B2B/B2BPainPoints/B2BPainPoints";
import { B2BIndustries } from "@/components/sections/B2B/B2BIndustries/B2BIndustries";
import { B2BServices } from "@/components/sections/B2B/B2BServices/B2BServices";
import { B2BGuarantee } from "@/components/sections/B2B/B2BGuarantee/B2BGuarantee";
import { TrustStrip } from "@/components/sections/TrustStrip/TrustStrip";
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
        <AuroraBackground />
        <div className="container">
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>B2B SCRAP MANAGEMENT</p>
            <h1 className={styles.title}>Turn Your Business Scrap Into Instant Revenue—Without Lifting A Finger.</h1>
            <p className={styles.description}>
              Stop dealing with unreliable vendors and unfair pricing. We handle the heavy lifting, provide 100% transparent weighing, and pay you instantly.
            </p>
          </div>
        </div>
      </section>

      <B2BPainPoints />
      <B2BServices />
      <B2BIndustries />
      <TrustStrip />
      <B2BGuarantee />
      <B2BLeadForm />
    </>
  );
}
