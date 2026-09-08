"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 100, color = "#b5f000" }: { count?: number; color?: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { mouse } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate random positions, scales, and speeds
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 80;
      const speed = 0.005 + Math.random() * 0.015;
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 8;
      const scale = 0.03 + Math.random() * 0.06;
      temp.push({ t, factor, speed, x, y, z, scale });
    }
    return temp;
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    particles.forEach((particle, i) => {
      particle.t += particle.speed;

      // Gentle floating orbital drift
      const x = particle.x + Math.cos(particle.t) * 0.4 + mouse.x * 0.8;
      const y = particle.y + Math.sin(particle.t) * 0.4 - mouse.y * 0.6;
      const z = particle.z + Math.cos(particle.t * 0.5) * 0.3;

      dummy.position.set(x, y, z);
      dummy.rotation.x += delta * 0.5;
      dummy.rotation.y += delta * 0.8;
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
}

function FloatingRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((_, delta) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.x += delta * 0.2 + mouse.y * 0.005;
    ringRef.current.rotation.y += delta * 0.25 + mouse.x * 0.005;
    ringRef.current.position.x = THREE.MathUtils.lerp(ringRef.current.position.x, mouse.x * 0.5, 0.05);
    ringRef.current.position.y = THREE.MathUtils.lerp(ringRef.current.position.y, mouse.y * 0.5, 0.05);
  });

  return (
    <mesh ref={ringRef} position={[4, -1, -2]}>
      <torusGeometry args={[2.5, 0.02, 16, 100]} />
      <meshBasicMaterial color="#b5f000" transparent opacity={0.25} wireframe />
    </mesh>
  );
}

export default function HeroParticleCloud({ color = "#b5f000" }: { color?: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-5, -5, -3]} intensity={3} color={color} />
        <Particles count={85} color={color} />
        <FloatingRing />
      </Canvas>
    </div>
  );
}
