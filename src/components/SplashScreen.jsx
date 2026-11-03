import { useEffect, useMemo, useRef, useState } from "react";
import "./SplashScreen.css";

const PARTICLES = Array.from({ length: 26 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 53 + 7) % 100}%`,
  delay: `${(index % 9) * -0.7}s`,
  duration: `${5 + (index % 6)}s`,
  size: `${3 + (index % 3)}px`,
}));

function ReactMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="aa-react-mark">
      <g fill="none" stroke="currentColor" strokeWidth="3.1">
        <ellipse cx="32" cy="32" rx="27" ry="10.8" />
        <ellipse cx="32" cy="32" rx="27" ry="10.8" transform="rotate(60 32 32)" />
        <ellipse cx="32" cy="32" rx="27" ry="10.8" transform="rotate(120 32 32)" />
      </g>
      <circle cx="32" cy="32" r="4.2" fill="currentColor" />
    </svg>
  );
}

function CodeMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="aa-code-mark">
      <path d="M23 17 7 32l16 15M41 17l16 15-16 15M36 11 27 53" />
    </svg>
  );
}

function CloudMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="aa-cloud-mark">
      <path d="M17 47h31a11 11 0 0 0 1-22 17 17 0 0 0-32-3A13 13 0 0 0 17 47Z" />
    </svg>
  );
}

function StackMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="aa-stack-mark">
      <path d="m32 8 25 13-25 13L7 21 32 8Z" />
      <path d="m7 32 25 13 25-13M7 43l25 13 25-13" />
    </svg>
  );
}

function RocketMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="aa-rocket-mark">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a18.18 18.18 0 0 0-3.32-3.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function AwsMark() {
  return (
    <div className="aa-aws-mark" aria-label="AWS">
      <img src="/logos/aws.svg" alt="AWS" />
    </div>
  );
}

function NextMark() {
  return <div className="aa-next-mark" aria-label="Next.js">N</div>;
}

/**
 * Premium Clean Light splash screen (aa-splash design, Abdullah ke diye hue code par).
 *
 * Props:
 * - onComplete()/onFinish(): called after the exit transition.
 * - progress?: number (0-100). Pass real app-loading progress for a real loading bar.
 * - duration?: number. Intro duration in ms when progress is not controlled (default 2400).
 * - autoComplete?: boolean. When false, the splash waits for progress=100 or Skip.
 * - showSkip?: boolean. Shows a small Skip Intro button.
 */
export default function SplashScreen({
  onComplete,
  onFinish,
  progress: externalProgress,
  duration = 2400,
  autoComplete = true,
  showSkip = true,
  name = "Abdullah Asim",
  role = "AI CLOUD ENGINEER & FULL-STACK DEVELOPER",
}) {
  const [internalProgress, setInternalProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const completedRef = useRef(false);
  const callbackRef = useRef(onComplete || onFinish);
  const isControlled = typeof externalProgress === "number";
  const progress = Math.max(0, Math.min(100, isControlled ? externalProgress : internalProgress));

  useEffect(() => {
    callbackRef.current = onComplete || onFinish;
  }, [onComplete, onFinish]);

  useEffect(() => {
    if (isControlled || !autoComplete) return undefined;

    let frameId;
    let startTime;
    const tick = (time) => {
      if (startTime === undefined) startTime = time;
      const elapsed = time - startTime;
      // Ease-out visual intro progress; this is an intro animation, not a network metric.
      const t = Math.min(elapsed / Math.max(600, duration), 1);
      const eased = 1 - Math.pow(1 - t, 2.4);
      setInternalProgress(Math.round(eased * 100));
      if (t < 1) frameId = window.requestAnimationFrame(tick);
    };
    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [autoComplete, duration, isControlled]);

  useEffect(() => {
    if (progress < 100 || completedRef.current) return undefined;
    setLeaving(true);
    const timeout = window.setTimeout(() => {
      if (completedRef.current) return;
      completedRef.current = true;
      callbackRef.current?.();
    }, 560);
    return () => window.clearTimeout(timeout);
  }, [progress]);

  const handleSkip = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setLeaving(true);
    window.setTimeout(() => callbackRef.current?.(), 360);
  };

  const particleNodes = useMemo(
    () => PARTICLES.map((particle, index) => (
      <span
        className={`aa-particle aa-particle-${index % 4}`}
        key={index}
        style={{
          "--particle-left": particle.left,
          "--particle-top": particle.top,
          "--particle-delay": particle.delay,
          "--particle-duration": particle.duration,
          "--particle-size": particle.size,
        }}
      />
    )),
    []
  );

  return (
    <div className={`aa-splash${leaving ? " aa-splash--leaving" : ""}`} role="status" aria-live="polite">
      <div className="aa-splash-bg" />
      <div className="aa-bg-arc aa-bg-arc-one" />
      <div className="aa-bg-arc aa-bg-arc-two" />
      <div className="aa-globe" aria-hidden="true">
        <div className="aa-globe-dots" />
        <div className="aa-globe-shine" />
      </div>
      <div className="aa-particle-field" aria-hidden="true">{particleNodes}</div>

      <svg className="aa-landscape aa-landscape-left" viewBox="0 0 720 250" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="aaWaveLeft" x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0" stopColor="#c9c4ff" stopOpacity=".12" />
            <stop offset="1" stopColor="#9065ff" stopOpacity=".68" />
          </linearGradient>
          <pattern id="aaDotsLeft" width="9" height="9" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.1" fill="#fff" opacity=".65" />
          </pattern>
        </defs>
        <path d="M0 95 Q80 16 158 76 T315 66 T500 100 T720 42 V250 H0Z" fill="url(#aaWaveLeft)" />
        <path d="M0 95 Q80 16 158 76 T315 66 T500 100 T720 42" fill="none" stroke="#fff" strokeWidth="2" opacity=".8" />
        <path d="M0 116 Q90 32 170 91 T330 80 T510 114 T720 58 V250 H0Z" fill="url(#aaDotsLeft)" opacity=".55" />
      </svg>
      <svg className="aa-landscape aa-landscape-right" viewBox="0 0 760 250" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="aaWaveRight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d9d6ff" stopOpacity=".2" />
            <stop offset="1" stopColor="#9270ff" stopOpacity=".56" />
          </linearGradient>
          <pattern id="aaDotsRight" width="9" height="9" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.1" fill="#fff" opacity=".7" />
          </pattern>
        </defs>
        <path d="M0 125 Q120 40 220 95 T410 65 T590 100 T760 32 V250 H0Z" fill="url(#aaWaveRight)" />
        <path d="M0 125 Q120 40 220 95 T410 65 T590 100 T760 32" fill="none" stroke="#fff" strokeWidth="2" opacity=".8" />
        <path d="M0 145 Q130 58 235 115 T425 85 T610 120 T760 52 V250 H0Z" fill="url(#aaDotsRight)" opacity=".6" />
      </svg>

      <main className="aa-splash-content">
        <section className="aa-visual" aria-label="Abdullah Asim brand emblem">
          <div className="aa-orbit aa-orbit-back" />
          <div className="aa-orbit aa-orbit-front" />
          <div className="aa-orbit aa-orbit-thin" />

          <div className="aa-tech-tile aa-tech-aws"><AwsMark /></div>
          <div className="aa-tech-tile aa-tech-react"><ReactMark /></div>
          <div className="aa-tech-tile aa-tech-code"><CodeMark /></div>
          <div className="aa-tech-tile aa-tech-next"><NextMark /></div>

          <div className="aa-logo-platform">
            <div className="aa-platform-top" />
            <div className="aa-platform-edge" />
            <div className="aa-platform-glow" />
          </div>
          <div className="aa-logo-glass">
            <div className="aa-logo-reflection" />
            <div className="aa-monogram">A</div>
            <span className="aa-logo-spark">✦</span>
          </div>
          <span className="aa-orbit-dot aa-orbit-dot-one" />
          <span className="aa-orbit-dot aa-orbit-dot-two" />
        </section>

        <section className="aa-intro" aria-label="Portfolio introduction">
          <h1 className="aa-name"><span>{name.split(" ")[0]}</span> <em>{name.split(" ").slice(1).join(" ")}</em></h1>
          <div className="aa-role"><span />{role}<span /></div>
        </section>

        <section className="aa-capabilities" aria-label="Professional capabilities">
          <div className="aa-capability aa-capability-one">
            <span className="aa-cap-icon">✺</span>
            <span>Generative AI</span>
          </div>
          <div className="aa-capability aa-capability-two">
            <CloudMark />
            <span>AWS Cloud</span>
          </div>
          <div className="aa-capability aa-capability-three">
            <StackMark />
            <span>Full-Stack</span>
          </div>
          <div className="aa-capability aa-capability-four">
            <RocketMark />
            <span>Product Development</span>
          </div>
        </section>

        <section className="aa-progress-section" aria-label="Loading progress">
          <div className="aa-progress-labels">
            <span>{progress >= 100 ? "Welcome to my portfolio" : "Loading Portfolio Experience..."}</span>
            <strong>{progress}%</strong>
          </div>
          <div className="aa-progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}>
            <div className="aa-progress-fill" style={{ width: `${progress}%` }}>
              <span className="aa-progress-light" />
            </div>
          </div>
        </section>

        <section className="aa-quality" aria-label="Portfolio qualities">
          <div><span>✓</span> Responsive</div>
          <div><span>✓</span> Animated UI</div>
          <div><span>✓</span> Modern Design</div>
          <div><span>✓</span> High Performance</div>
        </section>
      </main>

      {showSkip && !leaving && (
        <button type="button" className="aa-skip" onClick={handleSkip} aria-label="Skip intro">
          Skip intro <span>↗</span>
        </button>
      )}
    </div>
  );
}
