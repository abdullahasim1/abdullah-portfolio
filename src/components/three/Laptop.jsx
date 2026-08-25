import React, { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/* ---------- helpers ---------- */

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function makeCanvas(w, h) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

/* ---------- screen (fake IDE, self-typing) ---------- */

const CODE_LINES = [
  { ind: 0, w: 0.42, col: "#7dd3fc" },
  { ind: 1, w: 0.58, col: "#a78bfa" },
  { ind: 2, w: 0.34, col: "#94a3b8" },
  { ind: 2, w: 0.66, col: "#34d399" },
  { ind: 3, w: 0.28, col: "#facc15" },
  { ind: 3, w: 0.52, col: "#22d3ee" },
  { ind: 2, w: 0.44, col: "#f472b6" },
  { ind: 1, w: 0.61, col: "#94a3b8" },
  { ind: 1, w: 0.37, col: "#a78bfa" },
  { ind: 2, w: 0.55, col: "#22d3ee" },
  { ind: 3, w: 0.31, col: "#34d399" },
  { ind: 3, w: 0.47, col: "#94a3b8" },
  { ind: 2, w: 0.24, col: "#facc15" },
  { ind: 1, w: 0.5, col: "#f472b6" },
  { ind: 0, w: 0.39, col: "#94a3b8" },
  { ind: 0, w: 0.63, col: "#7dd3fc" },
];

function drawScreen(canvas, time) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  // editor background
  ctx.fillStyle = "#070b14";
  ctx.fillRect(0, 0, W, H);

  // window chrome
  ctx.fillStyle = "#0d1526";
  ctx.fillRect(0, 0, W, 34);
  [["#f87171", 26], ["#fbbf24", 48], ["#34d399", 70]].forEach(([col, x]) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(x, 17, 5.5, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = "#334155";
  ctx.fillRect(110, 12, W - 220, 10);

  // sidebar
  ctx.fillStyle = "#0a101e";
  ctx.fillRect(0, 34, 44, H - 34);
  for (let i = 0; i < 7; i++) {
    ctx.fillStyle = i % 3 === 0 ? "#164e63" : "#131c30";
    roundRectPath(ctx, 12, 52 + i * 26, 20, 14, 4);
    ctx.fill();
  }

  // typing progress: 5s type -> 2s hold -> restart
  const cycle = time % 7;
  const p = Math.min(cycle / 5, 1);
  const eased = 1 - Math.pow(1 - p, 3);
  const visible = Math.max(1, Math.floor(CODE_LINES.length * eased));

  const x0 = 64;
  const lh = 21;
  const maxW = W - x0 - 40;

  CODE_LINES.slice(0, visible).forEach((line, i) => {
    ctx.fillStyle = line.col;
    ctx.globalAlpha = 0.88;
    roundRectPath(ctx, x0 + line.ind * 26, 56 + i * lh, line.w * maxW, 9, 4);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  // blinking caret at end of latest line
  if (p < 1 && Math.floor(time * 2.5) % 2 === 0) {
    const li = CODE_LINES[visible - 1];
    ctx.fillStyle = "#67e8f9";
    ctx.fillRect(x0 + li.ind * 26 + li.w * maxW + 6, 53 + (visible - 1) * lh, 3, 15);
  }
}

/* ---------- keyboard deck texture ---------- */

function drawDeck(canvas) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "#141e34");
  grad.addColorStop(1, "#0b1120");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // speaker grilles
  ctx.fillStyle = "#0a101e";
  ctx.fillRect(28, 30, 74, 150);
  ctx.fillRect(W - 102, 30, 74, 150);

  // key rows
  const rows = [
    { y: 36, n: 14 },
    { y: 82, n: 14 },
    { y: 128, n: 13 },
    { y: 174, n: 12 },
  ];
  const kw = 34;
  const kh = 36;
  const gap = 6;
  rows.forEach(({ y, n }) => {
    const totalW = n * kw + (n - 1) * gap;
    let x = (W - totalW) / 2;
    for (let i = 0; i < n; i++) {
      ctx.fillStyle = "#1c2942";
      roundRectPath(ctx, x, y, kw, kh, 5);
      ctx.fill();
      ctx.strokeStyle = "rgba(148,163,184,0.22)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // backlight hint
      ctx.fillStyle = "rgba(103,232,249,0.10)";
      roundRectPath(ctx, x + 5, y + 5, kw - 10, kh - 16, 3);
      ctx.fill();
      x += kw + gap;
    }
  });

  // spacebar row
  const sy = 220;
  const mods = [
    { x: 0.17, w: 62 },
    { x: 0.155, w: 46 },
    { x: null, w: 218 }, // spacebar
    { x: 0.155, w: 46 },
    { x: 0.17, w: 62 },
  ];
  const totalRowW = mods.reduce((s, m) => s + m.w, 0) + gap * (mods.length - 1);
  let mx = (W - totalRowW) / 2;
  mods.forEach(({ w }) => {
    ctx.fillStyle = "#1c2942";
    roundRectPath(ctx, mx, sy, w, kh, 5);
    ctx.fill();
    ctx.strokeStyle = "rgba(148,163,184,0.22)";
    ctx.stroke();
    mx += w + gap;
  });

  // trackpad
  const tw = 200;
  const th = 108;
  ctx.fillStyle = "#101a2e";
  roundRectPath(ctx, (W - tw) / 2, H - th - 26, tw, th, 10);
  ctx.fill();
  ctx.strokeStyle = "rgba(103,232,249,0.28)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

/* ---------- Laptop ---------- */

function Laptop({ pointerRef, reduced }) {
  const groupRef = useRef(null);
  const lidRef = useRef(null);

  const deckCanvas = useMemo(() => makeCanvas(640, 400), []);
  const deckTexture = useMemo(() => {
    drawDeck(deckCanvas);
    const t = new THREE.CanvasTexture(deckCanvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }, [deckCanvas]);

  const screenCanvas = useMemo(() => makeCanvas(640, 400), []);
  const screenTexture = useMemo(() => {
    const t = new THREE.CanvasTexture(screenCanvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }, [screenCanvas]);

  useEffect(() => {
    if (reduced) {
      drawScreen(screenCanvas, 3); // static mid-way frame
      screenTexture.needsUpdate = true;
      return undefined;
    }
    let raf;
    const start = performance.now();
    let last = 0;
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 120) return; // ~8fps refresh is enough
      last = now;
      drawScreen(screenCanvas, (now - start) / 1000);
      screenTexture.needsUpdate = true;
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced, screenCanvas, screenTexture]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (!reduced) {
      // gentle idle sway
      const t = state.clock.elapsedTime;
      const targetY = -0.32 + Math.sin(t * 0.4) * 0.06 + pointerRef.current.x * 0.16;
      const targetX = Math.sin(t * 0.55) * 0.02 - pointerRef.current.y * 0.05;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      // lid breathes open/closed very slightly
      if (lidRef.current) {
        const open = 1.78 + Math.sin(t * 0.5) * 0.025;
        lidRef.current.rotation.x += (open - lidRef.current.rotation.x) * 0.04;
      }
    } else if (lidRef.current) {
      lidRef.current.rotation.x = 1.78;
    }
    void delta;
  });

  const bodyMat = (
    <meshStandardMaterial color="#151d2e" metalness={0.85} roughness={0.35} envMapIntensity={1.1} />
  );

  return (
    <group ref={groupRef} rotation={[0, -0.32, 0]} scale={0.95}>
      {/* ---- base ---- */}
      <group position={[0, -0.62, 0.35]}>
        <RoundedBox args={[3.1, 0.14, 2.1]} radius={0.05} smoothness={6}>
          {bodyMat}
        </RoundedBox>
        {/* keyboard deck */}
        <mesh position={[0, 0.072, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.96, 1.98]} />
          <meshStandardMaterial
            map={deckTexture}
            metalness={0.35}
            roughness={0.55}
            envMapIntensity={0.5}
          />
        </mesh>
      </group>

      {/* ---- lid (hinge at back edge of base) ---- */}
      <group position={[0, -0.55, -0.68]}>
        <group ref={lidRef} rotation={[1.78, 0, 0]}>
          <RoundedBox args={[3.1, 2.05, 0.1]} radius={0.05} smoothness={6} position={[0, 1.02, 0]}>
            {bodyMat}
          </RoundedBox>
          {/* glowing screen */}
          <mesh position={[0, 1.02, 0.056]}>
            <planeGeometry args={[2.86, 1.83]} />
            <meshBasicMaterial map={screenTexture} toneMapped={false} />
          </mesh>
          {/* camera dot */}
          <mesh position={[0, 1.94, 0.056]}>
            <circleGeometry args={[0.018, 16]} />
            <meshBasicMaterial color="#22d3ee" toneMapped={false} />
          </mesh>
        </group>
      </group>

      {/* screen light spill */}
      <pointLight position={[0, 0.35, 1.1]} intensity={5} distance={5.5} color="#38bdf8" />
      <pointLight position={[0, -0.4, 0.9]} intensity={2.2} distance={3.5} color="#67e8f9" />
    </group>
  );
}

export default Laptop;
