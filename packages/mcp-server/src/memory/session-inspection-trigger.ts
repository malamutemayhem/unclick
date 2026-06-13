/**
 * Session-inspection trigger: fires the always-on inspection on every session.
 *
 * load_memory (get_startup_context) is the bookend every UnClick-connected seat
 * calls first, on every session, no matter what the conversation is about. This
 * hook rides that bookend: it pings /api/eval-inspection so the system inspects
 * recent work, scores it by proof, advances the recurring-friction streak, and
 * (when enabled) proposes a gated improvement job for Autopilot.
 *
 * Design rules:
 *  - FIRE AND FORGET. It never blocks or delays load_memory, and a failure here
 *    can never break a session. The user's conversation is unaffected.
 *  - OFF BY DEFAULT. Only runs when UNCLICK_SESSION_INSPECTION=1, so turning on
 *    "inspect on every session" is a deliberate, owner-made change.
 *  - Read-only from the seat's side: it just pings; all scoring/persistence
 *    happens server-side behind the endpoint's own auth and gates.
 */

const MEMORY_API_BASE =
  process.env.UNCLICK_MEMORY_BASE_URL || process.env.UNCLICK_SITE_URL || "https://unclick.world";

// Don't ping more than once per this window per process, so a burst of
// load_memory calls in one session does not spam the endpoint.
const MIN_INTERVAL_MS = 60_000;
// Number.NEGATIVE_INFINITY so the first call always fires regardless of clock.
let lastFiredAt = Number.NEGATIVE_INFINITY;

export function isSessionInspectionEnabled(): boolean {
  return process.env.UNCLICK_SESSION_INSPECTION === "1";
}

/**
 * Fire the inspection in the background. Returns immediately; the network call
 * is not awaited by the caller. Safe to call on every load_memory.
 */
export function triggerSessionInspection(now: number = Date.now()): void {
  if (!isSessionInspectionEnabled()) return;

  // The endpoint authorizes via CRON_SECRET; without it we cannot call it.
  const secret = process.env.CRON_SECRET;
  if (!secret) return;

  if (now - lastFiredAt < MIN_INTERVAL_MS) return;
  lastFiredAt = now;

  const url = `${MEMORY_API_BASE}/api/eval-inspection?days=14`;

  // Fire and forget. Swallow every error: this must never affect the session.
  void (async () => {
    try {
      await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${secret}` },
      });
    } catch {
      // Intentionally ignored: background inspection is best-effort.
    }
  })();
}

/** Test seam: reset the throttle between unit tests. */
export function resetSessionInspectionThrottle(): void {
  lastFiredAt = Number.NEGATIVE_INFINITY;
}
