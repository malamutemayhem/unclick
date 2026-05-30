// tool-failure-class.ts
// Classifies a tool failure so the bug pipeline can tell apart problems UnClick
// must fix (tool_bug, upstream, unknown) from user/transient issues (auth_config,
// usage, transient). Drives severity on the emitted signal and lets the admin
// "bugs" view filter for owner-actionable failures.

export type FailureClass =
  | "tool_bug"      // our wrapper is broken (exceptions, bad parsing, schema/impl drift)
  | "upstream"      // the third-party API failed (5xx, unavailable)
  | "auth_config"   // missing or invalid credentials / config
  | "usage"         // caller supplied bad or missing arguments
  | "transient"     // timeout, network blip, rate limit
  | "unknown";

export interface FailureClassification {
  failureClass: FailureClass;
  /** True when this is UnClick's problem to fix or monitor (surface to the owner). */
  ownerActionable: boolean;
  severity: "info" | "warning" | "action_needed" | "critical";
}

export function classifyFailure(summary: string): FailureClassification {
  const s = summary.toLowerCase();

  // transient first: timeouts, network, rate limits
  if (/\b(timeout|timed out|etimedout|econnreset|econnrefused|enotfound|network|fetch failed|429)\b/.test(s) || /rate.?limit/.test(s)) {
    return { failureClass: "transient", ownerActionable: false, severity: "info" };
  }

  // auth / config: missing or invalid credentials
  if (/\b(unauthori[sz]ed|forbidden|401|403|invalid (api )?key|invalid token)\b/.test(s) ||
      /\b(api[_ ]?key|access[_ ]?token|secret|credentials?)\b.*\b(required|missing|not set|invalid)\b/.test(s) ||
      /\b(env(ironment)? var|not set)\b/.test(s)) {
    return { failureClass: "auth_config", ownerActionable: false, severity: "action_needed" };
  }

  // upstream: the external API is down or erroring server-side
  if (/\b(500|502|503|504|bad gateway|service unavailable|upstream|server error)\b/.test(s)) {
    return { failureClass: "upstream", ownerActionable: true, severity: "warning" };
  }

  // tool_bug: signs our own code broke
  if (/cannot read|undefined is not|is not a function|typeerror|unexpected token|cannot convert|reading '|is not iterable/.test(s)) {
    return { failureClass: "tool_bug", ownerActionable: true, severity: "critical" };
  }

  // usage: bad or missing arguments (caller side; schema/impl drift is caught pre-ship)
  if (/\b(required|invalid|must be|expected|unknown (param|argument|field)|bad request|400)\b/.test(s)) {
    return { failureClass: "usage", ownerActionable: false, severity: "action_needed" };
  }

  return { failureClass: "unknown", ownerActionable: true, severity: "warning" };
}
