"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Star, TrendingUp, Check } from "lucide-react";
import { slideInLeft, slideInRight, VIEWPORT_ONCE } from "@/lib/animations";

export default function VIPClubSection() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section className="section" style={{ background: "var(--color-surface)", paddingBlock: 64 }}>
      <div className="container">
        <div
          style={{
            background: "var(--color-accent)",
            position: "relative",
            overflow: "hidden",
            borderRadius: "var(--radius-sm)",
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center p-5 sm:p-10 lg:p-16"
        >
          {/* Background Text watermark */}
          <span
            className="font-display hidden sm:block"
            style={{
              position: "absolute",
              right: -20,
              bottom: -40,
              fontSize: "clamp(100px, 18vw, 220px)",
              lineHeight: 1,
              color: "rgba(0,0,0,0.06)",
              pointerEvents: "none",
              userSelect: "none",
              letterSpacing: "-0.05em",
            }}
          >
            KLUB
          </span>

          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            style={{ position: "relative" }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.6)",
                marginBottom: 8,
              }}
            >
              VIP Membership
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 text-black leading-tight"
            >
              First access.<br />No compromises.
            </h2>
            <p style={{ fontSize: 14, color: "rgba(0,0,0,0.75)", lineHeight: 1.6, maxWidth: 440 }}>
              Join the private list. Get password-protected access to limited capsule drops 1 hour
              before public launch, plus 15% off your first order.
            </p>

            <div className="flex gap-4 sm:gap-5 mt-5 flex-wrap">
              {[
                { icon: Zap, label: "Secret Drop Pass" },
                { icon: Star, label: "15% Off Code" },
                { icon: TrendingUp, label: "VIP Restock Alerts" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "rgba(0,0,0,0.75)",
                  }}
                >
                  <Icon size={14} />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            style={{ position: "relative" }}
          >
            {subscribed ? (
              <div
                style={{
                  background: "#000000",
                  color: "#ffffff",
                  padding: "32px 24px",
                  textAlign: "center",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 14px",
                  }}
                >
                  <Check size={22} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
                  YOU'RE ON THE LIST.
                </h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                  Use code <strong style={{ color: "var(--color-accent)" }}>WELCOME20</strong> for instant 20% off! Secret drop credentials have been sent to your inbox.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="form-input"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    border: "1.5px solid rgba(0,0,0,0.15)",
                    borderRadius: "var(--radius-sm)",
                    color: "#000",
                    fontSize: 14,
                    padding: "14px 16px",
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    width: "100%",
                  }}
                >
                  Join The Inner Circle →
                </button>
                <p style={{ fontSize: 11, color: "rgba(0,0,0,0.55)", textAlign: "center" }}>
                  Zero spam. Exclusive drops only. Unsubscribe at any time.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
