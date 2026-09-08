"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ShoppingBag, ArrowRight } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { staggerContainer, fadeUp } from "@/lib/animations";

function NotFoundScene() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (mesh.current) {
      mesh.current.rotation.x = s.clock.getElapsedTime() * 0.2;
      mesh.current.rotation.y = s.clock.getElapsedTime() * 0.3;
    }
  });
  return (
    <>
      <Float speed={1.5} floatIntensity={0.8}>
        <mesh ref={mesh}>
          <torusKnotGeometry args={[1.2, 0.35, 200, 20]} />
          <MeshDistortMaterial color="#b5f000" distort={0.3} speed={2} roughness={0.1} metalness={0.9} />
        </mesh>
      </Float>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#b5f000" />
      <pointLight position={[-3, -3, 2]} intensity={1} color="#ffffff" />
    </>
  );
}

export default function NotFoundPage() {
  return (
    <div style={{ paddingTop: 80, minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          {/* Text */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 16 }}>
              Error 404
            </motion.p>
            <motion.div variants={fadeUp}>
              <span
                className="error-404 font-display"
                style={{ display: "block", color: "var(--color-surface)", WebkitTextStroke: "2px var(--color-border)" }}
              >
                404
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16, marginTop: -16 }}>
              Page Not Found.
            </motion.h1>
            <motion.p variants={fadeUp} style={{ color: "var(--color-muted)", fontSize: 16, lineHeight: 1.7, marginBottom: 32, maxWidth: 380 }}>
              Looks like this page got lost in the drip. Don't worry — our full collection is still right here.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/" className="btn btn-primary btn-lg" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <Home size={18} /> Go Home
              </Link>
              <Link href="/men" className="btn btn-outline btn-lg" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <ShoppingBag size={18} /> Shop Men
              </Link>
              <Link href="/women" className="btn btn-outline btn-lg" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                Shop Women <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>

          {/* 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ height: 500 }}
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <NotFoundScene />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
