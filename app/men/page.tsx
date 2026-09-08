"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { getProductsByCategory } from "@/data/products";
import { staggerContainer, fadeUp } from "@/lib/animations";

const MEN_CATS = ["All", "T-Shirts", "Hoodies", "Jackets", "Pants", "Shorts", "Accessories"];
const SIZES = ["All", "XS", "S", "M", "L", "XL", "XXL"];
const PRICE_RANGES = [
  { id: "all", label: "All Prices" },
  { id: "under-75", label: "Under $75" },
  { id: "75-125", label: "$75 to $125" },
  { id: "125-plus", label: "$125+" },
];
const SORT_OPTIONS = [
  { label: "Newest Releases", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Sellers First", value: "bestseller" },
];

export default function MenPage() {
  const allMen = getProductsByCategory("men");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSize, setActiveSize] = useState("All");
  const [activePrice, setActivePrice] = useState("all");
  const [sort, setSort] = useState("newest");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...allMen];

    // Category filter
    if (activeCategory !== "All") {
      const matchKey = activeCategory.toLowerCase().replace(" ", "-");
      list = list.filter((p) => p.subcategory.toLowerCase() === matchKey || p.subcategory.replace("-", " ") === activeCategory.toLowerCase());
    }

    // Size filter
    if (activeSize !== "All") {
      list = list.filter((p) => p.sizes.includes(activeSize));
    }

    // Price filter
    if (activePrice === "under-75") {
      list = list.filter((p) => (p.salePrice ?? p.price) < 75);
    } else if (activePrice === "75-125") {
      list = list.filter((p) => {
        const pr = p.salePrice ?? p.price;
        return pr >= 75 && pr <= 125;
      });
    } else if (activePrice === "125-plus") {
      list = list.filter((p) => (p.salePrice ?? p.price) > 125);
    }

    // Sorting
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case "price-desc":
        list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case "bestseller":
        list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      default:
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
    return list;
  }, [allMen, activeCategory, activeSize, activePrice, sort]);

  const activeFilterCount = (activeCategory !== "All" ? 1 : 0) + (activeSize !== "All" ? 1 : 0) + (activePrice !== "all" ? 1 : 0);

  const resetAllFilters = () => {
    setActiveCategory("All");
    setActiveSize("All");
    setActivePrice("all");
    setSort("newest");
  };

  return (
    <div style={{ paddingTop: 80, background: "var(--color-background)", minHeight: "100vh" }}>
      {/* Hero Banner */}
      <section style={{ position: "relative", height: 380, overflow: "hidden", display: "flex", alignItems: "center" }}>
        <Image src="/images/men-jacket.jpg" alt="Men's Collection" fill style={{ objectFit: "cover", objectPosition: "center 20%" }} priority sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 12 }}>
              AW25 Collection // Capsule Drops
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display" style={{ fontSize: "clamp(48px, 8vw, 96px)", color: "white", lineHeight: 0.9 }}>
              MEN'S<br />
              <span style={{ color: "var(--color-accent)" }}>STREETWEAR</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginTop: 14 }}>
              Heavyweight architectural cuts, reinforced stitching, and signature utility details.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Filter & Products Section */}
      <section className="section">
        <div className="container">
          {/* Controls Bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
            {/* Category Pills (Primary) */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 max-w-full items-center">
              {MEN_CATS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "var(--radius-sm)",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    border: `1.5px solid ${activeCategory === cat ? "var(--color-primary)" : "var(--color-border)"}`,
                    background: activeCategory === cat ? "var(--color-primary)" : "var(--color-surface)",
                    color: activeCategory === cat ? "#ffffff" : "var(--color-text)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Filter Drawer Toggle & Sort */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button
                onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  background: filterDrawerOpen ? "var(--color-primary)" : "var(--color-surface)",
                  color: filterDrawerOpen ? "#ffffff" : "var(--color-text)",
                  border: "1.5px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <SlidersHorizontal size={14} />
                Filters
                {activeFilterCount > 0 && (
                  <span style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--color-accent)", color: "#000", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <div style={{ position: "relative" }}>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  style={{
                    appearance: "none",
                    padding: "8px 36px 8px 14px",
                    border: "1.5px solid var(--color-border)",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--color-surface)",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    outline: "none",
                    color: "var(--color-text)",
                  }}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--color-muted)" }} />
              </div>
            </div>
          </div>

          {/* Collapsible Advanced Filter Drawer */}
          <AnimatePresence>
            {filterDrawerOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  padding: "24px",
                  marginBottom: 32,
                  overflow: "hidden",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24, marginBottom: 20 }}>
                  {/* Size Selector */}
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 10 }}>
                      Filter by Size
                    </span>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {SIZES.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setActiveSize(sz)}
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: "var(--radius-sm)",
                            border: `1.5px solid ${activeSize === sz ? "var(--color-primary)" : "var(--color-border)"}`,
                            background: activeSize === sz ? "var(--color-primary)" : "var(--color-background)",
                            color: activeSize === sz ? "#fff" : "var(--color-text)",
                            fontSize: 11,
                            fontWeight: 800,
                            cursor: "pointer",
                          }}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 10 }}>
                      Price Range
                    </span>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {PRICE_RANGES.map((pr) => (
                        <button
                          key={pr.id}
                          onClick={() => setActivePrice(pr.id)}
                          style={{
                            padding: "8px 14px",
                            borderRadius: "var(--radius-sm)",
                            border: `1.5px solid ${activePrice === pr.id ? "var(--color-primary)" : "var(--color-border)"}`,
                            background: activePrice === pr.id ? "var(--color-primary)" : "var(--color-background)",
                            color: activePrice === pr.id ? "#fff" : "var(--color-text)",
                            fontSize: 11,
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          {pr.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reset Controls */}
                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
                    <button
                      onClick={resetAllFilters}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--color-sale, #ff3b30)",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Reset All Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filter Chips */}
          {activeFilterCount > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--color-muted)", textTransform: "uppercase" }}>Active Filters:</span>
              {activeCategory !== "All" && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 999, fontSize: 11, fontWeight: 700 }}>
                  Category: {activeCategory}
                  <X size={12} style={{ cursor: "pointer" }} onClick={() => setActiveCategory("All")} />
                </span>
              )}
              {activeSize !== "All" && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 999, fontSize: 11, fontWeight: 700 }}>
                  Size: {activeSize}
                  <X size={12} style={{ cursor: "pointer" }} onClick={() => setActiveSize("All")} />
                </span>
              )}
              {activePrice !== "all" && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 999, fontSize: 11, fontWeight: 700 }}>
                  Price: {PRICE_RANGES.find((p) => p.id === activePrice)?.label}
                  <X size={12} style={{ cursor: "pointer" }} onClick={() => setActivePrice("all")} />
                </span>
              )}
              <button onClick={resetAllFilters} style={{ background: "none", border: "none", color: "var(--color-muted)", fontSize: 11, fontWeight: 700, textDecoration: "underline", cursor: "pointer", marginLeft: 6 }}>
                Clear All
              </button>
            </div>
          )}

          {/* Results Count */}
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 13, color: "var(--color-muted)" }}>
              Showing <strong>{filtered.length}</strong> pieces matching criteria
            </span>
          </div>

          {/* Products Grid */}
          {filtered.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
            >
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 20px", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)" }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>No Matching Products Found</h3>
              <p style={{ color: "var(--color-muted)", fontSize: 14, marginBottom: 20 }}>Try adjusting or clearing your filters to see more pieces.</p>
              <button onClick={resetAllFilters} className="btn btn-primary">
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
