import { describe, expect, it } from "vitest";

import {
  FLOWPASS_INTERNAL_DOGFOOD_INPUT,
  runFlowPass,
} from "../index.js";

describe("FlowPass runner", () => {
  it("runs a deterministic fixture journey with hats, score, and exclusions", () => {
    const report = runFlowPass(FLOWPASS_INTERNAL_DOGFOOD_INPUT);

    expect(report.run_id).toMatch(/^flowpass_/);
    expect(report.mode).toBe("fixture");
    expect(report.verdict).toBe("ready");
    expect(report.journey_readiness_score).toBe(100);
    expect(report.steps.map((step) => step.verdict)).toEqual([
      "pass",
      "pass",
      "pass",
      "pass",
      "pass",
      "pass",
      "pass",
    ]);
    expect(report.hats.map((hat) => hat.hat_id)).toContain("synthesiser");
    expect(report.not_checked.map((item) => item.label)).toContain("Live browser execution");
    expect(report.summary?.coverage_note).toMatch(/supplied public fixture/i);
  });

  it("fails closed when handoff and success proof are missing", () => {
    const report = runFlowPass({
      target_url: "https://example.com/signup",
      generated_at: "2026-05-28T00:00:00.000Z",
      mode: "fixture",
      journey_id: "signup",
      journey_name: "Signup journey",
      journey_kind: "signup",
      fixture: {
        route_status: 200,
        text: "Start here.",
        links: [{ label: "Start", href: "/signup", primary: true }],
        forms: [{ fields: ["email"], submit_label: "Submit" }],
      },
    });

    expect(report.verdict).toBe("blocked");
    expect(report.journey_readiness_score).toBeLessThan(80);
    expect(JSON.stringify(report.steps)).toContain("Success state is missing");
    expect(JSON.stringify(report.steps)).toContain("Handoff proof is missing");
  });

  it("returns plan-only instead of pretending a live journey ran when no fixture is supplied", () => {
    const report = runFlowPass({
      target_url: "https://example.com/checkout",
      generated_at: "2026-05-28T00:00:00.000Z",
      mode: "fixture",
      journey_id: "checkout",
      journey_name: "Checkout journey",
      journey_kind: "checkout",
    });

    expect(report.mode).toBe("plan-only");
    expect(report.verdict).toBe("unknown");
    expect(report.notes.join(" ")).toMatch(/no public fixture/i);
  });

  it("redacts secret-looking fixture evidence", () => {
    const report = runFlowPass({
      target_url: "https://example.com/support",
      generated_at: "2026-05-28T00:00:00.000Z",
      mode: "fixture",
      journey_id: "support",
      journey_name: "Support journey",
      journey_kind: "support",
      fixture: {
        route_status: 200,
        text: "Start support. Success receipt created. Error state lets you try again.",
        links: [{ label: "Contact support", href: "/support", primary: true }],
        forms: [{ fields: ["email", "message"], submit_label: "Send" }],
        success_signals: ["Ticket created"],
        failure_signals: ["Message required"],
        handoff_signals: [`token ${["sk", "should_not_escape"].join("-")} receipt support-1`],
      },
    });

    expect(JSON.stringify(report)).not.toContain(["sk", "should_not_escape"].join("-"));
    expect(JSON.stringify(report)).toContain("[redacted-sensitive-token]");
  });
});
