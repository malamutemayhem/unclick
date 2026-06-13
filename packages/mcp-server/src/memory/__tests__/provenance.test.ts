import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  isProvenanceEnabled,
  provenanceBoost,
  provenanceCoverage,
  provenanceFromRow,
  provenanceMatches,
  provenanceWriteFields,
  receiptProvenanceFields,
  sanitizeSourceRef,
  type MemoryProvenance,
} from "../provenance.js";

const FLAG = "MEMORY_PROVENANCE_ENABLED";

function enableFlag(): void {
  process.env[FLAG] = "1";
}
function disableFlag(): void {
  delete process.env[FLAG];
}

function provenanceOf(overrides: Partial<MemoryProvenance> = {}): MemoryProvenance {
  return {
    source_agent_id: null,
    source_ref: null,
    receipt_id: null,
    confidence: 0.9,
    ...overrides,
  };
}

describe("provenance helpers (flag off by default)", () => {
  afterEach(disableFlag);

  test("isProvenanceEnabled reflects the env flag", () => {
    disableFlag();
    assert.equal(isProvenanceEnabled(), false);
    enableFlag();
    assert.equal(isProvenanceEnabled(), true);
    process.env[FLAG] = "true";
    assert.equal(isProvenanceEnabled(), true);
    process.env[FLAG] = "0";
    assert.equal(isProvenanceEnabled(), false);
  });

  test("provenanceWriteFields returns null when the flag is off (inert, no columns written)", () => {
    disableFlag();
    assert.equal(
      provenanceWriteFields({ source_agent_id: "agent-1", source_ref: "https://x/y", receipt_id: "r1" }),
      null
    );
  });

  test("provenanceWriteFields persists fields and sanitises source_ref when the flag is on", () => {
    enableFlag();
    const fields = provenanceWriteFields({
      source_agent_id: "claude-worker-03",
      source_ref: "https://github.com/malamutemayhem/unclick/pull/1274",
      receipt_id: "xpass-abc",
    });
    assert.deepEqual(fields, {
      source_agent_id: "claude-worker-03",
      source_ref: "https://github.com/malamutemayhem/unclick/pull/1274",
      receipt_id: "xpass-abc",
    });
  });

  test("sanitizeSourceRef drops secret-shaped refs but keeps ordinary urls", () => {
    assert.equal(sanitizeSourceRef("sk-abcdefghijklmnop1234"), null);
    assert.equal(sanitizeSourceRef("ghp_0123456789abcdefghijklmnopqrstuvwx"), null);
    assert.equal(sanitizeSourceRef("Bearer abcdef0123456789xyz"), null);
    assert.equal(sanitizeSourceRef("authorization: token-value-here"), null);
    assert.equal(sanitizeSourceRef("AKIAABCDEFGHIJKLMNOP"), null);
    assert.equal(
      sanitizeSourceRef("https://example.com/account/reset-password"),
      "https://example.com/account/reset-password"
    );
    assert.equal(sanitizeSourceRef("tool_call:abc123"), "tool_call:abc123");
    assert.equal(sanitizeSourceRef("   "), null);
    assert.equal(sanitizeSourceRef(42), null);
  });

  test("sanitizeSourceRef drops Stripe and webhook secret patterns", () => {
    assert.equal(sanitizeSourceRef("sk_live_0000000000fake"), null);
    assert.equal(sanitizeSourceRef("sk_test_0000000000fake"), null);
    assert.equal(sanitizeSourceRef("rk_live_0000000000fake"), null);
    assert.equal(sanitizeSourceRef("pk_live_0000000000fake"), null);
    assert.equal(sanitizeSourceRef("whsec_0000000000fake"), null);
  });

  test("sanitizeSourceRef caps very long refs", () => {
    const long = "https://example.com/" + "a".repeat(2000);
    const out = sanitizeSourceRef(long);
    assert.ok(out);
    assert.equal(out?.length, 500);
  });
});

