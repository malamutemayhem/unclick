import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  playbookSlug,
  resolveStatus,
  PLAYBOOK_CATEGORY,
  PLAYBOOK_DOC_KIND,
  TRUST_MIN_SUCCESSES,
  type PlaybookDoc,
} from "../playbooks.js";

let tempDir = "";

function readRows<T>(table: string): T[] {
  const file = path.join(tempDir, `${table}.json`);
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8")) as T[];
}

function baseDoc(overrides: Partial<PlaybookDoc> = {}): PlaybookDoc {
  return {
    kind: PLAYBOOK_DOC_KIND,
    name: "Test",
    goal: "Test goal",
    steps: [{ tool: "slack_action" }],
    preconditions: [],
    status: "draft",
    stats: { runs: 0, successes: 0, failures: 0 },
    verification: { receipts: [] },
    created_at: "2026-06-11T00:00:00.000Z",
    ...overrides,
  };
}

describe("playbook helpers", () => {
  test("playbookSlug normalizes names and is idempotent on existing slugs", () => {
    assert.equal(playbookSlug("Weekly Revenue Summary to Slack!"), "playbook-weekly-revenue-summary-to-slack");
    assert.equal(playbookSlug("playbook-weekly-revenue-summary-to-slack"), "playbook-weekly-revenue-summary-to-slack");
  });

  test("resolveStatus requires both successes and a PASS receipt for promotion", () => {
    const noReceipt = baseDoc({ stats: { runs: 3, successes: 3, failures: 0 } });
    assert.equal(resolveStatus(noReceipt), "draft");

    const withFailedReceipt = baseDoc({
      stats: { runs: 3, successes: 3, failures: 0 },
      verification: { receipts: [{ pass: "testpass", receipt_id: "r1", verdict: "FAIL", recorded_at: "2026-06-11T00:00:00.000Z" }] },
    });
    assert.equal(resolveStatus(withFailedReceipt), "draft");

    const promotable = baseDoc({
      stats: { runs: 3, successes: 3, failures: 0 },
      verification: { receipts: [{ pass: "testpass", receipt_id: "r1", verdict: "PASS", recorded_at: "2026-06-11T00:00:00.000Z" }] },
    });
    assert.equal(resolveStatus(promotable), "trusted");
  });

  test("resolveStatus demotes a trusted playbook when the success rate collapses", () => {
    const failing = baseDoc({
      status: "trusted",
      stats: { runs: 10, successes: 4, failures: 6 },
      verification: { receipts: [{ pass: "testpass", receipt_id: "r1", verdict: "PASS", recorded_at: "2026-06-11T00:00:00.000Z" }] },
    });
    assert.equal(resolveStatus(failing), "draft");

    const healthy = baseDoc({
      status: "trusted",
      stats: { runs: 10, successes: 9, failures: 1 },
    });
    assert.equal(resolveStatus(healthy), "trusted");
  });
});

