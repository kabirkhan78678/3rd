"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ArrowRight, TrendingUp } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { products, searchProducts } from "@/data/products";
import { overlayFade, fadeUp, staggerContainer } from "@/lib/animations";

const POPULAR_SEARCHES = ["Hoodies", "Cargo Pants", "Bomber Jacket", "Graphic Tee", "Blazer"];

export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(products.slice(0, 6));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setResults(products.slice(0, 6));
    }
  }, [searchOpen]);

  useEffect(() => {
    if (query.length >= 1) {
      setResults(searchProducts(query).slice(0, 8));
    } else {
      setResults(products.slice(0, 6));
    }
  }, [query]);

  // Close on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeSearch(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeSearch]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          variants={overlayFade}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="search-overlay"
          role="dialog"
          aria-label="Search"
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "24px 40px",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <span className="font-display" style={{ fontSize: 20, letterSpacing: "0.15em" }}>
              KLUB
            </span>
            <motion.button
              onClick={closeSearch}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text)", display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              Close <X size={18} />
            </motion.button>
          </div>

          {/* Search input */}
          <div style={{ padding: "40px 40px 24px", borderBottom: "2px solid var(--color-border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, maxWidth: 900 }}>
              <Search size={32} strokeWidth={1.5} style={{ color: "var(--color-muted-light)", flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for styles, drops, vibes..."
                className="search-input-large"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)" }}
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>
            {/* Popular searches (show when no query) */}
            {!query && (
              <motion.div variants={fadeUp} initial="hidden" animate="visible" style={{ marginBottom: 40 }}>
                <p style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 16 }}>
                  <TrendingUp size={14} /> Popular Searches
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="filter-chip"
                      style={{ borderRadius: "var(--radius-full)" }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Results */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 20 }}>
                {query ? `${results.length} Result${results.length !== 1 ? "s" : ""} for "${query}"` : "Featured Products"}
              </p>

              {results.length === 0 && query ? (
                <div style={{ textAlign: "center", paddingTop: 40 }}>
                  <p style={{ fontWeight: 600, fontSize: 20, marginBottom: 8 }}>No results found</p>
                  <p style={{ color: "var(--color-muted)" }}>Try a different search term</p>
                </div>
              ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                    gap: 16,
                  }}
                >
                  {results.map((product, i) => (
                    <motion.div key={product.id} variants={fadeUp}>
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={closeSearch}
                        style={{ display: "block", textDecoration: "none" }}
                      >
                        <div style={{ position: "relative", aspectRatio: "3/4", background: "var(--color-surface)", marginBottom: 8, overflow: "hidden" }}>
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                            sizes="160px"
                          />
                        </div>
                        <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{product.name}</p>
                        <p style={{ fontSize: 13, color: product.salePrice ? "var(--color-sale)" : "var(--color-text)", fontWeight: 700 }}>
                          ${product.salePrice ?? product.price}
                        </p>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {query && results.length > 0 && (
                <div style={{ marginTop: 32, textAlign: "center" }}>
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    onClick={closeSearch}
                    className="btn btn-outline"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
                  >
                    View all results <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
