"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { slideInLeft, slideInRight, VIEWPORT_ONCE } from "@/lib/animations";

export default function EditorialSection() {
  return (
    <section style={{ background: "var(--color-primary)", overflow: "hidden" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh] lg:min-h-[85vh]">
        {/* Men's Showcase */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          style={{ position: "relative", overflow: "hidden", minHeight: 420 }}
          className="group"
        >
          <Link href="/men" style={{ display: "block", height: "100%", position: "relative" }}>
            <Image
              src="/images/men-jacket.jpg"
              alt="Shop Men's Streetwear"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
                transition: "transform 0.8s ease",
              }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)",
              }}
            />
            <div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-10 right-6 sm:right-10">
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: 8,
                  display: "block",
                }}
              >
                Capsule 01
              </span>
              <h2
                className="font-display text-5xl sm:text-6xl lg:text-8xl text-white leading-none mb-4"
              >
                MEN'S<br />
                <span style={{ color: "var(--color-accent)" }}>COLLECTION</span>
              </h2>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 24px",
                  background: "var(--color-accent)",
                  color: "#000",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                Shop Men <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Women's Showcase */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: 420,
            borderLeft: "1px solid rgba(255,255,255,0.1)",
          }}
          className="group"
        >
          <Link href="/women" style={{ display: "block", height: "100%", position: "relative" }}>
            <Image
              src="/images/women-jacket.jpg"
              alt="Shop Women's Streetwear"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
                transition: "transform 0.8s ease",
              }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)",
              }}
            />
            <div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-10 right-6 sm:right-10">
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: 8,
                  display: "block",
                }}
              >
                Capsule 02
              </span>
              <h2
                className="font-display text-5xl sm:text-6xl lg:text-8xl text-white leading-none mb-4"
              >
                WOMEN'S<br />
                <span style={{ color: "var(--color-accent)" }}>COLLECTION</span>
              </h2>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 24px",
                  background: "var(--color-accent)",
                  color: "#000",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                Shop Women <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
