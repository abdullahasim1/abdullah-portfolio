import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import useInViewport from "../../hooks/useInViewport";

/* Holographic orb — wireframe shell + pulsing core + orbit ring */
function Orb() {
  const outer = useRef(null);
  const core = useRef(null);
  const ring = useRef(null);

  useFrame((state, delta) => {
    if (outer.current) {
      outer.current.rotation.y += delta * 0.25;
      outer.current.rotation.x += delta * 0.08;
    }
    if (core.current) {
      core.current.rotation.y -= delta * 0.5;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.06;
      core.current.scale.setScalar(pulse);
    }
    if (ring.current) ring.current.rotation.z += delta * 0.4;
  });

  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.28} />
      </mesh>
      <mesh ref={core}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#0b1120"
          metalness={0.9}
          roughness={0.25}
          emissive="#8b5cf6"
          emissiveIntensity={0.9}
        />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0.4, 0]}>
        <torusGeometry args={[1.85, 0.012, 8, 120]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.45} />
      </mesh>
      <pointLight position={[3, 3, 3]} intensity={18} color="#22d3ee" />
      <pointLight position={[-3, -2, -2]} intensity={12} color="#8b5cf6" />
      <Sparkles count={30} scale={[5, 5, 3]} size={2} speed={0.35} color="#67e8f9" opacity={0.45} />
    </group>
  );
}

export default function HoloOrb({ className = "" }) {
  const [wrapRef, inView] = useInViewport();

  return (
    <div ref={wrapRef} className={`pointer-events-none ${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        dpr={[1, 1.5]}
        frameloop={inView ? "always" : "never"}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.35} />
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
          <Orb />
        </Float>
      </Canvas>
    </div>
  );
}
