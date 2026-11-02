import { useEffect, useRef, useState } from 'react';
import { site } from '../config/site';

/**
 * Shared enquiry submission for every form on the site (full enquiry and urgent cover).
 * Posts JSON to VITE_ENQUIRY_ENDPOINT with a honeypot, a timeout and specific failure states.
 * With no endpoint configured it never pretends to send: it offers a pre-filled email when an
 * address is configured, the phone number when one is, and otherwise says plainly that nothing
 * was sent.
 */

/** How long to wait for the enquiry endpoint before treating the request as failed. */
const SUBMIT_TIMEOUT_MS = 15000;

export type Failure = 'offline' | 'timeout' | 'rate-limited' | 'rejected' | 'server';
export type SendStatus = 'idle' | 'sending' | 'sent' | 'failed' | 'not-configured';

export const failureCopy: Record<Failure, { title: string; body: string }> = {
  offline: {
    title: 'Your enquiry could not be sent — you appear to be offline.',
    body: 'Check your internet connection and send it again. Your details are still in the form.',
  },
  timeout: {
    title: 'Your enquiry could not be sent — the connection timed out.',
    body: 'It may not have reached us. Please try again in a moment; your details are still in the form.',
  },
  'rate-limited': {
    title: 'Your enquiry could not be sent — too many attempts.',
    body: 'Please wait a few minutes before sending it again. Your details are still in the form.',
  },
  rejected: {
    title: 'Your enquiry could not be sent — some details were not accepted.',
    body: 'Check each field and try again. If it keeps happening, please contact INDO directly.',
  },
  server: {
    title: 'Your enquiry could not be sent.',
    body: 'Something went wrong on our side. Your details are still in the form — please try again in a few minutes.',
  },
};

/** A mailto: link carrying the enquiry, used only when no endpoint is configured but an email is. */
export function mailtoLink(subject: string, lines: [label: string, value: string][]) {
  if (!site.contact.email) return null;
  const body = lines
    .filter(([, v]) => v.trim())
    .map(([k, v]) => `${k}: ${v.trim()}`)
    .join('\n');
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Submission state machine shared by the enquiry forms. */
export function useEnquirySubmit() {
  const [status, setStatus] = useState<SendStatus>('idle');
  const [failure, setFailure] = useState<Failure>('server');
  const requestRef = useRef<AbortController | null>(null);

  // Cancel an in-flight request if the visitor leaves the page.
  useEffect(() => () => requestRef.current?.abort(), []);

  /** Resolves true once the endpoint accepted the enquiry. */
  async function send(payload: Record<string, string>): Promise<boolean> {
    if (status === 'sending') return false; // ignore repeat clicks while a request is in flight
    if (!site.enquiryEndpoint) {
      setStatus('not-configured');
      return false;
    }
    if (!navigator.onLine) {
      setFailure('offline');
      setStatus('failed');
      return false;
    }

    setStatus('sending');
    const controller = new AbortController();
    requestRef.current = controller;
    let timedOut = false;
    const timer = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, SUBMIT_TIMEOUT_MS);

    const fail = (reason: Failure) => {
      setFailure(reason);
      setStatus('failed');
      return false;
    };

    try {
      const res = await fetch(site.enquiryEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...Object.fromEntries(Object.entries(payload).map(([k, v]) => [k, v.trim()])),
          submittedAt: new Date().toISOString(),
        }),
        signal: controller.signal,
      });
      if (res.ok) {
        setStatus('sent');
        return true;
      }
      if (res.status === 429) return fail('rate-limited');
      if (res.status >= 400 && res.status < 500) return fail('rejected');
      return fail('server');
    } catch {
      // An abort without a timeout means the visitor navigated away: nothing to show.
      if (controller.signal.aborted && !timedOut) return false;
      return fail(timedOut ? 'timeout' : navigator.onLine ? 'server' : 'offline');
    } finally {
      window.clearTimeout(timer);
      if (requestRef.current === controller) requestRef.current = null;
    }
  }

  return { status, setStatus, failure, send };
}
