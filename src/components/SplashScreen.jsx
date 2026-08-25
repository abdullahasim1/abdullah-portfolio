import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { IS_LOW_END } from "../lib/device";

/* 3D core — loading progress ke saath spin speed barhta hai */
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
      {/* Orbit rings */}
      <mesh ref={ringA} rotation={[Math.PI / 2.3, 0.3, 0]}>
        <torusGeometry args={[2.05, 0.014, 8, 120]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.65} />
      </mesh>
      <mesh ref={ringB}>
        <torusGeometry args={[2.5, 0.01, 8, 120]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.42} />
      </mesh>

      <pointLight position={[3, 3, 3]} intensity={26} color="#22d3ee" />
      <pointLight position={[-3, -2, -2]} intensity={18} color="#8b5cf6" />
    </group>
  );
}

const NAME = "ABDULLAH ASIM";

function SplashScreen({ onFinish }) {
  const rootRef = useRef(null);
  const stageRef = useRef(null); // canvas + text wrapper (fly-through target)
  const percentRef = useRef(null);
  const barRef = useRef(null);
  const progressRef = useRef(0);
  const finishedRef = useRef(false);

  const [showSkip, setShowSkip] = useState(false);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    // Fly-through iris: camera object ke through site mein enter hota hai
    const tl = gsap.timeline({
      onComplete: () => onFinish(),
    });
    tl.to(stageRef.current, {
      scale: 2.6,
      opacity: 0,
      duration: 0.85,
      ease: "power3.in",
    }, 0)
      .to(rootRef.current, {
        clipPath: "circle(0% at 50% 50%)",
        duration: 0.9,
        ease: "power3.inOut",
      }, 0.15);
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || IS_LOW_END) {
      onFinish();
      return;
    }

    const ctx = gsap.context(() => {
      // Name letters stagger in
      gsap.from("[data-splash-letter]", {
        y: 46,
        opacity: 0,
        rotateX: -80,
        duration: 0.8,
        stagger: 0.045,
        ease: "back.out(1.8)",
        delay: 0.25,
      });
      gsap.from("[data-splash-fade]", {
        opacity: 0,
        y: 14,
        duration: 0.7,
        stagger: 0.12,
        delay: 0.7,
      });

      // Progress 0 → 100 (min showtime ~2.2s)
      const counter = { v: 0 };
      gsap.to(counter, {
        v: 100,
        duration: 2.1,
        delay: 0.35,
        ease: "power2.inOut",
        onUpdate: () => {
          progressRef.current = counter.v / 100;
          if (percentRef.current) {
            percentRef.current.textContent = `${String(Math.round(counter.v)).padStart(3, "0")}%`;
          }
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${counter.v / 100})`;
          }
        },
        onComplete: () => {
          gsap.delayedCall(0.35, finish);
        },
      });
    }, rootRef);

    const skipTimer = setTimeout(() => setShowSkip(true), 1100);

    return () => {
      ctx.revert();
      clearTimeout(skipTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] bg-void overflow-hidden flex flex-col items-center justify-center"
      style={{ clipPath: "circle(150% at 50% 50%)" }}
      aria-label="Loading portfolio"
    >
      {/* Ambient glows */}
      <div aria-hidden className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-cyan-500/[0.07] blur-[110px]" />
      <div aria-hidden className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-violet-600/[0.08] blur-[110px]" />

      {/* 3D stage */}
      <div ref={stageRef} className="relative flex flex-col items-center will-change-transform">
        <div className="w-[min(64vw,340px)] aspect-square pointer-events-none" aria-hidden="true">
          <Canvas
            camera={{ position: [0, 0, 6.4], fov: 45 }}
            dpr={[1, 1.75]}
            gl={{ alpha: true, antialias: true }}
          >
            <ambientLight intensity={0.35} />
            <Core progressRef={progressRef} />
            <Sparkles count={50} scale={[7, 7, 4]} size={2} speed={0.4} color="#67e8f9" opacity={0.5} />
          </Canvas>
        </div>

        <p data-splash-fade className="mt-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-cyan-300/70">
          Welcome to my universe
        </p>
        <h1 className="mt-3 font-display font-bold text-white text-2xl sm:text-4xl tracking-tight flex flex-wrap justify-center">
          {NAME.split("").map((ch, i) => (
            <span
              key={`${ch}-${i}`}
              data-splash-letter
              className={`inline-block ${ch === " " ? "w-4 sm:w-6" : ""}`}
              style={{ transformOrigin: "50% 100%" }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>
        <p data-splash-fade className="mt-2 text-xs sm:text-sm text-slate-400 tracking-wide">
          Full Stack Developer · AI &amp; Automation
        </p>
      </div>

      {/* Bottom progress rail */}
      <div data-splash-fade className="absolute bottom-10 inset-x-0 px-8 sm:px-14 max-w-3xl mx-auto w-full">
        <div className="flex items-end justify-between mb-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Initializing</span>
          <span ref={percentRef} className="font-mono text-sm text-cyan-300">000%</span>
        </div>
        <div className="h-px w-full bg-white/[0.08] overflow-hidden rounded-full">
          <div
            ref={barRef}
            className="h-full w-full origin-left bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-500 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      {/* Skip */}
      {showSkip && (
        <button
          onClick={finish}
          className="absolute bottom-4 right-6 text-[11px] text-slate-600 hover:text-cyan-300 transition-colors"
        >
          Skip intro →
        </button>
      )}
    </div>
  );
}

export default SplashScreen;
