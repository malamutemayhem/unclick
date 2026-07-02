// wiring/nudgeonly.ts
// Per-app MCP wiring for the nudgeonly connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { nudgeonlyApi, nudgeonlyPolicy, nudgeonlyReceiptBridge } from "../nudgeonly-tool.js";

export const nudgeonlyTools = [
  // ── nudgeonly-tool.ts ─────────────────────────────────────────────────────
  {
    name: "nudgeonly_policy",
    description: "Return the PinballWake NudgeOnlyAPI guardrails. This is a red-lane, read-only policy for 👉Nudge: painpoint hints only, no writes, no decisions, no truth-setting.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "nudgeonly_api",
    description: "Run 👉Nudge, the PinballWake NudgeOnlyAPI worker, through OpenRouter free routing. Use only for painpoint hints and simple-English nudge summaries. It cannot merge, close, approve, assign ownership, mark done, or set source-of-truth state.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "OpenRouter API key. Optional when OPENROUTER_API_KEY is set in the environment." },
        event_text: { type: "string", description: "Noisy event, signal, handoff, or status text for 👉Nudge to classify." },
        context: { type: "string", description: "Optional local context. Keep it small and non-secret." },
        painpoint_hint: { type: "string", description: "Optional hint such as stale_ack, duplicate_wake, unclear_owner, noisy_thread, or missing_proof." },
        source_id: { type: "string", description: "Optional upstream event, dispatch, PR, issue, or wake identifier for trace evidence." },
        source_url: { type: "string", description: "Optional upstream URL for trace evidence." },
        model: { type: "string", description: "OpenRouter model ID. Default: liquid/lfm-2.5-1.2b-instruct:free. Use openrouter/free only when auto-rotation is desired." },
        allow_paid: { type: "boolean", description: "Explicit opt-in required for paid or unknown OpenRouter model IDs. Free :free models do not need this." },
        max_tokens: { type: "number", description: "Maximum output tokens. Hard capped at 500. Default: 260." },
      },
      required: ["event_text"],
    },
  },
  {
    name: "nudgeonly_receipt_bridge",
    description: "Turn a verified NudgeOnly painpoint into a tiny worker receipt request or WakePass escalation candidate. Deterministic bridge only: no writes, no ownership decision, no completion state.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        nudge_result: { type: "object", description: "Optional output from nudgeonly_api." },
        painpoint_detected: { type: "boolean", description: "Whether a painpoint was detected by trusted evidence or nudgeonly_api." },
        painpoint_type: { type: "string", description: "stale_ack, duplicate_wake, unclear_owner, noisy_thread, missing_proof, or none." },
        event_text: { type: "string", description: "Source event, blocker, handoff, or state-card text. Keep it small and non-secret." },
        context: { type: "string", description: "Optional local context. Keep it small and non-secret." },
        source_id: { type: "string", description: "Optional upstream event, dispatch, PR, issue, or wake identifier." },
        source_url: { type: "string", description: "Optional upstream source URL." },
        target: { type: "string", description: "Optional human target label such as PR #705 or a dispatch ID." },
        owner: { type: "string", description: "Optional existing owner evidence. The bridge does not invent or decide owners." },
        worker: { type: "string", description: "Optional worker override when a trusted lane already named one." },
        ack_status: { type: "string", description: "Optional ACK status such as missing, stale, received, or blocked." },
        proof_status: { type: "string", description: "Optional proof status such as missing, present, stale, or blocked." },
        created_at: { type: "string", description: "Optional ISO timestamp for the source handoff or request." },
        now: { type: "string", description: "Optional ISO timestamp used for deterministic TTL checks." },
        ttl_minutes: { type: "number", description: "Minutes before missing ACK/proof becomes an escalation request. Default: 60." },
        owner_last_seen_at: { type: "string", description: "Optional ISO timestamp for the current owner's last real check-in. Past TTL is treated as an expired ownership lease." },
        owner_silent_minutes: { type: "number", description: "Optional owner silence age in minutes. Past TTL is treated as an expired ownership lease." },
        nudge_trace_id: { type: "string", description: "Optional trace_id from nudgeonly_api." },
      },
    },
  },
] as const;

export const nudgeonlyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // nudgeonly-tool.ts
  nudgeonly_policy:        (args) => nudgeonlyPolicy(args),
  nudgeonly_api:           (args) => nudgeonlyApi(args),
  nudgeonly_receipt_bridge:(args) => nudgeonlyReceiptBridge(args),
};
