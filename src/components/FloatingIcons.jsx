import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const icons = [
  { icon: "⚛️", name: "React" },
  { icon: "🔷", name: "Node.js" },
  { icon: "📱", name: "Mobile" },
  { icon: "🎨", name: "Design" },
  { icon: "⚡", name: "Fast" },
  { icon: "🔒", name: "Secure" },
  { icon: "📊", name: "Data" },
  { icon: "🌐", name: "Web" },
  { icon: "🚀", name: "Launch" },
  { icon: "💡", name: "Innovation" },
  { icon: "🎯", name: "Target" },
  { icon: "✨", name: "Magic" },
];

function FloatingIcons() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const iconElements = container.querySelectorAll(".floating-icon");

    // Create floating animation for each icon
    iconElements.forEach((icon, ) => {
      const duration = 8 + Math.random() * 4; // 8-12 seconds
      const delay = Math.random() * 2; // 0-2 seconds delay

      gsap.set(icon, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0.1 + Math.random() * 0.3, // 0.1-0.4 opacity
        scale: 0.8 + Math.random() * 0.4, // 0.8-1.2 scale
      });

      // Floating animation
      gsap.to(icon, {
        y: `-=${Math.random() * 100 + 50}`,
        x: `+=${(Math.random() - 0.5) * 200}`,
        rotation: Math.random() * 360,
        duration: duration,
        delay: delay,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });

      // Opacity pulse animation
      gsap.to(icon, {
        opacity: 0.6,
        duration: 2 + Math.random() * 2,
        delay: delay,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => {
      gsap.killTweensOf(iconElements);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {icons.map((item, index) => (
        <div
          key={index}
          className="floating-icon absolute text-2xl md:text-3xl select-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          <span
            className="block transition-all duration-300 hover:scale-110"
            title={item.name}
          >
            {item.icon}
          </span>
        </div>
      ))}
    </div>
  );
}

export default FloatingIcons;
