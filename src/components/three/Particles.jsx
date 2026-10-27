import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Particle core — laptop ki jagah: ek rotating sphere of glowing particles
   plus ek scattered halo cloud. Cyan / violet palette, additive blending.
   Positions useMemo mein ek dafa bante hain; sirf rotation animate hota hai. */

const CORE_COUNT = 1400;
const HALO_COUNT = 500;

function spherePositions(count, radius, jitter) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Fibonacci sphere — even distribution
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
    const r = radius + (Math.random() - 0.5) * jitter;
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.cos(phi);
    arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }
  return arr;
}

function haloPositions(count, spread) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (Math.random() - 0.5) * spread;
    arr[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.62;
    arr[i * 3 + 2] = (Math.random() - 0.5) * spread;
  }
  return arr;
}

export default function Particles({ reduced = false }) {
  const coreRef = useRef(null);
  const haloRef = useRef(null);

  const core = useMemo(() => spherePositions(CORE_COUNT, 1.55, 0.35), []);
  const halo = useMemo(() => haloPositions(HALO_COUNT, 6.4), []);

  useFrame((state, delta) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.16;
      coreRef.current.rotation.x = Math.sin(t * 0.22) * 0.18;
    }
    if (haloRef.current) {
      haloRef.current.rotation.y -= delta * 0.045;
    }
  });

  return (
    <group>
      <points ref={coreRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[core, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#67e8f9"
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points ref={haloRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[halo, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#c4b5fd"
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
