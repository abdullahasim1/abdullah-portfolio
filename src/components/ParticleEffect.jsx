import React, { useEffect, useRef } from "react";

function ParticleEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Configuration
    const layers = [
      { count: 80, speed: 0.2, color: "#8b5cf6" }, // far
      { count: 60, speed: 0.35, color: "#a78bfa" }, // mid
      { count: 40, speed: 0.5, color: "#c4b5fd" }, // near
    ];

    const particles = [];
    const shootingStars = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor(layer) {
        this.layer = layer;
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : -10;
        this.vx = (Math.random() - 0.5) * this.layer.speed;
        this.vy = (Math.random() * this.layer.speed) + 0.1;
        this.size = Math.random() * 2.2 + (this.layer.speed * 1.5);
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = this.layer.color;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.y > canvas.height + 10) this.reset();
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        // Glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.length = Math.random() * 80 + 60;
        this.speed = Math.random() * 6 + 4;
        this.angle = Math.PI / 3 + Math.random() * 0.3; // diagonal
        this.opacity = 0.9;
        this.life = 0;
        this.maxLife = 60; // frames
      }

      update() {
        this.life++;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity *= 0.985;
        if (this.life > this.maxLife) this.reset();
      }

      draw() {
        const endX = this.x - Math.cos(this.angle) * this.length;
        const endY = this.y - Math.sin(this.angle) * this.length;
        const grad = ctx.createLinearGradient(this.x, this.y, endX, endY);
        grad.addColorStop(0, `rgba(167,139,250,${this.opacity})`);
        grad.addColorStop(1, "rgba(167,139,250,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
    }

    // Create particles for each layer
    layers.forEach(layer => {
      for (let i = 0; i < layer.count; i++) {
        particles.push(new Particle(layer));
      }
    });

    // Create a few shooting stars
    for (let i = 0; i < 3; i++) {
      shootingStars.push(new ShootingStar());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nearby particles (only for nearest layer for performance)
      const nearParticles = particles.filter(p => p.layer.speed >= 0.5);
      nearParticles.forEach((p, i) => {
        for (let j = i + 1; j < nearParticles.length; j++) {
          const q = nearParticles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.save();
            ctx.globalAlpha = (110 - dist) / 110 * 0.25;
            ctx.strokeStyle = "#8b5cf6";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      });

      // Update and draw particles (layered parallax look)
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Update and draw shooting stars occasionally
      shootingStars.forEach(star => {
        if (Math.random() < 0.02) star.update();
        star.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
      aria-hidden="true"
    />
  );
}

export default ParticleEffect;
