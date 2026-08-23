import { siteConfig } from "@/config/site";
import { AuroraBackground } from "@/components/ui/AuroraBackground/AuroraBackground";
import { B2BPainPoints } from "@/components/sections/B2B/B2BPainPoints/B2BPainPoints";
import { B2BIndustries } from "@/components/sections/B2B/B2BIndustries/B2BIndustries";
import { B2BServices } from "@/components/sections/B2B/B2BServices/B2BServices";
import { B2BGuarantee } from "@/components/sections/B2B/B2BGuarantee/B2BGuarantee";
import { TrustStrip } from "@/components/sections/TrustStrip/TrustStrip";
import { B2BLeadForm } from "@/components/sections/B2B/B2BLeadForm/B2BLeadForm";
import { FAQ } from "@/components/sections/FAQ/FAQ";
import { ScrollReveal } from "@/components/ui/ScrollReveal/ScrollReveal";
import { Button } from "@/components/ui/Button/Button";
import Link from "next/link";
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
      <ScrollReveal duration={0.8} yOffset={20}>
        <section className={styles.hero}>
          <AuroraBackground />
          <div className="container">
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>B2B SCRAP MANAGEMENT</p>
              <h1 className={styles.title}>Turn Your Business Scrap Into Instant Revenue—Without Lifting A Finger.</h1>
              <p className={styles.description}>
                Stop dealing with unreliable vendors and unfair pricing. We handle the heavy lifting, provide 100% transparent weighing, and pay you instantly.
              </p>
              <div className={styles.heroCta}>
                <Link href="#quote">
                  <Button variant="primary" size="lg">Request Free Scrap Quote</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <B2BPainPoints />
      </ScrollReveal>
      
      <ScrollReveal>
        <B2BServices />
      </ScrollReveal>
      
      <ScrollReveal>
        <B2BIndustries />
      </ScrollReveal>
      
      <ScrollReveal>
        <TrustStrip />
      </ScrollReveal>
      
      <ScrollReveal>
        <B2BGuarantee />
      </ScrollReveal>
      
      <ScrollReveal>
        <FAQ type="business" />
      </ScrollReveal>

      <ScrollReveal>
        <B2BLeadForm />
      </ScrollReveal>
    </>
  );
}
