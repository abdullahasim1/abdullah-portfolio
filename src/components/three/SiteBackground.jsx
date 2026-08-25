import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";

/**
 * Site-wide FIXED 3D background:
 *  - Deep space starfield (always visible, all sections)
 *  - Slow-drifting neon wireframe solids at the edges
 *  - Scroll parallax — group rises/rotates as you scroll (feels alive)
 * Cheap on GPU: points + unlit wireframes only, no lighting.
 */

function Drifter({ position, color, opacity, children, index, refs }) {
  return (
    <mesh ref={refs[index]} position={position}>
      {children}
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
    </mesh>
  );
}

function SceneContents({ reduced }) {
  const groupRef = useRef(null);
  const scrollRef = useRef(0);
  const r0 = useRef(null);
  const r1 = useRef(null);
  const r2 = useRef(null);
  const r3 = useRef(null);
  const meshRefs = [r0, r1, r2, r3];

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g || reduced) return;

    // Slow ambient rotation + scroll parallax (smoothed)
    g.rotation.y += delta * 0.014;
    const target = scrollRef.current * 0.0011;
    g.position.y += (target - g.position.y) * 0.06;

    meshRefs.forEach((r, i) => {
      const m = r.current;
      if (!m) return;
      m.rotation.x += delta * (0.06 + i * 0.02);
      m.rotation.y += delta * (0.08 + i * 0.015);
    });
  });

  const drifters = [
    { pos: [-7.6, 2.4, -5], color: "#22d3ee", opacity: 0.16 },
    { pos: [7.4, -2.8, -4], color: "#a78bfa", opacity: 0.15 },
    { pos: [-5.6, -3.6, -7], color: "#67e8f9", opacity: 0.11 },
    { pos: [6.6, 3.2, -8], color: "#c084fc", opacity: 0.13 },
  ];

  return (
    <>
      <group ref={groupRef}>
        {/* Edge drifters — corners ko occupy karte hain, center text-clear rehta hai */}
        <Drifter {...drifters[0]} index={0} refs={meshRefs} reduced={reduced}>
          <icosahedronGeometry args={[1.6, 0]} />
        </Drifter>
        <Drifter {...drifters[1]} index={1} refs={meshRefs} reduced={reduced}>
          <octahedronGeometry args={[1.35, 0]} />
        </Drifter>
        <Drifter {...drifters[2]} index={2} refs={meshRefs} reduced={reduced}>
          <torusGeometry args={[1.05, 0.3, 10, 26]} />
        </Drifter>
        <Drifter {...drifters[3]} index={3} refs={meshRefs} reduced={reduced}>
          <dodecahedronGeometry args={[1.45, 0]} />
        </Drifter>

        <Sparkles count={45} scale={[18, 12, 8]} size={2.6} speed={0.18} color="#22d3ee" opacity={0.35} />
      </group>

      <Stars radius={130} depth={60} count={2000} factor={3} saturation={0.35} fade speed={0.4} />
      <fog attach="fog" args={["#05060a", 12, 30]} />
    </>
  );
}

export default function SiteBackground() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 52 }}
        dpr={[1, 1.5]}
        frameloop={reduced ? "demand" : "always"}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "low-power",
        }}
      >
        <SceneContents reduced={reduced} />
      </Canvas>
    </div>
  );
}
