"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { getBestSellers } from "@/data/products";

export default function BestsellersSection() {
  const bestSellers = getBestSellers();

  return (
    <section className="section" style={{ background: "var(--color-background)" }}>
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-10 gap-4">
          <SectionHeading
            eyebrow="Community Favorites"
            heading={"Essential\nBestsellers."}
            sub="The iconic pieces that built the reputation."
          />
          <Link
            href="/search?filter=bestsellers"
            className="btn btn-outline self-start sm:self-auto"
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            View All Bestsellers <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {bestSellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
