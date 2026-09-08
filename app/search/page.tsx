"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search as SearchIcon, X } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { products, searchProducts, Product } from "@/data/products";
import { staggerContainer } from "@/lib/animations";

function SearchContent() {
  const params = useSearchParams();
  const q = params.get("q") || "";
  const filter = params.get("filter") || "";
  const [query, setQuery] = useState(q);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (filter === "new") {
      setResults(products.filter(p => p.isNew));
    } else if (filter === "bestsellers") {
      setResults(products.filter(p => p.isBestSeller));
    } else if (filter === "sale") {
      setResults(products.filter(p => p.salePrice));
    } else if (q) {
      setResults(searchProducts(q));
    } else {
      setResults(products);
    }
  }, [q, filter]);

  useEffect(() => {
    if (query.length >= 1) setResults(searchProducts(query));
    else if (!filter) setResults(products);
  }, [query]); // eslint-disable-line

  const title = filter === "new" ? "New Arrivals"
    : filter === "bestsellers" ? "Best Sellers"
    : filter === "sale" ? "Sale"
    : q ? `Results for "${q}"`
    : "All Products";

  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section style={{ background: "var(--color-surface)", paddingBlock: "60px 40px" }}>
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: "clamp(28px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 32 }}
          >
            {title}
          </motion.h1>

          {/* Search bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, background: "white", border: "1.5px solid var(--color-border)", padding: "14px 20px", maxWidth: 600 }}>
              <SearchIcon size={20} style={{ color: "var(--color-muted-light)" }} />
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search products..."
                style={{ flex: 1, border: "none", outline: "none", fontSize: 16, fontFamily: "inherit", background: "transparent", color: "var(--color-text)" }}
              />
              {query && (
                <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", display: "flex" }}>
                  <X size={18} />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 14, color: "var(--color-muted)" }}>
              {results.length} {results.length === 1 ? "product" : "products"} found
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {["new", "bestsellers", "sale"].map(f => (
                <Link
                  key={f}
                  href={`/search?filter=${f}`}
                  className={`filter-chip ${filter === f ? "active" : ""}`}
                  style={{ textTransform: "capitalize" }}
                >
                  {f === "bestsellers" ? "Best Sellers" : f}
                </Link>
              ))}
              {filter && (
                <Link href="/search" className="filter-chip" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <X size={12} /> Clear
                </Link>
              )}
            </div>
          </div>

          {results.length === 0 ? (
            <div style={{ textAlign: "center", paddingBlock: 80 }}>
              <p style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>No products found</p>
              <p style={{ color: "var(--color-muted)", marginBottom: 32 }}>Try adjusting your search</p>
              <Link href="/search" className="btn btn-outline">View All Products</Link>
            </div>
          ) : (
            <motion.div
              key={query + filter}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}
            >
              {results.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: 200, textAlign: "center", color: "var(--color-muted)" }}>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
