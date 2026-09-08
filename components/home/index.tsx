"use client";
import dynamic from "next/dynamic";

export { default as HeroSection } from "./HeroSection";
export { default as CategoryBento } from "./CategoryBento";
export { default as DropsSection } from "./DropsSection";
export { default as EditorialSection } from "./EditorialSection";
export { default as ManifestoSection } from "./ManifestoSection";
export { default as BestsellersSection } from "./BestsellersSection";
export { default as BrandPillarsSection } from "./BrandPillarsSection";
export { default as VIPClubSection } from "./VIPClubSection";

// Dynamically import 3D Atelier to keep initial mobile bundle ultra-lean!
export const Atelier3DSection = dynamic(() => import("./Atelier3DSection"), {
  ssr: false,
  loading: () => (
    <div className="h-96 w-full flex items-center justify-center bg-[#080808] text-white/50 text-xs tracking-widest uppercase">
      Loading 3D Digital Atelier...
    </div>
  ),
});
