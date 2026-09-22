"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

import type { PublicGalleryItem } from "@/lib/data/content";

/**
 * Full-screen image viewer.
 *
 * A real modal, not a styled overlay:
 *  • focus moves in on open and returns to the trigger on close
 *  • Escape closes, arrows navigate, Tab is trapped inside
 *  • background scroll is locked — including Lenis, which ignores
 *    `overflow: hidden` because it drives scroll itself
 *
 * Shared by the gallery page and the homepage section so the two can never
 * drift into having different keyboard behaviour.
 */
export default function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: PublicGalleryItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusTo = useRef<Element | null>(null);

  const open = index !== null && Boolean(items[index]);

  const step = useCallback(
    (delta: number) => {
      if (index === null || items.length === 0) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;

    returnFocusTo.current = document.activeElement;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowRight") return step(1);
      if (e.key === "ArrowLeft") return step(-1);

      // Focus trap: keep Tab cycling within the dialog.
      if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__isteLenis?.stop();
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      window.__isteLenis?.start();
      (returnFocusTo.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose, step]);

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={item.caption ?? "Gallery image"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={onClose}
          data-surface="dark"
          className="fixed inset-0 z-[150] flex items-center justify-center bg-neutral-950/93 backdrop-blur-md"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            data-cursor="link"
            className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              ×
            </span>
          </button>

          {items.length > 1 && (
            <>
              <ArrowButton side="left" label="Previous image" onClick={() => step(-1)} />
              <ArrowButton side="right" label="Next image" onClick={() => step(1)} />
            </>
          )}

          <motion.figure
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative mx-6 w-full max-w-5xl"
          >
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={item.image}
                alt={item.caption ?? ""}
                fill
                sizes="90vw"
                className="object-contain"
                /* Only ever true for a URL the council pastes by hand into the
                   dashboard. Archive images are local now, so they go through
                   Next's optimizer; an arbitrary external host would 400 there
                   because it is not in `remotePatterns`, so those bypass it. */
                unoptimized={item.image.startsWith("http")}
                priority
              />
            </div>

            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-neutral-300">
              <span>{item.caption}</span>
              <span className="font-mono text-xs tabular-nums text-neutral-500">
                {String(index! + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ArrowButton({
  side,
  label,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={label}
      data-cursor="link"
      className={`absolute z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10 ${
        side === "left" ? "left-3 md:left-8" : "right-3 md:right-8"
      }`}
    >
      <span aria-hidden="true">{side === "left" ? "←" : "→"}</span>
    </button>
  );
}
