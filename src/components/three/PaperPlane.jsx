import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import useInViewport from "../../hooks/useInViewport";

/* Paper plane dart — 4 flat triangles (nose +z par, lookAt ke liye) */
function PlaneGeometry() {
  const geometry = useMemo(() => {
    const nose = [0, 0, 1.4];
    const tailTop = [0, 0.15, -0.9];
    const tailL = [-0.75, 0.02, -1.05];
    const tailR = [0.75, 0.02, -1.05];
    const keel = [0, -0.24, -0.92];

    const tris = [
      [...nose, ...tailL, ...tailTop], // left wing
      [...nose, ...tailTop, ...tailR], // right wing
      [...nose, ...keel, ...tailL], // left keel
      [...nose, ...tailR, ...keel], // right keel
    ];

    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(tris.flat(), 3)
    );
    g.computeVertexNormals();
    return g;
  }, []);

  return <primitive object={geometry} attach="geometry" />;
}

/* Plane circular path par urta hai, hamesha direction ki taraf dekhta hai */
function FlyingPlane() {
  const ref = useRef(null);
  const lightRef = useRef(null);
  const tmpA = useMemo(() => new THREE.Vector3(), []);
  const tmpB = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.45;
    const r = 2.1;
    tmpA.set(Math.cos(t) * r, Math.sin(t * 2) * 0.28, Math.sin(t) * r);
    tmpB.set(Math.cos(t + 0.12) * r, Math.sin((t + 0.12) * 2) * 0.28, Math.sin(t + 0.12) * r);
    ref.current.position.copy(tmpA);
    ref.current.lookAt(tmpB);
    if (lightRef.current) lightRef.current.intensity = 6 + Math.sin(t * 4) * 1.5;
  });

  return (
    <>
      <mesh ref={ref}>
        <PlaneGeometry />
        <meshStandardMaterial
          color="#dbeafe"
          metalness={0.35}
          roughness={0.35}
          side={THREE.DoubleSide}
          flatShading
          emissive="#38bdf8"
          emissiveIntensity={0.12}
        />
      </mesh>
      <pointLight ref={lightRef} position={[0, 0.5, 0]} distance={4} color="#67e8f9" />
    </>
  );
}

export default function PaperPlane({ className = "" }) {
  const [wrapRef, inView] = useInViewport();

  return (
    <div ref={wrapRef} className={`pointer-events-none ${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 1.6, 6], fov: 40 }}
        dpr={[1, 1.5]}
        frameloop={inView ? "always" : "never"}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 4]} intensity={1} color="#bae6fd" />

        {/* dashed orbit ring */}
        <mesh rotation={[Math.PI / 2.15, 0, 0]}>
          <torusGeometry args={[2.1, 0.008, 8, 140]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.35} />
        </mesh>

        <Float speed={1} rotationIntensity={0} floatIntensity={0.25}>
          <FlyingPlane />
        </Float>

        <Sparkles count={26} scale={[6, 3.5, 5]} size={2} speed={0.3} color="#67e8f9" opacity={0.4} />
      </Canvas>
    </div>
  );
}
