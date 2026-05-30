import { describe, it, expect } from "vitest";
import {
  detectSignals,
  isHardened,
  assignLevel,
  levelName,
  classify,
} from "../../scripts/connector-depth-ladder.mjs";

describe("connector depth ladder", () => {
  it("a bare wrapper trips no depth markers", () => {
    const src = `export async function handler(args) { const r = await fetch(url); return r.json(); }`;
    const s = detectSignals(src);
    expect(s.memoryAware).toBe(false);
    expect(s.agentic).toBe(false);
    expect(s.proactive).toBe(false);
    expect(assignLevel(s, isHardened(s, false))).toBe(1);
  });

  it("detects the PTV value-add markers (memory, agentic, source stamp)", () => {
    const src = `
      const defaultsUsed = args.__unclick_memory_defaults ?? [];
      return { ...result, source: "PTV", fetched_at: new Date().toISOString(), next_steps: "call ptv_departures" };
    `;
    const s = detectSignals(src);
    expect(s.memoryAware).toBe(true);
    expect(s.agentic).toBe(true);
    expect(s.sourceStamped).toBe(true);
    // capability axis: agentic wins even when not hardened
    expect(assignLevel(s, false)).toBe(5);
  });

  it("hardening requires timeout + rate-limit/retry + test + one clean error style + no bare errors", () => {
    const hardenedSrc = `
      const c = new AbortController();
      const r = await fetch(url, { signal: c.signal });
      if (r.status === 429) await backoff();
      if (!r.ok) return { error: await r.text() };
      return r.json();
    `;
    const s = detectSignals(hardenedSrc);
    expect(s.hasTimeout).toBe(true);
    expect(s.handles429).toBe(true);
    expect(s.errorStyleClean).toBe(true);
    expect(s.bareStatusErrors).toBe(0);
    expect(isHardened(s, true)).toBe(true);
    expect(isHardened(s, false)).toBe(false); // no test => not hardened
    expect(assignLevel(s, isHardened(s, true))).toBe(2);
  });

  it("a bare `HTTP ${status}` error message is counted and blocks hardening", () => {
    const src = "const c = new AbortController(); if (r.status===429) {} throw new Error(`HTTP ${r.status}`);";
    const s = detectSignals(src);
    expect(s.bareStatusErrors).toBeGreaterThan(0);
    expect(isHardened(s, true)).toBe(false);
  });

  it("assignLevel maps each rung", () => {
    const none = detectSignals("noop");
    expect(assignLevel(none, false)).toBe(1);
    expect(assignLevel(none, true)).toBe(2);
    expect(assignLevel({ ...none, memoryAware: true }, false)).toBe(3);
    expect(assignLevel({ ...none, proactive: true }, false)).toBe(4);
    expect(assignLevel({ ...none, agentic: true }, false)).toBe(5);
  });

  it("level names and classification are stable", () => {
    expect(levelName(1)).toBe("Wrapper");
    expect(levelName(5)).toBe("Agentic");
    expect(classify("stripe")).toBe("integration");
    expect(classify("testpass")).toBe("internal-product");
    expect(classify("calculator")).toBe("local-utility");
  });
});
