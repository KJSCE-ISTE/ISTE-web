"use client";

import { motion } from "motion/react";
import { useRef, useState, useTransition } from "react";

import LazyScene from "@/components/fx/three/LazyScene";
import Magnetic from "@/components/fx/Magnetic";
import { Reveal, Stagger, StaggerItem } from "@/components/fx/Reveal";
import Tilt3D from "@/components/fx/Tilt3D";
import { SplitWords } from "@/components/fx/TextFX";
import { sendMessage } from "@/lib/contact";
import { SITE, SOCIALS } from "@/lib/site";

/**
 * Contact.
 *
 * The form posts to a Server Action that writes into the council inbox, which
 * the dashboard reads. Three anti-spam measures, none of which inconvenience a
 * real person:
 *   • a honeypot field hidden from humans but filled by naive bots
 *   • a minimum fill time — sub-second submissions are scripted
 *   • server-side per-IP rate limiting inside the action itself
 */
export default function Contact({
  contacts,
}: {
  /** Live core officers with a number on file — see getCouncilContacts(). */
  contacts: Array<{ name: string; role: string; phone: string | null }>;
}) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const mountedAt = useRef(Date.now());

  function onSubmit(formData: FormData) {
    formData.set("elapsed", String(Date.now() - mountedAt.current));

    startTransition(async () => {
      const response = await sendMessage(formData);
      setResult(response);
      if (response.ok) {
        formRef.current?.reset();
        mountedAt.current = Date.now();
      }
    });
  }

  return (
    <section id="contact" data-surface="light" className="relative overflow-hidden bg-wash py-28 text-neutral-700 md:py-40">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-accent) 1px, transparent 1px), linear-gradient(to bottom, var(--color-accent) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden="true"
      />

      {/* WebGL accent. Parked top-right and clipped by the section so it reads
          as an object passing behind the content rather than a centred logo.
          Hidden below lg — on a phone it would eat the viewport and the
          battery for a decoration. */}
      <div
        className="pointer-events-none absolute -top-10 -right-20 hidden h-[26rem] w-[26rem] opacity-30 lg:block"
        aria-hidden="true"
      >
        <LazyScene scene="orb" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <h2 className="optical-left balance mb-16 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] font-bold tracking-tight">
          <span className="ink-gradient-split">
            <SplitWords text="Send us a message" as="span" stagger={0.06} />
          </span>
        </h2>

        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* ── Details ─────────────────────────────────────── */}
          <div>
            <Stagger className="space-y-10">
              <StaggerItem kind="up">
                <h3 className="font-mono text-[10px] tracking-[0.24em] text-neutral-500 uppercase">
                  Where to find us
                </h3>
                <address className="mt-3 text-lg leading-relaxed font-light text-neutral-700 not-italic">
                  {SITE.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </StaggerItem>

              <StaggerItem kind="up" className={contacts.length === 0 ? "hidden" : undefined}>
                <h3 className="font-mono text-[10px] tracking-[0.24em] text-neutral-500 uppercase">
                  Talk to the council
                </h3>
                <ul className="mt-4 space-y-3">
                  {contacts.map((contact) => (
                    <li key={contact.name}>
                      {(() => {
                        const body = (
                          <>
                            <span>
                              <span className="block text-base font-medium text-neutral-900">
                                {contact.name}
                              </span>
                            </span>
                            {contact.phone && (
                              <span className="font-mono text-sm text-neutral-600 transition-colors group-hover:text-accent">
                                {contact.phone}
                              </span>
                            )}
                          </>
                        );
                        const shell =
                          "group flex items-baseline justify-between gap-4 border-b border-hairline pb-3 transition-colors";

                        // Only a real number becomes a tel: link — an empty
                        // href would be a link that does nothing when tapped.
                        return contact.phone ? (
                          <a
                            href={`tel:${contact.phone.replace(/\s/g, "")}`}
                            data-cursor="link"
                            className={`${shell} hover:border-accent`}
                          >
                            {body}
                          </a>
                        ) : (
                          <div className={shell}>{body}</div>
                        );
                      })()}
                    </li>
                  ))}
                </ul>
              </StaggerItem>

              <StaggerItem kind="up">
                <h3 className="font-mono text-[10px] tracking-[0.24em] text-neutral-500 uppercase">
                  Connect
                </h3>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {SOCIALS.map((social) => (
                    <li key={social.label}>
                      <Magnetic strength={0.3} radius={90}>
                        <a
                          href={social.href}
                          target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          data-cursor="link"
                          className="inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-2.5 text-sm text-neutral-700 transition-colors hover:border-accent hover:text-accent"
                        >
                          {social.label}
                          <span aria-hidden="true" className="text-neutral-500">
                            ↗
                          </span>
                        </a>
                      </Magnetic>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            </Stagger>
          </div>

          {/* ── Form ────────────────────────────────────────── */}
          <Reveal kind="rotate3d" delay={0.15}>
            <Tilt3D intensity={6} scale={1} glare={false} className="rounded-3xl">
              <form
                ref={formRef}
                action={onSubmit}
                className="rounded-3xl border border-hairline bg-canvas-raised/80 p-8 shadow-xl shadow-accent/5 backdrop-blur-sm md:p-10"
              >
                {/* Honeypot: off-screen, not display:none — some bots skip hidden fields. */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" suppressHydrationWarning />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Your name" name="name" required maxLength={120} />
                  <Field label="Email" name="email" type="email" required maxLength={200} />
                </div>

                <div className="mt-5">
                  <Field label="Subject" name="subject" maxLength={160} />
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="body"
                    className="mb-2 block font-mono text-[10px] tracking-[0.18em] text-neutral-500 uppercase"
                  >
                    Message
                  </label>
                  <textarea
                    id="body"
                    name="body"
                    rows={5}
                    required
                    maxLength={4000}
                    className="w-full resize-y rounded-xl border border-hairline bg-canvas-raised px-4 py-3 text-[15px] text-neutral-900 transition-colors outline-none placeholder:text-neutral-400 focus:border-accent"
                    placeholder="Tell us what you have in mind…"
                    suppressHydrationWarning
                  />
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Magnetic strength={0.32} radius={120}>
                    <button
                      type="submit"
                      disabled={pending}
                      data-cursor="link"
                      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-fill px-8 py-4 text-sm font-medium text-white transition-opacity disabled:opacity-60"
                      suppressHydrationWarning
                    >
                      <span className="relative z-10">{pending ? "Sending…" : "Send message"}</span>
                      <span
                        className="relative z-10 transition-transform duration-500 group-hover:translate-x-1"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </button>
                  </Magnetic>

                  <a
                    href={`mailto:${SITE.email}`}
                    data-cursor="link"
                    className="text-sm text-neutral-600 underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    or email {SITE.email}
                  </a>
                </div>

                {/* aria-live so the outcome is announced, not just shown. */}
                {/* Rendered directly rather than through AnimatePresence — the
                    submission result must appear even if animations cannot run. */}
                <div aria-live="polite" className="min-h-[1.5rem]">
                  {result && (
                    <motion.p
                      key={result.message}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-5 text-sm ${result.ok ? "text-emerald-600" : "text-rose-600"}`}
                    >
                      {result.message}
                    </motion.p>
                  )}
                </div>
              </form>
            </Tilt3D>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-[10px] tracking-[0.18em] text-neutral-500 uppercase"
      >
        {label}
        {required && <span className="ml-1 text-neutral-400">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        className="w-full rounded-xl border border-hairline bg-canvas-raised px-4 py-3 text-[15px] text-neutral-900 transition-colors outline-none placeholder:text-neutral-400 focus:border-accent"
        suppressHydrationWarning
      />
    </div>
  );
}
