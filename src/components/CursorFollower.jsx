import React, { useEffect, useRef, useState } from "react";

// Animated cursor-following DIV that reacts to hover targets
// Targets: a, button, [role="button"], [data-cursor="hover"]
function CursorFollower() {
	const dotRef = useRef(null);
	const rafRef = useRef(0);
	const positionRef = useRef({ x: 0, y: 0 });
	const targetRef = useRef({ x: 0, y: 0 });
	const isTouchRef = useRef(false);
	const [isHovering, setIsHovering] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const dot = dotRef.current;
		if (!dot) return;

		// Center initially
		targetRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
		positionRef.current = { ...targetRef.current };
		dot.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%)`;

		const lerp = (start, end, amt) => start + (end - start) * amt;
		const smoothing = 0.2; // follow speed

		const move = (e) => {
			if (e.pointerType === "touch") {
				isTouchRef.current = true;
				setIsVisible(false);
				return;
			}
			isTouchRef.current = false;
			targetRef.current.x = e.clientX;
			targetRef.current.y = e.clientY;
			if (!isVisible) setIsVisible(true);
		};

		const handleOver = (e) => {
			const el = e.target.closest('a, button, [role="button"], [data-cursor="hover"]');
			if (el) setIsHovering(true);
		};
		const handleOut = (e) => {
			const el = e.target.closest('a, button, [role="button"], [data-cursor="hover"]');
			if (el) setIsHovering(false);
		};

		let clickTimeout = 0;
		const handleDown = () => {
			if (isTouchRef.current) return;
			dot.style.transition = "transform 0.08s ease-out";
			dot.style.transform += " scale(0.9)";
			clearTimeout(clickTimeout);
			clickTimeout = setTimeout(() => {
				dot.style.transition = "";
			}, 100);
		};
		const handleUp = () => {
			if (isTouchRef.current) return;
			dot.style.transition = "transform 0.12s ease-out";
			// transition reset happens in the animation loop as we re-apply transform
		};

		const animate = () => {
			const { x: tx, y: ty } = targetRef.current;
			const { x, y } = positionRef.current;
			const nx = lerp(x, tx, smoothing);
			const ny = lerp(y, ty, smoothing);
			positionRef.current.x = nx;
			positionRef.current.y = ny;

			const scale = isHovering ? 2 : 1;
			dot.style.transform = `translate3d(${nx}px, ${ny}px, 0) translate(-50%, -50%) scale(${scale})`;
			rafRef.current = requestAnimationFrame(animate);
		};
		rafRef.current = requestAnimationFrame(animate);

		window.addEventListener("pointermove", move, { passive: true });
		document.addEventListener("mouseover", handleOver, true);
		document.addEventListener("mouseout", handleOut, true);
		window.addEventListener("pointerdown", handleDown, { passive: true });
		window.addEventListener("pointerup", handleUp, { passive: true });

		return () => {
			cancelAnimationFrame(rafRef.current);
			window.removeEventListener("pointermove", move);
			document.removeEventListener("mouseover", handleOver, true);
			document.removeEventListener("mouseout", handleOut, true);
			window.removeEventListener("pointerdown", handleDown);
			window.removeEventListener("pointerup", handleUp);
			clearTimeout(clickTimeout);
		};
	}, [isVisible, isHovering]);

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
					? "bg-white/25 border border-white/70 shadow-[0_0_25px_rgba(255,255,255,0.5)] backdrop-blur"
					: "bg-white mix-blend-difference")
			}
			style={{ opacity: isVisible ? 1 : 0 }}
			aria-hidden="true"
		/>
	);
}

export default CursorFollower;


