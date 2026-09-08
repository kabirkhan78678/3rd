"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  Zap,
  Star,
  TrendingUp,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Radio,
  Move3d,
} from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, OrbitControls, Torus } from "@react-three/drei";
import * as THREE from "three";
import ProductCard from "@/components/product/ProductCard";
import { products, getFeaturedProducts, getBestSellers, Product } from "@/data/products";
import { staggerContainer, fadeUp, slideInLeft, slideInRight, VIEWPORT_ONCE } from "@/lib/animations";
import {
  Magnetic,
  TiltCard,
  KineticLine,
  ScrollHighlightText,
  DropCountdown,
  AudioBars,
  Hero3DBadge,
} from "@/components/ui/InteractiveMotion";
import HeroParticleCloud from "@/components/ui/HeroParticleCloud";
import ScrambleText from "@/components/ui/ScrambleText";
import { sfx } from "@/lib/sound";

// ─── 3D Vault Object (Advanced Interactive Cyber Atelier with Orbiting Rings) ─
function VaultObject({ color = "#b5f000", distort = 0.4 }: { color?: string; distort?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.35;
      meshRef.current.rotation.y += delta * 0.45;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.x += delta * 0.6;
      ringRef1.current.rotation.y += delta * 0.4;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.x -= delta * 0.4;
      ringRef2.current.rotation.z += delta * 0.7;
    }
  });

  return (
    <>
      {/* Central Morphing Chrome Sphere */}
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh ref={meshRef}>
          <Sphere args={[1.2, 64, 64]}>
            <MeshDistortMaterial
              color={color}
              distort={distort}
              speed={2.6}
              roughness={0.06}
              metalness={0.96}
            />
          </Sphere>
        </mesh>

        {/* Outer Orbiting Metallic Cyber Ring 1 */}
        <mesh ref={ringRef1}>
          <Torus args={[1.8, 0.04, 16, 100]}>
            <meshStandardMaterial
              color="#ffffff"
              metalness={1}
              roughness={0.1}
              wireframe={false}
            />
          </Torus>
        </mesh>

        {/* Outer Orbiting Metallic Cyber Ring 2 */}
        <mesh ref={ringRef2}>
          <Torus args={[2.2, 0.03, 16, 100]}>
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.6}
              metalness={0.9}
              roughness={0.1}
            />
          </Torus>
        </mesh>
      </Float>

      {/* Dynamic Studio Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 6, 6]} intensity={3} color="#ffffff" />
      <directionalLight position={[-6, -4, -4]} intensity={2} color="#ffffff" />
      <pointLight position={[-4, -3, -2]} intensity={4} color={color} />
      <pointLight position={[4, 3, 2]} intensity={3} color="#ffffff" />
    </>
  );
}

// ─── Infinite Marquee ────────────────────────────────────────────────────────
function Marquee({ items, dark = false, speed = 24 }: { items: string[]; dark?: boolean; speed?: number }) {
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
        position: "relative",
        zIndex: 5,
      }}
    >
      <motion.div
        style={{ display: "flex", whiteSpace: "nowrap" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="font-display"
            style={{
              fontSize: 22,
              letterSpacing: "0.12em",
              color: dark ? "rgba(255,255,255,0.8)" : "#000000",
              paddingInline: 36,
              whiteSpace: "nowrap",
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Section Header ──────────────────────────────────────────────────────────
function SectionHeading({
  eyebrow,
  heading,
  sub,
  align = "left",
  light = false,
}: {
  eyebrow: string;
  heading: string;
  sub?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      style={{ textAlign: align, marginBottom: 40, position: "relative", zIndex: 2 }}
    >
      <span
        className="section-eyebrow"
        style={{ color: light ? "var(--color-accent)" : undefined }}
      >
        <ScrambleText text={eyebrow} scrambleSpeed={20} />
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
            maxWidth: 520,
            ...(align === "center" ? { margin: "12px auto 0" } : {}),
          }}
        >
          {sub}
        </p>
      )}
    </motion.div>
  );
}

// ─── MAIN HOME PAGE ──────────────────────────────────────────────────────────
export default function HomePage() {
  // Hero Media & Sound State
  const [mediaMode, setMediaMode] = useState<"video" | "image">("video");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [soundFXEnabled, setSoundFXEnabled] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Active category filter for Featured section
  const [activeTab, setActiveTab] = useState<"all" | "men" | "women" | "bestseller">("all");

  // 3D Vault interactive state
  const [vaultColor, setVaultColor] = useState("#b5f000");
  const [vaultDistort, setVaultDistort] = useState(0.45);

  // Scroll parallax for hero & background typography
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.1]);
  const heroContentY = useTransform(heroProgress, [0, 1], [0, -70]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0.05]);

  // Background Parallax Text in Featured Section
  const featuredRef = useRef<HTMLElement>(null);
  const { scrollYProgress: featuredProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "end start"],
  });
  const bgTextX = useTransform(featuredProgress, [0, 1], [-180, 180]);

  const togglePlay = () => {
    sfx.click();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    sfx.click();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleSoundFX = () => {
    sfx.click();
    sfx.enabled = !soundFXEnabled;
    setSoundFXEnabled(!soundFXEnabled);
  };

  // Products
  const featured = getFeaturedProducts();
  const bestSellers = getBestSellers();

  // Filtered products for Featured Grid
  const filteredProducts: Product[] =
    activeTab === "all"
      ? featured
      : activeTab === "men"
      ? products.filter((p) => p.category === "men").slice(0, 8)
      : activeTab === "women"
      ? products.filter((p) => p.category === "women").slice(0, 8)
      : bestSellers;

  return (
    <div>
      {/* ══════════════════════════════════════════════════════════════════
          HERO — Video Background + 3D Particle Cloud + Kinetic Typography
      ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100svh",
          minHeight: 720,
          maxHeight: 1080,
          overflow: "hidden",
          background: "#0a0a0a",
        }}
      >
        {/* Background Media Container with Parallax Zoom */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            scale: heroScale,
            zIndex: 0,
          }}
        >
          {mediaMode === "video" ? (
            <video
              ref={videoRef}
              src="/videos/hero.mp4"
              poster="/images/hero.jpg"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 30%",
              }}
            />
          ) : (
            <Image
              src="/images/hero.jpg"
              alt="KLUB — Wear Your Attitude"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center 25%" }}
              sizes="100vw"
            />
          )}
        </motion.div>

        {/* 🌟 3D INTERACTIVE PARTICLE CLOUD & FLOATING CYBER SHARDS OVER VIDEO 🌟 */}
        <HeroParticleCloud color="var(--color-accent)" />

        {/* Cyber Laser Scanline Animation */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(181,240,0,0.8) 50%, transparent 100%)",
            boxShadow: "0 0 15px var(--color-accent)",
            zIndex: 3,
            pointerEvents: "none",
            animation: "scanline 6s ease-in-out infinite",
          }}
        />

        {/* Top Vignette for Navbar readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 180,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Bottom Rich Gradient for Editorial Typography */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "70%",
            background:
              "linear-gradient(to top, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.75) 45%, rgba(10,10,10,0.15) 85%, transparent 100%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Left Vignette for text contrast */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.35) 45%, transparent 75%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Media & SFX Controls Pill (Top Right) */}
        <div
          style={{
            position: "absolute",
            top: 100,
            right: 24,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(16px)",
            padding: "6px 12px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          {/* Audio Bars Indicator when video is playing */}
          <AudioBars isPlaying={isPlaying && mediaMode === "video"} />

          {/* Mode Switcher */}
          <button
            onClick={() => {
              sfx.switch();
              setMediaMode("video");
            }}
            onMouseEnter={() => sfx.hover()}
            style={{
              background: mediaMode === "video" ? "var(--color-accent)" : "transparent",
              color: mediaMode === "video" ? "#000" : "#fff",
              border: "none",
              borderRadius: 999,
              padding: "5px 12px",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 5,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <Play size={12} fill={mediaMode === "video" ? "#000" : "transparent"} /> Video
          </button>
          <button
            onClick={() => {
              sfx.switch();
              setMediaMode("image");
            }}
            onMouseEnter={() => sfx.hover()}
            style={{
              background: mediaMode === "image" ? "var(--color-accent)" : "transparent",
              color: mediaMode === "image" ? "#000" : "#fff",
              border: "none",
              borderRadius: 999,
              padding: "5px 12px",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 5,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Photo
          </button>

          {/* Video Controls */}
          {mediaMode === "video" && (
            <>
              <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.2)" }} />
              <button
                onClick={togglePlay}
                onMouseEnter={() => sfx.hover()}
                aria-label={isPlaying ? "Pause Video" : "Play Video"}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  padding: 4,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button
                onClick={toggleMute}
                onMouseEnter={() => sfx.hover()}
                aria-label={isMuted ? "Unmute Video" : "Mute Video"}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  padding: 4,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </>
          )}

          {/* UI Sound FX Toggle */}
          <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.2)" }} />
          <button
            onClick={toggleSoundFX}
            onMouseEnter={() => sfx.hover()}
            title={soundFXEnabled ? "UI Sound FX Active" : "UI Sound FX Muted"}
            style={{
              background: "transparent",
              border: "none",
              color: soundFXEnabled ? "var(--color-accent)" : "rgba(255,255,255,0.4)",
              padding: 4,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Radio size={14} />
          </button>
        </div>

        {/* Hero Editorial Content with Kinetic Typography */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 4,
            y: heroContentY,
            opacity: heroOpacity,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingBottom: 76,
          }}
          className="container"
        >
          <div style={{ maxWidth: 880 }}>
            {/* Live Drop Countdown Ticker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{ marginBottom: 20 }}
            >
              <DropCountdown />
            </motion.div>

            {/* Kinetic Typography Masked Lines */}
            <div style={{ marginBottom: 20 }}>
              <KineticLine text="WEAR" delay={0.2} />
              <KineticLine text="YOUR" highlightWord="YOUR" delay={0.35} />
              <KineticLine text="ATTITUDE." delay={0.5} />
            </div>

            {/* Subtitle with fadeUp */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              style={{
                fontSize: "clamp(15px, 1.8vw, 19px)",
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.6,
                maxWidth: 600,
                marginBottom: 32,
              }}
            >
              Unapologetic streetwear engineered for the cultural vanguard.
              Heavyweight bespoke fabrics, architectural silhouettes, and limited drops.
            </motion.p>

            {/* Magnetic CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Magnetic strength={0.3}>
                <Link
                  href="/search"
                  onMouseEnter={() => sfx.hover()}
                  onClick={() => sfx.click()}
                  className="btn btn-accent btn-lg"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    boxShadow: "0 8px 30px rgba(181,240,0,0.45)",
                  }}
                >
                  Shop Collection <ArrowRight size={18} />
                </Link>
              </Magnetic>

              <Magnetic strength={0.25}>
                <Link
                  href="/men"
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    sfx.hover();
                    e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  }}
                  onClick={() => sfx.click()}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "16px 28px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "#ffffff",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.25s ease",
                  }}
                >
                  Men's Edit
                </Link>
              </Magnetic>

              <Magnetic strength={0.25}>
                <Link
                  href="/women"
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    sfx.hover();
                    e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  }}
                  onClick={() => sfx.click()}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "16px 28px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "#ffffff",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.25s ease",
                  }}
                >
                  Women's Edit
                </Link>
              </Magnetic>
            </motion.div>
          </div>
        </motion.div>

        {/* Non-intrusive 3D Hologram Badge (Safe Hero Corner) */}
        <Hero3DBadge />

        {/* Scroll Cue (Centered Bottom) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.45)",
              textTransform: "uppercase",
            }}
          >
            Explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ArrowDown size={16} color="var(--color-accent)" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          LIVE STATS / MARQUEE STRIP 1
      ══════════════════════════════════════════════════════════════════ */}
      <Marquee
        items={[
          "WEAR YOUR ATTITUDE ✦",
          "LIMITED RUN OF 500 PIECES ✦",
          "100% HEAVYWEIGHT ORGANIC COTTON ✦",
          "FREE WORLDWIDE EXPRESS DELIVERY OVER $150 ✦",
          "NEW AW25 ARRIVALS DROPPING WEEKLY ✦",
        ]}
      />

      {/* ══════════════════════════════════════════════════════════════════
          CURATED CATEGORIES (3D Tilt Cards with Specular Glare)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: "var(--color-surface)", paddingBlock: 80, position: "relative" }}>
        <div className="container">
          <SectionHeading
            eyebrow="Curated Capsules"
            heading={"Explore By\nCategory."}
            sub="Engineered for everyday utility, statement presence, and timeless street credibility."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {[
              {
                title: "Heavy Outerwear",
                sub: "Parkas, Bombers & Tactical Shells",
                img: "/images/men-jacket.jpg",
                href: "/men",
                badge: "Winter Ready",
              },
              {
                title: "Signature Hoodies",
                sub: "480 GSM French Terry Fleece",
                img: "/images/men-hoodie.jpg",
                href: "/men",
                badge: "Best Seller",
              },
              {
                title: "Tactical Cargo & Pants",
                sub: "Engineered Utility Fit",
                img: "/images/men-cargo.jpg",
                href: "/men",
                badge: "Limited Drop",
              },
              {
                title: "Women's Statement",
                sub: "Avant-Garde Silhouettes",
                img: "/images/women-dress.jpg",
                href: "/women",
                badge: "New Release",
              },
            ].map((cat, i) => (
              <motion.div
                key={cat.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                transition={{ delay: i * 0.1 }}
              >
                <TiltCard maxTilt={8}>
                  <Link
                    href={cat.href}
                    onMouseEnter={() => sfx.hover()}
                    onClick={() => sfx.click()}
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: "3/4",
                        overflow: "hidden",
                        background: "#111",
                        border: "1px solid var(--color-border)",
                      }}
                      onMouseEnter={(e) => {
                        const img = e.currentTarget.querySelector("img");
                        if (img) img.style.transform = "scale(1.08)";
                      }}
                      onMouseLeave={(e) => {
                        const img = e.currentTarget.querySelector("img");
                        if (img) img.style.transform = "scale(1)";
                      }}
                    >
                      <Image
                        src={cat.img}
                        alt={cat.title}
                        fill
                        style={{
                          objectFit: "cover",
                          transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
                        }}
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
                        }}
                      />
                      <div style={{ position: "absolute", top: 16, left: 16 }}>
                        <span className="badge badge-new">{cat.badge}</span>
                      </div>
                      <div style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
                        <h3
                          className="font-display"
                          style={{
                            fontSize: 32,
                            color: "#ffffff",
                            lineHeight: 1,
                            marginBottom: 6,
                            letterSpacing: "0.04em",
                          }}
                        >
                          <ScrambleText text={cat.title} />
                        </h3>
                        <p
                          style={{
                            fontSize: 13,
                            color: "rgba(255,255,255,0.7)",
                            marginBottom: 16,
                          }}
                        >
                          {cat.sub}
                        </p>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            color: "var(--color-accent)",
                            fontSize: 12,
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                          }}
                        >
                          Shop Now <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FEATURED DROP (With Parallax Background Typography)
      ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={featuredRef}
        className="section"
        style={{ background: "var(--color-background)", position: "relative", overflow: "hidden" }}
      >
        {/* Giant Outlined Parallax Background Text */}
        <motion.div
          style={{
            x: bgTextX,
            position: "absolute",
            top: "15%",
            left: "-20%",
            whiteSpace: "nowrap",
            fontSize: "clamp(100px, 18vw, 240px)",
            fontWeight: 900,
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(0,0,0,0.06)",
            letterSpacing: "0.04em",
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 0,
          }}
          className="font-display"
        >
          KLUB ARCHIVE // AW25
        </motion.div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 40,
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <SectionHeading
              eyebrow="Season Drop"
              heading={"The Most\nWanted Pieces."}
              sub="Handpicked essentials selling out fast. Restocks are never guaranteed."
            />

            {/* Filter Tabs with animated pill */}
            <div
              style={{
                display: "flex",
                gap: 8,
                background: "var(--color-surface)",
                padding: 4,
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-border)",
              }}
            >
              {[
                { id: "all", label: "All Drops" },
                { id: "men", label: "Men's Edit" },
                { id: "women", label: "Women's Edit" },
                { id: "bestseller", label: "Bestsellers" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    sfx.switch();
                    setActiveTab(tab.id as any);
                  }}
                  onMouseEnter={() => sfx.hover()}
                  style={{
                    padding: "8px 18px",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    border: "none",
                    borderRadius: "var(--radius-sm)",
                    background: activeTab === tab.id ? "var(--color-primary)" : "transparent",
                    color: activeTab === tab.id ? "#ffffff" : "var(--color-muted)",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <motion.div
            key={activeTab}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {filteredProducts.slice(0, 8).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>

          {/* View All CTA */}
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Magnetic strength={0.3}>
              <Link
                href="/search"
                onMouseEnter={() => sfx.hover()}
                onClick={() => sfx.click()}
                className="btn btn-outline btn-lg"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                View Full Collection ({products.length} Items) <ArrowRight size={16} />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SPLIT GENDER EDITORIAL (Men & Women Dual Immersive)
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--color-primary)", overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            minHeight: "85vh",
          }}
        >
          {/* Men's Showcase */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            style={{ position: "relative", overflow: "hidden", minHeight: 480 }}
          >
            <Link
              href="/men"
              onMouseEnter={() => sfx.hover()}
              onClick={() => sfx.click()}
              style={{ display: "block", height: "100%", position: "relative" }}
            >
              <Image
                src="/images/men-jacket.jpg"
                alt="Shop Men's Streetwear"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  transition: "transform 0.8s ease",
                }}
                sizes="50vw"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)",
                }}
              />
              <div style={{ position: "absolute", bottom: 48, left: 40, right: 40 }}>
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
                  className="font-display"
                  style={{
                    fontSize: "clamp(56px, 7vw, 96px)",
                    color: "white",
                    lineHeight: 0.9,
                    marginBottom: 20,
                  }}
                >
                  MEN'S<br />
                  <span style={{ color: "var(--color-accent)" }}>COLLECTION</span>
                </h2>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 28px",
                    background: "var(--color-accent)",
                    color: "#000",
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
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
              minHeight: 480,
              borderLeft: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Link
              href="/women"
              onMouseEnter={() => sfx.hover()}
              onClick={() => sfx.click()}
              style={{ display: "block", height: "100%", position: "relative" }}
            >
              <Image
                src="/images/women-jacket.jpg"
                alt="Shop Women's Streetwear"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  transition: "transform 0.8s ease",
                }}
                sizes="50vw"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)",
                }}
              />
              <div style={{ position: "absolute", bottom: 48, left: 40, right: 40 }}>
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
                  className="font-display"
                  style={{
                    fontSize: "clamp(56px, 7vw, 96px)",
                    color: "white",
                    lineHeight: 0.9,
                    marginBottom: 20,
                  }}
                >
                  WOMEN'S<br />
                  <span style={{ color: "var(--color-accent)" }}>COLLECTION</span>
                </h2>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 28px",
                    background: "var(--color-accent)",
                    color: "#000",
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Shop Women <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          INTERACTIVE 3D DIGITAL ATELIER / MATERIAL LAB (With 360° Drag Orbit)
      ══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "#080808",
          paddingBlock: 100,
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Ambient colored lighting */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 550,
            height: 550,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${vaultColor}26 0%, transparent 70%)`,
            pointerEvents: "none",
            transition: "background 0.5s ease",
          }}
        />

        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 60,
              alignItems: "center",
            }}
          >
            {/* Left Controls & Story */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: "var(--color-accent)",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                <Sparkles size={14} /> Realtime 3D Digital Atelier
              </span>

              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(44px, 5vw, 76px)",
                  color: "#ffffff",
                  lineHeight: 0.95,
                  marginBottom: 20,
                }}
              >
                TOUCH THE<br />
                <span style={{ color: vaultColor, transition: "color 0.4s ease" }}>
                  FUTURE OF FABRIC.
                </span>
              </h2>

              <p
                style={{
                  color: "rgba(255,255,255,0.72)",
                  fontSize: 15,
                  lineHeight: 1.7,
                  marginBottom: 32,
                  maxWidth: 480,
                }}
              >
                Every garment begins in our 3D digital laboratory. <strong>Click and drag to rotate</strong> our
                deconstructed chrome core in full 360° 3D space, test shaders, and alter distortion.
              </p>

              {/* Color Switcher */}
              <div style={{ marginBottom: 28 }}>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: 12,
                  }}
                >
                  Choose Finish & Shader Tone:
                </p>
                <div style={{ display: "flex", gap: 14 }}>
                  {[
                    { name: "Acid Lime", hex: "#b5f000" },
                    { name: "Liquid Silver", hex: "#ffffff" },
                    { name: "Cyber Red", hex: "#ff3366" },
                    { name: "Electric Cyan", hex: "#00e5ff" },
                  ].map((color) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        sfx.switch();
                        setVaultColor(color.hex);
                      }}
                      onMouseEnter={() => sfx.hover()}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: color.hex,
                        border:
                          vaultColor === color.hex
                            ? "3px solid #ffffff"
                            : "2px solid rgba(255,255,255,0.2)",
                        boxShadow:
                          vaultColor === color.hex
                            ? `0 0 20px ${color.hex}`
                            : "none",
                        cursor: "pointer",
                        transform: vaultColor === color.hex ? "scale(1.15)" : "scale(1)",
                        transition: "all 0.25s ease",
                      }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Distort Slider */}
              <div style={{ marginBottom: 36, maxWidth: 320 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "rgba(255,255,255,0.65)",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  <span>Fabric Distortion</span>
                  <span>{Math.round(vaultDistort * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.05"
                  value={vaultDistort}
                  onChange={(e) => setVaultDistort(parseFloat(e.target.value))}
                  style={{
                    width: "100%",
                    accentColor: vaultColor,
                    cursor: "pointer",
                  }}
                />
              </div>

              <Magnetic strength={0.3}>
                <Link
                  href="/about"
                  onMouseEnter={() => sfx.hover()}
                  onClick={() => sfx.click()}
                  className="btn btn-outline"
                  style={{
                    color: "#ffffff",
                    borderColor: "rgba(255,255,255,0.3)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  Our Design Philosophy <ArrowRight size={16} />
                </Link>
              </Magnetic>
            </motion.div>

            {/* Right 3D Viewport with 360° Drag & Orbit Controls */}
            <TiltCard maxTilt={4}>
              <motion.div
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                style={{
                  position: "relative",
                  height: 460,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 6,
                  overflow: "hidden",
                  boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 40px ${vaultColor}15`,
                }}
              >
                <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
                  <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
                  <VaultObject color={vaultColor} distort={vaultDistort} />
                </Canvas>

                {/* 360 Drag Prompt */}
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 18,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(10px)",
                    padding: "4px 10px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    pointerEvents: "none",
                  }}
                >
                  <Move3d size={12} color="var(--color-accent)" /> Drag 360°
                </div>

                {/* Corner Info Overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "rgba(255,255,255,0.45)",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: vaultColor,
                      boxShadow: `0 0 8px ${vaultColor}`,
                    }}
                  />
                  Live WebGL Simulation // 60 FPS
                </div>
              </motion.div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MANIFESTO — Scroll-Scrubbed Text Illumination
      ══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "var(--color-primary)",
          paddingBlock: 120,
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
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              marginBottom: 20,
            }}
          >
            — KLUB MANIFESTO —
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="font-display"
            style={{
              fontSize: "clamp(56px, 11vw, 150px)",
              color: "#ffffff",
              lineHeight: 0.9,
              letterSpacing: "0.01em",
              marginBottom: 32,
            }}
          >
            NOT MADE TO<br />
            <span style={{ color: "var(--color-accent)" }}>BLEND IN.</span>
          </motion.h2>

          {/* Scroll-Driven Scrubbing Paragraph */}
          <ScrollHighlightText
            text="We don't manufacture trends. We forge cultural armor. Every stitch is calculated, every silhouette intentional. For those who stand tall when the crowd steps aside."
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}
          >
            <Magnetic strength={0.3}>
              <Link
                href="/search"
                onMouseEnter={() => sfx.hover()}
                onClick={() => sfx.click()}
                className="btn btn-accent btn-lg"
                style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
              >
                Shop All Releases <ArrowRight size={18} />
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link
                href="/about"
                onMouseEnter={() => sfx.hover()}
                onClick={() => sfx.click()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "16px 32px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Read The Brand Story
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BEST SELLERS (Community Approved)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: "var(--color-background)" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 40,
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <SectionHeading
              eyebrow="Community Favorites"
              heading={"Essential\nBestsellers."}
              sub="The iconic pieces that built the reputation."
            />
            <Magnetic strength={0.25}>
              <Link
                href="/search?filter=bestsellers"
                onMouseEnter={() => sfx.hover()}
                onClick={() => sfx.click()}
                className="btn btn-outline"
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                View All Bestsellers <ArrowRight size={16} />
              </Link>
            </Magnetic>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 24,
            }}
          >
            {bestSellers.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BRAND PILLARS & TRUST GUARANTEE
      ══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          paddingBlock: 50,
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 32,
            }}
          >
            {[
              {
                icon: Truck,
                title: "Complimentary Shipping",
                desc: "Free express dispatch worldwide on all orders over $150.",
              },
              {
                icon: ShieldCheck,
                title: "100% Authentic Drop",
                desc: "Certified original design and heavyweight custom fabrication.",
              },
              {
                icon: RotateCcw,
                title: "30-Day Hassle-Free Returns",
                desc: "Easy exchanges and direct returns with prepaid labels.",
              },
              {
                icon: Zap,
                title: "Priority VIP Concierge",
                desc: "24/7 styling assistance and drop early-access support.",
              },
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "var(--radius-sm)",
                      background: "var(--color-accent)",
                      color: "#000000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 4,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h4 style={{ fontSize: 16, fontWeight: 800 }}>{pillar.title}</h4>
                  <p style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.6 }}>
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MARQUEE STRIP 2 (Dark)
      ══════════════════════════════════════════════════════════════════ */}
      <Marquee
        items={[
          "JOIN THE KLUB INNER CIRCLE ✦",
          "EXCLUSIVE ACCESS TO SECRET DROPS ✦",
          "MEMBER ONLY DISCOUNTS ✦",
          "ARCHIVE ACCESS ✦",
        ]}
        dark
        speed={30}
      />

      {/* ══════════════════════════════════════════════════════════════════
          NEWSLETTER / VIP DROP ACCESS
      ══════════════════════════════════════════════════════════════════ */}
      <Newsletter />
    </div>
  );
}

