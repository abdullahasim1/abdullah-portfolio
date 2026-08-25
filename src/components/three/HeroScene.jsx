import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Stars,
  Sparkles,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Laptop from "./Laptop";
import { scrollState } from "../../lib/scrollState";

gsap.registerPlugin(ScrollTrigger);

/* Camera drifts subtly toward the cursor — cinematic parallax.
   Scroll ke saath dolly-out bhi karta hai (hero se door hote hue) */
function CameraRig(pointerRef) {
  const { camera } = useThree();
  useFrame(() => {
    const { x, y } = pointerRef.current;
    const sp = scrollState.hero.value;
    camera.position.x += (x * 0.9 - camera.position.x) * 0.04;
    camera.position.y += (y * 0.5 + sp * 0.55 - camera.position.y) * 0.04;
    camera.position.z += (7 + sp * 2.4 - camera.position.z) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* Orbiting glass orbs — physical material w/ transmission */
function GlassOrb({ radius, speed, size, color, reduced }) {
  const ref = useRef(null);
  const offset = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (reduced || !ref.current) return;
    const t = state.clock.elapsedTime * speed + offset.current;
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 1.35) * radius * 0.32,
      Math.sin(t) * radius
    );
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 48, 48]} />
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.35}
        metalness={0}
        roughness={0.06}
        transmission={0.92}
        thickness={1.4}
        ior={1.45}
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

/* Thin neon orbit rings */
function Ring({ radius, tilt, color, opacity, speed, reduced }) {
  const ref = useRef(null);

  useFrame((state, delta) => {
    if (reduced || !ref.current) return;
    ref.current.rotation.z += delta * speed;
  });

  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.008, 8, 160]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function SceneContent({ pointerRef, reduced }) {
  const groupRef = useRef(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (reduced || !groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.z = Math.sin(t * 0.25) * 0.08;
    groupRef.current.position.y = Math.sin(t * 0.7) * 0.1;
  });

  // Shift cluster right on wide screens so it sits beside the hero copy
  const offsetX = viewport.width > 9 ? 2.2 : viewport.width > 6.5 ? 1.15 : 0;
  const scale = viewport.width > 9 ? 1 : viewport.width > 6.5 ? 0.85 : 0.7;

  return (
    <>
      <CameraRig {...pointerRef} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} color="#bae6fd" />

      <group ref={groupRef} position={[offsetX, 0, 0]} scale={scale}>
        <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.5}>
          <Laptop pointerRef={pointerRef} reduced={reduced} />
          <Ring radius={2.5} tilt={[Math.PI / 2.3, 0.2, 0]} color="#22d3ee" opacity={0.55} speed={0.35} reduced={reduced} />
          <Ring radius={2.95} tilt={[Math.PI / 2.8, -0.45, 0]} color="#a78bfa" opacity={0.38} speed={-0.22} reduced={reduced} />
          <Ring radius={2.1} tilt={[Math.PI / 1.9, 0.6, 0]} color="#67e8f9" opacity={0.25} speed={0.5} reduced={reduced} />
          <GlassOrb radius={2.5} speed={0.5} size={0.14} color="#67e8f9" reduced={reduced} />
          <GlassOrb radius={2.95} speed={0.36} size={0.11} color="#c4b5fd" reduced={reduced} />
          <GlassOrb radius={2.1} speed={0.62} size={0.08} color="#e0f2fe" reduced={reduced} />
        </Float>
      </group>

      {/* Studio environment — generated locally via Lightformers (no HDR download) */}
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#05060a"]} />
        <Lightformer intensity={7} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[12, 12, 1]} color="#22d3ee" />
        <Lightformer intensity={3.5} position={[-6, 1, -1]} rotation-y={Math.PI / 2} scale={[7, 2, 1]} color="#8b5cf6" />
        <Lightformer intensity={2.5} position={[6, -1, -1]} rotation-y={-Math.PI / 2} scale={[7, 2, 1]} color="#38bdf8" />
        <Lightformer intensity={1.5} position={[0, -4, 3]} scale={[8, 2, 1]} color="#c084fc" />
      </Environment>

      {!reduced && (
        <>
          <Stars radius={90} depth={50} count={2400} factor={3.2} saturation={0.4} fade speed={0.55} />
          <Sparkles count={70} scale={[11, 7, 6]} size={2.2} speed={0.3} color="#67e8f9" opacity={0.5} />
          <Sparkles count={40} scale={[13, 8, 6]} size={3.4} speed={0.22} color="#c084fc" opacity={0.38} />
        </>
      )}
      <fog attach="fog" args={["#05060a", 10, 26]} />
    </>
  );
}

export default function HeroScene() {
  const pointerRef = useRef({ x: 0, y: 0 });

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const onMove = (e) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  /* Scroll-linked 3D: #home ke scroll-out progress (0→1) ko shared
     state mein likhte hain — Laptop aur CameraRig useFrame mein padhte hain */
  useEffect(() => {
    if (reduced) return undefined;

    const st = ScrollTrigger.create({
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        scrollState.hero.value = self.progress;
      },
    });

    return () => st.kill();
  }, [reduced]);

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.4, 7], fov: 42 }}
        dpr={[1, 1.75]}
        frameloop={reduced ? "demand" : "always"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <SceneContent pointerRef={pointerRef} reduced={reduced} />
      </Canvas>
    </div>
  );
}
