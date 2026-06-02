import { describe, expect, it } from "vitest";

import { ADDITIONAL_HANDLERS, ADDITIONAL_TOOLS } from "./tool-wiring.js";
import {
  flowpassDisagreementQueue,
  flowpassQuarantine,
  flowpassRecord,
  flowpassRegisterPack,
  flowpassReport,
  flowpassRun,
  flowpassStatus,
} from "./flowpass-tool.js";

describe("flowpass-tool", () => {
  it("registers the FlowPass MCP surface from deep research", () => {
    const names = ADDITIONAL_TOOLS.map((tool) => tool.name);
    for (const toolName of [
      "flowpass_run",
      "flowpass_status",
      "flowpass_report",
      "flowpass_register_pack",
      "flowpass_record",
      "flowpass_quarantine",
      "flowpass_disagreement_queue",
    ]) {
      expect(names).toContain(toolName);
      expect(ADDITIONAL_HANDLERS).toHaveProperty(toolName);
    }
  });

  it("marks every FlowPass MCP tool with risk annotations", () => {
    const annotationKeys = [
      "readOnlyHint",
      "destructiveHint",
      "idempotentHint",
      "openWorldHint",
    ] as const;
    const tools = ADDITIONAL_TOOLS.filter((tool) => tool.name.startsWith("flowpass_"));

    expect(tools).toHaveLength(7);
    for (const tool of tools) {
      const annotations = "annotations" in tool && tool.annotations;
      expect(annotations && typeof annotations).toBe("object");
      for (const key of annotationKeys) {
        expect(typeof (annotations as Record<string, unknown>)[key]).toBe("boolean");
      }
    }
  });

  it("runs deterministic fixture checks and exposes reports", async () => {
    const run = await flowpassRun({
      target_url: "https://example.com/signup",
      target_sha: "flow-sha-123",
      generated_at: "2026-05-28T00:00:00.000Z",
      journey_id: "signup",
      journey_name: "Signup journey",
      journey_kind: "signup",
      fixture: {
        route_status: 200,
        text: "Start signup. Success receipt created. Invalid email lets you try again.",
        links: [
          { label: "Sign up", href: "/signup", primary: true },
          { label: "Continue to dashboard", href: "/dashboard" },
        ],
        forms: [{ fields: ["email"], submit_label: "Create account" }],
        success_signals: ["Account created"],
        failure_signals: ["Invalid email"],
        handoff_signals: ["Receipt signup-1"],
        performance_ms: 1400,
        accessibility_notes: ["Labelled email field is present."],
      },
    }) as Record<string, unknown>;

    expect(run).toMatchObject({
      status: "complete",
      pass: "flowpass",
      verdict: "ready",
      journey_readiness_score: 100,
      target_sha: "flow-sha-123",
      flowpass_receipt_v1: {
        kind: "flowpass_receipt_v1",
        status: "PASS",
        target_sha: "flow-sha-123",
        mode: "fixture",
        score: 100,
        checked: { fail: 0, unknown: 0 },
        action_needed: [],
      },
    });
    expect(String((run.flowpass_receipt_v1 as Record<string, unknown>).boundaries)).toContain("does not drive live auth");

    const status = await flowpassStatus({ run_id: run.run_id }) as Record<string, unknown>;
    expect(status).toMatchObject({
      verdict: "ready",
      journey_readiness_score: 100,
      target_sha: "flow-sha-123",
      flowpass_receipt_v1: { target_sha: "flow-sha-123", status: "PASS" },
    });

    const markdown = await flowpassReport({
      run_id: run.run_id,
      format: "markdown",
    }) as Record<string, unknown>;
    expect(String(markdown.report)).toContain("# FlowPass Report");

    const html = await flowpassReport({
      run_id: run.run_id,
      format: "html",
    }) as Record<string, unknown>;
    expect(String(html.report)).toContain("<!doctype html>");
  });

  it("returns plan-only when no fixture proof is supplied", async () => {
    const run = await flowpassRun({
      target_url: "https://example.com/checkout",
      journey_id: "checkout",
      journey_name: "Checkout journey",
      journey_kind: "checkout",
    }) as Record<string, unknown>;

    expect(run).toMatchObject({
      status: "planned",
      mode: "plan-only",
      verdict: "unknown",
      flowpass_receipt_v1: {
        kind: "flowpass_receipt_v1",
        status: "PENDING",
        mode: "plan-only",
      },
    });
    expect(String((run.flowpass_receipt_v1 as Record<string, unknown>).action_needed)).toContain("fixture proof");
  });

  it("rejects blank target SHA values", async () => {
    await expect(flowpassRun({
      target_url: "https://example.com/signup",
      target_sha: " ",
    })).resolves.toMatchObject({ error: "target_sha must be a non-empty string when provided" });
  });

  it("registers YAML packs and can run them with a fixture", async () => {
    const saved = await flowpassRegisterPack({
      pack_yaml: `
flow: support-ticket-flow
url: https://example.com/support
journey:
  kind: support
steps:
  - go to support
  - fill the message field
  - submit the form
  - verify the ticket receipt
hats: [driver, verifier, state-auditor, synthesiser]
`,
    }) as Record<string, unknown>;

    expect(saved).toMatchObject({
      pack_id: "support-ticket-flow",
      saved: true,
      has_fixture: false,
    });

    const run = await flowpassRun({
      pack_id: saved.pack_id,
      fixture: {
        route_status: 200,
        text: "Contact support. Ticket created. Message required.",
        links: [{ label: "Contact support", href: "/support", primary: true }],
        forms: [{ fields: ["email", "message"], submit_label: "Send" }],
        success_signals: ["Ticket created"],
        failure_signals: ["Message required"],
        handoff_signals: ["Ticket support-1"],
      },
    }) as Record<string, unknown>;

    expect(run.verdict).toBe("ready");
    expect(run.pack_id).toBe("support-ticket-flow");
  });

  it("keeps record and quarantine actions safe", async () => {
    await expect(flowpassRecord({ target_url: "https://example.com/app" })).resolves.toMatchObject({
      status: "planned",
    });

    await expect(flowpassQuarantine({
      action: "add",
      flow_id: "checkout",
      reason: "Three failing fixture runs.",
    })).resolves.toMatchObject({ quarantined: true });
    await expect(flowpassQuarantine({ action: "list" })).resolves.toMatchObject({
      quarantined: expect.arrayContaining([
        expect.objectContaining({ flow_id: "checkout", status: "active" }),
      ]),
    });
  });

  it("lists an empty disagreement queue for a clean run", async () => {
    const queue = await flowpassDisagreementQueue({ action: "list" }) as Record<string, unknown>;
    expect(Array.isArray(queue.disagreements)).toBe(true);
  });
});
