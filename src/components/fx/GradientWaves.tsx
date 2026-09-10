"use client";

import { useEffect, useRef } from "react";

/**
 * GradientWaves — flowing radial gradient orbs, aurora-style.
 *
 * Matches the "ColorBends" look from the reference screenshot:
 * large glowing blobs drift slowly across a near-black canvas,
 * blending additively so overlaps produce bright focal points.
 * ISTE-blue palette (royal blue → electric blue → silver-white).
 */
export default function GradientWaves({
  className = "absolute inset-0 w-full h-full",
  opacity = 0.9,
  speed = 0.22,
}: {
  className?: string;
  opacity?: number;
  speed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /**
     * Each orb has:
     *   r        – radius
     *   color    – RGB string
     *   cx/cy    – normalised centre origin (0-1)
     *   rx/ry    – orbit radii (fraction of canvas)
     *   px/py    – orbit angular speeds
     *   phase    – initial phase offset
     */
    const orbs = [
      // Large dominant blue blob — lower-right, matches bright focal point in screenshot
      { r: 680, color: "28,74,210",   cx: 0.78, cy: 0.72, rx: 0.22, ry: 0.18, px: 0.55, py: 0.42, phase: 0.0  },
      // Wide blue-indigo blob — upper-left
      { r: 580, color: "20,50,175",   cx: 0.22, cy: 0.28, rx: 0.18, ry: 0.22, px: 0.38, py: 0.60, phase: 1.2  },
      // Electric blue accent — centre drift
      { r: 440, color: "55,115,255",  cx: 0.52, cy: 0.55, rx: 0.28, ry: 0.20, px: 0.70, py: 0.48, phase: 2.4  },
      // Silver-blue highlight — small, fast, creates glinting highlights
      { r: 280, color: "160,200,255", cx: 0.68, cy: 0.35, rx: 0.32, ry: 0.30, px: 0.90, py: 0.75, phase: 0.8  },
      // Deep navy anchor — very large, mostly static depth layer
      { r: 780, color: "12,28,110",   cx: 0.40, cy: 0.60, rx: 0.10, ry: 0.08, px: 0.25, py: 0.30, phase: 3.5  },
      // Cool silver shimmer — upper-right
      { r: 320, color: "200,222,255", cx: 0.80, cy: 0.20, rx: 0.20, ry: 0.25, px: 0.80, py: 0.55, phase: 5.0  },
    ];

    let t = 0;

    function resize() {
      if (!canvas) return;
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function draw() {
      if (!canvas || !ctx) return;

      const W = canvas.width;
      const H = canvas.height;

      // Near-black navy base — matches the screenshot's very dark background
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgb(5, 7, 16)";
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = "lighter";

      for (const orb of orbs) {
        const x = W * (orb.cx + orb.rx * Math.sin(t * orb.px * speed + orb.phase));
        const y = H * (orb.cy + orb.ry * Math.cos(t * orb.py * speed + orb.phase * 0.7));

        const g = ctx.createRadialGradient(x, y, 0, x, y, orb.r);
        g.addColorStop(0,    `rgba(${orb.color}, 0.80)`);
        g.addColorStop(0.35, `rgba(${orb.color}, 0.36)`);
        g.addColorStop(0.70, `rgba(${orb.color}, 0.10)`);
        g.addColorStop(1,    `rgba(${orb.color}, 0)`);

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Back to normal blending for overlay passes
      ctx.globalCompositeOperation = "source-over";

      // Soft vignette — darkens corners so the glow stays central
      const vig = ctx.createRadialGradient(W * 0.5, H * 0.55, 0, W * 0.5, H * 0.55, Math.max(W, H) * 0.75);
      vig.addColorStop(0,   "rgba(0,0,0,0)");
      vig.addColorStop(0.6, "rgba(0,0,0,0.10)");
      vig.addColorStop(1,   "rgba(0,0,0,0.55)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      t += 0.010;
      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [opacity, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ opacity, pointerEvents: "none" }}
    />
  );
}
