// Connection + signals status: summarize UnClick state into a compact badge.
// Pure functions over loosely-typed inputs, so they tolerate response shape drift.

export interface ConnectionLike {
  platform?: string;
  status?: string;
  connected?: boolean;
  healthy?: boolean;
}

export interface ConnectionsSummary {
  total: number;
  connected: number;
  needsAttention: number;
}

const CONNECTED_STATES = new Set(["connected", "verified", "healthy", "active", "ok"]);
const ATTENTION_STATES = new Set([
  "failing",
  "needs_attention",
  "expired",
  "error",
  "revoked",
  "disconnected",
]);

export function summarizeConnections(list: ConnectionLike[]): ConnectionsSummary {
  let connected = 0;
  let needsAttention = 0;
  for (const c of list ?? []) {
    const state = (c.status ?? "").toLowerCase();
    const isConnected = c.connected === true || CONNECTED_STATES.has(state);
    const isAttention =
      c.healthy === false || ATTENTION_STATES.has(state);
    if (isAttention) needsAttention += 1;
    else if (isConnected) connected += 1;
  }
  return { total: (list ?? []).length, connected, needsAttention };
}

export interface SignalsLike {
  count?: number;
  unread?: number;
  items?: unknown[];
}

export function summarizeSignals(signals: SignalsLike): { count: number } {
  if (!signals) return { count: 0 };
  if (typeof signals.count === "number") return { count: signals.count };
  if (typeof signals.unread === "number") return { count: signals.unread };
  return { count: Array.isArray(signals.items) ? signals.items.length : 0 };
}

/**
 * Toolbar badge text. Unread signals win (capped at 99+); otherwise a "!" when
 * any connection needs attention; otherwise empty (no badge).
 */
export function badgeText(
  connections: ConnectionsSummary,
  signals: { count: number },
): string {
  if (signals.count > 0) return signals.count > 99 ? "99+" : String(signals.count);
  if (connections.needsAttention > 0) return "!";
  return "";
}
