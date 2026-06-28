import { describe, expect, it } from "vitest";
import { CONTEXT_TEMPLATES } from "./memory-admin";

describe("admin_context_apply_template starter templates", () => {
  it("keeps the four persona templates", () => {
    for (const name of ["freelancer", "developer", "founder", "creator"]) {
      expect(Array.isArray(CONTEXT_TEMPLATES[name])).toBe(true);
      expect(CONTEXT_TEMPLATES[name].length).toBeGreaterThan(0);
    }
  });

  it("adds an `unclick` operating-basics template so a new account is not blank", () => {
    const rows = CONTEXT_TEMPLATES.unclick;
    expect(Array.isArray(rows)).toBe(true);
    expect(rows.length).toBeGreaterThanOrEqual(19);

    const keys = rows.map((r) => r.key);
    // core operating basics
    expect(keys).toContain("memory_protocol");
    expect(keys).toContain("tool_first");
    expect(keys).toContain("session_close");
    expect(keys).toContain("save_fixes");
    // operating-discipline guardrails distilled from the orchestrator
    expect(keys).toContain("proof_before_done");
    expect(keys).toContain("high_risk_stop");
    expect(keys).toContain("secret_hygiene");
    expect(keys).toContain("scoped_slices");
    expect(keys).toContain("specific_blockers");
    expect(keys).toContain("copy_from_source");
    // autonomy and dedup doctrine distilled from later memory passes
    expect(keys).toContain("autonomy_balance");
    expect(keys).toContain("continue_existing_work");
    // full-coverage audit additions (complete memory + orchestrator reads)
    expect(keys).toContain("compact_memory");
    expect(keys).toContain("idle_not_done");
    expect(keys).toContain("live_source_wins");
    expect(keys).toContain("fetch_from_source");
    expect(keys).toContain("patch_the_source");
    expect(keys).toContain("public_surface_hygiene");
    expect(keys).toContain("honest_pushback");

    // the tool-first rule must point agents at UnClick's own tools
    const toolFirst = rows.find((r) => r.key === "tool_first");
    expect(toolFirst?.value).toContain("unclick_search");
    expect(toolFirst?.value).toContain("unclick_call");
  });

  it("uses only valid business_context categories, snake_case keys, and no em dashes", () => {
    const validCategories = new Set([
      "identity",
      "preference",
      "workflow",
      "standing_rule",
      "technical",
    ]);
    for (const rows of Object.values(CONTEXT_TEMPLATES)) {
      for (const row of rows) {
        expect(validCategories.has(row.category)).toBe(true);
        expect(row.key).toMatch(/^[a-z_]+$/);
        expect(row.value.length).toBeGreaterThan(0);
        expect(row.value.includes(String.fromCharCode(0x2014))).toBe(false); // em dash banned repo-wide
      }
    }
  });
});