describe("provenance filter / boost (flag on)", () => {
  beforeEach(enableFlag);
  afterEach(disableFlag);

  test("matches is inert when the flag is off", () => {
    disableFlag();
    const p = provenanceOf();
    assert.equal(provenanceMatches(p, { require_receipt: true }), true);
    assert.equal(provenanceBoost(p, { boost_receipt_backed: 5 }), 0);
  });

  test("require_receipt only admits receipt-backed memories", () => {
    assert.equal(provenanceMatches(provenanceOf({ receipt_id: "r1" }), { require_receipt: true }), true);
    assert.equal(provenanceMatches(provenanceOf({ receipt_id: null }), { require_receipt: true }), false);
  });

  test("require_source_agent and min_confidence gate correctly", () => {
    assert.equal(
      provenanceMatches(provenanceOf({ source_agent_id: "a1", confidence: 0.8 }), {
        require_source_agent: true,
        min_confidence: 0.7,
      }),
      true
    );
    assert.equal(
      provenanceMatches(provenanceOf({ source_agent_id: null }), { require_source_agent: true }),
      false
    );
    assert.equal(
      provenanceMatches(provenanceOf({ confidence: 0.5 }), { min_confidence: 0.7 }),
      false
    );
  });

  test("boost is additive and only rewards receipt-backed memories", () => {
    assert.equal(provenanceBoost(provenanceOf({ receipt_id: "r1" }), { boost_receipt_backed: 3 }), 3);
    assert.equal(provenanceBoost(provenanceOf({ receipt_id: null }), { boost_receipt_backed: 3 }), 0);
    assert.equal(provenanceBoost(provenanceOf({ receipt_id: "r1" }), {}), 0);
  });

  test("a provenance-filtered set returns only receipt-backed facts", () => {
    const rows = [
      { receipt_id: "r1", source_agent_id: "a1", confidence: 0.9 },
      { receipt_id: null, source_agent_id: "a2", confidence: 0.9 },
      { receipt_id: "r3", source_agent_id: null, confidence: 0.9 },
    ];
    const filtered = rows.filter((row) => provenanceMatches(provenanceFromRow(row), { require_receipt: true }));
    assert.equal(filtered.length, 2);
    assert.ok(filtered.every((row) => typeof row.receipt_id === "string"));
  });
});

describe("provenance coverage metric + receipt surfacing", () => {
  beforeEach(enableFlag);
  afterEach(disableFlag);

  test("provenanceCoverage is the share of rows with a usable source", () => {
    assert.equal(provenanceCoverage([]), 0);
    const rows = [
      { source_agent_id: "a1" },
      { source_ref: "https://x/y" },
      { receipt_id: "r1" },
      { confidence: 0.9 }, // no usable source
    ];
    assert.equal(provenanceCoverage(rows), 0.75);
  });

  test("receiptProvenanceFields surfaces ids but hides source_ref unless clean", () => {
    const row = { source_agent_id: "a1", source_ref: "https://x/y", receipt_id: "r1" };
    const clean = receiptProvenanceFields(row, "clean");
    assert.deepEqual(clean, { source_agent_id: "a1", receipt_id: "r1", source_ref: "https://x/y" });

    const redacted = receiptProvenanceFields(row, "redacted");
    assert.deepEqual(redacted, { source_agent_id: "a1", receipt_id: "r1" });
  });

  test("receiptProvenanceFields is null when the flag is off", () => {
    disableFlag();
    assert.equal(receiptProvenanceFields({ source_agent_id: "a1" }, "clean"), null);
  });
});

describe("LocalBackend provenance round-trip", () => {
  let tempDir = "";

  function readRows<T>(table: string): T[] {
    return JSON.parse(fs.readFileSync(path.join(tempDir, `${table}.json`), "utf8")) as T[];
  }

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-memory-provenance-"));
    process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
  });

  afterEach(() => {
    delete process.env.MEMORY_LOCAL_DATA_DIR;
    disableFlag();
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  test("persists provenance columns when the flag is on", async () => {
    enableFlag();
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    const { id } = await backend.addFact({
      fact: "User ships memory provenance receipts.",
      category: "decision",
      confidence: 0.95,
      source_agent_id: "claude-worker-03-provenance",
      source_ref: "https://github.com/malamutemayhem/unclick/pull/1274",
      receipt_id: "xpass-receipt-1",
    });

    const rows = readRows<Record<string, unknown>>("extracted_facts");
    const stored = rows.find((row) => row.id === id);
    assert.ok(stored);
    assert.equal(stored?.source_agent_id, "claude-worker-03-provenance");
    assert.equal(stored?.source_ref, "https://github.com/malamutemayhem/unclick/pull/1274");
    assert.equal(stored?.receipt_id, "xpass-receipt-1");

    const coverage = provenanceCoverage(rows);
    assert.equal(coverage, 1);
  });

  test("does NOT write provenance columns when the flag is off (safe on un-migrated DBs)", async () => {
    disableFlag();
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    const { id } = await backend.addFact({
      fact: "Provenance stays inert while the flag is off.",
      category: "technical",
      confidence: 0.9,
      source_agent_id: "claude-worker-03-provenance",
      source_ref: "https://example.com/x",
      receipt_id: "r1",
    });

    const rows = readRows<Record<string, unknown>>("extracted_facts");
    const stored = rows.find((row) => row.id === id);
    assert.ok(stored);
    assert.equal("source_agent_id" in (stored as object), false);
    assert.equal("source_ref" in (stored as object), false);
    assert.equal("receipt_id" in (stored as object), false);
  });
});
