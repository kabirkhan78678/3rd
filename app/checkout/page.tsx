"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  CreditCard,
  Truck,
  QrCode,
  Smartphone,
  Banknote,
  Tag,
  Zap,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth, OrderRecord } from "@/context/AuthContext";

const STEPS = ["Contact", "Shipping", "Payment"];

const VALID_COUPONS: Record<string, { percent?: number; amount?: number; freeShipping?: boolean; label: string }> = {
  KLUB10: { percent: 10, label: "10% Off Entire Order" },
  WELCOME20: { percent: 20, label: "20% Off New Member Special" },
  DROP50: { amount: 50, label: "$50 Flat Capsule Drop Discount" },
  FREESHIP: { freeShipping: true, label: "100% Free Express Shipping" },
};

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { addOrder, user } = useAuth();

  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<OrderRecord | null>(null);

  // Form Fields
  const [form, setForm] = useState({
    email: user?.email || "kabir@klubwear.com",
    firstName: user ? user.name.split(" ")[0] : "Kabir",
    lastName: user ? user.name.split(" ").slice(1).join(" ") : "Khan",
    phone: "+1 (555) 234-5678",
    address: "420 Fashion Avenue, Loft 4B",
    city: "New York",
    zip: "10001",
    country: "US",
    delivery: "standard",
    paymentMethod: "card" as "card" | "upi" | "wallet" | "cod",
    cardNumber: "4242 •••• •••• 4242",
    cardName: user?.name || "Kabir Khan",
    cardExpiry: "12/28",
    cardCvc: "888",
    upiId: "kabirkhan@okaxis",
  });

  // Coupon / Discount State
  const [couponCode, setCouponCode] = useState("KLUB10");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; label: string; discountAmount: number } | null>({
    code: "KLUB10",
    label: "10% Off Entire Order",
    discountAmount: Math.round(subtotal * 0.1),
  });
  const [couponError, setCouponError] = useState("");

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const clean = couponCode.trim().toUpperCase();
    if (VALID_COUPONS[clean]) {
      const c = VALID_COUPONS[clean];
      let discountAmount = 0;
      if (c.percent) discountAmount = Math.round((subtotal * c.percent) / 100);
      if (c.amount) discountAmount = Math.min(c.amount, subtotal);

      setAppliedCoupon({
        code: clean,
        label: c.label,
        discountAmount,
      });
    } else {
      setCouponError("Invalid promo code. Try KLUB10 or WELCOME20.");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  // Calculations
  const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const isFreeShipping = (appliedCoupon && appliedCoupon.code === "FREESHIP") || subtotal >= 150;
  const shipping = isFreeShipping ? 0 : form.delivery === "express" ? 19.99 : 9.99;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1600));

    const generatedId = `KLB-${Math.floor(Math.random() * 900000 + 100000)}`;
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    const estDelivery = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    const paymentLabel =
      form.paymentMethod === "card"
        ? `Credit Card (•••• ${form.cardNumber.slice(-4)})`
        : form.paymentMethod === "upi"
        ? `UPI Instant (${form.upiId})`
        : form.paymentMethod === "wallet"
        ? "Apple Pay / Google Wallet"
        : "Cash on Delivery";

    const newOrder: OrderRecord = {
      id: generatedId,
      date: dateStr,
      estimatedDelivery: estDelivery,
      status: "Processing",
      trackingNumber: `DHL-${generatedId.replace("KLB-", "")}-EXP`,
      carrier: "DHL Express Air",
      items: items.length > 0 ? items : [],
      subtotal,
      discount,
      discountCode: appliedCoupon?.code,
      shipping,
      total,
      shippingAddress: {
        firstName: form.firstName,
        lastName: form.lastName,
        address: form.address,
        city: form.city,
        zip: form.zip,
        country: form.country,
      },
      paymentMethod: paymentLabel,
    };

    addOrder(newOrder);
    setPlacedOrder(newOrder);
    setProcessing(false);
    clearCart();
  };

  // SUCCESS / CONFIRMED SCREEN
  if (placedOrder) {
    return (
      <div style={{ paddingTop: 100, minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-background)", paddingInline: 20 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            textAlign: "center",
            maxWidth: 580,
            width: "100%",
            padding: "48px 36px",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-sm)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260 }}
            style={{
              width: 76,
              height: 76,
              borderRadius: "50%",
              background: "var(--color-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              boxShadow: "0 0 30px rgba(181, 240, 0, 0.4)",
            }}
          >
            <Check size={40} color="#000000" strokeWidth={3} />
          </motion.div>

          <span className="section-eyebrow">Payment Successful</span>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Order Confirmed!
          </h1>
          <p style={{ color: "var(--color-muted)", lineHeight: 1.6, marginBottom: 24, fontSize: 15 }}>
            Thank you, <strong>{placedOrder.shippingAddress.firstName}</strong>. Your payment was verified and your order is currently being hand-packed at our atelier.
          </p>

          {/* Order Details Card */}
          <div
            style={{
              background: "var(--color-background)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              padding: "18px 24px",
              textAlign: "left",
              marginBottom: 32,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "var(--color-muted)" }}>Order Reference:</span>
              <strong style={{ fontFamily: "var(--font-dm-mono, monospace)" }}>#{placedOrder.id}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "var(--color-muted)" }}>Tracking ID:</span>
              <strong style={{ fontFamily: "var(--font-dm-mono, monospace)", color: "var(--color-accent-2, #7ab300)" }}>{placedOrder.trackingNumber}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "var(--color-muted)" }}>Estimated Delivery:</span>
              <strong>{placedOrder.estimatedDelivery}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: "var(--color-muted)" }}>Total Paid:</span>
              <strong style={{ fontSize: 16 }}>${placedOrder.total.toFixed(2)}</strong>
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href={`/track-order?id=${placedOrder.id}`}
              className="btn btn-accent btn-lg"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <Truck size={16} /> Track Package Live →
            </Link>
            <Link
              href="/orders"
              className="btn btn-outline btn-lg"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              View Order History
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 80, background: "var(--color-background)", minHeight: "100vh" }}>
      <div className="container" style={{ paddingBlock: "36px 80px", maxWidth: 1100 }}>
        {/* Step indicator */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 40 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: i <= step ? "var(--color-primary)" : "var(--color-surface)",
                  border: `2px solid ${i <= step ? "var(--color-primary)" : "var(--color-border)"}`,
                  color: i <= step ? "white" : "var(--color-muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 800,
                  transition: "all 0.3s",
                }}
              >
                {i < step ? <Check size={16} /> : i + 1}
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: i === step ? "var(--color-text)" : "var(--color-muted)" }}>
                {s}
              </span>
              {i < STEPS.length - 1 && <ChevronRight size={16} style={{ color: "var(--color-border)" }} />}
            </div>
          ))}
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">
          {/* Checkout Steps Form */}
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {/* STEP 1: CONTACT */}
              {step === 0 && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-5 sm:p-8"
                >
                  <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                    1. Contact & Shipping Information
                  </h2>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>First Name</label>
                      <input type="text" required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="form-input" />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>Last Name</label>
                      <input type="text" required value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="form-input" />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>Email</label>
                      <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className="form-input" />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>Phone (for SMS updates)</label>
                      <input type="tel" required value={form.phone} onChange={(e) => update("phone", e.target.value)} className="form-input" />
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>Street Address</label>
                    <input type="text" required value={form.address} onChange={(e) => update("address", e.target.value)} className="form-input" />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 28 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>City</label>
                      <input type="text" required value={form.city} onChange={(e) => update("city", e.target.value)} className="form-input" />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>Postal / ZIP Code</label>
                      <input type="text" required value={form.zip} onChange={(e) => update("zip", e.target.value)} className="form-input" />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%" }}>
                    Continue to Delivery Method →
                  </button>
                </motion.div>
              )}

              {/* STEP 2: SHIPPING */}
              {step === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-5 sm:p-8"
                >
                  <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                    2. Select Shipping Speed
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                    {[
                      {
                        id: "standard",
                        title: "Standard Global Shipping",
                        desc: "Delivered in 4-6 business days with tracking",
                        price: isFreeShipping ? "FREE" : "$9.99",
                        icon: Truck,
                      },
                      {
                        id: "express",
                        title: "DHL Express Priority Air",
                        desc: "Delivered in 2-3 business days worldwide",
                        price: "$19.99",
                        icon: Zap,
                      },
                    ].map((m) => (
                      <label
                        key={m.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "16px",
                          border: `2px solid ${form.delivery === m.id ? "var(--color-primary)" : "var(--color-border)"}`,
                          borderRadius: "var(--radius-sm)",
                          background: form.delivery === m.id ? "var(--color-background)" : "transparent",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <input
                            type="radio"
                            name="delivery"
                            value={m.id}
                            checked={form.delivery === m.id}
                            onChange={(e) => update("delivery", e.target.value)}
                          />
                          <div>
                            <span style={{ fontWeight: 700, fontSize: 14, display: "block" }}>{m.title}</span>
                            <span style={{ fontSize: 12, color: "var(--color-muted)" }}>{m.desc}</span>
                          </div>
                        </div>
                        <span style={{ fontWeight: 800, fontSize: 14, color: m.price === "FREE" ? "var(--color-accent-2, #7ab300)" : "var(--color-text)" }}>
                          {m.price}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 12 }}>
                    <button type="button" onClick={() => setStep(0)} className="btn btn-outline" style={{ flex: 1 }}>
                      ← Back
                    </button>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ flex: 2 }}>
                      Continue to Payment →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: PAYMENT GATEWAY */}
              {step === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-5 sm:p-8"
                >
                  <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                    3. Secure Payment Gateway
                  </h2>

                  {/* Payment Method Selector Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 mb-6">
                    {[
                      { id: "card", label: "Card", icon: CreditCard },
                      { id: "upi", label: "UPI / QR", icon: QrCode },
                      { id: "wallet", label: "Wallet", icon: Smartphone },
                      { id: "cod", label: "COD", icon: Banknote },
                    ].map((m) => {
                      const Icon = m.icon;
                      const active = form.paymentMethod === m.id;
                      return (
                        <button
                          type="button"
                          key={m.id}
                          onClick={() => update("paymentMethod", m.id)}
                          style={{
                            padding: "12px 8px",
                            borderRadius: "var(--radius-sm)",
                            border: `2px solid ${active ? "var(--color-primary)" : "var(--color-border)"}`,
                            background: active ? "var(--color-primary)" : "var(--color-background)",
                            color: active ? "#ffffff" : "var(--color-text)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 6,
                            cursor: "pointer",
                            fontSize: 11,
                            fontWeight: 800,
                            letterSpacing: "0.05em",
                            transition: "all 0.2s",
                          }}
                        >
                          <Icon size={18} />
                          {m.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Card Payment Form */}
                  {form.paymentMethod === "card" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>Card Number</label>
                        <input type="text" required value={form.cardNumber} onChange={(e) => update("cardNumber", e.target.value)} className="form-input" />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>Name on Card</label>
                        <input type="text" required value={form.cardName} onChange={(e) => update("cardName", e.target.value)} className="form-input" />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>Expiry (MM/YY)</label>
                          <input type="text" required value={form.cardExpiry} onChange={(e) => update("cardExpiry", e.target.value)} className="form-input" />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>CVV / CVC</label>
                          <input type="password" required maxLength={4} value={form.cardCvc} onChange={(e) => update("cardCvc", e.target.value)} className="form-input" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* UPI / QR Payment Simulator */}
                  {form.paymentMethod === "upi" && (
                    <div style={{ textAlign: "center", padding: "20px", background: "var(--color-background)", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", marginBottom: 24 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Scan QR with Google Pay, PhonePe, or Paytm</p>
                      {/* Generated SVG QR Code representation */}
                      <div style={{ width: 140, height: 140, margin: "0 auto 12px", background: "#ffffff", padding: 10, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--color-border)" }}>
                        <QrCode size={110} color="#000000" />
                      </div>
                      <p style={{ fontSize: 11, color: "var(--color-muted)", marginBottom: 12 }}>Or pay directly using UPI VPA:</p>
                      <input
                        type="text"
                        value={form.upiId}
                        onChange={(e) => update("upiId", e.target.value)}
                        placeholder="yourname@upi"
                        className="form-input"
                        style={{ maxWidth: 280, margin: "0 auto", textAlign: "center" }}
                      />
                    </div>
                  )}

                  {/* Digital Wallet */}
                  {form.paymentMethod === "wallet" && (
                    <div style={{ padding: 20, background: "var(--color-background)", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", marginBottom: 24 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, textAlign: "center" }}>Select One-Touch Wallet</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {["Apple Pay", "Google Pay", "PayPal Express"].map((w) => (
                          <button key={w} type="button" className="btn btn-outline" style={{ width: "100%", justifyContent: "center" }}>
                            Pay with {w}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cash on Delivery */}
                  {form.paymentMethod === "cod" && (
                    <div style={{ padding: 20, background: "var(--color-background)", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", marginBottom: 24 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>💵 Cash on Delivery Selected</p>
                      <p style={{ fontSize: 12, color: "var(--color-muted)", lineHeight: 1.6 }}>
                        Pay cash or UPI to the delivery courier upon arrival. An SMS confirmation will be sent to your phone number ({form.phone}).
                      </p>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 12 }}>
                    <button type="button" onClick={() => setStep(1)} className="btn btn-outline" style={{ flex: 1 }}>
                      ← Back
                    </button>
                    <button type="submit" disabled={processing} className="btn btn-accent btn-lg" style={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      {processing ? "Processing Order..." : `Pay $${total.toFixed(2)} & Place Order →`}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Order Summary & Coupon Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Promo Code Box */}
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", padding: 20 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                <Tag size={14} color="var(--color-accent)" /> Apply Promo / Offer
              </span>

              {appliedCoupon ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(181, 240, 0, 0.12)", border: "1px solid var(--color-accent)", padding: "10px 14px", borderRadius: "var(--radius-sm)" }}>
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 800, color: "var(--color-text)", display: "block" }}>
                      Coupon: {appliedCoupon.code}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--color-muted)" }}>{appliedCoupon.label}</span>
                  </div>
                  <button onClick={removeCoupon} style={{ background: "none", border: "none", color: "#ff3b30", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={applyCoupon} style={{ display: "flex", gap: 8 }}>
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="e.g. KLUB10"
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      background: "var(--color-background)",
                      border: "1.5px solid var(--color-border)",
                      borderRadius: "var(--radius-sm)",
                      fontSize: 13,
                      textTransform: "uppercase",
                      fontFamily: "var(--font-dm-mono, monospace)",
                    }}
                  />
                  <button type="submit" className="btn btn-primary" style={{ padding: "8px 16px", fontSize: 11 }}>
                    Apply
                  </button>
                </form>
              )}

              {couponError && <p style={{ fontSize: 11, color: "#ff3b30", marginTop: 6 }}>{couponError}</p>}
            </div>

            {/* Price Summary */}
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 18 }}>Order Summary ({items.length} items)</h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, borderBottom: "1px solid var(--color-border)", paddingBottom: 16, marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--color-muted)" }}>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--color-accent-2, #7ab300)" }}>
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--color-muted)" }}>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 900 }}>
                <span>Total Due</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
