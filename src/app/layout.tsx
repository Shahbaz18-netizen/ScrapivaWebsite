import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp/FloatingWhatsApp";
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
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
