"use client";
import React from "react";
import { motion } from "framer-motion";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/animations";

interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  sub?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  heading,
  sub,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      style={{ textAlign: align, marginBottom: 40 }}
      className={align === "center" ? "mx-auto text-center" : "text-left"}
    >
      <span
        className="section-eyebrow"
        style={{ color: light ? "var(--color-accent)" : undefined }}
      >
        {eyebrow}
      </span>
      <h2
        className="section-heading"
        style={{
          whiteSpace: "pre-line",
          color: light ? "#ffffff" : undefined,
        }}
      >
        {heading}
      </h2>
      {sub && (
        <p
          style={{
            marginTop: 12,
            color: light ? "rgba(255,255,255,0.65)" : "var(--color-muted)",
            maxWidth: 540,
            ...(align === "center" ? { margin: "12px auto 0" } : {}),
          }}
          className="text-sm md:text-base leading-relaxed"
        >
          {sub}
        </p>
      )}
    </motion.div>
  );
}
