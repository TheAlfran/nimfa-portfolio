// Sends contact form messages to your email through EmailJS (https://www.emailjs.com).
// No backend needed. Set the three VITE_EMAILJS_* values in .env.local (see .env.example).
// These IDs and the public key are designed to be public, so it's safe for them to be
// in the built site. The email's look is the HTML template in emailjs-template.html.

import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

const SERVICE_ID = (import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined)?.trim();
const TEMPLATE_ID = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined)?.trim();
const PUBLIC_KEY = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined)?.trim();

export const isContactConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

export interface ContactMessage {
  name: string;
  email: string;
  /** Optional — empty when the visitor leaves it blank. */
  company?: string;
  topic: string;
  message: string;
  /** Honeypot value — real visitors never fill it in. */
  botcheck?: string;
}

/** e.g. "Mon, Nov 23, 2026, 3:45 PM (PH time)" */
function formatSentTime(date: Date): string {
  const formatted = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
  return `${formatted} (PH time)`;
}

export async function sendContactMessage(data: ContactMessage): Promise<void> {
  // Spam bots fill in the hidden field — pretend it worked, but send nothing.
  if (data.botcheck) return;

  if (!isContactConfigured) {
    throw new Error(
      'The contact form is not set up yet. Please email me directly using the address on this page.',
    );
  }

  // These names match the {{variables}} used in emailjs-template.html.
  const templateParams = {
    name: data.name,
    email: data.email,
    company: data.company?.trim() || 'Not provided',
    topic: data.topic,
    message: data.message,
    sent_at: formatSentTime(new Date()),
    sent_from: window.location.host || 'Portfolio website',
  };

  try {
    await emailjs.send(SERVICE_ID!, TEMPLATE_ID!, templateParams, {
      publicKey: PUBLIC_KEY!,
      // Ignore repeat sends within 10 seconds (double clicks, impatient retries).
      limitRate: { id: 'portfolio-contact', throttle: 10_000 },
    });
  } catch (err) {
    if (err instanceof EmailJSResponseStatus) {
      if (err.status === 429) {
        throw new Error('Please wait a few seconds before sending another message.');
      }
      if (err.status === 0) {
        throw new Error('Could not reach the server. Please check your connection and try again.');
      }
      throw new Error(
        `Your message could not be sent${err.text ? `: ${err.text}` : ''}. Please try again or email me directly.`,
      );
    }
    throw new Error('Your message could not be sent. Please try again or email me directly.');
  }
}