describe("playbook handler ops (local backend)", () => {
  const FORCED_LOCAL_ENV = [
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_ANON_KEY",
    "UNCLICK_API_KEY",
    "UNCLICK_API_KEY_HASH",
  ] as const;
  const saved: Record<string, string | undefined> = {};

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-playbooks-"));
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

  test("save_playbook validates input and stores a versioned library doc", async () => {
    const { MEMORY_HANDLERS } = await import("../handlers.js");

    const missingSteps = (await MEMORY_HANDLERS.save_playbook({
      name: "Broken",
      goal: "No steps",
    })) as { saved: boolean; error?: string };
    assert.equal(missingSteps.saved, false);
    assert.match(missingSteps.error ?? "", /steps is required/);

    const res = (await MEMORY_HANDLERS.save_playbook({
      name: "Weekly revenue summary to Slack",
      goal: "Summarize Stripe revenue and post it to the team channel",
      trigger: "Every Monday morning or when asked for a revenue update",
      steps: [
        { tool: "stripe_charges", action: "list last 7 days", expect: "charge list with amounts" },
        { tool: "slack_action", action: "post summary message", params_hint: "channel: #revenue" },
      ],
      preconditions: ["Stripe and Slack credentials connected in Keychain"],
      tags: ["revenue", "reporting"],
      agent_id: "test-seat",
    })) as { saved: boolean; slug: string; status: string };

    assert.equal(res.saved, true);
    assert.equal(res.slug, "playbook-weekly-revenue-summary-to-slack");
    assert.equal(res.status, "draft");

    const rows = readRows<{ slug: string; category: string; version: number; tags: string[] }>("knowledge_library");
    const row = rows.find((r) => r.slug === res.slug);
    assert.ok(row, "playbook stored in knowledge_library");
    assert.equal(row?.category, PLAYBOOK_CATEGORY);
    assert.equal(row?.version, 1);
    assert.ok(row?.tags.includes("playbook"));
    assert.ok(row?.tags.includes("status:draft"));
    assert.ok(row?.tags.includes("revenue"));
  });

  test("get_playbook and list_playbooks round-trip the saved workflow", async () => {
    const { MEMORY_HANDLERS } = await import("../handlers.js");

    await MEMORY_HANDLERS.save_playbook({
      name: "Deploy preview check",
      goal: "Verify a Vercel preview deploy before sharing",
      steps: [{ tool: "vercel_get_deployment", expect: "READY state" }],
    });
    // A non-playbook library doc must never leak into list_playbooks.
    await MEMORY_HANDLERS.upsert_library_doc({
      slug: "reference-doc",
      title: "Reference",
      category: "reference",
      content: "plain doc",
      tags: [],
    });

    const got = (await MEMORY_HANDLERS.get_playbook({ name: "Deploy preview check" })) as {
      found: boolean;
      slug: string;
      playbook: { goal: string; steps: Array<{ tool: string }>; status: string };
    };
    assert.equal(got.found, true);
    assert.equal(got.slug, "playbook-deploy-preview-check");
    assert.equal(got.playbook.goal, "Verify a Vercel preview deploy before sharing");
    assert.equal(got.playbook.steps[0]?.tool, "vercel_get_deployment");
    assert.equal(got.playbook.status, "draft");

    const list = (await MEMORY_HANDLERS.list_playbooks({})) as {
      count: number;
      playbooks: Array<{ slug: string; status: string }>;
    };
    assert.equal(list.count, 1);
    assert.equal(list.playbooks[0]?.slug, "playbook-deploy-preview-check");

    const missing = (await MEMORY_HANDLERS.get_playbook({ slug: "playbook-nope" })) as { found: boolean };
    assert.equal(missing.found, false);
  });

  test("get_playbook refuses a slug that belongs to a non-playbook doc", async () => {
    const { MEMORY_HANDLERS } = await import("../handlers.js");
    await MEMORY_HANDLERS.upsert_library_doc({
      slug: "playbook-imposter",
      title: "Imposter",
      category: "reference",
      content: "not a playbook",
      tags: [],
    });
    const got = (await MEMORY_HANDLERS.get_playbook({ slug: "playbook-imposter" })) as {
      found: boolean;
      error?: string;
    };
    assert.equal(got.found, false);
    assert.match(got.error ?? "", /not a playbook/);
  });

  test("record_playbook_run promotes to trusted only after successes plus a PASS receipt", async () => {
    const { MEMORY_HANDLERS } = await import("../handlers.js");

    await MEMORY_HANDLERS.save_playbook({
      name: "Morning briefing",
      goal: "Compile the morning briefing",
      steps: [{ tool: "news_top_headlines" }],
    });
    const slug = "playbook-morning-briefing";

    // Successes without a verification receipt never promote.
    for (let i = 0; i < TRUST_MIN_SUCCESSES; i++) {
      const run = (await MEMORY_HANDLERS.record_playbook_run({ slug, outcome: "success" })) as {
        recorded: boolean;
        status: string;
      };
      assert.equal(run.recorded, true);
      assert.equal(run.status, "draft");
    }

    const promoted = (await MEMORY_HANDLERS.record_playbook_run({
      slug,
      outcome: "success",
      receipt_id: "xpass-receipt-123",
      pass: "testpass",
      verdict: "PASS",
    })) as { recorded: boolean; status: string; status_changed?: string; stats: { runs: number; successes: number } };
    assert.equal(promoted.status, "trusted");
    assert.equal(promoted.status_changed, "draft -> trusted");
    assert.equal(promoted.stats.runs, TRUST_MIN_SUCCESSES + 1);

    // The new status lands in the stored tags so list stays truthful.
    const list = (await MEMORY_HANDLERS.list_playbooks({ status: "trusted" })) as {
      count: number;
      playbooks: Array<{ slug: string }>;
    };
    assert.equal(list.count, 1);
    assert.equal(list.playbooks[0]?.slug, slug);

    // Repeated failures collapse the success rate and demote back to draft.
    let lastStatus = "trusted";
    for (let i = 0; i < 6; i++) {
      const run = (await MEMORY_HANDLERS.record_playbook_run({ slug, outcome: "failure" })) as { status: string };
      lastStatus = run.status;
    }
    assert.equal(lastStatus, "draft");
  });

  test("re-saving a playbook updates steps but preserves run history and identity", async () => {
    const { MEMORY_HANDLERS } = await import("../handlers.js");

    await MEMORY_HANDLERS.save_playbook({
      name: "Inbox triage",
      goal: "Triage unread email",
      steps: [{ tool: "email_read_inbox" }],
    });
    await MEMORY_HANDLERS.record_playbook_run({ slug: "playbook-inbox-triage", outcome: "success" });

    const updated = (await MEMORY_HANDLERS.save_playbook({
      name: "Inbox triage",
      goal: "Triage unread email and flag urgent threads",
      steps: [{ tool: "email_read_inbox" }, { tool: "email_mark_read" }],
    })) as { saved: boolean; slug: string };
    assert.equal(updated.saved, true);

    const got = (await MEMORY_HANDLERS.get_playbook({ slug: updated.slug })) as {
      version?: number;
      playbook: { steps: unknown[]; stats: { runs: number; successes: number } };
    };
    // Three versions: initial save, the recorded run (stats persist through
    // the versioned library layer), and the re-save.
    assert.equal(got.version, 3);
    assert.equal(got.playbook.steps.length, 2);
    assert.equal(got.playbook.stats.runs, 1);
    assert.equal(got.playbook.stats.successes, 1);
  });
});
