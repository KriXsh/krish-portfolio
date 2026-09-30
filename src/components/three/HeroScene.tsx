"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/** Deterministic PRNG so the particle field is identical on every render. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ParticleField({ count, light }: { count: number; light: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const rand = mulberry32(7);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Points on a thick spherical shell around the core.
      const r = 3 + rand() * 5;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.025;
    ref.current.rotation.x += delta * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      {/* Additive glow disappears on a light background, so light mode uses solid indigo dots. */}
      <pointsMaterial
        size={light ? 0.032 : 0.028}
        color={light ? "#6366f1" : "#a5b4fc"}
        transparent
        opacity={light ? 0.55 : 0.75}
        sizeAttenuation
        depthWrite={false}
        blending={light ? THREE.NormalBlending : THREE.AdditiveBlending}
      />
    </points>
  );
}

/** A studio built from glowing panels, rendered once into an env map, so the
    core has something coloured to reflect. Nothing is downloaded. */
function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer form="rect" intensity={3} color="#818cf8" position={[3, 3, 3]} scale={[6, 2, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
      <Lightformer form="rect" intensity={2.5} color="#06b6d4" position={[-4, -1, 2]} scale={[4, 4, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
      <Lightformer form="ring" intensity={4} color="#c084fc" position={[0, 4, -3]} scale={3} onUpdate={(self) => self.lookAt(0, 0, 0)} />
      <Lightformer form="rect" intensity={1.2} color="#f8fafc" position={[0, -4, 4]} scale={[8, 1, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
    </Environment>
  );
}

function Core({ light }: { light: boolean }) {
  const shell = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.12;
      shell.current.rotation.x += delta * 0.05;
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.18;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.12;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.1}>
      <mesh>
        <icosahedronGeometry args={[1.35, 24]} />
        {/* Light mode gets a pale lavender finish so dark headline text stays readable over it. */}
        <MeshDistortMaterial
          color={light ? "#c7d2fe" : "#3b35c9"}
          emissive={light ? "#6366f1" : "#120f3a"}
          emissiveIntensity={light ? 0.12 : 0.4}
          roughness={light ? 0.18 : 0.08}
          metalness={light ? 0.2 : 0.85}
          clearcoat={1}
          clearcoatRoughness={0.15}
          envMapIntensity={1.4}
          distort={0.38}
          speed={1.6}
        />
      </mesh>

      <mesh ref={shell}>
        <icosahedronGeometry args={[2.05, 1]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={light ? 0.3 : 0.16} />
      </mesh>

      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[2.7, 0.008, 16, 220]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.7} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.7, -0.5, 0.4]}>
        <torusGeometry args={[3.2, 0.005, 16, 220]} />
        <meshBasicMaterial color={light ? "#6366f1" : "#a5b4fc"} transparent opacity={light ? 0.45 : 0.35} />
      </mesh>
    </Float>
  );
}

/** Leans the whole scene toward the pointer. */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    const k = 1 - Math.exp(-delta * 3);
    group.current.rotation.y += (state.pointer.x * 0.45 - group.current.rotation.y) * k;
    group.current.rotation.x += (-state.pointer.y * 0.3 - group.current.rotation.x) * k;
  });
  return <group ref={group}>{children}</group>;
}

export default function HeroScene({
  active = true,
  lite = false,
  theme = "dark",
}: {
  active?: boolean;
  lite?: boolean;
  theme?: "light" | "dark";
}) {
  const light = theme === "light";
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, lite ? 1.25 : 1.75]}
      camera={{ position: [0, 0, 7.5], fov: 42 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 4]} intensity={60} color="#818cf8" />
      <pointLight position={[-5, -2, 3]} intensity={45} color="#06b6d4" />
      <pointLight position={[0, 4, -4]} intensity={35} color="#c084fc" />
      <Studio />
      <Rig>
        <group scale={lite ? 0.72 : 1} position={lite ? [0, 0.6, 0] : [0, 0, 0]}>
          <Core light={light} />
        </group>
        <ParticleField count={lite ? 600 : 1600} light={light} />
      </Rig>
    </Canvas>
  );
}
