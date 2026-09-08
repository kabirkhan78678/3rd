"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// ─── 1. Magnetic Button / Element ─────────────────────────────────────────────
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 180, damping: 14 });
  const springY = useSpring(y, { stiffness: 180, damping: 14 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
        display: "inline-block",
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── 2. 3D Perspective Tilt Card with Specular Glare ──────────────────────────
export function TiltCard({
  children,
  maxTilt = 10,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  maxTilt?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springRotateX = useSpring(rotateX, { stiffness: 220, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 220, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;

    rotateX.set((0.5 - yPos) * maxTilt * 2);
    rotateY.set((xPos - 0.5) * maxTilt * 2);

    glareX.set(xPos * 100);
    glareY.set(yPos * 100);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        rotateX: springRotateX,
        rotateY: springRotateY,
        position: "relative",
        ...style,
      }}
      className={className}
    >
      {children}

      {/* Dynamic Specular Sheen Glare */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 20,
          background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.12) 0%, transparent 65%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          mixBlendMode: "overlay",
        }}
      />
    </motion.div>
  );
}

// ─── 3. Masked Kinetic Typography Reveal ───────────────────────────────────────
export function KineticLine({
  text,
  highlightWord = "",
  highlightColor = "var(--color-accent)",
  delay = 0,
  fontSize = "clamp(56px, 11vw, 150px)",
}: {
  text: string;
  highlightWord?: string;
  highlightColor?: string;
  delay?: number;
  fontSize?: string;
}) {
  const words = text.split(" ");

  return (
    <div
      style={{
        overflow: "hidden",
        display: "block",
        lineHeight: 0.92,
        paddingBottom: "0.08em",
      }}
    >
      <motion.div
        initial={{ y: "115%", rotate: 2, opacity: 0 }}
        animate={{ y: "0%", rotate: 0, opacity: 1 }}
        transition={{
          duration: 0.95,
          delay,
          ease: [0.215, 0.61, 0.355, 1],
        }}
        className="font-display"
        style={{
          fontSize,
          letterSpacing: "0.02em",
          textTransform: "uppercase",
          willChange: "transform",
        }}
      >
        {words.map((word, index) => {
          const isHighlight = word.toUpperCase() === highlightWord.toUpperCase();
          return (
            <span
              key={index}
              style={{
                color: isHighlight ? highlightColor : "#ffffff",
                display: "inline-block",
                marginRight: "0.22em",
                filter: isHighlight
                  ? "drop-shadow(0 0 24px rgba(181,240,0,0.45))"
                  : "drop-shadow(0 4px 18px rgba(0,0,0,0.5))",
                transition: "color 0.3s ease",
              }}
            >
              {word}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}

// ─── 4. Scroll-Driven Word-by-Word Highlight Scrubbing ────────────────────────
export function ScrollHighlightText({
  text,
  highlightColor = "var(--color-accent)",
}: {
  text: string;
  highlightColor?: string;
}) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.25em 0.35em",
        fontSize: "clamp(18px, 2.6vw, 32px)",
        fontWeight: 700,
        lineHeight: 1.45,
        maxWidth: 820,
        margin: "0 auto 40px",
        textAlign: "center",
      }}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <WordHighlight
            key={i}
            word={word}
            range={[start, end]}
            progress={scrollYProgress}
            highlightColor={highlightColor}
          />
        );
      })}
    </p>
  );
}

function WordHighlight({
  word,
  range,
  progress,
  highlightColor,
}: {
  word: string;
  range: [number, number];
  progress: any;
  highlightColor: string;
}) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  const isAccent = ["CULTURAL", "ARMOR.", "NOT", "BLEND", "IN."].includes(word.toUpperCase());

  return (
    <motion.span
      style={{
        opacity,
        color: isAccent ? highlightColor : "#ffffff",
        transition: "opacity 0.2s ease",
      }}
    >
      {word}
    </motion.span>
  );
}

// ─── 5. Streetwear Drop Countdown Timer ────────────────────────────────────────
export function DropCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: "02",
    hours: "18",
    minutes: "44",
    seconds: "59",
  });

  useEffect(() => {
    // Set a target 3 days out
    const target = new Date();
    target.setDate(target.getDate() + 3);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.max(0, target.getTime() - now.getTime());

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(181,240,0,0.3)",
        padding: "8px 16px",
        borderRadius: 999,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--color-accent)",
          boxShadow: "0 0 10px var(--color-accent)",
          animation: "pulse 1.8s infinite",
        }}
      />
      <span
        style={{
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.7)",
        }}
      >
        AW25 DROP 01 CLOSES IN:
      </span>
      <div
        style={{
          display: "flex",
          gap: 4,
          fontFamily: "var(--font-dm-mono, monospace)",
          fontSize: 12,
          fontWeight: 700,
          color: "var(--color-accent)",
        }}
      >
        <span>{timeLeft.days}D</span>:<span>{timeLeft.hours}H</span>:
        <span>{timeLeft.minutes}M</span>:
        <motion.span
          key={timeLeft.seconds}
          initial={{ y: -4, opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {timeLeft.seconds}S
        </motion.span>
      </div>
    </div>
  );
}

// ─── 6. Audio Equalizer Waveform Bars ──────────────────────────────────────────
export function AudioBars({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 12, width: 14 }}>
      {[0.4, 0.8, 1, 0.6].map((multiplier, i) => (
        <motion.div
          key={i}
          style={{
            width: 2,
            background: "var(--color-accent)",
            borderRadius: 1,
          }}
          animate={
            isPlaying
              ? {
                  height: [4, 12 * multiplier, 6, 12, 3],
                }
              : { height: 3 }
          }
          transition={
            isPlaying
              ? {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 0.4 + i * 0.15,
                  ease: "easeInOut",
                }
              : { duration: 0.2 }
          }
        />
      ))}
    </div>
  );
}

// ─── 7. Safe 3D Hologram Badge (Corner of Hero) ───────────────────────────────
function FloatingGem() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.6;
      meshRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <>
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial
            color="#b5f000"
            metalness={0.95}
            roughness={0.05}
            distort={0.3}
            speed={3}
            wireframe={false}
          />
        </mesh>
      </Float>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 3, 3]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-3, -2, -2]} intensity={3} color="#b5f000" />
    </>
  );
}

export function Hero3DBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      style={{
        position: "absolute",
        bottom: 80,
        right: 28,
        zIndex: 10,
        width: 140,
        height: 140,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: "var(--radius-sm)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
      }}
      className="hidden lg:flex"
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 8,
          fontWeight: 800,
          letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.5)",
          textTransform: "uppercase",
        }}
      >
        <span>3D ATELIER</span>
        <span style={{ color: "var(--color-accent)" }}>● LIVE</span>
      </div>

      <div style={{ width: 80, height: 80 }}>
        <Canvas camera={{ position: [0, 0, 2.6], fov: 45 }}>
          <FloatingGem />
        </Canvas>
      </div>

      <span
        style={{
          fontSize: 8,
          fontWeight: 700,
          letterSpacing: "0.12em",
          color: "rgba(255,255,255,0.7)",
          textTransform: "uppercase",
        }}
      >
        CHROME TOKEN
      </span>
    </motion.div>
  );
}
