// wiring/pushonly.ts
// Per-app MCP wiring for the pushonly connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { pushonlyApi, pushonlyPolicy, pushonlyWakePusher } from "../pushonly-tool.js";

export const pushonlyTools = [
  // ── pushonly-tool.ts ───────────────────────────────────────────────────────
  {
    name: "pushonly_policy",
    description: "Return the PinballWake PushOnlyAPI guardrails. This blue push lane turns verified IgniteOnly wake packets into worker-facing push envelopes only; no execution or source-of-truth writes.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "pushonly_api",
    description: "Run PushOnly📬 on a verified IgniteOnly wake packet. Emits a public worker push envelope for a known worker route only; never builds, merges, assigns, closes, or marks done.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ignite_result: { type: "object", description: "Optional output from igniteonly_api or igniteonly_receipt_consumer." },
        igniteonly_result: { type: "object", description: "Optional IgniteOnly result alias." },
        wake_packet: { type: "object", description: "Optional IgniteOnly wake_packet." },
        ignite_id: { type: "string", description: "Optional IgniteOnly ID." },
        ignite_status: { type: "string", description: "wake_request or escalation_wake_request." },
        worker: { type: "string", description: "Known worker route such as pinballwake-jobs-worker, Builder, Reviewer, Job Manager, or Heartbeat Seat." },
        target: { type: "string", description: "Human target label such as Boardroom backlog, PR #706, issue #706, or a dispatch ID." },
        painpoint_type: { type: "string", description: "stale_ack, duplicate_wake, unclear_owner, queue_hydration_failure, noisy_thread, missing_proof, dormant_worker, or none." },
        source_id: { type: "string", description: "Optional upstream event, dispatch, PR, issue, or wake identifier." },
        source_url: { type: "string", description: "Optional upstream source URL." },
        bridge_id: { type: "string", description: "Optional trusted bridge ID." },
        nudge_trace_id: { type: "string", description: "Optional upstream NudgeOnly trace ID." },
        receipt_line: { type: "string", description: "Optional compact receipt line copied from IgniteOnly." },
        expected_receipt: { type: "string", description: "Optional expected worker ACK/proof text." },
        verifier: { type: "string", description: "Optional verifier text copied from IgniteOnly." },
        public_fields_only: { type: "boolean", description: "Must be true when supplying wake fields directly." },
      },
    },
  },
  {
    name: "pushonly_wake_pusher",
    description: "Consume a verified IgniteOnly wake packet and emit a compact public PushOnly worker envelope. It never writes source-of-truth state or executes the work.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ignite_result: { type: "object", description: "Optional output from igniteonly_api or igniteonly_receipt_consumer." },
        igniteonly_result: { type: "object", description: "Optional IgniteOnly result alias." },
        wake_packet: { type: "object", description: "Optional IgniteOnly wake_packet." },
        ignite_id: { type: "string", description: "Optional IgniteOnly ID." },
        ignite_status: { type: "string", description: "wake_request or escalation_wake_request." },
        worker: { type: "string", description: "Known worker route such as pinballwake-jobs-worker, Builder, Reviewer, Job Manager, or Heartbeat Seat." },
        target: { type: "string", description: "Human target label such as Boardroom backlog, PR #706, issue #706, or a dispatch ID." },
        painpoint_type: { type: "string", description: "stale_ack, duplicate_wake, unclear_owner, queue_hydration_failure, noisy_thread, missing_proof, dormant_worker, or none." },
        source_id: { type: "string", description: "Optional upstream event, dispatch, PR, issue, or wake identifier." },
        source_url: { type: "string", description: "Optional upstream source URL." },
        bridge_id: { type: "string", description: "Optional trusted bridge ID." },
        nudge_trace_id: { type: "string", description: "Optional upstream NudgeOnly trace ID." },
        receipt_line: { type: "string", description: "Optional compact receipt line copied from IgniteOnly." },
        expected_receipt: { type: "string", description: "Optional expected worker ACK/proof text." },
        verifier: { type: "string", description: "Optional verifier text copied from IgniteOnly." },
        public_fields_only: { type: "boolean", description: "Must be true when supplying wake fields directly." },
      },
    },
  },
] as const;

export const pushonlyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // pushonly-tool.ts
  pushonly_policy:         (args) => pushonlyPolicy(args),
  pushonly_api:            (args) => pushonlyApi(args),
  pushonly_wake_pusher:    (args) => pushonlyWakePusher(args),
};
