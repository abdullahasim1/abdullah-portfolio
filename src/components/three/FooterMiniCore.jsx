import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import useInViewport from "../../hooks/useInViewport";

/* Lightweight variant for small screens — sirf 3 low-poly meshes,
   koi Sparkles/nahi, antialias off, dpr cap 1.25 */
function MiniCore() {
  const shell = useRef(null);
  const core = useRef(null);
  const ring = useRef(null);

  useFrame((state, delta) => {
    if (shell.current) {
      shell.current.rotation.y += delta * 0.3;
      shell.current.rotation.x += delta * 0.12;
    }
    if (core.current) {
      core.current.rotation.y -= delta * 0.55;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.8) * 0.05;
      core.current.scale.setScalar(pulse);
    }
    if (ring.current) ring.current.rotation.z += delta * 0.35;
  });

  return (
    <group rotation={[0.14, 0, 0.06]}>
      <mesh ref={shell}>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.32} />
      </mesh>
      <mesh ref={core}>
        <octahedronGeometry args={[0.38, 0]} />
        <meshStandardMaterial color="#0b1120" metalness={0.9} roughness={0.25}
          emissive="#8b5cf6" emissiveIntensity={0.9} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[1.2, 0.012, 6, 64]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.45} />
      </mesh>
      <pointLight position={[2.5, 2, 3]} intensity={10} color="#22d3ee" />
    </group>
  );
}

export default function FooterMiniCore({ className = "" }) {
  const [wrapRef, inView] = useInViewport();

  return (
    <div ref={wrapRef} className={`pointer-events-none ${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 3.4], fov: 42 }}
        dpr={[1, 1.25]}
        frameloop={inView ? "always" : "never"}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      >
        <ambientLight intensity={0.55} />
        <MiniCore />
      </Canvas>
    </div>
  );
}
