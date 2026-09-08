"use client";
import React from "react";
import {
  HeroSection,
  CategoryBento,
  DropsSection,
  EditorialSection,
  Atelier3DSection,
  ManifestoSection,
  BestsellersSection,
  BrandPillarsSection,
  VIPClubSection,
} from "@/components/home";
import Marquee from "@/components/ui/Marquee";

export default function HomePage() {
  return (
    <main>
      {/* Full Bleed Cinematic Hero */}
      <HeroSection />

      {/* Live Marquee Ticker 1 */}
      <Marquee
        items={[
          "WEAR YOUR ATTITUDE ✦",
          "LIMITED RUN OF 500 PIECES ✦",
          "100% HEAVYWEIGHT ORGANIC COTTON ✦",
          "FREE WORLDWIDE EXPRESS DELIVERY OVER $150 ✦",
          "NEW AW25 ARRIVALS DROPPING WEEKLY ✦",
        ]}
      />

      {/* Curated Category Bento */}
      <CategoryBento />

      {/* Season Drops Tabbed Showcase */}
      <DropsSection />

      {/* Dual Split Gender Editorial */}
      <EditorialSection />

      {/* 3D Digital Atelier & Material Lab (Dynamic Code-Split) */}
      <Atelier3DSection />

      {/* Manifesto */}
      <ManifestoSection />

      {/* Community Bestsellers */}
      <BestsellersSection />

      {/* Brand Guarantees & Pillars */}
      <BrandPillarsSection />

      {/* Dark Marquee Ticker 2 */}
      <Marquee
        items={[
          "JOIN THE KLUB INNER CIRCLE ✦",
          "EXCLUSIVE ACCESS TO SECRET DROPS ✦",
          "MEMBER ONLY DISCOUNTS ✦",
          "ARCHIVE ACCESS ✦",
        ]}
        dark
        speed={30}
      />

      {/* VIP Drop Access / Newsletter */}
      <VIPClubSection />
    </main>
  );
}
