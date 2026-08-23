import { ScrapCatalog } from "@/components/sections/B2C/ScrapCatalog/ScrapCatalog";
import styles from "./page.module.css";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { scrapPrices } from "@/data/scrapPrices";

export const metadata: Metadata = {
  title: "Today's Scrap Rate & Prices in Siliguri | Sell Scrap | Scrapiva",
  description: "Check latest indicative scrap prices and rates in Siliguri before booking a pickup. We buy old newspaper, iron, brass, copper, plastics, electronics, and more.",
  keywords: [
    "Scrap price in Siliguri",
    "Scrap rate in Siliguri",
    "Today scrap rate Siliguri",
    "Sell scrap in Siliguri",
    "Iron scrap price Siliguri",
    "Old newspaper rate Siliguri"
  ]
};

export default function ScrapPrices() {
  const popularItems = scrapPrices.filter((item) => item.isPopular).slice(0, 5);
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": popularItems.map((item) => ({
      "@type": "Question",
      "name": `What is the scrap price of ${item.name} in ${siteConfig.locations.primary}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `The indicative scrap price for ${item.name} is ₹${item.price} per ${item.unit.toLowerCase()} in ${siteConfig.locations.primary}. Prices may vary based on quantity and quality.`
      }
    }))
  };

  const today = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <span style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '4px 16px', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600 }}>
                Prices Last Updated: {today}
              </span>
            </div>
            <h1>Scrap Prices in {siteConfig.locations.primary}</h1>
            <p className={styles.disclaimer}>
              <strong>Indicative prices only.</strong> Final prices may vary based on material type, quality, quantity, condition and prevailing market rates.
            </p>
          </div>
        </div>
      </section>

      <ScrapCatalog />
    </>
  );
}
