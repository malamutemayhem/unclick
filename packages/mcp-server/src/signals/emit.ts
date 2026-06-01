import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

export type SignalInput = {
  apiKeyHash: string;
  tool: string;
  action: string;
  severity?: "info" | "action_needed" | "critical";
  summary: string;
  deepLink?: string;
  payload?: Record<string, unknown>;
};

function getServiceClient() {
  const url = process.env.SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY ?? "";
  return createClient(url, key);
}

export async function emitSignal(input: SignalInput): Promise<void> {
  try {
    if (!input.apiKeyHash || input.apiKeyHash === "unknown") return;
    const supabase = getServiceClient();
    await supabase.from("mc_signals").insert({
      api_key_hash: input.apiKeyHash,
      tool: input.tool,
      action: input.action,
      severity: input.severity ?? "info",
      summary: input.summary,
      deep_link: input.deepLink ?? null,
      payload: input.payload ?? {},
    });
  } catch {
    // fire-and-forget, never throws upstream
  }
}

// The single-tenant API key hash for the running server (env-derived, the same
// derivation server.ts uses for the failure pipeline). Returns null when no key
// is configured, which makes every emit a safe no-op.
export function currentApiKeyHash(): string | null {
  const configuredHash = process.env.UNCLICK_API_KEY_HASH?.trim();
  if (configuredHash) return configuredHash;
  const apiKey = process.env.UNCLICK_API_KEY?.trim();
  if (!apiKey) return null;
  return createHash("sha256").update(apiKey).digest("hex");
}

// Connector-facing proactive emit (the L4 rung). A connector calls this when,
// during an ordinary read, it spots a user-actionable condition (an open
// incident, an alerting monitor, an active disruption). The signal lands in the
// caller's own inbox and surfaces on the next check_signals. It resolves the API
// key hash itself, is scoped to that caller, fire-and-forget, and never throws.
export async function emitConnectorSignal(input: Omit<SignalInput, "apiKeyHash">): Promise<void> {
  const apiKeyHash = currentApiKeyHash();
  if (!apiKeyHash) return;
  await emitSignal({ ...input, apiKeyHash });
}
