// src/components/HeartbeatOnboarding.tsx
//
// UnClick Heartbeat onboarding widget. Shows the operator that the heartbeat
// is alive, what cadence it's running on, and when the next tick is expected.
// Branded "❤️ UnClick Heartbeat" message per Chris's 2026-05-06 decision.
//
// Closes UnClick todo "UnClick Heartbeat onboarding widget + branded message".
// Builds on the heartbeat protocol MCP tool (todo 0a78d812).
//
// Props:
//   - lastTickAt:  ISO 8601 string of the most recent heartbeat tick (or null
//                  if not yet observed).
//   - cadenceMs:   expected interval between ticks in milliseconds.
//   - dismissed:   external dismissed-state. Caller persists this however it
//                  likes (cookie, user settings, etc).
//   - onDismiss:   called when the user clicks the close button.
//
// Stateless component. Uses inline styles to avoid CSS-pipeline coupling.

import { useEffect, useMemo, useState } from "react";

export interface HeartbeatOnboardingProps {
  lastTickAt: string | null;
  cadenceMs: number;
  dismissed?: boolean;
  onDismiss?: () => void;
  /** Optional override for current time, useful in tests. */
  now?: Date;
  /** Optional tick interval for the auto-update. Default 1000ms. */
  refreshMs?: number;
}

export default function HeartbeatOnboarding({
  lastTickAt,
  cadenceMs,
  dismissed = false,
  onDismiss,
  now,
  refreshMs = 1000,
}: HeartbeatOnboardingProps) {
  const [tick, setTick] = useState<Date>(now ?? new Date());

  useEffect(() => {
    if (now || refreshMs <= 0) return;
    const id = setInterval(() => setTick(new Date()), refreshMs);
    return () => clearInterval(id);
  }, [now, refreshMs]);

  const status = useMemo(() => deriveStatus(lastTickAt, cadenceMs, tick), [lastTickAt, cadenceMs, tick]);

  if (dismissed) return null;

  return (
    <div role="status" aria-live="polite" style={styles.container(status.health)}>
      <div style={styles.row}>
        <span style={styles.brand}>❤️ UnClick Heartbeat</span>
        <span style={styles.pill(status.health)}>{labelForHealth(status.health)}</span>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss UnClick Heartbeat widget"
            style={styles.dismiss}
          >
            ×
          </button>
        )}
      </div>
      <div style={styles.detail}>
        {status.health === "never" ? (
          <span>Waiting for the first tick…</span>
        ) : (
          <>
            <span>Last tick {status.lastTickHuman}</span>
            <span style={styles.sep}>·</span>
            <span>Cadence {formatCadence(cadenceMs)}</span>
            <span style={styles.sep}>·</span>
            <span>{status.nextTickLabel}</span>
          </>
        )}
      </div>
    </div>
  );
}

// --- Logic (exported for tests) ---

export type HeartbeatHealth = "healthy" | "late" | "stale" | "dead" | "never";

export interface HeartbeatStatus {
  health: HeartbeatHealth;
  ageMs: number | null;
  lastTickHuman: string;
  nextTickLabel: string;
}

export function deriveStatus(
  lastTickAt: string | null,
  cadenceMs: number,
  now: Date,
): HeartbeatStatus {
  if (!lastTickAt) {
    return { health: "never", ageMs: null, lastTickHuman: "—", nextTickLabel: "—" };
  }
  const last = new Date(lastTickAt);
  if (Number.isNaN(last.getTime())) {
    return { health: "never", ageMs: null, lastTickHuman: "—", nextTickLabel: "—" };
  }
  const ageMs = now.getTime() - last.getTime();
  let health: HeartbeatHealth;
  if (ageMs < cadenceMs * 1.2) health = "healthy";
  else if (ageMs < cadenceMs * 3) health = "late";
  else if (ageMs < cadenceMs * 12) health = "stale";
  else health = "dead";

  const dueIn = cadenceMs - ageMs;
  const nextTickLabel =
    dueIn > 0
      ? `Next in ~${formatRelativeMs(dueIn)}`
      : `Overdue by ${formatRelativeMs(-dueIn)}`;

  return { health, ageMs, lastTickHuman: formatPastRelative(ageMs), nextTickLabel };
}

function labelForHealth(h: HeartbeatHealth): string {
  switch (h) {
    case "healthy": return "live";
    case "late": return "running late";
    case "stale": return "stale";
    case "dead": return "dead";
    case "never": return "no signal yet";
  }
}

function formatCadence(cadenceMs: number): string {
  if (cadenceMs < 60_000) return `${Math.round(cadenceMs / 1000)}s`;
  if (cadenceMs < 60 * 60_000) return `${Math.round(cadenceMs / 60_000)}m`;
  return `${(cadenceMs / 3_600_000).toFixed(1)}h`;
}

function formatPastRelative(ms: number): string {
  if (ms < 10_000) return "just now";
  if (ms < 60_000) return `${Math.round(ms / 1000)}s ago`;
  if (ms < 60 * 60_000) return `${Math.round(ms / 60_000)}m ago`;
  return `${(ms / 3_600_000).toFixed(1)}h ago`;
}

function formatRelativeMs(ms: number): string {
  if (ms < 10_000) return "moments";
  if (ms < 60_000) return `${Math.round(ms / 1000)}s`;
  if (ms < 60 * 60_000) return `${Math.round(ms / 60_000)}m`;
  return `${(ms / 3_600_000).toFixed(1)}h`;
}

// --- Styles ---

function colorForHealth(h: HeartbeatHealth): { bg: string; fg: string; pillBg: string; pillFg: string } {
  switch (h) {
    case "healthy": return { bg: "#f1fbf3", fg: "#1a4f2a", pillBg: "#1a4f2a", pillFg: "#fff" };
    case "late":    return { bg: "#fff8eb", fg: "#724500", pillBg: "#a76300", pillFg: "#fff" };
    case "stale":   return { bg: "#fff1eb", fg: "#7a2900", pillBg: "#b53d00", pillFg: "#fff" };
    case "dead":    return { bg: "#fde8e8", fg: "#681212", pillBg: "#a91212", pillFg: "#fff" };
    case "never":   return { bg: "#f3f3f3", fg: "#444",    pillBg: "#666",    pillFg: "#fff" };
  }
}

const styles = {
  container: (h: HeartbeatHealth): React.CSSProperties => ({
    background: colorForHealth(h).bg,
    color: colorForHealth(h).fg,
    border: "1px solid rgba(0,0,0,0.05)",
    borderRadius: 6,
    padding: "10px 14px",
    fontFamily: "system-ui, sans-serif",
    fontSize: 13,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  }),
  row: { display: "flex", alignItems: "center", gap: 10 } satisfies React.CSSProperties,
  brand: { fontWeight: 600 } satisfies React.CSSProperties,
  pill: (h: HeartbeatHealth): React.CSSProperties => ({
    background: colorForHealth(h).pillBg,
    color: colorForHealth(h).pillFg,
    fontSize: 11,
    padding: "1px 8px",
    borderRadius: 999,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  }),
  dismiss: {
    marginLeft: "auto",
    background: "transparent",
    border: 0,
    cursor: "pointer",
    fontSize: 18,
    lineHeight: 1,
    color: "inherit",
    padding: "0 4px",
  } satisfies React.CSSProperties,
  detail: { display: "flex", alignItems: "center", gap: 8, color: "inherit", opacity: 0.85 } satisfies React.CSSProperties,
  sep: { opacity: 0.6 } satisfies React.CSSProperties,
};
