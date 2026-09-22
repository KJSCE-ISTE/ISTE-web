"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-reactive hexagon field — the original site's hex background, but lit.
 *
 * Drawn in the palette accent rather than ink. It used to stroke in near-black
 * (rgba(23,23,23)), left over from the old dark theme, which made it the last
 * grey thing on an otherwise blue-white page. At rest it sits at ~11% alpha, so
 * it reads as texture behind the headline rather than competing with it; the
 * pointer lifts it to ~50% and adds a soft fill.
 *
 * Rendered on a single <canvas> rather than as DOM nodes. A grid dense enough
 * to look good is ~800 cells; as divs that is 800 style recalcs per pointer
 * move. On canvas it is one draw call per frame against a flat array.
 *
 * Each cell holds an `energy` value that spikes when the pointer passes near
 * and decays exponentially afterwards, so the pointer leaves a trail that
 * fades rather than a hard spotlight.
 */

/**
 * Resolve the palette accent to RGB components.
 *
 * Read once at mount, not per frame: the render loop needs a different alpha
 * every frame, and re-reading a custom property 800 times a frame to rebuild
 * the same three numbers would be pure waste in the hot path.
 *
 * Canvas parses `#hex` and `rgb()` but not `oklch()`/`lab()`, which Tailwind v4
 * can emit — an unparseable value would silently paint nothing, so anything
 * unrecognised falls back to the accent's literal value instead.
 */
function readAccentRGB(el: Element): [number, number, number] {
  const raw = getComputedStyle(el).getPropertyValue("--color-accent").trim();

  const hex = /^#([0-9a-f]{6})$/i.exec(raw);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  const rgb = raw.match(/rgba?\(([^)]+)\)/);
  if (rgb) {
    const parts = rgb[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    if (parts.length >= 3 && parts.slice(0, 3).every(Number.isFinite)) {
      return [parts[0], parts[1], parts[2]];
    }
  }

  return [76, 110, 245]; // #4c6ef5
}

const HEX_RADIUS = 26;
const INFLUENCE = 190; // px — how far the pointer reaches
const DECAY = 0.055; // per frame, toward zero

interface Cell {
  x: number;
  y: number;
  energy: number;
  seed: number;
}

export default function HexGrid({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const [ar, ag, ab] = readAccentRGB(canvas);

    let cells: Cell[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;

    // Pointer lives in a ref-like closure — never state, never a re-render.
    const pointer = { x: -9999, y: -9999, active: false };

    const buildGrid = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2); // cap: 3x costs 2.25x fill for no visible gain

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Pointy-top hexagons tile with these offsets.
      const hStep = HEX_RADIUS * Math.sqrt(3);
      const vStep = HEX_RADIUS * 1.5;

      cells = [];
      for (let row = -1; row * vStep < height + HEX_RADIUS * 2; row++) {
        const stagger = row % 2 === 0 ? 0 : hStep / 2;
        for (let col = -1; col * hStep < width + hStep * 2; col++) {
          cells.push({
            x: col * hStep + stagger,
            y: row * vStep,
            energy: 0,
            seed: Math.random(),
          });
        }
      }
    };

    const drawHex = (cx: number, cy: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        // -90° start puts a vertex at the top (pointy-top orientation).
        const angle = (Math.PI / 180) * (60 * i - 90);
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    let t = 0;

    const render = () => {
      if (!running) return;
      t += 0.006;
      ctx.clearRect(0, 0, width, height);

      for (const cell of cells) {
        if (pointer.active) {
          const dx = cell.x - pointer.x;
          const dy = cell.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < INFLUENCE) {
            // Squared falloff — a linear ramp reads as a flat disc.
            const strength = (1 - dist / INFLUENCE) ** 2;
            cell.energy = Math.max(cell.energy, strength);
          }
        }
        cell.energy = Math.max(0, cell.energy - DECAY);

        // Idle shimmer so the field breathes even with the pointer away.
        const idle = calm.matches ? 0.05 : 0.05 + 0.035 * Math.sin(t * 2.2 + cell.seed * 12);
        const level = Math.min(1, idle + cell.energy);

        drawHex(cell.x, cell.y, HEX_RADIUS - 2 - cell.energy * 3);
        ctx.strokeStyle = `rgba(${ar}, ${ag}, ${ab}, ${0.085 + level * 0.42})`;
        ctx.lineWidth = 0.75 + cell.energy * 1.1;
        ctx.stroke();

        // Only energised cells get a fill — keeps the canvas mostly empty.
        if (cell.energy > 0.06) {
          ctx.fillStyle = `rgba(${ar}, ${ag}, ${ab}, ${cell.energy * 0.15})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(render);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    // Pause when scrolled out of view — no point burning frames off-screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(render);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );

    const onResize = () => buildGrid();

    const resizeObserver = new ResizeObserver(() => {
      buildGrid();
    });

    buildGrid();
    render();
    observer.observe(canvas);
    resizeObserver.observe(canvas);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
