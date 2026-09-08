"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  Copy,
  Check,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { useAuth, OrderRecord } from "@/context/AuthContext";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/animations";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id");
  const { orders, getOrderById } = useAuth();

  const [searchQuery, setSearchQuery] = useState(queryId || "KLB-984210");
  const [activeOrder, setActiveOrder] = useState<OrderRecord | null>(null);
  const [copied, setCopied] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const idToSearch = queryId || "KLB-984210";
    setSearchQuery(idToSearch);
    const found = getOrderById(idToSearch) || orders[0] || null;
    setActiveOrder(found);
    setSearched(true);
  }, [queryId, orders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    const found = getOrderById(searchQuery);
    setActiveOrder(found || null);
    setSearched(true);
  };

  const copyTracking = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stages = [
    { title: "Order Confirmed", date: "Sep 06, 10:24 AM", done: true },
    { title: "Packed at Atelier", date: "Sep 07, 02:15 PM", done: true },
    { title: "Shipped via DHL", date: "Sep 07, 08:30 PM", done: true },
    { title: "Out for Delivery", date: "Today, 09:15 AM", active: true },
    { title: "Delivered", date: "Est. Today by 6:00 PM", done: false },
  ];

  return (
    <div style={{ paddingTop: 100, paddingBottom: 100, background: "var(--color-background)", minHeight: "90vh" }}>
      <div className="container" style={{ maxWidth: 1000 }}>
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          <span className="section-eyebrow">Realtime Logistics</span>
          <h1 className="font-display" style={{ fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1 }}>
            TRACK YOUR SHIPMENT
          </h1>
          <p style={{ color: "var(--color-muted)", marginTop: 10, fontSize: 15 }}>
            Enter your KLUB Order ID (e.g. <code>KLB-984210</code>) or DHL tracking code.
          </p>

          {/* Search Box */}
          <form
            onSubmit={handleSearch}
            style={{
              maxWidth: 520,
              margin: "24px auto 0",
              display: "flex",
              gap: 8,
              background: "var(--color-surface)",
              padding: 6,
              borderRadius: "var(--radius-sm)",
              border: "1.5px solid var(--color-border)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", flex: 1, paddingLeft: 12 }}>
              <Search size={18} style={{ color: "var(--color-muted)", marginRight: 10 }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order # or Tracking Code..."
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--color-text)",
                  fontFamily: "inherit",
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: "10px 24px" }}>
              Track
            </button>
          </form>
        </motion.div>

        {/* Tracking Result */}
        {activeOrder ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              overflow: "hidden",
              boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
            }}
          >
            {/* Top Bar with Order Status */}
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-7 gap-4 border-b border-[var(--color-border)]"
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800 }}>Order #{activeOrder.id}</h3>
                  <span
                    style={{
                      background: "rgba(181, 240, 0, 0.15)",
                      color: "var(--color-accent)",
                      border: "1px solid var(--color-accent)",
                      borderRadius: 999,
                      padding: "2px 10px",
                      fontSize: 11,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--color-accent)",
                        animation: "pulse 1.5s infinite",
                      }}
                    />
                    {activeOrder.status}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "var(--color-muted)" }}>
                  Placed on {activeOrder.date} • Paid via {activeOrder.paymentMethod}
                </p>
              </div>

              {/* Carrier & Tracking Code */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "var(--color-surface)",
                  padding: "8px 14px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "var(--color-muted)", textTransform: "uppercase", display: "block" }}>
                    Carrier: {activeOrder.carrier}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 800, fontFamily: "var(--font-dm-mono, monospace)" }}>
                    {activeOrder.trackingNumber}
                  </span>
                </div>
                <button
                  onClick={() => copyTracking(activeOrder.trackingNumber)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 4,
                    color: "var(--color-muted)",
                  }}
                  title="Copy Tracking Number"
                >
                  {copied ? <Check size={16} color="#7ab300" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-8">
              {/* 5-Stage Visual Progress Timeline (Touch Scrollable on small screens) */}
              <div className="overflow-x-auto no-scrollbar pb-3 mb-10">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    position: "relative",
                    alignItems: "flex-start",
                    minWidth: 540,
                  }}
                >
                  {/* Connecting Line */}
                  <div
                    style={{
                      position: "absolute",
                      top: 18,
                      left: "10%",
                      right: "10%",
                      height: 3,
                      background: "var(--color-border)",
                      zIndex: 0,
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: "75%",
                        background: "var(--color-accent)",
                        transition: "width 0.6s ease",
                      }}
                    />
                  </div>

                  {stages.map((st, i) => (
                    <div
                      key={st.title}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      <div
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: "50%",
                          background: st.done
                            ? "var(--color-accent)"
                            : st.active
                            ? "var(--color-primary)"
                            : "var(--color-surface)",
                          border: st.active
                            ? "3px solid var(--color-accent)"
                            : "2px solid var(--color-border)",
                          color: st.done ? "#000" : st.active ? "#fff" : "var(--color-muted)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 10,
                          boxShadow: st.active ? "0 0 16px rgba(181,240,0,0.5)" : "none",
                        }}
                      >
                        {st.done ? (
                          <CheckCircle2 size={20} />
                        ) : st.active ? (
                          <Truck size={18} />
                        ) : (
                          <Clock size={18} />
                        )}
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: st.active ? "var(--color-text)" : "var(--color-muted)",
                          marginBottom: 4,
                        }}
                      >
                        {st.title}
                      </span>
                      <span style={{ fontSize: 10, color: "var(--color-muted)" }}>{st.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Info Split */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 32,
                  borderTop: "1px solid var(--color-border)",
                  paddingTop: 32,
                }}
              >
                {/* Shipping Details */}
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
                    <MapPin size={16} color="var(--color-accent)" /> Delivery Destination
                  </h4>
                  <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                    {activeOrder.shippingAddress.firstName} {activeOrder.shippingAddress.lastName}
                  </p>
                  <p style={{ color: "var(--color-muted)", fontSize: 13, lineHeight: 1.6 }}>
                    {activeOrder.shippingAddress.address}<br />
                    {activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.zip}<br />
                    {activeOrder.shippingAddress.country}
                  </p>
                </div>

                {/* Package Items */}
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
                    <Package size={16} color="var(--color-accent)" /> Package Contents ({activeOrder.items.length} items)
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {activeOrder.items.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          background: "var(--color-background)",
                          padding: 8,
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--color-border)",
                        }}
                      >
                        <div style={{ position: "relative", width: 44, height: 52, borderRadius: 2, overflow: "hidden", flexShrink: 0 }}>
                          <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: "cover" }} sizes="44px" />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {item.product.name}
                          </p>
                          <p style={{ fontSize: 11, color: "var(--color-muted)" }}>
                            Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                          </p>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 800 }}>
                          ${(item.product.salePrice ?? item.product.price) * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div
              style={{
                padding: "16px 32px",
                background: "var(--color-background)",
                borderTop: "1px solid var(--color-border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <Link href="/orders" style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text)", display: "inline-flex", alignItems: "center", gap: 6 }}>
                ← View All Past Orders
              </Link>
              <Link href="/contact" style={{ fontSize: 12, fontWeight: 700, color: "var(--color-muted)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                Need Help with this Shipment? <ExternalLink size={12} />
              </Link>
            </div>
          </motion.div>
        ) : (
          searched && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <AlertCircle size={40} style={{ color: "var(--color-muted)", margin: "0 auto 16px" }} />
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Order Not Found</h3>
              <p style={{ color: "var(--color-muted)", maxWidth: 400, margin: "0 auto 24px", fontSize: 14 }}>
                We couldn't locate any shipment matching "<strong>{searchQuery}</strong>". Please double check your order number or try checking your order history.
              </p>
              <Link href="/orders" className="btn btn-outline">
                Check Order History
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: 120, textAlign: "center" }}>Loading logistics tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
