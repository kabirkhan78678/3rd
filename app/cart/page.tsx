"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { getBestSellers } from "@/data/products";

const FREE_SHIPPING_THRESHOLD = 150;

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart();
  const bestSellers = getBestSellers().slice(0, 4);

  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div style={{ paddingTop: 80 }}>
      <div className="container" style={{ paddingBlock: "40px 80px" }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: "clamp(28px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 40 }}
        >
          Your Cart {itemCount > 0 && <span style={{ color: "var(--color-muted)", fontWeight: 400 }}>({itemCount})</span>}
        </motion.h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: "center", paddingBlock: 80 }}
          >
            <ShoppingBag size={64} strokeWidth={1} style={{ color: "var(--color-muted-light)", margin: "0 auto 24px" }} />
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Your cart is empty</h2>
            <p style={{ color: "var(--color-muted)", marginBottom: 32 }}>Time to add something bold.</p>
            <Link href="/men" className="btn btn-primary btn-lg" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              Start Shopping <ArrowRight size={18} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-14 items-start">
            {/* Items */}
            <div>
              {/* Shipping bar */}
              <div style={{ background: "var(--color-surface)", padding: "20px 24px", marginBottom: 24, borderRadius: "var(--radius-sm)" }}>
                <p style={{ fontSize: 14, marginBottom: 10 }}>
                  {remaining > 0
                    ? <><strong>{formatPrice(remaining)} more</strong> for free shipping</>
                    : <strong style={{ color: "var(--color-success)" }}>🎉 You've unlocked free shipping!</strong>
                  }
                </p>
                <div className="progress-bar-track">
                  <motion.div
                    className="progress-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Desktop Header row */}
              <div
                className="hidden md:grid"
                style={{
                  gridTemplateColumns: "1fr auto auto",
                  gap: 16,
                  paddingBottom: 16,
                  borderBottom: "1px solid var(--color-border)",
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-muted)" }}>Product</span>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-muted)", minWidth: 100, textAlign: "center" }}>Quantity</span>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-muted)", minWidth: 80, textAlign: "right" }}>Total</span>
              </div>

              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.cartId}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="py-5 sm:py-6 border-b border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    {/* Product Info */}
                    <div className="flex gap-4 items-center flex-1 min-w-0">
                      <Link href={`/product/${item.product.slug}`} className="flex-shrink-0">
                        <div style={{ width: 80, height: 100, position: "relative", background: "var(--color-surface)", borderRadius: 4, overflow: "hidden" }}>
                          <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: "cover" }} sizes="80px" />
                        </div>
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link href={`/product/${item.product.slug}`} style={{ fontWeight: 600, fontSize: 15, color: "inherit", display: "block", marginBottom: 4 }} className="hover:text-[var(--color-accent)] transition-colors line-clamp-1">
                          {item.product.name}
                        </Link>
                        <p style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 6 }}>
                          Size: {item.size} · Color: {item.color}
                        </p>
                        <p style={{ fontWeight: 700, fontSize: 15 }}>
                          {formatPrice(item.product.salePrice ?? item.product.price)}
                        </p>
                        <button
                          onClick={() => removeItem(item.cartId)}
                          style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8, background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", fontSize: 12, fontWeight: 600 }}
                          className="hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Controls (Quantity + Line Total) */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--color-border)]/40">
                      {/* Quantity */}
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--color-border)", borderRadius: 4, width: "fit-content" }}>
                        <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} style={{ padding: "6px 10px", background: "none", border: "none", cursor: "pointer", display: "flex" }}>
                          <Minus size={14} />
                        </button>
                        <span style={{ padding: "6px 10px", fontWeight: 700, minWidth: 30, textAlign: "center", fontSize: 14 }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} style={{ padding: "6px 10px", background: "none", border: "none", cursor: "pointer", display: "flex" }}>
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Line total */}
                      <div style={{ textAlign: "right", fontWeight: 800, fontSize: 16, minWidth: 70 }}>
                        {formatPrice((item.product.salePrice ?? item.product.price) * item.quantity)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-28">
              <div className="border border-[var(--color-border)] p-6 sm:p-8 bg-[var(--color-surface)]/40 rounded-sm">
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Order Summary</h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--color-border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--color-muted)", fontSize: 14 }}>Subtotal ({itemCount} items)</span>
                    <span style={{ fontWeight: 600 }}>{formatPrice(subtotal)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--color-muted)", fontSize: 14 }}>Shipping</span>
                    <span style={{ fontWeight: 600, color: shipping === 0 ? "var(--color-success)" : undefined }}>
                      {shipping === 0 ? "FREE" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--color-muted)", fontSize: 14 }}>Tax</span>
                    <span style={{ color: "var(--color-muted)", fontSize: 14 }}>Calculated at checkout</span>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                  <span style={{ fontWeight: 700, fontSize: 18 }}>Estimated Total</span>
                  <span style={{ fontWeight: 800, fontSize: 22 }}>{formatPrice(total)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="btn btn-primary btn-full btn-lg"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}
                >
                  Proceed to Checkout <ArrowRight size={18} />
                </Link>
                <Link
                  href="/men"
                  className="btn btn-ghost btn-full"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "var(--color-muted)" }}
                >
                  Continue Shopping
                </Link>

                {/* Trust */}
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--color-border)", display: "flex", flexDirection: "column", gap: 8 }}>
                  {["🔒 Secure SSL Checkout", "🔁 Free 30-day returns", "✈️ Free shipping on $150+"].map(t => (
                    <p key={t} style={{ fontSize: 12, color: "var(--color-muted)" }}>{t}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended */}
        {bestSellers.length > 0 && (
          <section style={{ marginTop: 80 }}>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 40 }}>
              You Might Also Like
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
              {bestSellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
