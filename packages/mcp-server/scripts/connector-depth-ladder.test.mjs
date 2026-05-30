// node --test scripts/connector-depth-ladder.test.mjs
// Kept as .mjs (not a src/*.test.ts) so tsc does not try to compile a script
// that lives outside rootDir. Mirrors the root brainmap test convention.

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  detectSignals,
  isHardened,
  assignLevel,
  levelName,
  classify,
} from "./connector-depth-ladder.mjs";

test("a bare wrapper trips no depth markers", () => {
  const s = detectSignals(`export async function handler(args) { const r = await fetch(url); return r.json(); }`);
  assert.equal(s.memoryAware, false);
  assert.equal(s.agentic, false);
  assert.equal(s.proactive, false);
  assert.equal(assignLevel(s, isHardened(s, false)), 1);
});

test("detects the PTV value-add markers (memory, agentic, source stamp)", () => {
  const src = `
    const defaultsUsed = args.__unclick_memory_defaults ?? [];
    return { ...result, source: "PTV", fetched_at: new Date().toISOString(), next_steps: "call ptv_departures" };
  `;
  const s = detectSignals(src);
  assert.equal(s.memoryAware, true);
  assert.equal(s.agentic, true);
  assert.equal(s.sourceStamped, true);
  // capability axis: agentic wins even when not hardened
  assert.equal(assignLevel(s, false), 5);
});

test("hardening requires timeout + rate-limit/retry + test + one clean error style + no bare errors", () => {
  const hardenedSrc = `
    const c = new AbortController();
    const r = await fetch(url, { signal: c.signal });
    if (r.status === 429) await backoff();
    if (!r.ok) return { error: await r.text() };
    return r.json();
  `;
  const s = detectSignals(hardenedSrc);
  assert.equal(s.hasTimeout, true);
  assert.equal(s.handles429, true);
  assert.equal(s.errorStyleClean, true);
  assert.equal(s.bareStatusErrors, 0);
  assert.equal(isHardened(s, true), true);
  assert.equal(isHardened(s, false), false); // no test => not hardened
  assert.equal(assignLevel(s, isHardened(s, true)), 2);
});

test("a bare `HTTP ${status}` error message is counted and blocks hardening", () => {
  const s = detectSignals("const c = new AbortController(); if (r.status===429) {} throw new Error(`HTTP ${r.status}`);");
  assert.ok(s.bareStatusErrors > 0);
  assert.equal(isHardened(s, true), false);
});

test("assignLevel maps each rung", () => {
  const none = detectSignals("noop");
  assert.equal(assignLevel(none, false), 1);
  assert.equal(assignLevel(none, true), 2);
  assert.equal(assignLevel({ ...none, memoryAware: true }, false), 3);
  assert.equal(assignLevel({ ...none, proactive: true }, false), 4);
  assert.equal(assignLevel({ ...none, agentic: true }, false), 5);
});

test("level names and classification are stable", () => {
  assert.equal(levelName(1), "Wrapper");
  assert.equal(levelName(5), "Agentic");
  assert.equal(classify("stripe"), "integration");
  assert.equal(classify("testpass"), "internal-product");
  assert.equal(classify("calculator"), "local-utility");
});
