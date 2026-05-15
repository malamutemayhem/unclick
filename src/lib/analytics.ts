import { posthog } from "./posthog";

/**
 * Analytics helper. PostHog is the primary client-side analytics path.
 * Umami is kept as an optional compatibility fallback in case the old
 * self-hosted script is restored later. Every failure mode is swallowed so
 * analytics can never break the app.
 */

type EventData = Record<string, string | number | boolean | null | undefined>;

interface UmamiWindow {
  umami?: {
    track?: (event: string, data?: EventData) => void;
  };
}

function currentPath(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function sendNativeAnalytics(event: string, data?: EventData, path?: string): void {
  if (typeof window === "undefined" || typeof fetch !== "function") return;
  try {
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        event,
        path: path ?? currentPath(),
        title: document.title || undefined,
        referrer: document.referrer || undefined,
        properties: data ?? {},
      }),
    }).catch(() => undefined);
  } catch {
    // Never let analytics break the app.
  }
}

export function track(event: string, data?: EventData): void {
  if (typeof window === "undefined") return;
  sendNativeAnalytics(event, data);
  try {
    posthog.capture(event, data);
  } catch {
    // Never let analytics break the app.
  }

  try {
    const umami = (window as unknown as UmamiWindow).umami;
    if (umami && typeof umami.track === "function") {
      umami.track(event, data);
    }
  } catch {
    // Never let analytics break the app.
  }
}

export function trackPageView(path: string): void {
  if (typeof window === "undefined") return;
  const properties = {
    path,
    title: document.title || undefined,
    $current_url: window.location.href,
    $pathname: path,
  };
  sendNativeAnalytics("$pageview", properties, path);

  try {
    posthog.capture("$pageview", properties);
  } catch {
    // Never let analytics break the app.
  }

  try {
    const umami = (window as unknown as UmamiWindow).umami;
    if (umami && typeof umami.track === "function") {
      umami.track("pageview", properties);
    }
  } catch {
    // Never let analytics break the app.
  }
}
