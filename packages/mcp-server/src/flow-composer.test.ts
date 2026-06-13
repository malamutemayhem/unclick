import { describe, expect, it } from "vitest";

import { composeFlow } from "./flow-composer.js";

// Colocated tests for the Flow Composer building-layer primitive. Pure and
// deterministic, so we assert on validation, dependency resolution, and the
// runnable plan rather than mocking any network.

describe("flow composer", () => {
  it("builds a runnable plan for a valid multi-step flow", () => {
    const plan = composeFlow({
      goal: "Pull invoices then notify",
      steps: [
        { id: "invoices", tool: "stripe_invoices", params: { limit: 5 } },
        { tool: "slack_action", params: { text: "Latest invoice: {{invoices.data.0.id}}" } },
      ],
    });

    expect(plan.ok).toBe(true);
    expect(plan.errors).toEqual([]);
    expect(plan.step_count).toBe(2);
    expect(plan.goal).toBe("Pull invoices then notify");
    expect(plan.execution).not.toBeNull();
    expect(plan.execution!.calls.map((c) => c.endpoint_id)).toEqual([
      "stripe_invoices",
      "slack_action",
    ]);
    // second step depends on the first via its {{invoices...}} reference
    expect(plan.steps[1].depends_on).toContain("invoices");
  });

  it("auto-assigns step handles and resolves references to them", () => {
    const plan = composeFlow({
      steps: [
        { tool: "stripe_invoices" },
        { tool: "slack_action", params: { text: "id={{step_1.data.0.id}}" } },
      ],
    });

    expect(plan.ok).toBe(true);
    expect(plan.steps[0].id).toBe("step_1");
    expect(plan.steps[1].depends_on).toContain("step_1");
  });

  it("lists touched apps for the connect-first surface", () => {
    const plan = composeFlow({
      steps: [
        { tool: "stripe_invoices" },
        { tool: "slack_action", params: {} },
      ],
    });

    const apps = plan.apps_touched.map((a) => a.app);
    expect(apps).toContain("stripe");
    expect(apps).toContain("slack");
    expect(plan.unclick_meta.next_steps.join(" ")).toMatch(/keychain_connect/);
  });

  it("rejects an unknown tool and suggests close matches", () => {
    const plan = composeFlow({
      steps: [{ tool: "stripe_invoice" }], // missing trailing 's'
    });

    expect(plan.ok).toBe(false);
    expect(plan.execution).toBeNull();
    expect(plan.errors.join(" ")).toMatch(/unknown tool "stripe_invoice"/);
    expect(plan.errors.join(" ")).toMatch(/Did you mean:.*stripe_invoices/);
  });

  it("rejects a forward reference to a later step", () => {
    const plan = composeFlow({
      steps: [
        { id: "first", tool: "slack_action", params: { text: "{{second.value}}" } },
        { id: "second", tool: "stripe_invoices" },
      ],
    });

    expect(plan.ok).toBe(false);
    expect(plan.errors.join(" ")).toMatch(/references "\{\{second\}\}" from a later step/);
  });

  it("rejects a self reference", () => {
    const plan = composeFlow({
      steps: [{ id: "loop", tool: "slack_action", params: { text: "{{loop.x}}" } }],
    });

    expect(plan.ok).toBe(false);
    expect(plan.errors.join(" ")).toMatch(/references its own output/);
  });

  it("rejects an unknown reference handle", () => {
    const plan = composeFlow({
      steps: [{ tool: "slack_action", params: { text: "{{ghost.value}}" } }],
    });

    expect(plan.ok).toBe(false);
    expect(plan.errors.join(" ")).toMatch(/references "\{\{ghost\}\}", which is not a known step handle/);
  });

  it("rejects duplicate step handles", () => {
    const plan = composeFlow({
      steps: [
        { id: "dup", tool: "stripe_invoices" },
        { id: "dup", tool: "slack_action" },
      ],
    });

    expect(plan.ok).toBe(false);
    expect(plan.errors.join(" ")).toMatch(/Duplicate step handle "dup"/);
  });

  it("errors on an empty flow", () => {
    const plan = composeFlow({ steps: [] });
    expect(plan.ok).toBe(false);
    expect(plan.errors.join(" ")).toMatch(/No steps provided/);
  });

  it("warns on a single-step flow but still validates", () => {
    const plan = composeFlow({ steps: [{ tool: "stripe_invoices" }] });
    expect(plan.ok).toBe(true);
    expect(plan.warnings.join(" ")).toMatch(/Single-step flow/);
  });

  it("resolves references nested inside arrays and objects", () => {
    const plan = composeFlow({
      steps: [
        { id: "src", tool: "stripe_invoices", save_as: "inv" },
        {
          tool: "slack_action",
          params: { blocks: [{ text: "{{inv.data.0.id}}" }], meta: { ref: "{{src.id}}" } },
        },
      ],
    });

    expect(plan.ok).toBe(true);
    expect(plan.steps[1].depends_on.sort()).toEqual(["inv", "src"]);
  });
});
