import React, { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, RoundedBox } from "@react-three/drei";
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
  const PAD = 24; // bezel
  const W = canvas.width;
  const H = canvas.height;
  const cw = W - PAD * 2;
  const ch = H - PAD * 2;

  // bezel frame
  ctx.fillStyle = "#04070d";
  ctx.fillRect(0, 0, W, H);

  ctx.save();
  ctx.beginPath();
  ctx.rect(PAD, PAD, cw, ch);
  ctx.clip();
  ctx.translate(PAD, PAD);

  // editor background
  ctx.fillStyle = "#070b14";
  ctx.fillRect(0, 0, cw, ch);

  // window chrome
  ctx.fillStyle = "#0d1526";
  ctx.fillRect(0, 0, cw, 32);
  [["#f87171", 22], ["#fbbf24", 42], ["#34d399", 62]].forEach(([col, x]) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(x, 16, 5, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = "#334155";
  roundRectPath(ctx, 96, 11, cw - 192, 10, 4);
  ctx.fill();

  // sidebar
  ctx.fillStyle = "#0a101e";
  ctx.fillRect(0, 32, 40, ch - 32);
  for (let i = 0; i < 7; i++) {
    ctx.fillStyle = i % 3 === 0 ? "#164e63" : "#131c30";
    roundRectPath(ctx, 10, 48 + i * 25, 20, 13, 4);
    ctx.fill();
  }

  // typing progress: 5s type -> 2s hold -> restart
  const cycle = time % 7;
  const p = Math.min(cycle / 5, 1);
  const eased = 1 - Math.pow(1 - p, 3);
  const visible = Math.max(1, Math.floor(CODE_LINES.length * eased));

  const x0 = 88;
  const lh = 20;
  const maxW = cw - x0 - 30;

  // line numbers gutter
  ctx.font = "11px monospace";
  ctx.textBaseline = "middle";

  CODE_LINES.slice(0, visible).forEach((line, i) => {
    const y = 50 + i * lh;
    ctx.fillStyle = "#26344c";
    ctx.fillText(String(i + 1), 54, y + 5);
    ctx.fillStyle = line.col;
    ctx.globalAlpha = 0.88;
    roundRectPath(ctx, x0 + line.ind * 24, y, line.w * maxW, 8, 4);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  // blinking caret at end of latest line
  if (p < 1 && Math.floor(time * 2.5) % 2 === 0) {
    const li = CODE_LINES[visible - 1];
    ctx.fillStyle = "#67e8f9";
    ctx.fillRect(x0 + li.ind * 24 + li.w * maxW + 5, 47 + (visible - 1) * lh, 2.5, 14);
  }

  // vignette
  const vg = ctx.createRadialGradient(cw / 2, ch / 2, ch * 0.3, cw / 2, ch / 2, ch * 0.9);
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(1, "rgba(0,0,0,0.4)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, cw, ch);

  // scanlines
  ctx.fillStyle = "rgba(148,197,255,0.02)";
  for (let y = 0; y < ch; y += 4) ctx.fillRect(0, y, cw, 1);

  ctx.restore();

  // inner glass edge highlight
  ctx.strokeStyle = "rgba(103,232,249,0.10)";
  ctx.lineWidth = 2;
  roundRectPath(ctx, PAD - 1, PAD - 1, cw + 2, ch + 2, 6);
  ctx.stroke();
}

/* ---------- keyboard deck texture ---------- */

function drawDeck(canvas) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "#151f36");
  grad.addColorStop(1, "#0b1120");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // power LED strip (rear edge)
  ctx.fillStyle = "rgba(103,232,249,0.65)";
  roundRectPath(ctx, W / 2 - 34, 16, 68, 3, 1.5);
  ctx.fill();
  ctx.fillStyle = "rgba(103,232,249,0.25)";
  ctx.fillRect(W / 2 - 60, 17, 120, 1);

  // speaker grilles
  ctx.fillStyle = "#0a101e";
  ctx.fillRect(28, 34, 74, 146);
  ctx.fillRect(W - 102, 34, 74, 146);
  ctx.fillStyle = "#111a2c";
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 5; c++) {
      ctx.fillRect(38 + c * 14, 42 + r * 15, 6, 6);
      ctx.fillRect(W - 92 + c * 14, 42 + r * 15, 6, 6);
    }
  }

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
  rows.forEach(({ y, n }, row) => {
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
      ctx.fillStyle = "rgba(103,232,249,0.12)";
      roundRectPath(ctx, x + 5, y + 5, kw - 10, kh - 16, 3);
      ctx.fill();
      // per-key shade variance (subtle realism)
      const v = (row * 31 + i * 17) % 3;
      if (v === 1) ctx.fillStyle = "rgba(255,255,255,0.03)";
      else if (v === 2) ctx.fillStyle = "rgba(0,0,0,0.07)";
      if (v !== 0) {
        roundRectPath(ctx, x, y, kw, kh, 5);
        ctx.fill();
      }
      x += kw + gap;
    }
  });

  // spacebar row
  const sy = 220;
  const mods = [
    { w: 62 },
    { w: 46 },
    { w: 218 }, // spacebar
    { w: 46 },
    { w: 62 },
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
  const th = 104;
  const tx = (W - tw) / 2;
  const ty = H - th - 24;
  ctx.fillStyle = "#101a2e";
  roundRectPath(ctx, tx, ty, tw, th, 10);
  ctx.fill();
  ctx.strokeStyle = "rgba(103,232,249,0.28)";
  ctx.lineWidth = 2;
  ctx.stroke();
  // trackpad sheen
  const sheen = ctx.createLinearGradient(tx, ty, tx + tw, ty + th);
  sheen.addColorStop(0, "rgba(255,255,255,0.05)");
  sheen.addColorStop(0.5, "rgba(255,255,255,0)");
  sheen.addColorStop(1, "rgba(103,232,249,0.05)");
  ctx.fillStyle = sheen;
  roundRectPath(ctx, tx + 2, ty + 2, tw - 4, th - 4, 8);
  ctx.fill();
}

