"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { products, getFeaturedProducts, getBestSellers, Product } from "@/data/products";
import { staggerContainer } from "@/lib/animations";

export default function DropsSection() {
  const [activeTab, setActiveTab] = useState<"all" | "men" | "women" | "bestseller">("all");

  const featured = getFeaturedProducts();
  const bestSellers = getBestSellers();

  const filteredProducts: Product[] =
    activeTab === "all"
      ? featured
      : activeTab === "men"
      ? products.filter((p) => p.category === "men").slice(0, 8)
      : activeTab === "women"
      ? products.filter((p) => p.category === "women").slice(0, 8)
      : bestSellers;

  return (
    <section className="section" style={{ background: "var(--color-background)" }}>
      <div className="container">
        {/* Section Header with Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-10 gap-5">
          <SectionHeading
            eyebrow="Season Drop"
            heading={"The Most\nWanted Pieces."}
            sub="Handpicked essentials selling out fast. Restocks are never guaranteed."
          />

          {/* Filter Tabs (Horizontal touch scroll on mobile) */}
          <div className="flex gap-2 bg-[var(--color-surface)] p-1 rounded-sm border border-[var(--color-border)] overflow-x-auto no-scrollbar w-fit max-w-full">
            {[
              { id: "all", label: "All Drops" },
              { id: "men", label: "Men's Edit" },
              { id: "women", label: "Women's Edit" },
              { id: "bestseller", label: "Bestsellers" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: "7px 14px",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  background: activeTab === tab.id ? "var(--color-primary)" : "transparent",
                  color: activeTab === tab.id ? "#ffffff" : "var(--color-muted)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid (2 columns on mobile, 3-4 on desktop) */}
        <motion.div
          key={activeTab}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          {filteredProducts.slice(0, 8).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>

        {/* View All CTA */}
        <div style={{ textAlign: "center", marginTop: 44 }}>
          <Link
            href="/search"
            className="btn btn-outline btn-lg"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            View Full Collection ({products.length} Items) <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
