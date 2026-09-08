"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Heart, Menu, X, User, Package, LogOut, ChevronDown, ShieldCheck, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";
import { useAuth } from "@/context/AuthContext";
import AnnouncementBar from "./AnnouncementBar";
import MobileAccountSheet from "./MobileAccountSheet";
import { mobileMenu, overlayFade, staggerContainer, fadeUp } from "@/lib/animations";

const NAV_LINKS = [
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Track Order", href: "/track-order" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

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

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { openSearch, toggleMobileMenu, mobileMenuOpen, closeMobileMenu } = useUI();
  const { user, orders, openAuthModal, logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    closeMobileMenu();
    setAccountMenuOpen(false);
  }, [pathname]); // eslint-disable-line

  // Close account dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isDarkHero = !scrolled && pathname === "/";
  const navTextColor = isDarkHero ? "#ffffff" : "var(--color-text)";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-[100]"
      >
        {/* Dynamic Announcement & Promo Offers Bar */}
        <AnimatePresence>
          {!scrolled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <AnnouncementBar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Navbar Bar */}
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[var(--color-border)]"
              : pathname === "/"
              ? "bg-gradient-to-b from-black/85 via-black/40 to-transparent border-b border-transparent"
              : "bg-white/95 backdrop-blur-md border-b border-[var(--color-border)]"
          }`}
          style={{
            height: scrolled ? 64 : 76,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            className="container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none" }}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <span
                  className="font-display"
                  style={{
                    fontSize: 32,
                    letterSpacing: "0.15em",
                    color: isDarkHero ? "#ffffff" : "var(--color-text)",
                    lineHeight: 1,
                    transition: "color 0.3s ease",
                  }}
                >
                  KLUB
                </span>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    display: "inline-block",
                    marginBottom: 2,
                  }}
                />
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <nav
              style={{ display: "flex", alignItems: "center", gap: 32 }}
              className="hidden md:flex"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${pathname === link.href ? "active" : ""}`}
                  style={{
                    color: isDarkHero
                      ? pathname === link.href
                        ? "var(--color-accent)"
                        : "rgba(255,255,255,0.85)"
                      : undefined,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={openSearch}
                aria-label="Search"
                style={{
                  background: "none",
                  border: "none",
                  padding: "8px",
                  cursor: "pointer",
                  color: navTextColor,
                  display: "flex",
                  alignItems: "center",
                  transition: "color 0.3s ease",
                }}
              >
                <Search size={20} strokeWidth={1.8} />
              </motion.button>

              {/* Account Dropdown or Login (desktop) */}
              <div ref={accountRef} style={{ position: "relative" }} className="hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    if (user) {
                      setAccountMenuOpen(!accountMenuOpen);
                    } else {
                      openAuthModal("login");
                    }
                  }}
                  aria-label="Account"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: user ? "4px 12px 4px 5px" : "6px 14px",
                    borderRadius: 999,
                    cursor: "pointer",
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                    background: user
                      ? isDarkHero
                        ? accountMenuOpen
                          ? "rgba(22, 22, 26, 0.95)"
                          : "rgba(20, 20, 24, 0.85)"
                        : accountMenuOpen
                        ? "rgba(10, 10, 10, 0.12)"
                        : "rgba(10, 10, 10, 0.06)"
                      : isDarkHero
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(10, 10, 10, 0.05)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: accountMenuOpen
                      ? "1px solid var(--color-accent)"
                      : isDarkHero
                      ? "1px solid rgba(255, 255, 255, 0.22)"
                      : "1px solid rgba(0, 0, 0, 0.12)",
                    boxShadow: isDarkHero
                      ? "0 4px 20px rgba(0, 0, 0, 0.45)"
                      : "0 2px 8px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  {user ? (
                    <>
                      {/* Avatar Circle */}
                      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: "var(--color-accent)",
                            color: "#000000",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11,
                            fontWeight: 900,
                            letterSpacing: "-0.02em",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          {getUserInitials(user.name)}
                        </div>
                        {/* Active online dot */}
                        <span
                          style={{
                            position: "absolute",
                            bottom: -1,
                            right: -1,
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            background: "#00ff88",
                            border: isDarkHero ? "1.5px solid #141418" : "1.5px solid #ffffff",
                            boxShadow: "0 0 6px #00ff88",
                          }}
                        />
                      </div>

                      {/* User Name & VIP Tag */}
                      <div style={{ display: "flex", alignItems: "center", gap: 6, lineHeight: 1 }}>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 800,
                            letterSpacing: "0.02em",
                            color: isDarkHero ? "#ffffff" : "var(--color-text)",
                            maxWidth: 115,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {getCleanFirstName(user.name)}
                        </span>
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 900,
                            background: "var(--color-accent)",
                            color: "#000000",
                            padding: "2px 5px",
                            borderRadius: 4,
                            letterSpacing: "0.06em",
                            lineHeight: 1,
                          }}
                        >
                          VIP
                        </span>
                      </div>

                      {/* Rotating Chevron */}
                      <motion.div
                        animate={{ rotate: accountMenuOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: isDarkHero ? "rgba(255,255,255,0.8)" : "rgba(10,10,10,0.6)",
                          marginLeft: 2,
                        }}
                      >
                        <ChevronDown size={13} strokeWidth={2.5} />
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <User size={15} strokeWidth={2} style={{ color: navTextColor }} />
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          letterSpacing: "0.06em",
                          color: navTextColor,
                          textTransform: "uppercase",
                        }}
                      >
                        Sign In
                      </span>
                    </>
                  )}
                </motion.button>

                {/* Account Menu Dropdown */}
                <AnimatePresence>
                  {accountMenuOpen && user && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "calc(100% + 10px)",
                        width: 270,
                        background: "#0f0f12",
                        border: "1px solid rgba(255, 255, 255, 0.14)",
                        borderRadius: 14,
                        padding: 16,
                        boxShadow: "0 24px 50px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.06)",
                        zIndex: 110,
                        color: "#ffffff",
                        backdropFilter: "blur(24px)",
                      }}
                    >
                      {/* User Header */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                          paddingBottom: 14,
                          marginBottom: 12,
                        }}
                      >
                        <div
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: "50%",
                            background: "var(--color-accent)",
                            color: "#000000",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 14,
                            fontWeight: 900,
                            flexShrink: 0,
                            boxShadow: "0 0 16px rgba(181, 240, 0, 0.35)",
                          }}
                        >
                          {getUserInitials(user.name)}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
                            <span style={{ fontSize: 14, fontWeight: 800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {user.name}
                            </span>
                          </div>
                          <p style={{ fontSize: 11, color: "rgba(255, 255, 255, 0.5)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {user.email}
                          </p>
                          <span
                            style={{
                              display: "inline-block",
                              marginTop: 5,
                              fontSize: 9,
                              fontWeight: 900,
                              textTransform: "uppercase",
                              padding: "2px 7px",
                              background: "rgba(255, 255, 255, 0.1)",
                              color: "var(--color-accent)",
                              borderRadius: 4,
                              letterSpacing: "0.06em",
                            }}
                          >
                            {user.membership || "VIP Gold"}
                          </span>
                        </div>
                      </div>

                      {/* Dropdown Links */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <Link
                          href="/orders"
                          onClick={() => setAccountMenuOpen(false)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "9px 12px",
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 600,
                            color: "rgba(255, 255, 255, 0.9)",
                            textDecoration: "none",
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <Package size={16} color="var(--color-accent)" />
                            <span>My Orders</span>
                          </div>
                          {orders && orders.length > 0 && (
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 800,
                                background: "var(--color-accent)",
                                color: "#000",
                                padding: "1px 6px",
                                borderRadius: 10,
                              }}
                            >
                              {orders.length}
                            </span>
                          )}
                        </Link>

                        <Link
                          href="/track-order"
                          onClick={() => setAccountMenuOpen(false)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "9px 12px",
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 600,
                            color: "rgba(255, 255, 255, 0.9)",
                            textDecoration: "none",
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <ShieldCheck size={16} color="var(--color-accent)" />
                          <span>Track Package</span>
                        </Link>
                      </div>

                      {/* Sign out */}
                      <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", marginTop: 10, paddingTop: 6 }}>
                        <button
                          onClick={() => {
                            logout();
                            setAccountMenuOpen(false);
                          }}
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 12px",
                            background: "none",
                            border: "none",
                            borderRadius: 8,
                            color: "#ff5555",
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: "pointer",
                            textAlign: "left",
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 85, 85, 0.1)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <LogOut size={14} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Profile / Login Button */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  if (user) {
                    setMobileAccountOpen(true);
                  } else {
                    openAuthModal("login");
                  }
                }}
                aria-label={user ? `Account (${user.name})` : "Sign In"}
                className="flex md:hidden items-center"
                style={{
                  background: "none",
                  border: "none",
                  padding: "6px",
                  cursor: "pointer",
                  color: navTextColor,
                }}
              >
                {user ? (
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "var(--color-accent)",
                        color: "#000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 900,
                        boxShadow: "0 0 10px rgba(181, 240, 0, 0.4)",
                      }}
                    >
                      {getUserInitials(user.name)}
                    </div>
                    <span
                      style={{
                        position: "absolute",
                        bottom: -1,
                        right: -1,
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "#00ff88",
                        border: "1.5px solid #000",
                        boxShadow: "0 0 4px #00ff88",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "4px 8px",
                      borderRadius: 999,
                      background: isDarkHero ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)",
                      border: isDarkHero ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(0,0,0,0.12)",
                    }}
                  >
                    <User size={13} strokeWidth={2.2} />
                    <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.04em" }}>LOGIN</span>
                  </div>
                )}
              </motion.button>

              {/* Wishlist */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                aria-label={`Wishlist (${wishlistCount})`}
                className="hidden md:flex"
                style={{
                  background: "none",
                  border: "none",
                  padding: "8px",
                  cursor: "pointer",
                  color: navTextColor,
                  alignItems: "center",
                  position: "relative",
                  transition: "color 0.3s ease",
                }}
              >
                <Heart size={20} strokeWidth={1.8} />
                {wishlistCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "var(--color-sale)",
                      color: "white",
                      fontSize: 9,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </motion.button>

              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={openCart}
                aria-label={`Cart (${itemCount})`}
                style={{
                  background: "none",
                  border: "none",
                  padding: "8px",
                  cursor: "pointer",
                  color: navTextColor,
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  transition: "color 0.3s ease",
                }}
              >
                <ShoppingBag size={20} strokeWidth={1.8} />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      key={itemCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      style={{
                        position: "absolute",
                        top: 2,
                        right: 2,
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: "var(--color-accent)",
                        color: "#000000",
                        fontSize: 9,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile menu toggle */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={toggleMobileMenu}
                aria-label="Menu"
                className="flex md:hidden"
                style={{
                  background: "none",
                  border: "none",
                  padding: "8px",
                  cursor: "pointer",
                  color: navTextColor,
                  alignItems: "center",
                  transition: "color 0.3s ease",
                }}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              variants={overlayFade}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeMobileMenu}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(6px)",
                zIndex: 150,
              }}
            />
            <motion.div
              variants={mobileMenu}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mobile-menu"
              style={{ zIndex: 160, display: "flex", flexDirection: "column" }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 32,
                }}
              >
                <span className="font-display" style={{ fontSize: 28, letterSpacing: "0.15em", color: "white" }}>
                  KLUB
                </span>
                <button
                  onClick={closeMobileMenu}
                  style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}
                >
                  <X size={24} />
                </button>
              </div>

              {/* User Account Tile in Mobile */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  borderRadius: 12,
                  padding: "16px",
                  marginBottom: 24,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {user ? (
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: "50%",
                            background: "var(--color-accent)",
                            color: "#000",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 14,
                            fontWeight: 900,
                            boxShadow: "0 0 12px rgba(181, 240, 0, 0.3)",
                          }}
                        >
                          {getUserInitials(user.name)}
                        </div>
                        <div>
                          <p style={{ fontSize: 10, textTransform: "uppercase", color: "var(--color-accent)", fontWeight: 800, letterSpacing: "0.05em" }}>
                            {user.membership || "VIP Member"}
                          </p>
                          <p style={{ fontSize: 16, fontWeight: 800, color: "white" }}>{user.name}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          closeMobileMenu();
                        }}
                        style={{
                          background: "rgba(255, 85, 85, 0.15)",
                          border: "1px solid rgba(255, 85, 85, 0.3)",
                          color: "#ff6b6b",
                          padding: "6px 12px",
                          fontSize: 11,
                          fontWeight: 700,
                          borderRadius: 6,
                          cursor: "pointer",
                        }}
                      >
                        Sign Out
                      </button>
                    </div>

                    <div style={{ display: "flex", gap: 8, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                      <Link
                        href="/orders"
                        onClick={closeMobileMenu}
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                          background: "rgba(255,255,255,0.08)",
                          padding: "8px 12px",
                          borderRadius: 8,
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#fff",
                          textDecoration: "none",
                        }}
                      >
                        <Package size={14} color="var(--color-accent)" />
                        <span>My Orders {orders && orders.length > 0 ? `(${orders.length})` : ""}</span>
                      </Link>
                      <Link
                        href="/track-order"
                        onClick={closeMobileMenu}
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                          background: "rgba(255,255,255,0.08)",
                          padding: "8px 12px",
                          borderRadius: 8,
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#fff",
                          textDecoration: "none",
                        }}
                      >
                        <ShieldCheck size={14} color="var(--color-accent)" />
                        <span>Track</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "white" }}>Sign in to your account</p>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Exclusive drops & order tracking</p>
                    </div>
                    <button
                      onClick={() => {
                        closeMobileMenu();
                        openAuthModal("login");
                      }}
                      style={{
                        background: "var(--color-accent)",
                        color: "#000",
                        border: "none",
                        padding: "8px 16px",
                        fontWeight: 800,
                        fontSize: 12,
                        borderRadius: "var(--radius-sm)",
                        cursor: "pointer",
                      }}
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>

              {/* Links */}
              <motion.nav
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                style={{ flex: 1, overflowY: "auto" }}
              >
                {NAV_LINKS.map((link, i) => (
                  <motion.div key={link.href} variants={fadeUp}>
                    <Link
                      href={link.href}
                      style={{
                        display: "block",
                        fontSize: "clamp(24px, 5vw, 42px)",
                        fontWeight: 700,
                        color: "white",
                        paddingBlock: 12,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.2,
                        borderBottom: i < NAV_LINKS.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {user && (
                  <motion.div variants={fadeUp}>
                    <Link
                      href="/orders"
                      style={{
                        display: "block",
                        fontSize: "clamp(24px, 5vw, 42px)",
                        fontWeight: 700,
                        color: "white",
                        paddingBlock: 12,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.2,
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      My Orders
                    </Link>
                  </motion.div>
                )}
              </motion.nav>

              {/* Bottom Actions */}
              <div style={{ marginTop: 24, display: "flex", gap: 16 }}>
                <button
                  onClick={() => {
                    closeMobileMenu();
                    openCart();
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "var(--color-accent)",
                    color: "var(--color-text)",
                    border: "none",
                    padding: "14px 24px",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    flex: 1,
                    justifyContent: "center",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <ShoppingBag size={18} />
                  Cart {itemCount > 0 && `(${itemCount})`}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Account Bottom Sheet */}
      <MobileAccountSheet
        isOpen={mobileAccountOpen}
        onClose={() => setMobileAccountOpen(false)}
      />
    </>
  );
}
