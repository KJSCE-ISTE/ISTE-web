"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * WebGL hero field — floating hexagonal prisms.
 *
 * Layered ON TOP of the 2D canvas hex grid rather than replacing it: the flat
 * grid reads as the surface, these read as objects above it. That separation is
 * what sells the depth; a single layer of either would just look busy.
 *
 * Everything here is one `InstancedMesh`. Sixty individual meshes would be
 * sixty draw calls and sixty matrix updates per frame; instanced, it is one of
 * each, and the per-instance transforms are written straight into a typed
 * array. That is the difference between this being free and this being the
 * reason the page stutters.
 *
 * No `drei/Environment` anywhere — the presets fetch HDR maps from a CDN, which
 * this app's Content-Security-Policy blocks outright (`default-src 'self'`).
 * Lighting is done with plain lights instead.
 */

const COUNT = 38;

/**
 * The wordmark occupies the middle of the hero, so prisms are kept out of it.
 *
 * Near prisms are large and opaque enough to fight the type, far ones are small
 * and fogged. So the exclusion radius scales with proximity: close prisms are
 * pushed right out to the edges, distant ones may drift closer to centre.
 * Without this the field reads as clutter sitting on top of the title rather
 * than as depth behind it.
 */
const CLEAR_RADIUS_NEAR = 9.5;
const CLEAR_RADIUS_FAR = 3.4;

/** Hexagonal prism = a cylinder with six radial segments. */
function useHexGeometry() {
  return useMemo(() => new THREE.CylinderGeometry(1, 1, 0.34, 6), []);
}

interface Seed {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: number;
  spin: number;
  drift: number;
  phase: number;
  depth: number;
}

function useSeeds(): Seed[] {
  return useMemo(() => {
    // Deterministic PRNG so the layout is identical on every load — a hero
    // that rearranges itself on refresh feels broken rather than alive.
    let s = 20002001; // the chapter's founding year, why not
    const rand = () => {
      s = (s * 1664525 + 1013904223) % 4294967296;
      return s / 4294967296;
    };

    return Array.from({ length: COUNT }, () => {
      // Depth drives size, clearance and parallax together, so far prisms are
      // consistently smaller, fainter and freer to sit near the middle.
      const depth = rand();

      /**
       * Polar placement, not a uniform box.
       *
       * A uniform scatter drops prisms straight onto the wordmark. Sampling an
       * angle and a radius that starts outside a depth-scaled clear zone keeps
       * the centre readable while still filling the frame. The x-axis is
       * stretched 1.5× because the viewport is wider than it is tall — an
       * untouched circle leaves the left and right thirds empty.
       */
      const clearance = CLEAR_RADIUS_FAR + (CLEAR_RADIUS_NEAR - CLEAR_RADIUS_FAR) * (1 - depth);
      const angle = rand() * Math.PI * 2;
      const radius = clearance + rand() * 6.5;

      return {
        position: new THREE.Vector3(
          Math.cos(angle) * radius * 1.5,
          Math.sin(angle) * radius * 0.72,
          -4 - depth * 16,
        ),
        rotation: new THREE.Euler(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI),
        scale: 0.22 + (1 - depth) * 0.6,
        spin: (rand() - 0.5) * 0.2,
        drift: 0.25 + rand() * 0.5,
        phase: rand() * Math.PI * 2,
        depth,
      };
    });
  }, []);
}

function PrismField({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const geometry = useHexGeometry();
  const seeds = useSeeds();

  // Scratch objects, allocated once. Creating a Matrix4 inside useFrame would
  // allocate 60 of them per frame and hand the GC a steady drip of garbage.
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    const group = groupRef.current;
    if (!mesh || !group) return;

    const t = state.clock.elapsedTime;
    // Clamp delta: after a background tab or a long frame, an unclamped delta
    // teleports everything instead of animating it.
    const dt = Math.min(delta, 0.05);

    seeds.forEach((seed, i) => {
      dummy.position.set(
        seed.position.x,
        seed.position.y + Math.sin(t * seed.drift + seed.phase) * 0.55,
        seed.position.z,
      );
      dummy.rotation.set(
        seed.rotation.x + t * seed.spin * 0.5,
        seed.rotation.y + t * seed.spin,
        seed.rotation.z + Math.sin(t * 0.3 + seed.phase) * 0.15,
      );
      dummy.scale.setScalar(seed.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;

    // Whole field leans toward the pointer. Lerped rather than set, so the
    // response has weight instead of snapping.
    const p = pointer.current ?? { x: 0, y: 0 };
    group.rotation.y += (p.x * 0.22 - group.rotation.y) * Math.min(1, dt * 3);
    group.rotation.x += (-p.y * 0.16 - group.rotation.x) * Math.min(1, dt * 3);
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[geometry, undefined, COUNT]} castShadow={false}>
        {/* Translucent and only lightly shaded. These are atmosphere behind the
            wordmark, not objects competing with it — at full opacity they read
            as grey blocks dropped on the page. */}
        <meshStandardMaterial
          color="#eef0f5"
          roughness={0.4}
          metalness={0.1}
          emissive="#1c398e"
          emissiveIntensity={0.04}
          transparent
          opacity={0.42}
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  );
}

/** Camera dolly driven by page scroll — the field recedes as you read on. */
function ScrollDolly({ progress }: { progress: React.RefObject<number> }) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const p = progress.current ?? 0;
    const targetZ = 14 + p * 9;
    const targetY = p * 2.4;
    const k = Math.min(1, Math.min(delta, 0.05) * 3);
    camera.position.z += (targetZ - camera.position.z) * k;
    camera.position.y += (targetY - camera.position.y) * k;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroScene() {
  const pointer = useRef({ x: 0, y: 0 });
  const progress = useRef(0);
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onMove = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    const onScroll = () => {
      // Only the first viewport matters — the hero is gone after that.
      progress.current = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    };

    if (!calm.matches) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Stop rendering entirely once the hero leaves the viewport. A WebGL loop
    // running behind three screens of content is pure battery drain.
    const host = hostRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 },
    );
    if (host) observer.observe(host);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  // If WebGL is unavailable, render nothing at all. The 2D hex grid underneath
  // is a complete backdrop on its own, so the hero degrades to exactly what it
  // looked like before this layer existed.
  if (failed) return null;

  return (
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0 z-[1]"
      aria-hidden="true"
    >
      <Canvas
        // Cap DPR at 2 — 3x costs 2.25x the fill rate for no visible gain.
        dpr={[1, 2]}
        camera={{ position: [0, 0, 14], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        // Pausing the loop is what makes this cheap when scrolled past.
        frameloop={active ? "always" : "never"}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        fallback={null}
        onError={() => setFailed(true)}
      >
        {/* Fog fades distant prisms into the canvas colour, which is what
            makes the depth read as atmosphere rather than as scattered sprites. */}
        <fog attach="fog" args={["#f5f5f5", 9, 30]} />

        <ambientLight intensity={1.15} />
        <directionalLight position={[6, 8, 6]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-8, -4, 2]} intensity={0.5} color="#c7d2fe" />
        <pointLight position={[0, 0, 9]} intensity={22} distance={26} color="#4c6ef5" />

        <PrismField pointer={pointer} />
        <ScrollDolly progress={progress} />
      </Canvas>
    </div>
  );
}
