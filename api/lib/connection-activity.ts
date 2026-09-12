/**
 * Connection state is an observation, not a configuration toggle. A managed
 * memory account can be active even when it has no optional config row.
 */
export interface ConnectionActivityInput {
  apiKeyLastUsedAt?: string | null;
  memoryLastUsedAt?: string | null;
  lastSessionAt?: string | null;
  lastMemoryWriteAt?: string | null;
}

export interface ConnectionActivity {
  connected: boolean;
  lastUsedAt: string | null;
}

function newestValidTimestamp(values: Array<string | null | undefined>): string | null {
  let newest: { value: string; time: number } | null = null;
  for (const value of values) {
    if (!value) continue;
    const time = Date.parse(value);
    if (!Number.isFinite(time)) continue;
    if (!newest || time > newest.time) newest = { value, time };
  }
  return newest?.value ?? null;
}

/**
 * api_keys.last_used_at is the primary authenticated MCP heartbeat. Session
 * and memory-write timestamps keep the dashboard honest for activity that was
 * recorded before the heartbeat was made synchronous.
 */
export function deriveConnectionActivity(input: ConnectionActivityInput): ConnectionActivity {
  const lastUsedAt = newestValidTimestamp([
    input.apiKeyLastUsedAt,
    input.memoryLastUsedAt,
    input.lastSessionAt,
    input.lastMemoryWriteAt,
  ]);
  return { connected: lastUsedAt !== null, lastUsedAt };
}
