"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, Lock, CreditCard, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { fadeUp, staggerContainer } from "@/lib/animations";

const STEPS = ["Contact", "Shipping", "Payment"];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [ordered, setOrdered] = useState(false);
  const [form, setForm] = useState({
    email: "", firstName: "", lastName: "", address: "", city: "", zip: "", country: "US",
    delivery: "standard",
    cardNumber: "", cardName: "", cardExpiry: "", cardCvc: "",
  });

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) { setStep(s => s + 1); return; }
    await new Promise(r => setTimeout(r, 1500));
    setOrdered(true);
    clearCart();
  };

  const shipping = subtotal >= 150 ? 0 : form.delivery === "express" ? 19.99 : 9.99;
  const total = subtotal + shipping;

  if (ordered) {
    return (
      <div style={{ paddingTop: 80, minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: "center", maxWidth: 480, padding: 40 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px" }}
          >
            <Check size={40} />
          </motion.div>
          <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>Order Confirmed!</h1>
          <p style={{ color: "var(--color-muted)", lineHeight: 1.7, marginBottom: 32 }}>
            Your order is on its way. You'll receive a confirmation email shortly with your tracking details.
          </p>
          <p style={{ fontWeight: 700, marginBottom: 32, fontSize: 18 }}>Order #KLB-{Math.floor(Math.random() * 900000 + 100000)}</p>
          <Link href="/" className="btn btn-primary btn-lg" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            Back to Store
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 80 }}>
      <div className="container" style={{ paddingBlock: "40px 80px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span className="font-display" style={{ fontSize: 28, letterSpacing: "0.15em" }}>KLUB</span>
          </Link>
        </div>

        {/* Step indicator */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 48 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: i <= step ? "var(--color-primary)" : "var(--color-border)",
                color: i <= step ? "white" : "var(--color-muted)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, transition: "all 0.3s",
              }}>
                {i < step ? <Check size={16} /> : i + 1}
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: i === step ? "var(--color-text)" : "var(--color-muted)" }}>{s}</span>
              {i < STEPS.length - 1 && <ChevronRight size={16} style={{ color: "var(--color-muted-light)" }} />}
            </div>
          ))}
        </div>

        {/* Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 60, alignItems: "start" }}>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="contact" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="checkout-section">
                  <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
                    <Truck size={20} /> Contact Information
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <input className="form-input" type="email" placeholder="Email address" required value={form.email} onChange={e => update("email", e.target.value)} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <input className="form-input" type="text" placeholder="First name" required value={form.firstName} onChange={e => update("firstName", e.target.value)} />
                      <input className="form-input" type="text" placeholder="Last name" required value={form.lastName} onChange={e => update("lastName", e.target.value)} />
                    </div>
                    <input className="form-input" type="text" placeholder="Address" required value={form.address} onChange={e => update("address", e.target.value)} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <input className="form-input" type="text" placeholder="City" required value={form.city} onChange={e => update("city", e.target.value)} />
                      <input className="form-input" type="text" placeholder="ZIP Code" required value={form.zip} onChange={e => update("zip", e.target.value)} />
                    </div>
                    <select className="form-input" value={form.country} onChange={e => update("country", e.target.value)}>
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="checkout-section">
                  <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
                    <Truck size={20} /> Delivery Method
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { value: "standard", label: "Standard Shipping", desc: "5-7 business days", price: subtotal >= 150 ? "FREE" : "$9.99" },
                      { value: "express", label: "Express Shipping", desc: "2-3 business days", price: "$19.99" },
                    ].map(({ value, label, desc, price }) => (
                      <label key={value} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: 20, border: `2px solid ${form.delivery === value ? "var(--color-primary)" : "var(--color-border)"}`,
                        cursor: "pointer", transition: "border-color 0.2s",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <input type="radio" name="delivery" value={value} checked={form.delivery === value} onChange={e => update("delivery", e.target.value)} />
                          <div>
                            <p style={{ fontWeight: 600, fontSize: 15 }}>{label}</p>
                            <p style={{ fontSize: 13, color: "var(--color-muted)" }}>{desc}</p>
                          </div>
                        </div>
                        <span style={{ fontWeight: 700, color: price === "FREE" ? "var(--color-success)" : undefined }}>{price}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="checkout-section">
                  <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
                    <CreditCard size={20} /> Payment
                  </h2>
                  <p style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 24, display: "flex", alignItems: "center", gap: 6 }}>
                    <Lock size={12} /> All transactions are encrypted and secure
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <input className="form-input" type="text" placeholder="Card number" value={form.cardNumber} onChange={e => update("cardNumber", e.target.value)} maxLength={19} />
                    <input className="form-input" type="text" placeholder="Name on card" value={form.cardName} onChange={e => update("cardName", e.target.value)} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <input className="form-input" type="text" placeholder="MM / YY" value={form.cardExpiry} onChange={e => update("cardExpiry", e.target.value)} maxLength={7} />
                      <input className="form-input" type="text" placeholder="CVC" value={form.cardCvc} onChange={e => update("cardCvc", e.target.value)} maxLength={4} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              {step > 0 && (
                <button type="button" onClick={() => setStep(s => s - 1)} className="btn btn-outline" style={{ flex: 0 }}>
                  Back
                </button>
              )}
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-primary btn-lg" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {step < 2 ? "Continue" : `Place Order · ${formatPrice(total)}`}
              </motion.button>
            </div>
          </form>

          {/* Order summary sidebar */}
          <div style={{ position: "sticky", top: 100 }}>
            <div style={{ border: "1px solid var(--color-border)", padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Order Summary</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid var(--color-border)" }}>
                {items.map(item => (
                  <div key={item.cartId} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ position: "relative", width: 56, height: 70, flexShrink: 0, background: "var(--color-surface)" }}>
                      <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: "cover" }} sizes="56px" />
                      <span style={{ position: "absolute", top: -6, right: -6, background: "var(--color-primary)", color: "white", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>
                        {item.quantity}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{item.product.name}</p>
                      <p style={{ fontSize: 12, color: "var(--color-muted)" }}>{item.size} · {item.color}</p>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{formatPrice((item.product.salePrice ?? item.product.price) * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                  <span style={{ color: "var(--color-muted)" }}>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                  <span style={{ color: "var(--color-muted)" }}>Shipping</span>
                  <span style={{ color: shipping === 0 ? "var(--color-success)" : undefined }}>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 18, paddingTop: 12, borderTop: "1px solid var(--color-border)", marginTop: 4 }}>
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
