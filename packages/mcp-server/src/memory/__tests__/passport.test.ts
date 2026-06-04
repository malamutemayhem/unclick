import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const SIGNING_SECRET = "lane-10-test-signing-secret";
let tempDir = "";

function readRows<T>(dir: string, table: string): T[] {
  return JSON.parse(fs.readFileSync(path.join(dir, `${table}.json`), "utf8")) as T[];
}

describe("memory passport", () => {
  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-memory-passport-"));
    process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
  });

  afterEach(() => {
    delete process.env.MEMORY_LOCAL_DATA_DIR;
    delete process.env.MEMORY_PASSPORT_ENABLED;
    delete process.env.MEMORY_PASSPORT_SIGNING_SECRET;
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  test("exports a signed allowlisted bundle without credential-shaped memory", async () => {
    const { LocalBackend } = await import("../local.js");
    const {
      auditMemoryPassportCredentialLeakage,
      verifyMemoryPassportBundle,
    } = await import("../passport.js");
    const backend = new LocalBackend();

    await backend.setBusinessContext("identity", "preferred_name", "Chris", 100);
    await backend.addFact({
      fact: "Portable memory marker lane-ten-silver should roundtrip.",
      category: "technical",
      confidence: 0.97,
      commit_sha: "abc1234",
      pr_number: 1274,
    });
    await backend.addFact({
      fact: "Temporary API key sk-test-secret-1234567890 should never export.",
      category: "credential",
      confidence: 1,
    });
    await backend.writeSessionSummary({
      session_id: "passport-source-session",
      summary: "Passport export keeps non-secret session summaries.",
      topics: ["memory"],
      open_loops: [],
      decisions: ["Use signed JSON bundles."],
      platform: "test",
    });

    const result = await backend.exportMemoryPassport({
      subject_id: "test-subject",
      signing_secret: SIGNING_SECRET,
    });
    const serialized = JSON.stringify(result.bundle);

    assert.equal(result.bundle.version, "memory-passport-v1");
    assert.equal(result.bundle.subject_id, "test-subject");
    assert.equal(result.metrics.passport_credential_leakage, 0);
    assert.equal(serialized.includes("sk-test-secret"), false);
    assert.equal(serialized.includes("lane-ten-silver"), true);
    assert.equal(result.bundle.summary.redacted_records, 1);
    assert.deepEqual(auditMemoryPassportCredentialLeakage(result.bundle).leak_paths, []);
    assert.deepEqual(verifyMemoryPassportBundle(result.bundle, SIGNING_SECRET), { verified: true });

    const auditRows = readRows<{ operation: string; credential_leakage: number }>(tempDir, "memory_passport_audit");
    assert.equal(auditRows.length, 1);
    assert.equal(auditRows[0].operation, "export");
    assert.equal(auditRows[0].credential_leakage, 0);
  });

  test("imports a verified bundle and preserves searchable memory", async () => {
    const { LocalBackend } = await import("../local.js");
    const source = new LocalBackend();
    await source.setBusinessContext("identity", "preferred_name", "Chris", 100);
    await source.addFact({
      fact: "Passport import marker lane-ten-teal should be searchable.",
      category: "technical",
      confidence: 0.91,
      extractor_id: "lane-10-test",
      prompt_version: "passport-v1",
      model_id: "test-model",
    });
    const exported = await source.exportMemoryPassport({
      signing_secret: SIGNING_SECRET,
      include_sessions: false,
    });

    const targetDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-memory-passport-target-"));
    try {
      process.env.MEMORY_LOCAL_DATA_DIR = targetDir;
      const target = new LocalBackend();
      const imported = await target.importMemoryPassport({
        bundle: exported.bundle,
        signing_secret: SIGNING_SECRET,
      });

      assert.equal(imported.imported, true);
      assert.equal(imported.metrics.passport_credential_leakage, 0);
      assert.equal(imported.metrics.passport_roundtrip_fidelity, 1);

      const results = await target.searchMemory("lane-ten-teal", 5) as Array<{ content: string }>;
      assert.equal(results.some((row) => row.content.includes("lane-ten-teal")), true);
      const context = await target.getBusinessContext() as Array<{ category: string; key: string; value: unknown }>;
      assert.equal(context.some((row) => row.category === "identity" && row.key === "preferred_name"), true);
      const reexported = await target.exportMemoryPassport({
        signing_secret: SIGNING_SECRET,
        include_sessions: false,
      });
      const reexportedFact = reexported.bundle.memory.facts.find((row) => row.fact.includes("lane-ten-teal"));
      assert.equal(reexportedFact?.extractor_id, "lane-10-test");
      assert.equal(reexportedFact?.prompt_version, "passport-v1");
      assert.equal(reexportedFact?.model_id, "test-model");
    } finally {
      fs.rmSync(targetDir, { recursive: true, force: true });
    }
  });

  test("rejects tampered bundles and handlers are default-off", async () => {
    const { LocalBackend } = await import("../local.js");
    const { MEMORY_HANDLERS } = await import("../handlers.js");
    const backend = new LocalBackend();
    await backend.addFact({
      fact: "Passport tamper marker lane-ten-gold.",
      category: "technical",
      confidence: 1,
    });
    const exported = await backend.exportMemoryPassport({ signing_secret: SIGNING_SECRET });
    exported.bundle.memory.facts[0].fact = "Tampered passport payload.";

    await assert.rejects(
      () => backend.importMemoryPassport({ bundle: exported.bundle, signing_secret: SIGNING_SECRET }),
      /signature_mismatch/
    );

    delete process.env.MEMORY_PASSPORT_ENABLED;
    const disabled = await MEMORY_HANDLERS.export_memory_passport({});
    assert.deepEqual(disabled, { enabled: false, flag: "MEMORY_PASSPORT_ENABLED" });
  });
});
