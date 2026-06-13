// XGate preflight hook for the MCP tool hot path.
//
// The gate LOGIC is single-sourced in the API (api/lib/xgate). The published
// mcp-server package cannot import from api/, so this hook calls the API's
// /api/xgate-check?mode=preflight endpoint over HTTP, mirroring how
// session-inspection-trigger reaches the API.
//
// Rollout safety:
//  - OFF BY DEFAULT. Only runs when UNCLICK_XGATE_ENFORCE=1. When off, returns
//    null immediately (caller proceeds) so tool behaviour is unchanged.
//  - Fail open: any network/timeout/parse error returns a proceed outcome. A
//    guardrail that breaks the tool path is worse than one that is briefly
//    absent; "block" enforcement is the API's job, not this transport's.
//  - Never throws.

const API_BASE =
  process.env.UNCLICK_MEMORY_BASE_URL || process.env.UNCLICK_SITE_URL || "https://unclick.world";

export interface XGatePreflightOutcome {
  proceed: boolean;
  verdict?: string;
  gate?: string;
  ruleId?: string;
  reason?: string;
  mode?: string;
}

export function isXGateEnforceEnabled(): boolean {
  return process.env.UNCLICK_XGATE_ENFORCE === "1";
}

// Cheap, name-based prefilter so the common benign tools (datetime, weather,
// search reads, memory) skip the network hop entirely. This is a SUPERSET of the
// API's classifyEndpoint risk patterns: a false positive only costs one extra
// preflight call (the API then returns allow), while a false negative would
// silently skip the gate, so this errs toward true. The authoritative
// classification stays single-sourced in the API; this only decides whether to
// ask it at all.
const GATE_HINT =
  /(sql|query|exec|shell|command|bash|github|gitlab|push|merge|reset|force|deploy|publish|release|rollback|send|email|sms|message|whatsapp|telegram|slack)/i;

export function mightBeGated(endpointId: string): boolean {
  return GATE_HINT.test(endpointId);
}

/**
 * Ask the API to evaluate an endpoint call against the gates. Returns null when
 * disabled or on any failure (caller should proceed). Only a definitive block
 * decision returns { proceed: false }.
 */
export async function xgatePreflight(
  endpointId: string,
  params: Record<string, unknown>,
): Promise<XGatePreflightOutcome | null> {
  if (!isXGateEnforceEnabled()) return null;
  if (!mightBeGated(endpointId)) return null; // benign tool; skip the network hop

  const secret = process.env.CRON_SECRET;
  if (!secret) return null; // cannot authorize; do not block real work

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_BASE}/api/xgate-check?mode=preflight`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ endpointId, params }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = (await res.json()) as XGatePreflightOutcome;
    if (typeof data?.proceed === "boolean") return data;
    return null;
  } catch {
    // Fail open: never let the guardrail transport break the tool path.
    return null;
  }
}
