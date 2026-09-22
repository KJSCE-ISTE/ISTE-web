"use server";

/**
 * Contact form delivery.
 *
 * The form posts to a server action that relays to Formspree server-side.
 * This avoids client-side CSP blocks and ad-blockers.
 */

/** The chapter's Formspree form. Public by design. */
const DEFAULT_CONTACT_ENDPOINT = "https://formspree.io/f/meaqvdan";

const CONTACT_ENDPOINT =
  process.env.CONTACT_ENDPOINT ??
  process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ??
  DEFAULT_CONTACT_ENDPOINT;

export interface ContactResult {
  ok: boolean;
  message: string;
}

export async function sendMessage(formData: FormData): Promise<ContactResult> {
  // Honeypot: a real visitor never sees this field, so anything in it is a bot.
  // Answer as if it succeeded — telling a bot it was caught only helps it.
  if (String(formData.get("website") ?? "").length > 0) {
    return { ok: true, message: "Thanks — we'll be in touch." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!name || !email || !body) {
    return { ok: false, message: "Please fill in your name, email and message." };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { ok: false, message: "That email address does not look right." };
  }

  if (!CONTACT_ENDPOINT) {
    return {
      ok: false,
      message: "The form is not connected yet — please email us directly instead.",
    };
  }

  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, email, subject: subject || "(no subject)", message: body }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("[Formspree] submission error:", response.status, errorData);
      return { ok: false, message: "That didn't send. Please email us directly." };
    }
    return { ok: true, message: "Thanks — we'll be in touch." };
  } catch (err) {
    console.error("[Formspree] network error:", err);
    return { ok: false, message: "That didn't send. Please email us directly." };
  }
}
