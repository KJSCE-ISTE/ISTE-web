"use client";

import { MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * WebGL accent for the Contact section.
 *
 * A noise-distorted icosahedron inside a counter-rotating wireframe shell.
 *
 * It used to sit on a near-black band, where a dark emissive object read well.
 * Contact is now a bright section, so the palette is inverted: the body takes
 * the theme's accent instead of a near-black navy, and the rim light does the
 * shading. A dark orb on a light ground reads as a smudge, not as depth.
 *
 * Colours are read from the themed wrapper at mount rather than hardcoded, so
 * the same component renders blue under Aurora and picks up whatever accent
 * Spectrum sets — no per-theme copy of this file.
 *
 * The distortion is `drei`'s `MeshDistortMaterial`, which displaces vertices in
 * the vertex shader against 3D simplex noise. Doing that on the GPU is the
 * whole point: the same wobble computed on the CPU would mean rewriting a few
 * thousand vertex positions and re-uploading the buffer every single frame.
 *
 * Pointer proximity drives distortion and spin, so it reacts as you approach
 * the form rather than sitting there looping.
 */

type Palette = { body: string; glow: string; rim: string };

/**
 * Resolve a CSS custom property off a real element, so the value reflects the
 * theme wrapper this canvas is mounted inside.
 *
 * THREE parses `#hex` and `rgb()` but not `oklch()`/`lab()`, and Tailwind v4
 * emits colours in oklch. The theme files deliberately declare these tokens as
 * hex for that reason; anything else falls back rather than throwing.
 */
function readColour(el: Element | null, name: string, fallback: string): string {
  if (!el) return fallback;
  const raw = getComputedStyle(el).getPropertyValue(name).trim();
  return raw.startsWith("#") || raw.startsWith("rgb") ? raw : fallback;
}

function Orb({ pointer, palette }: { pointer: React.RefObject<{ x: number; y: number }>; palette: Palette }) {
  const inner = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const energy = useRef(0);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const p = pointer.current ?? { x: 0, y: 0 };

    // Distance from centre in normalised space -> 1 near the middle, 0 at edges.
    const proximity = 1 - Math.min(1, Math.hypot(p.x, p.y));
    energy.current += (proximity - energy.current) * Math.min(1, dt * 2.4);

    const t = state.clock.elapsedTime;

    if (inner.current) {
      inner.current.rotation.y = t * 0.16 + p.x * 0.35;
      inner.current.rotation.x = t * 0.1 + p.y * 0.25;
      // Breathes slightly larger as the pointer nears.
      const s = 1 + energy.current * 0.07;
      inner.current.scale.setScalar(s);
    }

    if (shell.current) {
      // Counter-rotation is what stops the two layers reading as one object.
      shell.current.rotation.y = -t * 0.1 - p.x * 0.2;
      shell.current.rotation.z = t * 0.06;
    }
  });

  return (
    <group>
      <mesh ref={inner}>
        {/* detail 6 gives enough vertices for the displacement to read as
            smooth deformation rather than as visible faceting. */}
        <icosahedronGeometry args={[1.55, 6]} />
        {/* Deliberately dim. This sits behind a translucent form, and at full
            saturation it reads as a solid blob showing through the glass
            rather than as depth behind it. */}
        <MeshDistortMaterial
          color={palette.body}
          emissive={palette.glow}
          emissiveIntensity={0.3}
          roughness={0.28}
          metalness={0.35}
          distort={0.36}
          speed={1.6}
          transparent
          opacity={0.72}
        />
      </mesh>

      <mesh ref={shell}>
        <icosahedronGeometry args={[2.25, 1]} />
        <meshBasicMaterial color={palette.glow} wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function ContactOrb() {
  const pointer = useRef({ x: 0, y: 0 });
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [palette, setPalette] = useState<Palette>({
    body: "#4c6ef5",
    glow: "#748ffc",
    rim: "#91a7ff",
  });

  useEffect(() => {
    const host = hostRef.current;

    // Read once at mount. The wrapper's palette does not change during a
    // session, so there is nothing to subscribe to.
    setPalette({
      body: readColour(host, "--color-accent", "#4c6ef5"),
      glow: readColour(host, "--color-accent-lift", "#748ffc"),
      rim: readColour(host, "--color-accent-glow", "#91a7ff"),
    });

    const onMove = (e: PointerEvent) => {
      if (!host) return;
      const rect = host.getBoundingClientRect();
      // Normalised against the orb's own box, not the viewport, so proximity
      // means "near this object" rather than "near the middle of the screen".
      pointer.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
      };
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 },
    );
    if (host) observer.observe(host);

    return () => {
      window.removeEventListener("pointermove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={hostRef} className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={active ? "always" : "never"}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        fallback={null}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 5, 5]} intensity={1.1} color="#ffffff" />
        <pointLight position={[-4, -2, 3]} intensity={12} distance={16} color={palette.rim} />
        {/* The old second light was magenta, which fought the navy once the
            section stopped being black. It now takes the theme's own glow. */}
        <pointLight position={[3, -3, -2]} intensity={7} distance={14} color={palette.glow} />

        <Orb pointer={pointer} palette={palette} />
      </Canvas>
    </div>
  );
}
