"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function WishlistPage() {
  const { ids, toggle, count } = useWishlist();
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState<"all" | "men" | "women">("all");
  const [movingAll, setMovingAll] = useState(false);

  // Lookup wishlisted products
  const wishlistedProducts = useMemo(() => {
    return products.filter((p) => ids.includes(p.id));
  }, [ids]);

  // Filtered by category
  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return wishlistedProducts;
    return wishlistedProducts.filter((p) => p.category === activeCategory);
  }, [wishlistedProducts, activeCategory]);

  // Trending recommendations when empty or below
  const recommendedProducts = useMemo(() => {
    return products.filter((p) => !ids.includes(p.id)).slice(0, 4);
  }, [ids]);

  const handleMoveAllToBag = async () => {
    if (filteredProducts.length === 0) return;
    setMovingAll(true);
    for (const product of filteredProducts) {
      const defaultSize = product.sizes[0] || "M";
      const defaultColor = product.colors[0]?.name || "Default";
      addItem(product, defaultSize, defaultColor);
    }
    await new Promise((r) => setTimeout(r, 600));
    setMovingAll(false);
  };

  const handleClearWishlist = () => {
    if (confirm("Are you sure you want to clear your wishlist?")) {
      ids.forEach((id) => toggle(id));
    }
  };

  return (
    <div style={{ paddingTop: 80, minHeight: "100vh", background: "var(--color-background)" }}>
      {/* Page Header */}
      <section
        style={{
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
          paddingBlock: "48px 36px",
        }}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  Personal Vault
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                Wishlist {count > 0 && <span className="text-[var(--color-muted)] font-normal">({count})</span>}
              </h1>
              <p className="text-sm text-[var(--color-muted)] mt-2 max-w-md">
                Your saved streetwear grails, archive pieces, and upcoming capsule wishlist.
              </p>
            </div>

            {count > 0 && (
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={handleMoveAllToBag}
                  disabled={movingAll}
                  className="btn btn-primary text-xs sm:text-sm font-bold flex items-center gap-2"
                >
                  <ShoppingBag size={16} />
                  {movingAll ? "Adding All..." : "Move All to Bag"}
                </button>
                <button
                  onClick={handleClearWishlist}
                  className="btn btn-outline text-xs sm:text-sm text-red-500 hover:text-red-600 border-red-500/30 hover:border-red-500/60 flex items-center gap-2"
                >
                  <Trash2 size={15} />
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-8 sm:py-12">
        {count === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center py-16 sm:py-24 border border-dashed border-[var(--color-border)] rounded-2xl bg-[var(--color-surface)]/50 p-6 sm:p-12 mb-16"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center text-[var(--color-sale,#ff3b5c)]">
              <Heart size={44} strokeWidth={1.4} />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[var(--color-accent)] mb-2 inline-block">
              Vault Empty
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Your wishlist is currently empty</h2>
            <p className="text-sm text-[var(--color-muted)] max-w-md mx-auto mb-8 leading-relaxed">
              Never lose sight of the pieces you love. Tap the heart icon on any product across our men&apos;s and women&apos;s collections to save them here.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/men" className="btn btn-primary flex items-center gap-2">
                Explore Men&apos;s Drops <ArrowRight size={16} />
              </Link>
              <Link href="/women" className="btn btn-outline flex items-center gap-2">
                Explore Women&apos;s Drops <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        ) : (
          /* Wishlisted Items */
          <div>
            {/* Category Filter Tabs */}
            <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
              <div className="flex items-center gap-2 bg-[var(--color-surface)] p-1 rounded-lg border border-[var(--color-border)]">
                {(
                  [
                    { id: "all", label: `All (${wishlistedProducts.length})` },
                    {
                      id: "men",
                      label: `Men (${wishlistedProducts.filter((p) => p.category === "men").length})`,
                    },
                    {
                      id: "women",
                      label: `Women (${wishlistedProducts.filter((p) => p.category === "women").length})`,
                    },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                      activeCategory === tab.id
                        ? "bg-[var(--color-primary)] text-white shadow-sm"
                        : "text-[var(--color-muted)] hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <span className="text-xs text-[var(--color-muted)] font-medium hidden sm:inline-block">
                Showing {filteredProducts.length} saved {filteredProducts.length === 1 ? "item" : "items"}
              </span>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              <AnimatePresence>
                {filteredProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Recommended Items Section */}
        {recommendedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-[var(--color-border)]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)] block mb-1">
                  Fresh Releases
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">You Might Also Crave</h2>
              </div>
              <Link
                href="/search?filter=new"
                className="text-xs sm:text-sm font-bold flex items-center gap-1.5 hover:text-[var(--color-accent)] transition-colors"
              >
                View All Drops <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {recommendedProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
