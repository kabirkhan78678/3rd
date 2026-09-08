"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Truck,
  ArrowRight,
  Calendar,
  ShoppingBag,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/animations";

export default function OrdersPage() {
  const { user, orders, openAuthModal } = useAuth();
  const [filter, setFilter] = useState<"all" | "active" | "delivered">("all");

  const filteredOrders = orders.filter((o) => {
    if (filter === "active") return o.status !== "Delivered";
    if (filter === "delivered") return o.status === "Delivered";
    return true;
  });

  return (
    <div style={{ paddingTop: 100, paddingBottom: 100, background: "var(--color-background)", minHeight: "90vh" }}>
      <div className="container" style={{ maxWidth: 1050 }}>
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
            marginBottom: 40,
            borderBottom: "1px solid var(--color-border)",
            paddingBottom: 28,
          }}
        >
          <div>
            <span className="section-eyebrow">Client Dashboard</span>
            <h1 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1 }}>
              ORDER HISTORY
            </h1>
            <p style={{ color: "var(--color-muted)", marginTop: 8, fontSize: 14 }}>
              {user ? `Logged in as ${user.name} (${user.membership})` : "Viewing your recent device order history"}
            </p>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <Link href="/track-order" className="btn btn-outline" style={{ fontSize: 12, padding: "10px 18px" }}>
              <Truck size={14} /> Live Tracking
            </Link>
            {!user && (
              <button onClick={() => openAuthModal("login")} className="btn btn-primary" style={{ fontSize: 12, padding: "10px 18px" }}>
                Sign In to Sync
              </button>
            )}
          </div>
        </motion.div>

        {/* Status Filter Tabs (Horizontal scroll on mobile) */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: "all", label: `All Orders (${orders.length})` },
            { id: "active", label: `In Transit (${orders.filter((o) => o.status !== "Delivered").length})` },
            { id: "delivered", label: `Completed (${orders.filter((o) => o.status === "Delivered").length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              style={{
                padding: "8px 16px",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                background: filter === tab.id ? "var(--color-primary)" : "var(--color-surface)",
                color: filter === tab.id ? "#ffffff" : "var(--color-muted)",
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {filteredOrders.map((order, i) => (
              <motion.div
                key={order.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                transition={{ delay: i * 0.08 }}
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                }}
              >
                {/* Order Item Header */}
                <div
                  className="p-4 sm:p-5 bg-[var(--color-background)] border-b border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                    <div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "var(--color-muted)", textTransform: "uppercase", display: "block" }}>
                        Order Placed
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{order.date}</span>
                    </div>

                    <div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "var(--color-muted)", textTransform: "uppercase", display: "block" }}>
                        Total Amount
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 800 }}>${order.total.toFixed(2)}</span>
                    </div>

                    <div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "var(--color-muted)", textTransform: "uppercase", display: "block" }}>
                        Ship To
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>
                        {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, fontFamily: "var(--font-dm-mono, monospace)" }}>
                      #{order.id}
                    </span>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: 999,
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        background:
                          order.status === "Delivered"
                            ? "rgba(40, 167, 69, 0.12)"
                            : "var(--color-accent-subtle, rgba(0, 194, 203, 0.18))",
                        color: order.status === "Delivered" ? "#28a745" : "var(--color-text)",
                        border: `1px solid ${order.status === "Delivered" ? "#28a745" : "var(--color-accent)"}`,
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items Breakdown */}
                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          gap: 16,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                          <div style={{ position: "relative", width: 64, height: 80, borderRadius: 4, overflow: "hidden", background: "#111", flexShrink: 0 }}>
                            <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: "cover" }} sizes="64px" />
                          </div>
                          <div>
                            <Link href={`/product/${item.product.slug}`} style={{ fontSize: 15, fontWeight: 800, color: "var(--color-text)", textDecoration: "none" }}>
                              {item.product.name}
                            </Link>
                            <p style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 4 }}>
                              Size: <strong>{item.size}</strong> • Color: <strong>{item.color}</strong> • Qty: <strong>{item.quantity}</strong>
                            </p>
                            <p style={{ fontSize: 13, fontWeight: 700, marginTop: 4 }}>
                              ${(item.product.salePrice ?? item.product.price) * item.quantity}
                            </p>
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: 10 }}>
                          <Link href={`/product/${item.product.slug}`} className="btn btn-outline" style={{ fontSize: 11, padding: "8px 14px" }}>
                            Buy Again
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div
                  style={{
                    padding: "14px 24px",
                    background: "var(--color-background)",
                    borderTop: "1px solid var(--color-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--color-muted)" }}>
                    <Calendar size={14} />
                    <span>Estimated delivery: <strong>{order.estimatedDelivery}</strong></span>
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <Link
                      href={`/track-order?id=${order.id}`}
                      className="btn btn-accent"
                      style={{ fontSize: 11, padding: "8px 16px", display: "inline-flex", alignItems: "center", gap: 6 }}
                    >
                      <Truck size={14} /> Track Package
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <ShoppingBag size={48} style={{ color: "var(--color-muted)", margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>No Orders Found</h3>
            <p style={{ color: "var(--color-muted)", maxWidth: 420, margin: "0 auto 24px", fontSize: 14 }}>
              You don't have any orders under this filter yet. Check out the latest capsule drops and start your collection.
            </p>
            <Link href="/search" className="btn btn-primary btn-lg">
              Explore New Drops <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
