"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/animations";

export default function ManifestoSection() {
  return (
    <section
      style={{
        background: "var(--color-primary)",
        paddingBlock: 96,
        overflow: "hidden",
        position: "relative",
        textAlign: "center",
      }}
    >
      <div className="container">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            marginBottom: 16,
          }}
        >
          — KLUB MANIFESTO —
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="font-display text-5xl sm:text-7xl lg:text-9xl text-white leading-[0.9] tracking-tight mb-6"
        >
          NOT MADE TO<br />
          <span style={{ color: "var(--color-accent)" }}>BLEND IN.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="text-sm sm:text-base lg:text-lg text-white/70 max-w-xl mx-auto leading-relaxed mb-8"
        >
          We don't manufacture trends. We forge cultural armor.
          Every stitch is calculated, every silhouette intentional.
          For those who stand tall when the crowd steps aside.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4"
        >
          <Link
            href="/search"
            className="btn btn-accent btn-lg w-full sm:w-auto"
            style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
          >
            Shop All Releases <ArrowRight size={18} />
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto text-center py-4 px-8 rounded-none border border-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md hover:bg-white/10 transition-colors"
          >
            Read The Brand Story
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
