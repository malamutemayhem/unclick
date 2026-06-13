import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initPostHog, posthog } from "./lib/posthog";

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

createRoot(document.getElementById("root")!).render(<App />);
