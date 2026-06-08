import { describe, it, expect } from "vitest";
import { collatzSequence } from "./collatz-tool.js";

describe("collatz-tool", () => {
  it("computes Collatz sequence for 6", async () => {
    const r = await collatzSequence({ number: 6 }) as Record<string, unknown>;
    expect(r.start).toBe(6);
    expect(r.reached_one).toBe(true);
    expect(r.steps).toBe(8);
    const seq = r.sequence as number[];
    expect(seq[0]).toBe(6);
    expect(seq[seq.length - 1]).toBe(1);
    expect(r.unclick_meta).toBeDefined();
  });

  it("computes Collatz sequence for 1", async () => {
    const r = await collatzSequence({ number: 1 }) as Record<string, unknown>;
    expect(r.steps).toBe(0);
    expect(r.reached_one).toBe(true);
  });

  it("tracks max value", async () => {
    const r = await collatzSequence({ number: 27 }) as Record<string, unknown>;
    expect((r.max_value as number)).toBeGreaterThan(27);
  });

  it("rejects invalid input", async () => {
    const r = await collatzSequence({ number: -1 }) as Record<string, unknown>;
    expect(r.error).toMatch(/positive/i);
  });
});
