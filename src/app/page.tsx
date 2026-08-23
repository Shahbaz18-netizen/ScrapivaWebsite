import { Hero } from "@/components/sections/Hero/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip/TrustStrip";
import { B2BIntro } from "@/components/sections/B2BIntro/B2BIntro";
import { B2CIntro } from "@/components/sections/B2CIntro/B2CIntro";
import { PopularPrices } from "@/components/sections/PopularPrices/PopularPrices";
import { Testimonials } from "@/components/sections/Testimonials/Testimonials";
import { ServiceArea } from "@/components/sections/ServiceArea/ServiceArea";
import { SustainabilityImpact } from "@/components/sections/SustainabilityImpact/SustainabilityImpact";
import { Button } from "@/components/ui/Button/Button";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { AuroraBackground } from "@/components/ui/AuroraBackground/AuroraBackground";
import styles from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scrap Buyers & Recycling Company in Siliguri | Scrapiva",
  description: "Scrapiva is a scrap collection and recycling company serving households in Siliguri and businesses across North Bengal and Sikkim.",
  keywords: [
    "Scrap buyer in Siliguri",
    "Scrap pickup in Siliguri",
    "Kabadiwala in Siliguri",
    "Scrap collection near me",
    "Sell scrap in Siliguri",
    "Industrial scrap buyers in Siliguri",
    "Bulk scrap buyers in North Bengal",
    "Factory scrap collection",
    "Industrial scrap recycling",
    "Scrap buyers in Sikkim",
    "Bulk scrap pickup"
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RecyclingCenter",
            "name": "Scrapiva",
            "image": "https://scrapiva.com/images/logo.png",
            "@id": "https://scrapiva.com/#organization",
            "url": "https://scrapiva.com",
            "telephone": siteConfig.contact.phone,
            "priceRange": "₹₹",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Siliguri, West Bengal",
              "addressLocality": "Siliguri",
              "addressRegion": "West Bengal",
              "postalCode": "734001",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "26.7271",
              "longitude": "88.3953"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "09:00",
              "closes": "18:00"
            },
            "sameAs": [
              "https://www.facebook.com/scrapiva",
              "https://www.instagram.com/scrapiva"
            ]
          })
        }}
      />
      <Hero />
      <TrustStrip />
      <SustainabilityImpact />
      
      <B2BIntro />
      {/* TODO: Add B2B Industries, Materials, Services later or on B2B page */}
      <B2CIntro />
      <PopularPrices />
      <Testimonials />
      <ServiceArea />
      
      {/* Final CTA */}
      <section className={styles.finalCta}>
        <AuroraBackground />
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready to Give Your Scrap a Better Route?</h2>
            <p className={styles.ctaSubtitle}>Serving {siteConfig.locations.primary}, {siteConfig.locations.region}</p>
            
            <div className={styles.ctaCards}>
              <div className={styles.ctaCard}>
                <h3>For Businesses</h3>
                <p>Bulk collection and ongoing scrap management.</p>
                <Link href="/for-businesses#quote">
                  <Button variant="secondary" size="lg" fullWidth>Request a Free Scrap Assessment</Button>
                </Link>
              </div>
              <div className={styles.ctaCard}>
                <h3>For Households</h3>
                <p>Simple on-demand pickup for recyclables.</p>
                <Link href="/book-pickup">
                  <Button variant="primary" size="lg" fullWidth>Book a Pickup</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
