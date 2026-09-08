"use client";
import React from "react";
import { Truck, ShieldCheck, RotateCcw, Zap } from "lucide-react";

const PILLARS = [
  {
    icon: Truck,
    title: "Complimentary Shipping",
    desc: "Free express dispatch worldwide on all orders over $150.",
  },
  {
    icon: ShieldCheck,
    title: "100% Authentic Drop",
    desc: "Certified original design and heavyweight custom fabrication.",
  },
  {
    icon: RotateCcw,
    title: "30-Day Hassle-Free Returns",
    desc: "Easy exchanges and direct returns with prepaid labels.",
  },
  {
    icon: Zap,
    title: "Priority VIP Concierge",
    desc: "24/7 styling assistance and drop early-access support.",
  },
];

export default function BrandPillarsSection() {
  return (
    <section
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        paddingBlock: 48,
      }}
    >
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "var(--radius-sm)",
                    background: "var(--color-accent)",
                    color: "#000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 4,
                  }}
                >
                  <Icon size={20} />
                </div>
                <h4 style={{ fontSize: 15, fontWeight: 800 }}>{pillar.title}</h4>
                <p style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.6 }}>
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
