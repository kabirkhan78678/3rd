"use client";
import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Package, ShieldCheck, Heart, LogOut, Sparkles, ChevronRight, Crown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";

interface MobileAccountSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

function getUserInitials(name?: string): string {
  if (!name) return "U";
  const raw = name.split("@")[0].replace(/[._-]+/g, " ").trim();
  const words = raw.split(" ").filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return (words[0]?.[0] || "U").toUpperCase();
}

export default function MobileAccountSheet({ isOpen, onClose }: MobileAccountSheetProps) {
  const { user, orders, logout } = useAuth();
  const { count: wishlistCount } = useWishlist();

  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300 }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(6px)",
            }}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              maxHeight: "88vh",
              background: "#111114",
              borderTop: "1px solid rgba(255,255,255,0.15)",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: "20px 20px 32px",
              color: "#ffffff",
              overflowY: "auto",
              boxShadow: "0 -20px 60px rgba(0,0,0,0.8)",
            }}
          >
            {/* Grab Handle */}
            <div
              style={{
                width: 40,
                height: 4,
                borderRadius: 999,
                background: "rgba(255,255,255,0.25)",
                margin: "0 auto 16px",
              }}
            />

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Crown size={16} color="var(--color-accent)" />
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-accent)" }}>
                  Member Dashboard
                </span>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "none",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Profile Hero Card */}
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 14,
                padding: "16px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "var(--color-accent)",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 900,
                  flexShrink: 0,
                  boxShadow: "0 0 20px var(--color-accent-glow, rgba(0, 194, 203, 0.4))",
                }}
              >
                {getUserInitials(user.name)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {user.name}
                  </h3>
                </div>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {user.email}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 900,
                      textTransform: "uppercase",
                      padding: "2px 8px",
                      background: "var(--color-accent-subtle, rgba(0, 194, 203, 0.15))",
                      border: "1px solid var(--color-accent)",
                      color: "var(--color-accent)",
                      borderRadius: 4,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {user.membership || "VIP Gold"}
                  </span>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>✦ 500 Klub Points</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              <Link
                href="/orders"
                onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10,
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textDecoration: "none",
                  color: "#fff",
                }}
              >
                <div>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>My Orders</p>
                  <p style={{ fontSize: 18, fontWeight: 800, marginTop: 2 }}>{orders?.length || 0}</p>
                </div>
                <Package size={20} color="var(--color-accent)" />
              </Link>

              <Link
                href="/wishlist"
                onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10,
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textDecoration: "none",
                  color: "#fff",
                }}
              >
                <div>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Saved Items</p>
                  <p style={{ fontSize: 18, fontWeight: 800, marginTop: 2 }}>{wishlistCount}</p>
                </div>
                <Heart size={20} color="var(--color-sale, #ff3b5c)" />
              </Link>
            </div>

            {/* Navigation Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
              <Link
                href="/wishlist"
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 10,
                  textDecoration: "none",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Heart size={18} color="var(--color-sale, #ff3b5c)" />
                  <span>Wishlist & Saved Grails</span>
                </div>
                {wishlistCount > 0 && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      background: "var(--color-sale, #ff3b5c)",
                      color: "#fff",
                      padding: "2px 8px",
                      borderRadius: 999,
                    }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/orders"
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 10,
                  textDecoration: "none",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Package size={18} color="var(--color-accent)" />
                  <span>Order History & Invoices</span>
                </div>
                <ChevronRight size={16} style={{ opacity: 0.5 }} />
              </Link>

              <Link
                href="/track-order"
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 10,
                  textDecoration: "none",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <ShieldCheck size={18} color="var(--color-accent)" />
                  <span>Live Package Tracking</span>
                </div>
                <ChevronRight size={16} style={{ opacity: 0.5 }} />
              </Link>

              <Link
                href="/search?filter=new"
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 10,
                  textDecoration: "none",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Sparkles size={18} color="var(--color-accent)" />
                  <span>VIP Secret Drops Access</span>
                </div>
                <ChevronRight size={16} style={{ opacity: 0.5 }} />
              </Link>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 10,
                background: "rgba(255, 68, 68, 0.12)",
                border: "1px solid rgba(255, 68, 68, 0.25)",
                color: "#ff5555",
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: "0.05em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <LogOut size={16} />
              <span>SIGN OUT OF KLUB</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
