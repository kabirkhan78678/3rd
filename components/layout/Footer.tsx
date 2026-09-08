"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, X, Play, ArrowRight } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animations";

const SHOP_LINKS = [
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "New Arrivals", href: "/search?filter=new" },
  { label: "Best Sellers", href: "/search?filter=bestsellers" },
  { label: "Sale", href: "/search?filter=sale" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/contact#faq" },
  { label: "Careers", href: "/about#careers" },
];

const POLICY_LINKS = [
  { label: "Shipping & Returns", href: "/contact#shipping" },
  { label: "Privacy Policy", href: "/contact#privacy" },
  { label: "Terms & Conditions", href: "/contact#terms" },
  { label: "Cookie Policy", href: "/contact#cookies" },
];

const SOCIAL_LINKS = [
  { icon: Globe, label: "Instagram", href: "https://instagram.com" },
  { icon: X, label: "Twitter / X", href: "https://twitter.com" },
  { icon: Play, label: "YouTube", href: "https://youtube.com" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-primary)",
        color: "var(--color-text-inverse)",
        paddingTop: 80,
        paddingBottom: 40,
      }}
    >
      {/* Marquee */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          paddingBlock: 20,
          overflow: "hidden",
          marginBottom: 80,
        }}
      >
        <div className="marquee-track">
          <div className="marquee-content" aria-hidden="true">
            {Array(10)
              .fill(null)
              .map((_, i) => (
                <span
                  key={i}
                  className="font-display"
                  style={{
                    fontSize: 48,
                    letterSpacing: "0.08em",
                    color: i % 2 === 0 ? "var(--color-accent)" : "rgba(255,255,255,0.15)",
                    paddingRight: 60,
                    whiteSpace: "nowrap",
                  }}
                >
                  WEAR YOUR ATTITUDE ✦
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className="container">
        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 48,
            marginBottom: 80,
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: "span 1" }}>
            <Link href="/" style={{ display: "inline-block", marginBottom: 20 }}>
              <span
                className="font-display"
                style={{ fontSize: 36, letterSpacing: "0.15em", color: "white" }}
              >
                KLUB
                <span
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    marginLeft: 4,
                    verticalAlign: "middle",
                  }}
                />
              </span>
            </Link>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 24, maxWidth: 220 }}>
              Bold. Youthful. Unapologetically different. Made for those who wear their attitude.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, color: "var(--color-accent)" }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "50%",
                    transition: "all 0.2s",
                  }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>
              Shop
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>
              Company
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>
              Legal
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {POLICY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>
              Stay in the loop
            </h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", marginBottom: 16, lineHeight: 1.6 }}>
              New drops, exclusive access, and early sale alerts.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "white",
                  fontSize: 14,
                  outline: "none",
                  fontFamily: "inherit",
                  borderRadius: 0,
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "12px 16px",
                  background: "var(--color-accent)",
                  color: "var(--color-text)",
                  border: "none",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Subscribe <ArrowRight size={14} />
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 32,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} KLUB. All rights reserved.
          </p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>
            Made with boldness.
          </p>
        </div>
      </div>
    </footer>
  );
}
