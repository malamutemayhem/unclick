// Reliability dispatch vocabulary for the memory-admin endpoint.
//
// Extracted verbatim from api/memory-admin.ts as part of splitting that
// endpoint into api/lib/admin/* domain modules. Pure constants, types, and
// type guards - no Supabase, no request state.

export const RELIABILITY_SOURCES = [
  "fishbowl",
  "connectors",
  "wakepass",
  "testpass",
  "uipass",
  "uxpass",
  "flowpass",
  "securitypass",
  "manual",
] as const;

export const RELIABILITY_STATUSES = [
  "queued",
  "leased",
  "completed",
  "failed",
  "stale",
  "cancelled",
] as const;

export const RELIABILITY_HEARTBEAT_STATES = [
  "idle",
  "received",
  "accepted",
  "working",
  "blocked",
  "completed",
] as const;

export type ReliabilitySource = (typeof RELIABILITY_SOURCES)[number];
export type ReliabilityStatus = (typeof RELIABILITY_STATUSES)[number];
export type ReliabilityHeartbeatState = (typeof RELIABILITY_HEARTBEAT_STATES)[number];

export type ReliabilityDispatchRow = {
  id: string;
  api_key_hash: string;
  dispatch_id: string;
  source: ReliabilitySource;
  target_agent_id: string;
  task_ref: string | null;
  status: ReliabilityStatus;
  lease_owner: string | null;
  lease_expires_at: string | null;
  last_real_action_at: string | null;
  payload: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
};

export function isReliabilitySource(value: unknown): value is ReliabilitySource {
  return typeof value === "string" && RELIABILITY_SOURCES.includes(value as ReliabilitySource);
}

export function isReliabilityStatus(value: unknown): value is ReliabilityStatus {
  return typeof value === "string" && RELIABILITY_STATUSES.includes(value as ReliabilityStatus);
}

export function isReliabilityHeartbeatState(value: unknown): value is ReliabilityHeartbeatState {
  return (
    typeof value === "string" &&
    RELIABILITY_HEARTBEAT_STATES.includes(value as ReliabilityHeartbeatState)
  );
}
