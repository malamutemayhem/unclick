import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initPostHog, posthog } from "./lib/posthog";
import RouteErrorBoundary from "./components/RouteErrorBoundary.tsx";
import { recoverFromStaleChunk } from "./lib/chunk-reload";

// Self-heal stale lazy chunks. After a deploy, an open tab's module graph still
// points at the previous build's hashed chunk URLs, so the next route
// navigation 404s on a dead chunk. Vite raises `vite:preloadError` for that
// failure; we reload once (loop-guarded) to fetch the fresh index.html instead
// of letting the rejected import blank the app to the bare navy canvas. The
// RouteErrorBoundary below is the backstop for the same failure surfaced as a
// React render error rather than a preload event.
window.addEventListener("vite:preloadError", (event) => {
  event.preventDefault();
  recoverFromStaleChunk();
});

// PostHog initialises after first paint: analytics must never compete
// with rendering the homepage on slow devices. The native /api/analytics
// pageview fires immediately regardless; once PostHog is up we replay
// the landing pageview so its funnel keeps the entry point.
const idle = (cb: () => void) =>
  "requestIdleCallback" in window
    ? window.requestIdleCallback(cb, { timeout: 3000 })
    : window.setTimeout(cb, 1500);
idle(() => {
  initPostHog();
  try {
    const path = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    posthog.capture("$pageview", {
      path,
      title: document.title || undefined,
      $current_url: window.location.href,
      $pathname: path,
    });
  } catch {
    // Never let analytics break the app.
  }
});

createRoot(document.getElementById("root")!).render(
  <RouteErrorBoundary>
    <App />
  </RouteErrorBoundary>,
);
