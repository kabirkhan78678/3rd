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
import { mobileMenu, overlayFade, staggerContainer, fadeUp } from "@/lib/animations";

const NAV_LINKS = [
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Track Order", href: "/track-order" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { openSearch, toggleMobileMenu, mobileMenuOpen, closeMobileMenu } = useUI();
  const { user, openAuthModal, logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
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
              ? "bg-gradient-to-b from-black/85 via-black/40 to-transparent border-b border-white/10"
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
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => {
                    if (user) {
                      setAccountMenuOpen(!accountMenuOpen);
                    } else {
                      openAuthModal("login");
                    }
                  }}
                  aria-label="Account"
                  style={{
                    background: user ? "var(--color-surface)" : "none",
                    border: user ? "1px solid var(--color-border)" : "none",
                    borderRadius: 999,
                    padding: user ? "5px 12px 5px 8px" : "8px",
                    cursor: "pointer",
                    color: navTextColor,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "all 0.3s ease",
                  }}
                >
                  <User size={18} strokeWidth={1.8} />
                  {user && (
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        maxWidth: 90,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: isDarkHero ? "#ffffff" : "var(--color-text)",
                      }}
                    >
                      {user.name.split(" ")[0]}
                    </span>
                  )}
                  {user && <ChevronDown size={12} style={{ opacity: 0.6 }} />}
                </motion.button>

                {/* Account Menu Dropdown */}
                <AnimatePresence>
                  {accountMenuOpen && user && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "calc(100% + 12px)",
                        width: 240,
                        background: "#0d0d0d",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: "var(--radius-sm)",
                        padding: 16,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                        zIndex: 110,
                        color: "#ffffff",
                      }}
                    >
                      {/* User Header */}
                      <div
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.1)",
                          paddingBottom: 12,
                          marginBottom: 12,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 14, fontWeight: 800 }}>{user.name}</span>
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 800,
                              textTransform: "uppercase",
                              padding: "2px 6px",
                              background: "var(--color-accent)",
                              color: "#000",
                              borderRadius: 4,
                            }}
                          >
                            {user.membership}
                          </span>
                        </div>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2, wordBreak: "break-all" }}>
                          {user.email}
                        </p>
                      </div>

                      {/* Dropdown Links */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <Link
                          href="/orders"
                          onClick={() => setAccountMenuOpen(false)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "8px 10px",
                            borderRadius: "var(--radius-sm)",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "rgba(255,255,255,0.85)",
                            textDecoration: "none",
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <Package size={15} color="var(--color-accent)" />
                          My Orders
                        </Link>

                        <Link
                          href="/track-order"
                          onClick={() => setAccountMenuOpen(false)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "8px 10px",
                            borderRadius: "var(--radius-sm)",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "rgba(255,255,255,0.85)",
                            textDecoration: "none",
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <ShieldCheck size={15} color="var(--color-accent)" />
                          Track Package
                        </Link>
                      </div>

                      {/* Sign out */}
                      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 12, paddingTop: 8 }}>
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
                            padding: "8px 10px",
                            background: "none",
                            border: "none",
                            color: "var(--color-sale, #ff4d4f)",
                            fontSize: 13,
                            fontWeight: 700,
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                        >
                          <LogOut size={15} />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

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
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(4px)",
                zIndex: 90,
              }}
            />
            <motion.div
              variants={mobileMenu}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mobile-menu"
              style={{ zIndex: 95, display: "flex", flexDirection: "column" }}
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
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "var(--radius-sm)",
                  padding: "16px",
                  marginBottom: 24,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {user ? (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ fontSize: 11, textTransform: "uppercase", color: "var(--color-accent)", fontWeight: 800 }}>
                        {user.membership} Member
                      </p>
                      <p style={{ fontSize: 16, fontWeight: 700, color: "white" }}>{user.name}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        closeMobileMenu();
                      }}
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "none",
                        color: "#fff",
                        padding: "6px 12px",
                        fontSize: 11,
                        borderRadius: 4,
                        cursor: "pointer",
                      }}
                    >
                      Sign Out
                    </button>
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
    </>
  );
}
