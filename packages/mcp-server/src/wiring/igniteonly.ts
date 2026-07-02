// wiring/igniteonly.ts
// Per-app MCP wiring for the igniteonly connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { igniteonlyApi, igniteonlyPolicy, igniteonlyReceiptConsumer } from "../igniteonly-tool.js";

export const igniteonlyTools = [
  // ── igniteonly-tool.ts ─────────────────────────────────────────────────────
  {
    name: "igniteonly_policy",
    description: "Return the PinballWake IgniteOnlyAPI guardrails. This is the green ignite sibling to NudgeOnly: verified worker wake packets only, no build, merge, approval, closure, or truth-setting.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "igniteonly_api",
    description: "Run IgniteOnly💥 on a verified NudgeOnly bridge result or deterministic evidence. Emits a compact public worker wake packet only when safety gates pass.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        nudge_bridge_result: { type: "object", description: "Optional output from nudgeonly_receipt_bridge." },
        bridge_result: { type: "object", description: "Optional bridge result alias." },
        bridge_id: { type: "string", description: "Optional trusted bridge ID, such as nudgebridge_<hash>." },
        bridge_status: { type: "string", description: "receipt_request, escalation_request, advisory_only, or quiet." },
        painpoint_detected: { type: "boolean", description: "Whether trusted evidence found a painpoint." },
        painpoint_type: { type: "string", description: "stale_ack, duplicate_wake, unclear_owner, noisy_thread, missing_proof, dormant_worker, or none." },
        source_id: { type: "string", description: "Optional upstream event, dispatch, PR, issue, or wake identifier." },
        source_url: { type: "string", description: "Optional upstream source URL." },
        target: { type: "string", description: "Human target label such as PR #706, issue #706, or a dispatch ID." },
        request: { type: "object", description: "Optional receipt request with worker, expected_receipt, verifier, and receipt_line." },
        verified: { type: "boolean", description: "True only when a trusted deterministic verifier has checked the evidence." },
        verifier_status: { type: "string", description: "Optional verifier status such as passed, verified, confirmed, wakepass_pass, proof_checked, or ack_checked." },
        nudge_trace_id: { type: "string", description: "Optional upstream NudgeOnly trace ID." },
      },
    },
  },
  {
    name: "igniteonly_receipt_consumer",
    description: "Consume a NudgeOnly receipt bridge result and emit a compact IgniteOnly worker wake packet when verified. It never edits code, merges, approves, closes, or marks done.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        nudge_bridge_result: { type: "object", description: "Optional output from nudgeonly_receipt_bridge." },
        bridge_result: { type: "object", description: "Optional bridge result alias." },
        bridge_id: { type: "string", description: "Optional trusted bridge ID, such as nudgebridge_<hash>." },
        bridge_status: { type: "string", description: "receipt_request, escalation_request, advisory_only, or quiet." },
        painpoint_detected: { type: "boolean", description: "Whether trusted evidence found a painpoint." },
        painpoint_type: { type: "string", description: "stale_ack, duplicate_wake, unclear_owner, noisy_thread, missing_proof, dormant_worker, or none." },
        source_id: { type: "string", description: "Optional upstream event, dispatch, PR, issue, or wake identifier." },
        source_url: { type: "string", description: "Optional upstream source URL." },
        target: { type: "string", description: "Human target label such as PR #706, issue #706, or a dispatch ID." },
        request: { type: "object", description: "Optional receipt request with worker, expected_receipt, verifier, and receipt_line." },
        verified: { type: "boolean", description: "True only when a trusted deterministic verifier has checked the evidence." },
        verifier_status: { type: "string", description: "Optional verifier status such as passed, verified, confirmed, wakepass_pass, proof_checked, or ack_checked." },
        nudge_trace_id: { type: "string", description: "Optional upstream NudgeOnly trace ID." },
      },
    },
  },
] as const;

export const igniteonlyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // igniteonly-tool.ts
  igniteonly_policy:       (args) => igniteonlyPolicy(args),
  igniteonly_api:          (args) => igniteonlyApi(args),
  igniteonly_receipt_consumer:(args) => igniteonlyReceiptConsumer(args),
};