/* ---------- Laptop ---------- */

function Laptop({ pointerRef, reduced }) {
  const groupRef = useRef(null);

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

  useFrame((state) => {
    if (!groupRef.current || reduced) return;
    const t = state.clock.elapsedTime;
    // gentle idle sway + soft pointer follow (damped lerp)
    const targetY = -0.32 + Math.sin(t * 0.3) * 0.05 + pointerRef.current.x * 0.12;
    const targetX = Math.sin(t * 0.45) * 0.02 - pointerRef.current.y * 0.035;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04;
  });

  const bodyMat = (
    <meshStandardMaterial color="#182234" metalness={0.9} roughness={0.3} envMapIntensity={1.5} />
  );

  return (
    <>
      <group ref={groupRef} rotation={[0, -0.32, 0]} scale={0.95}>
        {/* ---- base ---- */}
        <group position={[0, -0.62, 0.35]}>
          <RoundedBox args={[3.1, 0.14, 2.1]} radius={0.05} smoothness={8}>
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
          {/* rubber feet */}
          {[[-1.4, 0.9], [1.4, 0.9], [-1.4, -0.9], [1.4, -0.9]].map(([x, z], i) => (
            <mesh key={i} position={[x, -0.085, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.03, 16]} />
              <meshStandardMaterial color="#05080f" roughness={0.9} metalness={0.2} />
            </mesh>
          ))}
        </group>

        {/* ---- hinge bar ---- */}
        <mesh position={[0, -0.52, -0.68]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 3.04, 24]} />
          <meshStandardMaterial color="#0b101b" metalness={0.75} roughness={0.45} />
        </mesh>

        {/* ---- lid (hinge at back edge of base) ---- */}
        <group position={[0, -0.55, -0.68]}>
          <Lid bodyMat={bodyMat} screenTexture={screenTexture} reduced={reduced} />
        </group>

        {/* screen light spill + keyboard glow */}
        <pointLight position={[0, 0.35, 1.1]} intensity={5} distance={5.5} color="#38bdf8" />
        <pointLight position={[0, -0.42, 0.7]} intensity={1.8} distance={2.4} color="#67e8f9" />
        <pointLight position={[0, -0.4, 0.9]} intensity={2.2} distance={3.5} color="#67e8f9" />
      </group>

      {/* grounded contact shadow */}
      <ContactShadows
        position={[0, -0.76, 0.3]}
        scale={7}
        resolution={256}
        blur={2.6}
        far={1.8}
        opacity={0.55}
        color="#000814"
      />
    </>
  );
}

/* Lid — alag component taake apna breathe-animation ref rakhe sake */
function Lid({ bodyMat, screenTexture, reduced }) {
  const lidRef = useRef(null);

  useFrame((state) => {
    if (!lidRef.current) return;
    if (!reduced) {
      const open = -0.22 + Math.sin(state.clock.elapsedTime * 0.35) * 0.018;
      lidRef.current.rotation.x += (open - lidRef.current.rotation.x) * 0.035;
    } else {
      lidRef.current.rotation.x = -0.22;
    }
  });

  return (
    <group ref={lidRef} rotation={[-0.22, 0, 0]}>
      <RoundedBox args={[3.1, 2.05, 0.1]} radius={0.05} smoothness={8} position={[0, 1.02, 0]}>
        {bodyMat}
      </RoundedBox>
      {/* glowing screen */}
      <mesh position={[0, 1.02, 0.056]}>
        <planeGeometry args={[2.86, 1.83]} />
        <meshBasicMaterial map={screenTexture} toneMapped={false} />
      </mesh>
      {/* glass reflection overlay */}
      <mesh position={[0, 1.02, 0.06]}>
        <planeGeometry args={[2.86, 1.83]} />
        <meshPhysicalMaterial
          color="#0a1220"
          metalness={0}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.06}
          transparent
          opacity={0.15}
          envMapIntensity={2.4}
        />
      </mesh>
      {/* camera dot */}
      <mesh position={[0, 1.94, 0.056]}>
        <circleGeometry args={[0.018, 16]} />
        <meshBasicMaterial color="#22d3ee" toneMapped={false} />
      </mesh>
    </group>
  );
}

export default Laptop;
