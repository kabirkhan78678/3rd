"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animations";

export default function HeroSection() {
  const [mediaMode, setMediaMode] = useState<"video" | "image">("video");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.1]);

  const togglePlay = () => {
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
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        minHeight: 640,
        maxHeight: 1080,
        overflow: "hidden",
        background: "var(--color-background, #ffffff)",
      }}
    >
      {/* Background Media Container */}
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

      {/* Top Subtle Vignette for Navbar readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 180,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 60%, transparent 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Bottom Rich Light Gradient for Editorial Typography & Seamless Page Blend */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "70%",
          background:
            "linear-gradient(to top, var(--color-background, #ffffff) 0%, rgba(255,255,255,0.88) 32%, rgba(255,255,255,0.25) 72%, transparent 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Left Subtle Glow for text contrast */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.3) 48%, transparent 78%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Media Controls Pill (Cleanly positioned below navbar) */}
      <div
        className="absolute top-[120px] md:top-[132px] right-3 sm:right-6 md:right-8 z-20 flex items-center gap-1.5 sm:gap-2 bg-white/85 backdrop-blur-md p-1 sm:p-1.5 rounded-full border border-black/10 shadow-lg scale-90 sm:scale-100 origin-right"
      >
        {/* Mode Switcher */}
        <button
          onClick={() => setMediaMode("video")}
          style={{
            background: mediaMode === "video" ? "var(--color-accent)" : "transparent",
            color: mediaMode === "video" ? "#0a1315" : "var(--color-muted, #4b5563)",
            border: "none",
            borderRadius: 999,
            padding: "4px 10px",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <Play size={10} fill={mediaMode === "video" ? "#0a1315" : "transparent"} /> Video
        </button>
        <button
          onClick={() => setMediaMode("image")}
          style={{
            background: mediaMode === "image" ? "var(--color-accent)" : "transparent",
            color: mediaMode === "image" ? "#0a1315" : "var(--color-muted, #4b5563)",
            border: "none",
            borderRadius: 999,
            padding: "4px 10px",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          Photo
        </button>

        {/* Video Play/Pause & Mute when in video mode */}
        {mediaMode === "video" && (
          <>
            <div style={{ width: 1, height: 14, background: "rgba(0,0,0,0.12)" }} />
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause Video" : "Play Video"}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--color-text, #0a1315)",
                padding: 3,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            </button>
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute Video" : "Mute Video"}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--color-text, #0a1315)",
                padding: 3,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>
          </>
        )}
      </div>

      {/* Hero Editorial Content */}
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
          paddingBottom: 64,
        }}
        className="container"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: 840 }}
        >
          {/* Season Badge */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                background: "var(--color-accent)",
                color: "#0a1315",
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "4px 10px",
                borderRadius: 2,
              }}
            >
              AW25 DROP 01
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-muted, #4b5563)",
              }}
            >
              STRICTLY LIMITED CAPSULE
            </span>
          </motion.div>

          {/* Giant Title */}
          <motion.h1
            variants={fadeUp}
            className="font-display"
            style={{
              fontSize: "clamp(48px, 10vw, 140px)",
              color: "var(--color-text, #0a1315)",
              lineHeight: 0.9,
              letterSpacing: "0.02em",
              marginBottom: 20,
              textTransform: "uppercase",
              textShadow: "0 2px 20px rgba(255,255,255,0.8)",
            }}
          >
            WEAR{" "}
            <span
              style={{
                color: "var(--color-accent)",
                WebkitTextStroke: "1px var(--color-accent)",
                filter: "drop-shadow(0 0 20px var(--color-accent-glow, rgba(0, 194, 203, 0.4)))",
              }}
            >
              YOUR
            </span>
            <br />
            ATTITUDE.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "clamp(14px, 1.8vw, 18px)",
              color: "var(--color-muted, #4b5563)",
              fontWeight: 500,
              lineHeight: 1.6,
              maxWidth: 580,
              marginBottom: 28,
            }}
          >
            Unapologetic streetwear designed for those who define the culture.
            Heavyweight bespoke fabrics, architectural silhouettes, and limited drops.
          </motion.p>

          {/* CTA Buttons (Mobile Responsive) */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full sm:w-auto"
          >
            <Link
              href="/search"
              className="btn btn-accent btn-lg justify-center text-center"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: "0.1em",
                boxShadow: "0 8px 30px var(--color-accent-glow, rgba(0, 194, 203, 0.35))",
              }}
            >
              Shop Collection <ArrowRight size={18} />
            </Link>
            <div className="flex gap-3 w-full sm:w-auto">
              <Link
                href="/men"
                className="flex-1 sm:flex-none justify-center text-center py-3.5 px-6 sm:px-7 rounded-none backdrop-blur-md"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.75)",
                  border: "1px solid var(--color-border, #d1d5db)",
                  color: "var(--color-text, #0a1315)",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  transition: "all 0.25s ease",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ffffff";
                  e.currentTarget.style.borderColor = "var(--color-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.75)";
                  e.currentTarget.style.borderColor = "var(--color-border, #d1d5db)";
                }}
              >
                Men&apos;s Edit
              </Link>
              <Link
                href="/women"
                className="flex-1 sm:flex-none justify-center text-center py-3.5 px-6 sm:px-7 rounded-none backdrop-blur-md"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.75)",
                  border: "1px solid var(--color-border, #d1d5db)",
                  color: "var(--color-text, #0a1315)",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  transition: "all 0.25s ease",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ffffff";
                  e.currentTarget.style.borderColor = "var(--color-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.75)";
                  e.currentTarget.style.borderColor = "var(--color-border, #d1d5db)";
                }}
              >
                Women&apos;s Edit
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Cue (Centered Bottom) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="hidden sm:flex absolute bottom-5 left-1/2 -translate-x-1/2 flex-col items-center gap-1 z-10 pointer-events-none"
      >
        <span
          style={{
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: "0.25em",
            color: "var(--color-muted, #6b7280)",
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
  );
}
