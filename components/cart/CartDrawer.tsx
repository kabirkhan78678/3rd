"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { drawerRight, overlayFade } from "@/lib/animations";
import { useState } from "react";

const FREE_SHIPPING_THRESHOLD = 150;

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, subtotal, itemCount } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  const handleCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.toLowerCase() === "klub10") {
      setCouponApplied(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="drawer-overlay"
            onClick={closeCart}
            style={{ zIndex: "var(--z-drawer)" } as React.CSSProperties}
          />

          {/* Drawer */}
          <motion.aside
            variants={drawerRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="drawer"
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "24px 24px 20px",
                borderBottom: "1px solid var(--color-border)",
                position: "sticky",
                top: 0,
                background: "var(--color-background)",
                zIndex: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <ShoppingBag size={20} strokeWidth={1.8} />
                <span style={{ fontWeight: 700, fontSize: 17 }}>
                  Your Cart
                </span>
                {itemCount > 0 && (
                  <span
                    style={{
                      background: "var(--color-accent)",
                      borderRadius: "var(--radius-full)",
                      padding: "2px 8px",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {itemCount}
                  </span>
                )}
              </div>
              <motion.button
                onClick={closeCart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text)", padding: 4 }}
                aria-label="Close cart"
              >
                <X size={22} />
              </motion.button>
            </div>

            {/* Free shipping bar */}
            {subtotal > 0 && (
              <div style={{ padding: "16px 24px", background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
                <p style={{ fontSize: 13, marginBottom: 8, color: "var(--color-muted)" }}>
                  {remaining > 0
                    ? <><strong style={{ color: "var(--color-text)" }}>{formatPrice(remaining)} away</strong> from free shipping</>
                    : <strong style={{ color: "var(--color-success)" }}>🎉 You've unlocked free shipping!</strong>
                  }
                </p>
                <div className="progress-bar-track">
                  <motion.div
                    className="progress-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "0 24px" }}>
              {items.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, paddingTop: 80, textAlign: "center" }}>
                  <ShoppingBag size={48} strokeWidth={1} style={{ color: "var(--color-muted-light)" }} />
                  <p style={{ fontWeight: 600, fontSize: 18 }}>Your cart is empty</p>
                  <p style={{ color: "var(--color-muted)", fontSize: 14 }}>Add something bold.</p>
                  <Link
                    href="/men"
                    onClick={closeCart}
                    className="btn btn-primary"
                    style={{ marginTop: 8 }}
                  >
                    Shop Men
                  </Link>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.cartId}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        display: "flex",
                        gap: 16,
                        paddingBlock: 20,
                        borderBottom: "1px solid var(--color-border)",
                      }}
                    >
                      {/* Image */}
                      <Link href={`/product/${item.product.slug}`} onClick={closeCart}>
                        <div style={{ width: 80, height: 100, flexShrink: 0, position: "relative", background: "var(--color-surface)" }}>
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="80px"
                          />
                        </div>
                      </Link>

                      {/* Details */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                          <Link
                            href={`/product/${item.product.slug}`}
                            onClick={closeCart}
                            style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}
                          >
                            {item.product.name}
                          </Link>
                          <motion.button
                            onClick={() => removeItem(item.cartId)}
                            whileHover={{ scale: 1.1, color: "var(--color-sale)" }}
                            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", padding: 2, flexShrink: 0 }}
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </motion.button>
                        </div>

                        <p style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 4 }}>
                          {item.size} · {item.color}
                        </p>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
                          {/* Quantity */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              border: "1px solid var(--color-border)",
                            }}
                          >
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                              style={{ background: "none", border: "none", padding: "4px 8px", cursor: "pointer", color: "var(--color-text)", display: "flex" }}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span style={{ fontSize: 13, fontWeight: 600, minWidth: 24, textAlign: "center" }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                              style={{ background: "none", border: "none", padding: "4px 8px", cursor: "pointer", color: "var(--color-text)", display: "flex" }}
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          {/* Price */}
                          <span style={{ fontWeight: 700, fontSize: 15 }}>
                            {formatPrice((item.product.salePrice ?? item.product.price) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                style={{
                  padding: "20px 24px 32px",
                  borderTop: "1px solid var(--color-border)",
                  background: "var(--color-background)",
                }}
              >
                {/* Coupon */}
                <form onSubmit={handleCoupon} style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon code"
                    className="form-input"
                    style={{ flex: 1, padding: "10px 12px", fontSize: 13 }}
                  />
                  <button
                    type="submit"
                    className="btn btn-outline btn-sm"
                    style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <Tag size={14} />
                    Apply
                  </button>
                </form>
                {couponApplied && (
                  <p style={{ fontSize: 12, color: "var(--color-success)", marginTop: -12, marginBottom: 12, fontWeight: 600 }}>
                    ✓ KLUB10 applied — 10% off!
                  </p>
                )}

                {/* Subtotal */}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 14, color: "var(--color-muted)" }}>Subtotal</span>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>
                    {formatPrice(couponApplied ? subtotal * 0.9 : subtotal)}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 20 }}>
                  Taxes and shipping calculated at checkout
                </p>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn btn-primary btn-full btn-lg"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                >
                  Checkout <ArrowRight size={16} />
                </Link>
                <button
                  onClick={closeCart}
                  className="btn btn-ghost btn-full"
                  style={{ marginTop: 8, fontSize: 13, color: "var(--color-muted)" }}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
