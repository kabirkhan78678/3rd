"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Copy, Check, ChevronRight } from "lucide-react";
import Link from "next/link";

const OFFERS = [
  {
    code: "KLUB10",
    text: "🔥 USE CODE KLUB10 FOR 10% OFF YOUR ORDER",
    sub: "Tap to copy",
  },
  {
    code: "WELCOME20",
    text: "⚡ NEW MEMBER OFFER: 20% OFF FIRST PURCHASE — CODE WELCOME20",
    sub: "Limited time",
  },
  {
    code: "FREESHIP",
    text: "✈️ COMPLIMENTARY EXPRESS SHIPPING WORLDWIDE OVER $150",
    sub: "Auto applied",
  },
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % OFFERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const copyCurrentCode = () => {
    const currentCode = OFFERS[index].code;
    try {
      navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div
      style={{
        background: "var(--color-surface, #f5f5f7)",
        color: "var(--color-text, #0a1315)",
        height: 38,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        position: "relative",
        zIndex: 101,
        borderBottom: "1px solid var(--color-border, #e5e7eb)",
        overflow: "hidden",
        paddingInline: 8,
      }}
    >
      <div className="flex items-center justify-center gap-2 sm:gap-3 max-w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="flex items-center gap-2 truncate"
          >
            <span style={{ color: "var(--color-text, #0a1315)" }} className="flex items-center gap-1.5 truncate text-[10px] sm:text-xs font-bold">
              <Tag size={12} className="shrink-0" style={{ color: "var(--color-accent, #00c2cb)" }} /> <span className="truncate">{OFFERS[index].text}</span>
            </span>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={copyCurrentCode}
          style={{
            background: "var(--color-accent, #00c2cb)",
            border: "1px solid var(--color-accent, #00c2cb)",
            color: "#0a1315",
            borderRadius: 999,
            padding: "2px 8px",
            fontSize: 9,
            fontWeight: 800,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
            transition: "all 0.2s",
            boxShadow: "0 2px 8px var(--color-accent-glow, rgba(0, 194, 203, 0.25))",
          }}
          title="Copy discount code"
        >
          {copied ? (
            <>
              <Check size={10} /> Copied!
            </>
          ) : (
            <>
              <Copy size={10} /> {OFFERS[index].code}
            </>
          )}
        </button>

        <Link
          href="/search?filter=new"
          style={{
            fontSize: 10,
            color: "var(--color-muted, #6b7280)",
            display: "inline-flex",
            alignItems: "center",
            textDecoration: "underline",
            textUnderlineOffset: 2,
            fontWeight: 600,
          }}
          className="hidden md:inline-flex"
        >
          Shop Now <ChevronRight size={10} />
        </Link>
      </div>
    </div>
  );
}
