"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/animations";

const CATEGORIES = [
  {
    title: "Heavy Outerwear",
    sub: "Parkas, Bombers & Tactical Shells",
    img: "/images/men-jacket.jpg",
    href: "/men",
    badge: "Winter Ready",
  },
  {
    title: "Signature Hoodies",
    sub: "480 GSM French Terry Fleece",
    img: "/images/men-hoodie.jpg",
    href: "/men",
    badge: "Best Seller",
  },
  {
    title: "Tactical Cargo & Pants",
    sub: "Engineered Utility Fit",
    img: "/images/men-cargo.jpg",
    href: "/men",
    badge: "Limited Drop",
  },
  {
    title: "Women's Statement",
    sub: "Avant-Garde Silhouettes",
    img: "/images/women-dress.jpg",
    href: "/women",
    badge: "New Release",
  },
];

export default function CategoryBento() {
  return (
    <section className="section" style={{ background: "var(--color-surface)", paddingBlock: 72 }}>
      <div className="container">
        <SectionHeading
          eyebrow="Curated Capsules"
          heading={"Explore By\nCategory."}
          sub="Engineered for everyday utility, statement presence, and timeless street credibility."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={cat.href} style={{ textDecoration: "none", display: "block" }}>
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "3/4",
                    overflow: "hidden",
                    background: "#111",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-sm)",
                  }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector("img");
                    if (img) img.style.transform = "scale(1.08)";
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector("img");
                    if (img) img.style.transform = "scale(1)";
                  }}
                >
                  <Image
                    src={cat.img}
                    alt={cat.title}
                    fill
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
                    }}
                  />
                  <div style={{ position: "absolute", top: 14, left: 14 }}>
                    <span className="badge badge-new">{cat.badge}</span>
                  </div>
                  <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: "clamp(24px, 3vw, 32px)",
                        color: "#ffffff",
                        lineHeight: 1,
                        marginBottom: 6,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {cat.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: 12,
                      }}
                    >
                      {cat.sub}
                    </p>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        color: "var(--color-accent)",
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      Shop Now <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
