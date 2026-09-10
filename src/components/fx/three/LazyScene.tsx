"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * Gate in front of every WebGL scene.
 *
 * three + R3F is roughly 600 KB of JavaScript. Loading that and *then*
 * discovering the device cannot render it — or that the reader asked for
 * reduced motion — wastes the entire download on the people least able to
 * afford it. So the checks run first, against a throwaway 1×1 context, and the
 * heavy chunk is only fetched once they pass.
 *
 * Three ways this bails out, all silently:
 *   • `prefers-reduced-motion: reduce`
 *   • no WebGL context available
 *   • the GPU is software-rasterised (SwiftShader / llvmpipe), where a real
 *     scene runs at single-digit frames and reads as a broken page
 *
 * Each caller sits above a complete non-WebGL backdrop, so bailing costs
 * nothing visually.
 */

const HeroScene = dynamic(() => import("@/components/fx/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const ContactOrb = dynamic(() => import("@/components/fx/three/ContactOrb"), {
  ssr: false,
  loading: () => null,
});

type SceneName = "hero" | "orb";

function canRenderWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ??
      canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;

    const debug = gl.getExtension("WEBGL_debug_renderer_info");
    if (debug) {
      const renderer = String(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) ?? "");
      // Software rasterisers report themselves here. Better to skip than to
      // ship a 4 fps hero.
      if (/swiftshader|llvmpipe|software|basic render/i.test(renderer)) return false;
    }

    // Release the probe context immediately; browsers cap how many exist at once.
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export default function LazyScene({ scene }: { scene: SceneName }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (calm.matches) return;

    // Defer past first paint so the hero text is on screen before we start
    // pulling a 600 KB chunk over the network.
    const check = () => setAllowed(canRenderWebGL());

    // requestIdleCallback is still missing in Safari < 17, so keep a timeout
    // path. `cancel` closes over whichever one was actually scheduled.
    let cancel: () => void;
    if (typeof window.requestIdleCallback === "function") {
      const handle = window.requestIdleCallback(check, { timeout: 1800 });
      cancel = () => window.cancelIdleCallback(handle);
    } else {
      const handle = window.setTimeout(check, 550);
      cancel = () => window.clearTimeout(handle);
    }

    return cancel;
  }, []);

  if (!allowed) return null;
  return scene === "hero" ? <HeroScene /> : <ContactOrb />;
}
