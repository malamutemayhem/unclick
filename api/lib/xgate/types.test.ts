import { describe, expect, it } from "vitest";
import { VERDICT_PRECEDENCE, type GateVerdict } from "./types";

describe("VERDICT_PRECEDENCE", () => {
  it("orders deny > ask > rewrite > allow", () => {
    expect(VERDICT_PRECEDENCE.deny).toBeGreaterThan(VERDICT_PRECEDENCE.ask);
    expect(VERDICT_PRECEDENCE.ask).toBeGreaterThan(VERDICT_PRECEDENCE.rewrite);
    expect(VERDICT_PRECEDENCE.rewrite).toBeGreaterThan(VERDICT_PRECEDENCE.allow);
  });

  it("uses the frozen numeric values", () => {
    expect(VERDICT_PRECEDENCE).toEqual({ deny: 3, ask: 2, rewrite: 1, allow: 0 });
  });

  it("has an entry for every verdict and no extras", () => {
    const verdicts: GateVerdict[] = ["allow", "deny", "ask", "rewrite"];
    expect(Object.keys(VERDICT_PRECEDENCE).sort()).toEqual([...verdicts].sort());
  });

  it("ranks allow as the least restrictive (zero)", () => {
    const ranks = Object.values(VERDICT_PRECEDENCE);
    expect(Math.min(...ranks)).toBe(VERDICT_PRECEDENCE.allow);
    expect(Math.max(...ranks)).toBe(VERDICT_PRECEDENCE.deny);
  });
});
