import { describe, expect, it } from "vitest";

import { ENDPOINT_MAP } from "../catalog.js";
import {
  ADVERTISED_TOOLS,
  AUTOPILOT_VISIBLE_TOOLS,
  EXPRESSROOM_VISIBLE_TOOL_NAMES,
  validateToolArgumentsForRuntime,
} from "../server.js";

describe("runtime tool schema validation", () => {
  const probes: Array<{ name: string; args: Record<string, unknown> }> = [
    { name: "load_memory", args: { num_sessions: 1, bogus_field: "should reject" } },
    { name: "search_memory", args: { query: "strict schema probe", bogus_field: "should reject" } },
    { name: "search_typed_links", args: { query: "PR #890", bogus_field: "should reject" } },
    { name: "refresh_taxonomy_snapshots", args: { dry_run: true, bogus_field: "should reject" } },
    {
      name: "save_conversation_turn",
      args: {
        session_id: "strict-probe-session",
        role: "user",
        content: "strict schema probe",
        bogus_field: "should reject",
      },
    },
    { name: "check_signals", args: { agent_id: "strict-probe", bogus_field: "should reject" } },
    { name: "read_orchestrator_context", args: { q: "strict schema probe", bogus_field: "should reject" } },
    { name: "heartbeat_protocol", args: { bogus_field: "should reject" } },
    { name: "commonsensepass_protocol", args: { bogus_field: "should reject" } },
    { name: "commonsensepass_check", args: { claim: "quiet", context: { now_ms: 1 }, bogus_field: "should reject" } },
    { name: "commonsensepass_rules", args: { include_fixtures: false, bogus_field: "should reject" } },
    { name: "xpass_aggregated_verdict", args: { target: { type: "pr", id: "547", sha: "abc123" }, bogus_field: "should reject" } },
    { name: "fidelitypass_verify_copy", args: { copy_scope: "not_applicable", bogus_field: "should reject" } },
    { name: "securitypass_run", args: { target_url: "https://example.com", bogus_field: "should reject" } },
    { name: "securitypass_status", args: { run_id: "securitypass-run-id", bogus_field: "should reject" } },
    { name: "list_expressroom_drafts", args: { agent_id: "strict-probe", bogus_field: "should reject" } },
    {
      name: "ack_handoff",
      args: {
        agent_id: "strict-probe",
        thread_id: "11111111-1111-4111-8111-111111111111",
        current_chip: "Build B probe",
        next_action: "ack the handoff",
        eta: "next cycle",
        bogus_field: "should reject",
      },
    },
    {
      name: "release_claim",
      args: {
        agent_id: "strict-probe",
        todo_id: "11111111-1111-4111-8111-111111111111",
        bogus_field: "should reject",
      },
    },
    {
      name: "sloppass_run",
      args: {
        target: { kind: "pr", label: "PR #1200", repo: "malamutemayhem/unclick", number: 1200 },
        bogus_field: "should reject",
      },
    },
    {
      name: "copypass_run",
      args: {
        copy_text: "Try UnClick with proof receipts.",
        bogus_field: "should reject",
      },
    },
    { name: "stripe_customers", args: { secret_key: "sk_test_dummy", action: "X", bogus_field: "should reject" } },
    { name: "stripe_charges", args: { secret_key: "sk_test_dummy", action: "X", bogus_field: "should reject" } },
    {
      name: "paypal_orders",
      args: {
        client_id: "dummy",
        client_secret: "dummy",
        action: "X",
        order_id: "ORDER",
        bogus_field: "should reject",
      },
    },
    { name: "square_payments", args: { access_token: "dummy", action: "X", bogus_field: "should reject" } },
    {
      name: "unclick_call",
      args: {
        endpoint_id: "memory.search_memory",
        params: { query: "strict schema probe" },
        bogus_field: "should reject",
      },
    },
    { name: "unclick_generate_uuid", args: { count: 1, bogus_field: "should reject" } },
    { name: "unclick_random_password", args: { length: 8, bogus_field: "should reject" } },
    {
      name: "autopilot_record_event",
      args: {
        event_type: "claim",
        actor_agent_id: "strict-probe",
        ref_kind: "todo",
        ref_id: "todo-123",
        bogus_field: "should reject",
      },
    },
    {
      name: "autopilot_zero_touch_metrics",
      args: { ref_kind: "todo", ref_id: "todo-123", bogus_field: "should reject" },
    },
  ];

  it("rejects extra fields before handlers can run", () => {
    for (const probe of probes) {
      const result = validateToolArgumentsForRuntime(probe.name, probe.args);
      expect(result, probe.name).not.toBeNull();
      expect(result?.code).toBe("validation_error");
      expect(result?.details.some((detail) => detail.keyword === "additionalProperties")).toBe(true);
      expect(JSON.stringify(result)).toContain("bogus_field");
    }
  });

  it("allows valid arguments for the same tool family", () => {
    expect(validateToolArgumentsForRuntime("load_memory", { num_sessions: 1 })).toBeNull();
    expect(validateToolArgumentsForRuntime("save_fact", {
      fact: "Issue: Claude tool-result submission fails in Brave. Solution: disable Brave Shields for claude.ai.",
      category: "troubleshooting",
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("save_conversation_turn", {
      session_id: "strict-probe-session",
      role: "user",
      content: "strict schema probe",
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("unclick_generate_uuid", { count: 1 })).toBeNull();
    expect(validateToolArgumentsForRuntime("check_signals", {
      agent_id: "strict-probe",
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("read_orchestrator_context", {
      q: "strict schema probe",
      limit: 40,
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("heartbeat_protocol", {})).toBeNull();
    expect(validateToolArgumentsForRuntime("commonsensepass_protocol", {})).toBeNull();
    expect(validateToolArgumentsForRuntime("commonsensepass_check", {
      claim: "quiet",
      context: { now_ms: 1, active_jobs: 0, todos: [] },
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("commonsensepass_rules", {
      include_fixtures: false,
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("xpass_aggregated_verdict", {
      target: { type: "pr", id: "547", sha: "abc123" },
      changed_files: ["src/pages/admin/You.tsx"],
      pass_results: [
        { check: "UXPass", status: "passed", run_id: "ux-1", target_sha: "abc123" },
      ],
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("fidelitypass_verify_copy", {
      copy_scope: "not_applicable",
      scope_reason: "No exact copy is in scope for this target.",
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("fidelitypass_verify_copy", {
      copy_scope: "exact_copy",
      copyroom_source_packet: {
        source_id: "source-1",
        source_pointer: "copyroom://source-1",
        text: "Exact source",
      },
      output_text: "Exact source",
      mode: "text_exact",
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("list_expressroom_drafts", {
      agent_id: "strict-probe",
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("securitypass_run", {
      target_url: "https://example.com",
      proof_method: "signed_email",
      contract_id: "scope-contract",
      expected_token: "signed-token",
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("securitypass_status", {
      run_id: "securitypass-run-id",
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("list_expressroom_drafts", {
      agent_id: "strict-probe",
      official_todo_id: "11111111-1111-4111-8111-111111111111",
      official_job_mirror: "PR #970",
      express_status: "draft",
      limit: 10,
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("ack_handoff", {
      agent_id: "strict-probe",
      thread_id: "11111111-1111-4111-8111-111111111111",
      current_chip: "Build B probe",
      next_action: "ack the handoff",
      eta: "next cycle",
      blocker: "none",
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("release_claim", {
      agent_id: "strict-probe",
      todo_id: "11111111-1111-4111-8111-111111111111",
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("sloppass_run", {
      target: { kind: "pr", label: "PR #1200", repo: "malamutemayhem/unclick", number: 1200 },
      checks: ["vcs_integration_risk"],
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("copypass_run", {
      copy_text: "UnClick helps teams review AI work with shared context, public proof, and green checks.",
      channel: "homepage_hero",
      profile: "smoke",
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("copypass_status", {
      run_id: "copy-run-123",
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("unclick_call", {
      endpoint_id: "memory.search_memory",
      params: { query: "strict schema probe" },
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("search_typed_links", {
      query: "PR #890",
      max_results: 5,
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("refresh_taxonomy_snapshots", {
      dry_run: true,
      max_sources: 12,
      max_snapshots: 4,
      max_sources_per_snapshot: 3,
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("autopilot_record_event", {
      event_type: "proof_result",
      actor_agent_id: "strict-probe",
      ref_kind: "pr",
      ref_id: "1022",
      payload: { check: "Website (root package)", conclusion: "success" },
    })).toBeNull();
    expect(validateToolArgumentsForRuntime("autopilot_zero_touch_metrics", {
      ref_kind: "pr",
      ref_id: "1022",
      limit: 25,
    })).toBeNull();
  });

  it("exposes Memory taxonomy snapshot refresh as a dry-run-first catalog endpoint", () => {
    const entry = ENDPOINT_MAP.get("memory.refresh_taxonomy_snapshots");

    expect(entry?.tool.slug).toBe("memory");
    expect(entry?.endpoint.path).toBe("/v1/memory/taxonomy/refresh");
    expect(entry?.endpoint.inputSchema).toMatchObject({
      type: "object",
      properties: {
        dry_run: { type: "boolean", default: true },
        max_sources: { type: "number", minimum: 1, maximum: 250, default: 80 },
        max_snapshots: { type: "number", minimum: 1, maximum: 12, default: 12 },
        max_sources_per_snapshot: { type: "number", minimum: 1, maximum: 12, default: 8 },
      },
    });
  });

  it("advertises DraftRoom Manual draft bridge tools to connected agents", () => {
    const advertisedNames = new Set(ADVERTISED_TOOLS.map((tool) => tool.name));

    for (const toolName of EXPRESSROOM_VISIBLE_TOOL_NAMES) {
      expect(advertisedNames.has(toolName), toolName).toBe(true);
    }
  });

  it("advertises AutoPilot ledger tools to connected agents", () => {
    const advertisedNames = new Set(ADVERTISED_TOOLS.map((tool) => tool.name));

    for (const tool of AUTOPILOT_VISIBLE_TOOLS) {
      expect(advertisedNames.has(tool.name), tool.name).toBe(true);
    }
  });

  it("advertises the guarded Boardroom release tool", () => {
    const advertisedNames = new Set(ADVERTISED_TOOLS.map((tool) => tool.name));

    expect(advertisedNames.has("release_claim")).toBe(true);
  });

  it("advertises SecurityPass as a scope-gated receipt surface", () => {
    const advertisedNames = new Set(ADVERTISED_TOOLS.map((tool) => tool.name));

    expect(advertisedNames.has("securitypass_run")).toBe(true);
    expect(advertisedNames.has("securitypass_status")).toBe(true);
    expect(advertisedNames.has("securitypass_verify_scope")).toBe(true);
  });
});

describe("collapsed advertised tool surface", () => {
  const advertisedNames = new Set(ADVERTISED_TOOLS.map((tool) => tool.name));

  it("advertises the four discovery meta-tools so the hidden catalog stays reachable", () => {
    for (const meta of ["unclick_search", "unclick_browse", "unclick_tool_info", "unclick_call"]) {
      expect(advertisedNames.has(meta), meta).toBe(true);
    }
  });

  it("does NOT advertise the ~800 integration tools individually", () => {
    for (const hidden of [
      "bgg_search",
      "spotify_search",
      "stripe_customers",
      "testpass_run",
      "flowpass_run",
      "weather_current",
    ]) {
      expect(advertisedNames.has(hidden), `${hidden} should be hidden from tools/list`).toBe(false);
    }
  });

  it("keeps the advertised surface to a handful, not hundreds", () => {
    // Guards against accidentally re-flattening ADDITIONAL_TOOLS into tools/list.
    expect(ADVERTISED_TOOLS.length).toBeLessThan(60);
  });

  it("keeps hidden integration tools callable (runtime schema still enforced)", () => {
    // Hidden does not mean gone: the schema is still registered, so unknown
    // fields are rejected and the tool remains invocable by name / unclick_call.
    const error = validateToolArgumentsForRuntime("bgg_search", {
      query: "catan",
      bogus_field: "should reject",
    });
    expect(error, "hidden integration tool should still validate at runtime").toBeTruthy();
  });
});
