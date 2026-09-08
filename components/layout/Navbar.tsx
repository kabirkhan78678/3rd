"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Heart, Menu, X, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";
import { mobileMenu, overlayFade, staggerContainer, fadeUp } from "@/lib/animations";

const NAV_LINKS = [
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "New Arrivals", href: "/search?filter=new" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { openSearch, toggleMobileMenu, mobileMenuOpen, closeMobileMenu } = useUI();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    closeMobileMenu();
  }, [pathname]); // eslint-disable-line

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const isDarkHero = !scrolled && pathname === "/";
  const navTextColor = isDarkHero ? "#ffffff" : "var(--color-text)";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[var(--color-border)]"
            : pathname === "/"
            ? "bg-gradient-to-b from-black/85 via-black/40 to-transparent border-b border-white/10"
            : "bg-white/95 backdrop-blur-md border-b border-[var(--color-border)]"
        }`}
        style={{ height: scrolled ? 64 : 80, display: "flex", alignItems: "center" }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
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
          <nav style={{ display: "flex", alignItems: "center", gap: 36 }} className="hidden md:flex">
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

            {/* Account (desktop) */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Account"
              className="hidden md:flex"
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
              <User size={20} strokeWidth={1.8} />
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
                background: "rgba(0,0,0,0.3)",
                zIndex: 90,
              }}
            />
            <motion.div
              variants={mobileMenu}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mobile-menu"
              style={{ zIndex: 95 }}
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
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

              {/* Links */}
              <motion.nav
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                style={{ flex: 1 }}
              >
                {NAV_LINKS.map((link, i) => (
                  <motion.div key={link.href} variants={fadeUp}>
                    <Link
                      href={link.href}
                      style={{
                        display: "block",
                        fontSize: "clamp(32px, 7vw, 56px)",
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
              </motion.nav>

              {/* Bottom */}
              <div style={{ marginTop: 40, display: "flex", gap: 24 }}>
                <button
                  onClick={() => { closeMobileMenu(); openCart(); }}
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
