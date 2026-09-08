"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { getProductsByCategory, Product } from "@/data/products";
import { staggerContainer, fadeUp, slideInLeft, VIEWPORT_ONCE } from "@/lib/animations";

const MEN_CATS = ["All", "T-Shirts", "Hoodies", "Jackets", "Pants", "Shorts", "Accessories"];
const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Sellers", value: "bestseller" },
];

export default function MenPage() {
  const allMen = getProductsByCategory("men");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...allMen];
    if (activeCategory !== "All") {
      list = list.filter((p) => p.subcategory.replace("-", " ") === activeCategory.toLowerCase() || p.subcategory === activeCategory.toLowerCase().replace(" ", "-"));
    }
    switch (sort) {
      case "price-asc": list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price)); break;
      case "price-desc": list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price)); break;
      case "bestseller": list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)); break;
      default: list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
    return list;
  }, [allMen, activeCategory, sort]);

  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero Banner */}
      <section style={{ position: "relative", height: 400, overflow: "hidden", display: "flex", alignItems: "center" }}>
        <Image src="/images/men-jacket.jpg" alt="Men's Collection" fill style={{ objectFit: "cover", objectPosition: "center 20%" }} priority sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 12 }}>
              Season Collection
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display" style={{ fontSize: "clamp(48px, 8vw, 100px)", color: "white", lineHeight: 0.9 }}>
              MEN'S<br />
              <span style={{ color: "var(--color-accent)" }}>EDIT</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginTop: 16 }}>
              {allMen.length} pieces · New Season
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="section">
        <div className="container">
          {/* Filter bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
            {/* Category pills */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {MEN_CATS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`filter-chip ${activeCategory === cat ? "active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort + count */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 13, color: "var(--color-muted)" }}>{filtered.length} products</span>
              <div style={{ position: "relative" }}>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  style={{
                    appearance: "none",
                    padding: "10px 40px 10px 16px",
                    border: "1.5px solid var(--color-border)",
                    background: "transparent",
                    fontSize: 13,
                    fontFamily: "inherit",
                    fontWeight: 600,
                    cursor: "pointer",
                    outline: "none",
                    color: "var(--color-text)",
                  }}
                >
                  {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              </div>
            </div>
          </div>

          {/* Product grid */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--color-muted)" }}>
              <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>No products found</p>
              <button onClick={() => setActiveCategory("All")} className="btn btn-outline" style={{ marginTop: 16 }}>View All</button>
            </div>
          ) : (
            <motion.div
              key={activeCategory + sort}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}
            >
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
