import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import useInViewport from "../../hooks/useInViewport";

/* Footer planet — wireframe sphere + tilted ring + orbiting moon.
   Cursor ke saath halka tilt-follow bhi karta hai (reduced-motion pe off). */
function Planet({ pointerRef, reduced }) {
  const group = useRef(null);
  const sphere = useRef(null);
  const moon = useRef(null);
  const moonPivot = useRef(null);

  useFrame((state, delta) => {
    if (sphere.current) sphere.current.rotation.y += delta * 0.18;
    if (moonPivot.current) moonPivot.current.rotation.y += delta * 0.55;
    if (moon.current) moon.current.rotation.y += delta * 0.9;

    if (!reduced && group.current) {
      const g = group.current;
      g.rotation.y += (pointerRef.current.x * 0.28 - g.rotation.y) * 0.045;
      g.rotation.x += (0.18 - pointerRef.current.y * 0.18 - g.rotation.x) * 0.045;
    }
  });

  return (
    <group ref={group} rotation={[0.18, 0, 0.08]}>
      {/* planet body */}
      <mesh ref={sphere}>
        <icosahedronGeometry args={[1.05, 2]} />
        <meshStandardMaterial
          color="#0b1120"
          metalness={0.85}
          roughness={0.35}
          emissive="#0e7490"
          emissiveIntensity={0.22}
        />
      </mesh>
      {/* wireframe shell */}
      <mesh>
        <icosahedronGeometry args={[1.18, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.3} />
      </mesh>
      {/* saturn ring */}
      <mesh rotation={[Math.PI / 2.35, 0, 0]}>
        <torusGeometry args={[1.75, 0.022, 8, 120]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[Math.PI / 2.35, 0.06, 0]}>
        <torusGeometry args={[2.0, 0.012, 8, 120]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.3} />
      </mesh>
      {/* orbiting moon */}
      <group ref={moonPivot} rotation={[0.35, 0, 0]}>
        <mesh ref={moon} position={[2.35, 0, 0]}>
          <octahedronGeometry args={[0.14, 0]} />
          <meshStandardMaterial
            color="#e0f2fe"
            metalness={0.6}
            roughness={0.3}
            emissive="#67e8f9"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      <pointLight position={[4, 3, 4]} intensity={16} color="#22d3ee" />
      <pointLight position={[-4, -2, -3]} intensity={10} color="#8b5cf6" />
      <Sparkles count={18} scale={[6, 4, 4]} size={1.8} speed={0.25} color="#67e8f9" opacity={0.4} />
    </group>
  );
}

export default function FooterPlanet({ className = "" }) {
  const [wrapRef, inView] = useInViewport();
  const pointerRef = useRef({ x: 0, y: 0 });

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) return undefined;
    const onMove = (e) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  return (
    <div ref={wrapRef} className={`pointer-events-none ${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.6, 5.6], fov: 42 }}
        dpr={[1, 1.5]}
        frameloop={inView ? "always" : "never"}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.35} />
        <Planet pointerRef={pointerRef} reduced={reduced} />
      </Canvas>
    </div>
  );
}
