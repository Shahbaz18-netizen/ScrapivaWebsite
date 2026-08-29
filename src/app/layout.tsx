import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp/FloatingWhatsApp";
import { BottomNav } from "@/components/layout/BottomNav/BottomNav";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - B2B Scrap Management & Recycling`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Scrap Buyer in Siliguri",
    "Scrap dealer in Siliguri",
    "Scrap pickup Siliguri",
    "Scrap recycling Siliguri",
    "Industrial scrap buyer Siliguri",
    "Factory scrap buyer Siliguri",
    "B2B scrap recycling Siliguri"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RecyclingCenter",
    name: siteConfig.name,
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: "Siliguri",
      addressRegion: "West Bengal",
      addressCountry: "IN"
    },
    areaServed: [
      {
        "@type": "City",
        name: "Siliguri"
      },
      {
        "@type": "State",
        name: "Sikkim"
      }
    ],
    priceRange: "$$"
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <BottomNav />
      </body>
    </html>
  );
}
