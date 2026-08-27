import React, { useEffect, useRef, useState } from "react";

// Animated cursor-following DIV that reacts to hover targets
// Targets: a, button, [role="button"], [data-cursor="hover"]
function CursorFollower() {
	const dotRef = useRef(null);
	const rafRef = useRef(0);
	const positionRef = useRef({ x: 0, y: 0 });
	const targetRef = useRef({ x: 0, y: 0 });
	const isTouchRef = useRef(false);
	const isHoveringRef = useRef(false);
	const isVisibleRef = useRef(false);
	const scaleRef = useRef(1);
	const targetScaleRef = useRef(1);
	const [isHovering, setIsHovering] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const dot = dotRef.current;
		if (!dot) return;

		// Check if device is touch-only (no mouse)
		const hasMouse = window.matchMedia("(pointer: fine)").matches;
		if (!hasMouse) return;

		// Center initially
		targetRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
		positionRef.current = { ...targetRef.current };
		dot.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%)`;

		const lerp = (start, end, amt) => start + (end - start) * amt;
		const smoothing = 0.2; // follow speed

		const move = (e) => {
			if (e.pointerType === "touch") {
				isTouchRef.current = true;
				isVisibleRef.current = false;
				setIsVisible(false);
				// Stop RAF loop on touch
				if (rafRef.current) {
					cancelAnimationFrame(rafRef.current);
					rafRef.current = 0;
				}
				return;
			}
			isTouchRef.current = false;
			targetRef.current.x = e.clientX;
			targetRef.current.y = e.clientY;
			if (!isVisibleRef.current) {
				isVisibleRef.current = true;
				setIsVisible(true);
				// Restart RAF loop if it was stopped
				if (!rafRef.current) {
					rafRef.current = requestAnimationFrame(animate);
				}
			}
		};

		const matchesHoverTarget = (e) =>
			Boolean(e.target.closest?.('a, button, [role="button"], [data-cursor="hover"]'));

		const handleOver = (e) => {
			if (!isTouchRef.current && matchesHoverTarget(e)) {
				isHoveringRef.current = true;
				targetScaleRef.current = 2;
				setIsHovering(true);
			}
		};
		const handleOut = (e) => {
			if (matchesHoverTarget(e)) {
				isHoveringRef.current = false;
				targetScaleRef.current = 1;
				setIsHovering(false);
			}
		};

		const handleDown = () => {
			if (isTouchRef.current) return;
			scaleRef.current *= 0.9; // quick press feedback
		};
		const handleUp = () => {
			if (isTouchRef.current) return;
			scaleRef.current = isHoveringRef.current ? 2 : 1;
		};

		const animate = () => {
			// Stop if touch detected
			if (isTouchRef.current) {
				rafRef.current = 0;
				return;
			}

			const { x: tx, y: ty } = targetRef.current;
			const { x, y } = positionRef.current;
			const nx = lerp(x, tx, smoothing);
			const ny = lerp(y, ty, smoothing);
			positionRef.current.x = nx;
			positionRef.current.y = ny;

			// Smoothly ease toward target scale
			scaleRef.current = lerp(scaleRef.current, targetScaleRef.current, 0.18);

			dot.style.transform = `translate3d(${nx}px, ${ny}px, 0) translate(-50%, -50%) scale(${scaleRef.current})`;
			rafRef.current = requestAnimationFrame(animate);
		};
		rafRef.current = requestAnimationFrame(animate);

		window.addEventListener("pointermove", move, { passive: true });
		document.addEventListener("mouseover", handleOver, true);
		document.addEventListener("mouseout", handleOut, true);
		window.addEventListener("pointerdown", handleDown, { passive: true });
		window.addEventListener("pointerup", handleUp, { passive: true });

		return () => {
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}
			window.removeEventListener("pointermove", move);
			document.removeEventListener("mouseover", handleOver, true);
			document.removeEventListener("mouseout", handleOut, true);
			window.removeEventListener("pointerdown", handleDown);
			window.removeEventListener("pointerup", handleUp);
		};
	}, []);

	// Respect reduced motion
	const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (prefersReducedMotion) return null;

	return (
		<div
			ref={dotRef}
			className={
				"fixed top-0 left-0 h-3 w-3 rounded-full pointer-events-none z-[10001] " +
				"transition-colors duration-150 ease-out " +
				(isHovering
					? "bg-cyan-400/20 border border-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.55)] backdrop-blur"
					: "bg-white mix-blend-difference")
			}
			style={{ opacity: isVisible ? 1 : 0 }}
			aria-hidden="true"
		/>
	);
}

export default CursorFollower;
