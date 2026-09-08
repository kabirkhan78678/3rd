"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/animations";

export default function ManifestoSection() {
  return (
    <section
      style={{
        background: "var(--color-primary)",
        paddingTop: "clamp(100px, 12vw, 160px)",
        paddingBottom: "clamp(100px, 12vw, 160px)",
        overflow: "hidden",
        position: "relative",
        textAlign: "center",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Soft ambient lighting */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 500,
          background: "radial-gradient(ellipse at center, rgba(0, 194, 203, 0.06) 0%, rgba(10, 10, 10, 0) 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="container relative z-10 flex flex-col items-center justify-center">
        {/* Eyebrow Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-[11px] font-bold tracking-[0.25em] uppercase mb-8 sm:mb-10"
        >
          <Sparkles size={12} />
          <span>KLUB MANIFESTO // 01</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="font-display text-5xl sm:text-7xl lg:text-9xl text-white leading-[0.95] tracking-tight mb-8 sm:mb-10 text-center"
        >
          NOT MADE TO<br />
          <span style={{ color: "var(--color-accent)" }}>BLEND IN.</span>
        </motion.h2>

        {/* Centered Descriptive Paragraph with generous breathing room */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="text-base sm:text-lg lg:text-xl text-white/70 max-w-xl mx-auto leading-[1.85] mb-12 sm:mb-14 text-center text-balance font-normal tracking-wide"
          style={{ textAlign: "center" }}
        >
          We don&apos;t manufacture trends. We forge cultural armor. Every stitch is
          calculated, every silhouette intentional. For those who stand tall when the
          crowd steps aside.
        </motion.p>

        {/* Action Buttons with clean spacing */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-6 w-full sm:w-auto"
        >
          <Link
            href="/search"
            className="btn btn-accent btn-lg w-full sm:w-auto"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              minWidth: 220,
              padding: "16px 36px",
            }}
          >
            Shop All Releases <ArrowRight size={18} />
          </Link>
          <Link
            href="/about"
            className="btn btn-outline btn-lg w-full sm:w-auto"
            style={{
              color: "#ffffff",
              borderColor: "rgba(255, 255, 255, 0.4)",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              minWidth: 220,
              padding: "16px 36px",
              backdropFilter: "blur(12px)",
            }}
          >
            Read Brand Story <BookOpen size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

