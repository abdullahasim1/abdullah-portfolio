import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";

/* 3D core — loading progress ke saath spin speed barhta hai.
   SplashScreen se alag chunk taake r3f initial JS mein na aaye. */
function Core({ progressRef }) {
  const group = useRef(null);
  const outer = useRef(null);
  const inner = useRef(null);
  const ringA = useRef(null);
  const ringB = useRef(null);

  useEffect(() => {
    // Entrance: elastic scale-in
    gsap.from(group.current.scale, {
      x: 0, y: 0, z: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.55)",
    });
  }, []);

  useFrame((state, delta) => {
    const p = progressRef.current; // 0 → 1
    const speed = 0.35 + p * 2.4;
    if (outer.current) {
      outer.current.rotation.y += delta * speed;
      outer.current.rotation.x += delta * speed * 0.55;
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * (speed * 1.4);
      inner.current.rotation.z += delta * speed * 0.8;
    }
    if (ringA.current) ringA.current.rotation.z += delta * (0.4 + p * 1.6);
    if (ringB.current) {
      ringB.current.rotation.z -= delta * (0.3 + p * 1.3);
      ringB.current.rotation.x = Math.PI / 2.6 + Math.sin(state.clock.elapsedTime * 0.7) * 0.18;
    }
    if (group.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.03 + p * 0.08;
      group.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={group}>
      {/* Wireframe shell */}
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.45, 0]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.5} />
      </mesh>
      {/* Glowing core */}
      <mesh ref={inner}>
        <octahedronGeometry args={[0.62, 0]} />
        <meshStandardMaterial
          color="#0b1120"
          metalness={0.9}
          roughness={0.25}
          emissive="#8b5cf6"
          emissiveIntensity={0.85}
        />
      </mesh>
      {/* Orbit rings — low-poly (8×48) — chamak same, GPU load aadha */}
      <mesh ref={ringA} rotation={[Math.PI / 2.3, 0.3, 0]}>
        <torusGeometry args={[2.05, 0.014, 8, 48]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.65} />
      </mesh>
      <mesh ref={ringB}>
        <torusGeometry args={[2.5, 0.01, 8, 48]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.42} />
      </mesh>

      <pointLight position={[3, 3, 3]} intensity={26} color="#22d3ee" />
      <pointLight position={[-3, -2, -2]} intensity={18} color="#8b5cf6" />
    </group>
  );
}

export function SplashCanvas({ progressRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.4], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.35} />
      <Core progressRef={progressRef} />
    </Canvas>
  );
}

export default SplashCanvas;
