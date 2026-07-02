import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

let tempDir = "";

const MANAGED_ENV_KEYS = [
  "MEMORY_TYPED_SPLIT_ENABLED",
  "MEMORY_PATTERN_PROMOTION_ENABLED",
] as const;

describe("pass-2 memory features: expiry, context block, pattern promotion", () => {
  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-memory-pass2-"));
    process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
    process.env.MEMORY_BACKEND = "local";
  });

  afterEach(() => {
    delete process.env.MEMORY_LOCAL_DATA_DIR;
    delete process.env.MEMORY_BACKEND;
    for (const key of MANAGED_ENV_KEYS) delete process.env[key];
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  test("expires_at hides a fact from recall once passed, keeps it before", async () => {
    const { MEMORY_HANDLERS } = await import("../handlers.js");
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    const expired = await MEMORY_HANDLERS.add_fact({
      fact: "Temporary promo code ZEBRA-99 is active.",
      category: "general",
      confidence: 0.9,
      expires_at: new Date(Date.now() - 60_000).toISOString(),
    }) as { id: string };
    const fresh = await MEMORY_HANDLERS.add_fact({
      fact: "Standing zebra preference stays valid for a year.",
      category: "preference",
      confidence: 0.9,
      valid_until: new Date(Date.now() + 365 * 24 * 3600_000).toISOString(),
    }) as { id: string };

    const results = await backend.searchMemory("zebra", 10) as Array<{ id: string }>;
    assert.equal(results.some((row) => row.id === expired.id), false, "expired fact must be hidden");
    assert.equal(results.some((row) => row.id === fresh.id), true, "unexpired fact must be visible");

    await assert.rejects(
      MEMORY_HANDLERS.add_fact({ fact: "Bad expiry", expires_at: "not-a-date" }),
      /ISO 8601/
    );
  });

  test("get_context_block returns budgeted markdown with rules, facts, and query section", async () => {
    const { MEMORY_HANDLERS } = await import("../handlers.js");
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    await backend.setBusinessContext("standing_rule", "no_em_dashes", "Never use em dashes anywhere.", 100);
    await backend.addFact({
      fact: "User runs the UnClick platform and prefers compact context blocks.",
      category: "preference",
      confidence: 0.95,
    });

    const result = await MEMORY_HANDLERS.get_context_block({ query: "context blocks" }) as {
      context_block: string;
      char_count: number;
      truncated: boolean;
      query_matches: number;
    };

    assert.ok(result.context_block.startsWith("# Memory context"));
    assert.match(result.context_block, /## Standing rules/);
    assert.match(result.context_block, /no_em_dashes/);
    assert.match(result.context_block, /## Durable facts/);
    assert.match(result.context_block, /compact context blocks/);
    assert.ok(result.query_matches >= 1);
    assert.equal(result.truncated, false);

    const tiny = await MEMORY_HANDLERS.get_context_block({ max_chars: 500 }) as {
      char_count: number;
      max_chars: number;
    };
    assert.ok(tiny.char_count <= 500, `budget exceeded: ${tiny.char_count}`);
  });

  test("promote_patterns is flag-gated and promotes repeated episodes with provenance", async () => {
    const { MEMORY_HANDLERS } = await import("../handlers.js");
    const { LocalBackend } = await import("../local.js");

    const disabled = await MEMORY_HANDLERS.promote_patterns({}) as { enabled: boolean };
    assert.equal(disabled.enabled, false);

    process.env.MEMORY_PATTERN_PROMOTION_ENABLED = "1";
    process.env.MEMORY_TYPED_SPLIT_ENABLED = "1";
    const backend = new LocalBackend();

    for (let i = 0; i < 3; i += 1) {
      await backend.addSessionEvent({
        session_id: `session-${i}`,
        memory_class: "episodic",
        event_kind: "episode",
        content: `User asked for the weekly metrics dashboard export in CSV format (run ${i}).`,
      });
    }
    await backend.addSessionEvent({
      session_id: "session-x",
      memory_class: "episodic",
      event_kind: "episode",
      content: "Unrelated one-off request about pelican logistics.",
    });

    const dryRun = await MEMORY_HANDLERS.promote_patterns({ dry_run: true }) as {
      qualifying_clusters: number;
      promoted: number;
      proposals: Array<{ fact: string; occurrences: number }>;
    };
    assert.equal(dryRun.qualifying_clusters, 1, "only the repeated episode should qualify");
    assert.equal(dryRun.promoted, 0, "dry run must not write");
    assert.match(dryRun.proposals[0]?.fact ?? "", /Observed pattern \(3 occurrences\)/);

    const live = await MEMORY_HANDLERS.promote_patterns({}) as {
      promoted: number;
      proposals: Array<{ fact_id?: string; event_ids: string[] }>;
    };
    assert.equal(live.promoted, 1);
    assert.ok(live.proposals[0]?.fact_id);
    assert.equal(live.proposals[0]?.event_ids.length, 3);

    const again = await MEMORY_HANDLERS.promote_patterns({}) as {
      proposals: Array<{ fact_id?: string }>;
    };
    assert.equal(
      again.proposals[0]?.fact_id,
      live.proposals[0]?.fact_id,
      "re-promotion must be idempotent via exact-hash dedup"
    );
  });
});
