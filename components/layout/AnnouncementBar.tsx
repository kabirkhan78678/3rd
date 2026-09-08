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
        background: "var(--color-primary)",
        color: "#ffffff",
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
        borderBottom: "1px solid rgba(255,255,255,0.1)",
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
            <span style={{ color: "var(--color-accent)" }} className="flex items-center gap-1.5 truncate text-[10px] sm:text-xs font-bold">
              <Tag size={11} className="shrink-0" /> <span className="truncate">{OFFERS[index].text}</span>
            </span>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={copyCurrentCode}
          style={{
            background: "rgba(181, 240, 0, 0.15)",
            border: "1px solid var(--color-accent)",
            color: "var(--color-accent)",
            borderRadius: 999,
            padding: "2px 8px",
            fontSize: 9,
            fontWeight: 800,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
            transition: "all 0.2s",
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
            color: "rgba(255,255,255,0.6)",
            display: "inline-flex",
            alignItems: "center",
            textDecoration: "underline",
            textUnderlineOffset: 2,
          }}
          className="hidden md:inline-flex"
        >
          Shop Now <ChevronRight size={10} />
        </Link>
      </div>
    </div>
  );
}
