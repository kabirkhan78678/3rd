"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Compass, ShoppingBag, Package, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import MobileAccountSheet from "./MobileAccountSheet";

function getCleanFirstName(name?: string): string {
  if (!name) return "Member";
  const raw = name.split("@")[0].replace(/[._-]+/g, " ").trim();
  const words = raw.split(" ").filter(Boolean);
  if (words.length > 0) {
    const first = words[0];
    return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
  }
  return "Member";
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

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const { user, orders, openAuthModal } = useAuth();
  const [accountSheetOpen, setAccountSheetOpen] = useState(false);

  // If inside full-screen checkout, hide bottom nav to avoid checkout distractions
  if (pathname === "/checkout") return null;

  const handleAccountClick = () => {
    if (user) {
      setAccountSheetOpen(true);
    } else {
      openAuthModal("login");
    }
  };

  return (
    <>
      <nav
        aria-label="Mobile Navigation"
        className="block md:hidden fixed bottom-0 left-0 right-0 z-[80]"
        style={{
          background: "rgba(12, 12, 15, 0.94)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          paddingTop: 8,
          paddingBottom: "max(10px, env(safe-area-inset-bottom, 10px))",
          boxShadow: "0 -8px 30px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            alignItems: "center",
            maxWidth: 480,
            margin: "0 auto",
            paddingInline: 8,
          }}
        >
          {/* Tab 1: Home */}
          <Link
            href="/"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              textDecoration: "none",
              color: pathname === "/" ? "var(--color-accent)" : "rgba(255,255,255,0.6)",
              transition: "color 0.2s",
              padding: "4px 0",
            }}
          >
            <Home size={20} strokeWidth={pathname === "/" ? 2.4 : 1.8} />
            <span style={{ fontSize: 10, fontWeight: pathname === "/" ? 800 : 600, letterSpacing: "0.02em" }}>
              Home
            </span>
          </Link>

          {/* Tab 2: Shop */}
          <Link
            href="/search?filter=new"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              textDecoration: "none",
              color: (pathname === "/search" || pathname === "/men" || pathname === "/women")
                ? "var(--color-accent)"
                : "rgba(255,255,255,0.6)",
              transition: "color 0.2s",
              padding: "4px 0",
            }}
          >
            <Compass size={20} strokeWidth={pathname.startsWith("/men") || pathname.startsWith("/women") ? 2.4 : 1.8} />
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.02em" }}>
              Shop
            </span>
          </Link>

          {/* Tab 3: Bag / Cart */}
          <button
            onClick={openCart}
            style={{
              background: "none",
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              color: itemCount > 0 ? "var(--color-accent)" : "rgba(255,255,255,0.6)",
              cursor: "pointer",
              position: "relative",
              padding: "4px 0",
            }}
          >
            <div style={{ position: "relative" }}>
              <ShoppingBag size={20} strokeWidth={itemCount > 0 ? 2.2 : 1.8} />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -7,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    color: "#000000",
                    fontSize: 9,
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 8px rgba(181, 240, 0, 0.5)",
                  }}
                >
                  {itemCount}
                </motion.span>
              )}
            </div>
            <span style={{ fontSize: 10, fontWeight: itemCount > 0 ? 800 : 600, letterSpacing: "0.02em" }}>
              Bag
            </span>
          </button>

          {/* Tab 4: Orders */}
          <Link
            href="/orders"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              textDecoration: "none",
              color: (pathname === "/orders" || pathname === "/track-order")
                ? "var(--color-accent)"
                : "rgba(255,255,255,0.6)",
              transition: "color 0.2s",
              position: "relative",
              padding: "4px 0",
            }}
          >
            <div style={{ position: "relative" }}>
              <Package size={20} strokeWidth={pathname === "/orders" ? 2.4 : 1.8} />
              {orders && orders.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -3,
                    right: -7,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "#00ff88",
                    color: "#000000",
                    fontSize: 8,
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {orders.length}
                </span>
              )}
            </div>
            <span style={{ fontSize: 10, fontWeight: pathname === "/orders" ? 800 : 600, letterSpacing: "0.02em" }}>
              Orders
            </span>
          </Link>

          {/* Tab 5: Profile / Login */}
          <button
            onClick={handleAccountClick}
            style={{
              background: "none",
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              cursor: "pointer",
              padding: "4px 0",
              color: user ? "#ffffff" : "rgba(255,255,255,0.6)",
            }}
          >
            {user ? (
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    color: "#000",
                    fontSize: 10,
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 8px rgba(181,240,0,0.4)",
                  }}
                >
                  {getUserInitials(user.name)}
                </div>
                <span
                  style={{
                    position: "absolute",
                    bottom: -1,
                    right: -1,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#00ff88",
                    boxShadow: "0 0 4px #00ff88",
                  }}
                />
              </div>
            ) : (
              <User size={20} strokeWidth={1.8} />
            )}
            <span
              style={{
                fontSize: 10,
                fontWeight: user ? 800 : 600,
                letterSpacing: "0.02em",
                color: user ? "var(--color-accent)" : "rgba(255,255,255,0.7)",
                maxWidth: 55,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user ? getCleanFirstName(user.name) : "Login"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Account Bottom Sheet */}
      <MobileAccountSheet
        isOpen={accountSheetOpen}
        onClose={() => setAccountSheetOpen(false)}
      />
    </>
  );
}
