"use client";
import React from "react";
import { motion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  dark?: boolean;
  speed?: number;
}

export default function Marquee({ items, dark = false, speed = 26 }: MarqueeProps) {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div
      style={{
        background: dark ? "var(--color-primary)" : "var(--color-accent)",
        paddingBlock: 16,
        overflow: "hidden",
        display: "flex",
        borderTop: dark ? "1px solid rgba(255,255,255,0.1)" : "none",
        borderBottom: dark ? "1px solid rgba(255,255,255,0.1)" : "none",
      }}
      className="select-none pointer-events-none"
    >
      <motion.div
        style={{ display: "flex", whiteSpace: "nowrap" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="font-display text-base md:text-xl tracking-widest px-4 md:px-8 whitespace-nowrap"
            style={{
              color: dark ? "rgba(255,255,255,0.75)" : "#000000",
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
