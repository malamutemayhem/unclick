import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  buildCorrectionDoNotRepeatLines,
  selectRelevantCorrections,
  correctionKey,
  buildCorrectionValue,
  CORRECTIONS_CATEGORY,
} from "../corrections.js";

// lane-05 corrections: store in business_context, pin to do_not_repeat, consult.

let tempDir = "";

function readRows<T>(table: string): T[] {
  const file = path.join(tempDir, `${table}.json`);
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8")) as T[];
}

describe("corrections helpers", () => {
  test("buildCorrectionDoNotRepeatLines surfaces every correction row regardless of guardrail wording", () => {
    const lines = buildCorrectionDoNotRepeatLines([
      { row: { category: "corrections", key: "target", value: { kind: "correction", correction: "My salary target is 200k" } } },
      { row: { category: "preference", key: "x", value: "not a correction" } },
      { row: { category: "corrections", key: "name", value: "Call me Chris, not Christopher" } },
    ]);
    assert.deepEqual(lines, [
      "Correction (always honor): My salary target is 200k",
      "Correction (always honor): Call me Chris, not Christopher",
    ]);
  });

  test("selectRelevantCorrections matches on tokens and returns all when the query is empty", () => {
    const rows = [
      { category: "corrections", key: "salary", value: { kind: "correction", correction: "My salary target is 200k" } },
      { category: "corrections", key: "tz", value: { kind: "correction", correction: "My timezone is Sydney" } },
    ];
    const matched = selectRelevantCorrections(rows, "what is my salary target", 5);
    assert.equal(matched[0]?.correction, "My salary target is 200k");

    const all = selectRelevantCorrections(rows, "", 5);
    assert.equal(all.length, 2);
  });

  test("correctionKey derives a stable slug and buildCorrectionValue carries provenance stubs", () => {
    assert.equal(correctionKey({ correction: "My salary target is 200k" }), "my-salary-target-is-200k");
    const value = buildCorrectionValue(
      { correction: "x", receipt_id: "rcpt_1", source_agent_id: "agent_7" },
      "2026-06-04T00:00:00.000Z"
    );
    assert.equal(value.kind, "correction");
    assert.equal(value.receipt_id, "rcpt_1");
    assert.equal(value.source_agent_id, "agent_7");
  });
});

describe("do_not_repeat corrections pin (MEMORY_CORRECTIONS_ENABLED)", () => {
  let savedFlag: string | undefined;
  beforeEach(() => {
    savedFlag = process.env.MEMORY_CORRECTIONS_ENABLED;
  });
  afterEach(() => {
    if (savedFlag === undefined) delete process.env.MEMORY_CORRECTIONS_ENABLED;
    else process.env.MEMORY_CORRECTIONS_ENABLED = savedFlag;
  });

  function contextWith(business: unknown[]) {
    return { business_context: business, active_facts: [], recent_sessions: [], knowledge_library_index: [] };
  }
  const sample = () => [
    { category: "corrections", key: "salary", value: { kind: "correction", correction: "My salary target is 200k" }, priority: 100 },
    { category: "rule", key: "deploy", value: "Do not deploy on Friday", priority: 5 },
  ];

  test("flag on pins corrections at the top of do_not_repeat alongside guardrails", async () => {
    process.env.MEMORY_CORRECTIONS_ENABLED = "1";
    const { compactStartupContextForStrictClients } = await import("../handlers.js");
    const out = compactStartupContextForStrictClients(contextWith(sample())) as {
      profile_card: { do_not_repeat: string[] };
    };
    const dnr = out.profile_card.do_not_repeat;
    assert.equal(dnr[0], "Correction (always honor): My salary target is 200k");
    assert.ok(dnr.some((l) => l.includes("Do not deploy on Friday")), "guardrails still surface");
  });

  test("flag off leaves do_not_repeat as guardrail-only (corrections not surfaced)", async () => {
    delete process.env.MEMORY_CORRECTIONS_ENABLED;
    const { compactStartupContextForStrictClients } = await import("../handlers.js");
    const out = compactStartupContextForStrictClients(contextWith(sample())) as {
      profile_card: { do_not_repeat: string[] };
    };
    const dnr = out.profile_card.do_not_repeat;
    assert.ok(!dnr.some((l) => l.startsWith("Correction (always honor)")), "corrections must not surface when flag off");
    assert.ok(dnr.some((l) => l.includes("Do not deploy on Friday")), "guardrails still surface");
  });
});

describe("corrections handler ops (MEMORY_CORRECTIONS_ENABLED)", () => {
  const FORCED_LOCAL_ENV = [
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_ANON_KEY",
    "UNCLICK_API_KEY",
    "UNCLICK_API_KEY_HASH",
    "MEMORY_CORRECTIONS_ENABLED",
  ] as const;
  const saved: Record<string, string | undefined> = {};

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-corrections-"));
    process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
    for (const k of FORCED_LOCAL_ENV) {
      saved[k] = process.env[k];
      delete process.env[k];
    }
  });
  afterEach(() => {
    delete process.env.MEMORY_LOCAL_DATA_DIR;
    for (const k of FORCED_LOCAL_ENV) {
      if (saved[k] === undefined) delete process.env[k];
      else process.env[k] = saved[k];
    }
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  test("flag on: save_correction stores under business_context, consult + list surface it", async () => {
    process.env.MEMORY_CORRECTIONS_ENABLED = "1";
    const { MEMORY_HANDLERS } = await import("../handlers.js");

    const saveRes = (await MEMORY_HANDLERS.save_correction({
      correction: "My salary target is 200k",
      mistake: "assumed 150k",
    })) as { saved: boolean; key: string };
    assert.equal(saveRes.saved, true);

    const row = readRows<{ category: string; key: string; value: { correction?: string }; priority: number }>(
      "business_context"
    ).find((r) => r.category === CORRECTIONS_CATEGORY && r.key === saveRes.key);
    assert.ok(row, "correction stored in business_context");
    assert.equal(row?.value.correction, "My salary target is 200k");
    assert.equal(row?.priority, 100);

    const consult = (await MEMORY_HANDLERS.consult_corrections({
      query: "remind me of my salary target",
    })) as { corrections: Array<{ correction: string }> };
    assert.ok(consult.corrections.some((c) => c.correction === "My salary target is 200k"));

    const list = (await MEMORY_HANDLERS.list_corrections({})) as { count: number };
    assert.equal(list.count, 1);
  });

  test("flag off: save_correction is a no-op and consult returns empty", async () => {
    delete process.env.MEMORY_CORRECTIONS_ENABLED;
    const { MEMORY_HANDLERS } = await import("../handlers.js");

    const saveRes = (await MEMORY_HANDLERS.save_correction({ correction: "Should not persist" })) as {
      saved: boolean;
      flag_enabled: boolean;
    };
    assert.equal(saveRes.saved, false);
    assert.equal(saveRes.flag_enabled, false);
    assert.equal(readRows("business_context").length, 0);

    const consult = (await MEMORY_HANDLERS.consult_corrections({ query: "anything" })) as {
      corrections: unknown[];
      flag_enabled: boolean;
    };
    assert.equal(consult.flag_enabled, false);
    assert.equal(consult.corrections.length, 0);
  });
});
