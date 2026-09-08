"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { slideInLeft, slideInRight, VIEWPORT_ONCE } from "@/lib/animations";
import { environment } from "@/environment";

function cleanHex(c: string): string {
  if (!c) return environment.colors.accent || "#00c2cb";
  const str = c.trim();
  if (str.startsWith("#") && str.length === 9) {
    return str.slice(0, 7);
  }
  if (!str.startsWith("#") && (str.length === 6 || str.length === 3)) {
    return `#${str}`;
  }
  return str;
}

function VaultObject({ color, distort }: { color: string; distort: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const safeColor = cleanHex(color);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.35;
      meshRef.current.rotation.y += delta * 0.45;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh ref={meshRef}>
          <Sphere args={[1.3, 64, 64]}>
            <MeshDistortMaterial
              color={safeColor}
              distort={distort}
              speed={2.2}
              roughness={0.08}
              metalness={0.92}
            />
          </Sphere>
        </mesh>
      </Float>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-4, -3, -2]} intensity={3} color={safeColor} />
    </>
  );
}

export default function Atelier3DSection() {
  const [vaultColor, setVaultColor] = useState(environment.colors.accent);
  const [vaultDistort, setVaultDistort] = useState(0.4);

  return (
    <section
      style={{
        background: "#080808",
        paddingBlock: 80,
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Subtle background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 500,
          height: 500,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${vaultColor}22 0%, transparent 70%)`,
          pointerEvents: "none",
          transition: "background 0.5s ease",
        }}
      />

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
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
                marginBottom: 14,
              }}
            >
              <Sparkles size={14} /> The 3D Digital Atelier
            </span>

            <h2
              className="font-display text-4xl sm:text-5xl lg:text-7xl text-white leading-[0.95] mb-5"
            >
              TOUCH THE<br />
              <span style={{ color: vaultColor, transition: "color 0.4s ease" }}>
                FUTURE OF FABRIC.
              </span>
            </h2>

            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 14,
                lineHeight: 1.7,
                marginBottom: 28,
                maxWidth: 480,
              }}
            >
              Every garment begins in our 3D digital laboratory. Interact with our live
              deconstructed material core — custom rendered in real-time with distorted
              metallic micro-reflection.
            </p>

            {/* Color Switcher */}
            <div style={{ marginBottom: 24 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 10,
                }}
              >
                Choose Finish & Shader Tone:
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[
                  { name: "Brand Theme", hex: environment.colors.accent },
                  { name: "Liquid Silver", hex: "#ffffff" },
                  { name: "Cyber Red", hex: "#ff3366" },
                  { name: "Electric Cyan", hex: "#00e5ff" },
                ].map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setVaultColor(color.hex)}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: color.hex,
                      border:
                        vaultColor === color.hex
                          ? "3px solid #ffffff"
                          : "2px solid rgba(255,255,255,0.2)",
                      cursor: "pointer",
                      transform: vaultColor === color.hex ? "scale(1.12)" : "scale(1)",
                      transition: "all 0.2s ease",
                    }}
                    title={color.name}
                    aria-label={`Select ${color.name} shader`}
                  />
                ))}
              </div>
            </div>

            {/* Distort Slider */}
            <div style={{ marginBottom: 32, maxWidth: 320 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "rgba(255,255,255,0.6)",
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

            <Link
              href="/about"
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
          </motion.div>

          {/* Right 3D Viewport */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="relative h-[320px] sm:h-[400px] lg:h-[440px] bg-white/[0.02] border border-white/10 rounded-sm overflow-hidden"
          >
            <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }}>
              <VaultObject color={vaultColor} distort={vaultDistort} />
            </Canvas>

            {/* Corner Info Overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 14,
                left: 16,
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
                }}
              />
              Live WebGL 3D // Material Lab
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