// ─── VIP Newsletter Component ────────────────────────────────────────────────
function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      sfx.click();
      setSubscribed(true);
    }
  };

  return (
    <section className="section" style={{ background: "var(--color-surface)" }}>
      <div className="container">
        <div
          style={{
            background: "var(--color-accent)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 48,
            alignItems: "center",
            padding: "64px 48px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background Text watermark */}
          <span
            className="font-display"
            style={{
              position: "absolute",
              right: -20,
              bottom: -40,
              fontSize: "clamp(120px, 20vw, 240px)",
              lineHeight: 1,
              color: "rgba(0,0,0,0.06)",
              pointerEvents: "none",
              userSelect: "none",
              letterSpacing: "-0.05em",
            }}
          >
            KLUB
          </span>

          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            style={{ position: "relative" }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.6)",
                marginBottom: 10,
              }}
            >
              VIP Membership
            </p>
            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                marginBottom: 14,
                lineHeight: 1.05,
                color: "#000000",
              }}
            >
              First access.<br />No compromises.
            </h2>
            <p style={{ fontSize: 15, color: "rgba(0,0,0,0.7)", lineHeight: 1.6, maxWidth: 440 }}>
              Join the private list. Get password-protected access to limited capsule drops 1 hour
              before public launch, plus 15% off your first order.
            </p>

            <div style={{ display: "flex", gap: 20, marginTop: 24, flexWrap: "wrap" }}>
              {[
                { icon: Zap, label: "Secret Drop Pass" },
                { icon: Star, label: "15% Off Code" },
                { icon: TrendingUp, label: "VIP Restock Alerts" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "rgba(0,0,0,0.75)",
                  }}
                >
                  <Icon size={14} />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            style={{ position: "relative" }}
          >
            {subscribed ? (
              <div
                style={{
                  background: "#000000",
                  color: "#ffffff",
                  padding: "36px 32px",
                  textAlign: "center",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <Check size={24} />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
                  YOU'RE ON THE LIST.
                </h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                  Check your inbox for your 15% VIP discount code and secret drop credentials.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="form-input"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    border: "1.5px solid rgba(0,0,0,0.15)",
                    borderRadius: "var(--radius-sm)",
                    color: "#000",
                    fontSize: 15,
                  }}
                />
                <Magnetic strength={0.25}>
                  <button
                    type="submit"
                    onMouseEnter={() => sfx.hover()}
                    className="btn btn-primary btn-lg"
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      width: "100%",
                    }}
                  >
                    Join The Inner Circle →
                  </button>
                </Magnetic>
                <p style={{ fontSize: 11, color: "rgba(0,0,0,0.5)", textAlign: "center" }}>
                  Zero spam. Exclusive drops only. Unsubscribe at any time.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
