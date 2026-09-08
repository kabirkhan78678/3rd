"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { staggerContainer, fadeUp, slideInLeft, slideInRight, VIEWPORT_ONCE } from "@/lib/animations";

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div style={{ paddingTop: 80 }}>

      {/* ─── HERO ─── */}
      <section ref={heroRef} style={{ position: "relative", height: "80vh", minHeight: 600, overflow: "hidden", display: "flex", alignItems: "center", background: "var(--color-primary)" }}>
        <motion.div style={{ position: "absolute", inset: 0, y }}>
          <Image src="/images/about-hero.jpg" alt="KLUB Studio" fill style={{ objectFit: "cover", opacity: 0.5 }} priority sizes="100vw" />
        </motion.div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 16 }}>
              Est. 2021 · Our Story
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display" style={{ fontSize: "clamp(56px, 10vw, 140px)", color: "white", lineHeight: 0.88, marginBottom: 32 }}>
              WE DON'T<br />
              <span style={{ color: "var(--color-accent)" }}>FOLLOW</span><br />
              TRENDS.
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.65)", maxWidth: 480, lineHeight: 1.7 }}>
              We create them. KLUB was born from the intersection of raw street culture and premium craftsmanship — for those who refuse to be ordinary.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── BRAND STORY ─── */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
              <span className="section-eyebrow">The Beginning</span>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 24 }}>
                Born From<br />The Streets.
              </h2>
              <p style={{ color: "var(--color-muted)", lineHeight: 1.8, marginBottom: 20 }}>
                In 2021, three friends with a shared obsession for fashion and a burning hatred for mediocre clothing decided to do something about it. KLUB was born in a small East London studio, surrounded by mood boards, fabric swatches, and the unshakeable belief that streetwear could be premium without losing its soul.
              </p>
              <p style={{ color: "var(--color-muted)", lineHeight: 1.8, marginBottom: 32 }}>
                Every piece we create is a conversation — between craft and attitude, between structure and freedom. We source the best fabrics, work with the most talented makers, and never compromise on what makes KLUB, KLUB.
              </p>
              <Link href="/men" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                Explore the Collection <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ position: "relative", aspectRatio: "3/4" }}>
                  <Image src="/images/men-tee.jpg" alt="KLUB Story" fill style={{ objectFit: "cover" }} sizes="25vw" />
                </div>
                <div style={{ position: "relative", aspectRatio: "3/4", marginTop: 32 }}>
                  <Image src="/images/women-hoodie.jpg" alt="KLUB Story" fill style={{ objectFit: "cover" }} sizes="25vw" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── NUMBERS ─── */}
      <section style={{ background: "var(--color-accent)", paddingBlock: 80 }}>
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center"
          >
            {[
              { value: "2021", label: "Founded" },
              { value: "50K+", label: "Happy Customers" },
              { value: "20+", label: "Countries" },
              { value: "100%", label: "Premium Quality" },
            ].map(({ value, label }) => (
              <motion.div key={label} variants={fadeUp}>
                <p style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</p>
                <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8, color: "rgba(0,0,0,0.55)" }}>{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── PHILOSOPHY ─── */}
      <section className="section" style={{ background: "var(--color-primary)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <motion.span variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} className="section-eyebrow" style={{ color: "rgba(255,255,255,0.4)" }}>
            Our Philosophy
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.8 }}
            className="font-display"
            style={{ fontSize: "clamp(48px, 9vw, 120px)", color: "white", lineHeight: 0.9, marginBottom: 48 }}
          >
            WE CREATE<br />
            <span style={{ color: "var(--color-accent)" }}>OUR OWN</span><br />
            CYCLE.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-left">
            {[
              { title: "Craft First", desc: "Every garment starts with the finest raw materials. We refuse to compromise on fabric quality — ever." },
              { title: "Purpose-Built", desc: "Each piece is designed with intention. No fillers. No padding. Just clothing that earns its place in your wardrobe." },
              { title: "Timeless Energy", desc: "We don't chase trends. We create pieces that remain relevant long after the hype has faded." },
            ].map(({ title, desc }) => (
              <motion.div key={title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
                style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--color-accent)", marginBottom: 12 }}>{title}</h3>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="section">
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} style={{ marginBottom: 60 }}>
            <span className="section-eyebrow">Timeline</span>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
              The KLUB Journey.
            </h2>
          </motion.div>

          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-3.5 sm:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--color-border)] sm:-translate-x-1/2" />
            {[
              { year: "2021", title: "The Beginning", desc: "Three friends, one vision, and a lot of fabric swatches. KLUB takes shape in East London." },
              { year: "2022", title: "First Drop", desc: "Our debut collection — 6 pieces — sells out in 48 hours. The community responds." },
              { year: "2023", title: "Going Global", desc: "KLUB ships to 20+ countries. The culture crosses borders." },
              { year: "2024", title: "Premium Evolution", desc: "We launch our premium tier — heavyweight fabrics, elevated construction, limited drops." },
              { year: "2025", title: "Now", desc: "KLUB is a movement. Growing, evolving, always bold." },
            ].map(({ year, title, desc }, i) => (
              <motion.div
                key={year}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-start sm:items-center gap-4 sm:gap-10 mb-10 sm:mb-12 ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                <div className={`hidden sm:block flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                  {i % 2 === 0 ? (
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.15em] text-[var(--color-muted)] uppercase mb-1">{year}</p>
                      <h3 className="text-xl font-bold mb-1">{title}</h3>
                      <p className="text-[var(--color-muted)] text-sm leading-relaxed max-w-[280px] ml-auto">{desc}</p>
                    </div>
                  ) : null}
                </div>

                <div className="w-7 h-7 rounded-full bg-[var(--color-accent)] border-4 border-[var(--color-primary)] flex-shrink-0 z-10 shadow-sm" />

                <div className="flex-1 text-left">
                  {/* Mobile content (always right of dot) */}
                  <div className="block sm:hidden">
                    <p className="text-[11px] font-bold tracking-[0.15em] text-[var(--color-muted)] uppercase mb-1">{year}</p>
                    <h3 className="text-lg font-bold mb-1">{title}</h3>
                    <p className="text-[var(--color-muted)] text-sm leading-relaxed">{desc}</p>
                  </div>
                  {/* Desktop content (when row-reverse) */}
                  <div className="hidden sm:block">
                    {i % 2 !== 0 ? (
                      <div>
                        <p className="text-[11px] font-bold tracking-[0.15em] text-[var(--color-muted)] uppercase mb-1">{year}</p>
                        <h3 className="text-xl font-bold mb-1">{title}</h3>
                        <p className="text-[var(--color-muted)] text-sm leading-relaxed max-w-[280px]">{desc}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ background: "var(--color-surface)", paddingBlock: 100, textAlign: "center" }}>
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
            <motion.p variants={fadeUp} className="section-eyebrow">Join the Movement</motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 24 }}>
              Ready to Wear<br />Your Attitude?
            </motion.h2>
            <motion.div variants={fadeUp} style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/men" className="btn btn-primary btn-lg" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                Shop Men <ArrowRight size={18} />
              </Link>
              <Link href="/women" className="btn btn-outline btn-lg" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                Shop Women <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
