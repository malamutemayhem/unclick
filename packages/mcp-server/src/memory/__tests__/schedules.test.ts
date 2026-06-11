import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  computeNextDue,
  parseEveryMinutes,
  scheduleSlug,
  SCHEDULE_CATEGORY,
} from "../schedules.js";

let tempDir = "";

describe("schedule cadence math", () => {
  test("parseEveryMinutes accepts m/h/d and enforces bounds", () => {
    assert.equal(parseEveryMinutes("30m"), 30);
    assert.equal(parseEveryMinutes("4h"), 240);
    assert.equal(parseEveryMinutes("1d"), 1440);
    assert.equal(parseEveryMinutes("1m"), null);
    assert.equal(parseEveryMinutes("weekly"), null);
  });

  test("computeNextDue with every adds the interval", () => {
    assert.equal(
      computeNextDue({ every: "30m" }, "2026-06-11T03:00:00.000Z"),
      "2026-06-11T03:30:00.000Z",
    );
  });

  test("computeNextDue daily_at UTC picks the next occurrence strictly after from", () => {
    assert.equal(
      computeNextDue({ daily_at: "08:00" }, "2026-06-11T03:00:00.000Z"),
      "2026-06-11T08:00:00.000Z",
    );
    // Already past 08:00 -> tomorrow.
    assert.equal(
      computeNextDue({ daily_at: "08:00" }, "2026-06-11T09:00:00.000Z"),
      "2026-06-12T08:00:00.000Z",
    );
    // Exactly at 08:00 -> strictly after, so tomorrow.
    assert.equal(
      computeNextDue({ daily_at: "08:00" }, "2026-06-11T08:00:00.000Z"),
      "2026-06-12T08:00:00.000Z",
    );
  });

  test("computeNextDue handles Sydney timezone and weekly weekday", () => {
    // June = AEST (UTC+10), so Monday 08:00 Sydney = Sunday 22:00 UTC.
    // 2026-06-11 is a Thursday; next Monday is 2026-06-15 local.
    assert.equal(
      computeNextDue(
        { daily_at: "08:00", weekday: "monday", tz: "Australia/Sydney" },
        "2026-06-11T03:00:00.000Z",
      ),
      "2026-06-14T22:00:00.000Z",
    );
  });

  test("computeNextDue rejects invalid input", () => {
    assert.equal(computeNextDue({ daily_at: "25:00" }, "2026-06-11T03:00:00.000Z"), null);
    assert.equal(computeNextDue({ every: "2x" }, "2026-06-11T03:00:00.000Z"), null);
    assert.equal(computeNextDue({}, "2026-06-11T03:00:00.000Z"), null);
  });

  test("scheduleSlug normalizes and is idempotent", () => {
    assert.equal(scheduleSlug("Monday GEOPass Check!"), "schedule-monday-geopass-check");
    assert.equal(scheduleSlug("schedule-monday-geopass-check"), "schedule-monday-geopass-check");
  });
});

describe("schedule handler ops (local backend)", () => {
  const FORCED_LOCAL_ENV = [
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_ANON_KEY",
    "UNCLICK_API_KEY",
    "UNCLICK_API_KEY_HASH",
  ] as const;
  const saved: Record<string, string | undefined> = {};

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-schedules-"));
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

  test("save_schedule validates and stores a schedule library doc", async () => {
    const { MEMORY_HANDLERS } = await import("../handlers.js");

    const badCadence = (await MEMORY_HANDLERS.save_schedule({
      name: "Broken",
      cadence: { every: "1m" },
      action: { kind: "note", message: "hi" },
    })) as { saved: boolean; error?: string };
    assert.equal(badCadence.saved, false);
    assert.match(badCadence.error ?? "", /cadence\.every/);

    const badAction = (await MEMORY_HANDLERS.save_schedule({
      name: "Broken",
      cadence: { every: "30m" },
      action: { kind: "endpoint" },
    })) as { saved: boolean; error?: string };
    assert.equal(badAction.saved, false);
    assert.match(badAction.error ?? "", /endpoint_id/);

    const res = (await MEMORY_HANDLERS.save_schedule({
      name: "Monday GEOPass check",
      description: "Re-run GEOPass on the site weekly",
      cadence: { daily_at: "08:00", weekday: "monday", tz: "Australia/Sydney" },
      action: { kind: "endpoint", endpoint_id: "geopass_run", params: { url: "https://unclick.world" } },
      deliver_to: ["boardroom"],
      now: "2026-06-11T03:00:00.000Z",
    })) as { saved: boolean; slug: string; enabled: boolean; next_due_at: string };

    assert.equal(res.saved, true);
    assert.equal(res.slug, "schedule-monday-geopass-check");
    assert.equal(res.enabled, true);
    assert.equal(res.next_due_at, "2026-06-14T22:00:00.000Z");

    const rows = JSON.parse(
      fs.readFileSync(path.join(tempDir, "knowledge_library.json"), "utf8"),
    ) as Array<{ slug: string; category: string; tags: string[] }>;
    const row = rows.find((r) => r.slug === res.slug);
    assert.equal(row?.category, SCHEDULE_CATEGORY);
    assert.ok(row?.tags.includes("enabled:true"));
    assert.ok(row?.tags.includes("due:2026-06-14T22:00:00.000Z"));
  });

  test("list_due_schedules returns only enabled schedules past their due time", async () => {
    const { MEMORY_HANDLERS } = await import("../handlers.js");

    await MEMORY_HANDLERS.save_schedule({
      name: "Hourly ping",
      cadence: { every: "1h" },
      action: { kind: "note", message: "ping" },
      now: "2026-06-11T03:00:00.000Z",
    });
    await MEMORY_HANDLERS.save_schedule({
      name: "Far future",
      cadence: { every: "1d" },
      action: { kind: "note", message: "later" },
      now: "2026-06-11T03:00:00.000Z",
    });
    await MEMORY_HANDLERS.save_schedule({
      name: "Disabled job",
      cadence: { every: "1h" },
      action: { kind: "note", message: "off" },
      enabled: false,
      now: "2026-06-11T03:00:00.000Z",
    });

    const due = (await MEMORY_HANDLERS.list_due_schedules({ now: "2026-06-11T05:00:00.000Z" })) as {
      count: number;
      due: Array<{ slug: string }>;
    };
    assert.equal(due.count, 1);
    assert.equal(due.due[0]?.slug, "schedule-hourly-ping");

    const none = (await MEMORY_HANDLERS.list_due_schedules({ now: "2026-06-11T03:30:00.000Z" })) as {
      count: number;
    };
    assert.equal(none.count, 0);
  });

  test("record_schedule_run advances next_due_at and tracks stats; failures stay visible", async () => {
    const { MEMORY_HANDLERS } = await import("../handlers.js");

    await MEMORY_HANDLERS.save_schedule({
      name: "Hourly ping",
      cadence: { every: "1h" },
      action: { kind: "note", message: "ping" },
      now: "2026-06-11T03:00:00.000Z",
    });

    const run = (await MEMORY_HANDLERS.record_schedule_run({
      slug: "schedule-hourly-ping",
      outcome: "success",
      summary: "Posted ping",
      now: "2026-06-11T04:05:00.000Z",
    })) as { recorded: boolean; next_due_at: string; stats: { runs: number; successes: number } };
    assert.equal(run.recorded, true);
    assert.equal(run.next_due_at, "2026-06-11T05:05:00.000Z");
    assert.equal(run.stats.runs, 1);
    assert.equal(run.stats.successes, 1);

    const fail = (await MEMORY_HANDLERS.record_schedule_run({
      slug: "schedule-hourly-ping",
      outcome: "failure",
      now: "2026-06-11T05:10:00.000Z",
    })) as { stats: { failures: number; last_outcome: string } };
    assert.equal(fail.stats.failures, 1);
    assert.equal(fail.stats.last_outcome, "failure");
  });

  test("set_schedule_enabled toggles and re-anchors the due time on enable", async () => {
    const { MEMORY_HANDLERS } = await import("../handlers.js");

    await MEMORY_HANDLERS.save_schedule({
      name: "Hourly ping",
      cadence: { every: "1h" },
      action: { kind: "note", message: "ping" },
      now: "2026-06-11T03:00:00.000Z",
    });

    const off = (await MEMORY_HANDLERS.set_schedule_enabled({
      slug: "schedule-hourly-ping",
      enabled: false,
    })) as { updated: boolean; enabled: boolean };
    assert.equal(off.enabled, false);

    // Re-enable two days later: due time anchors forward, no backlog.
    const on = (await MEMORY_HANDLERS.set_schedule_enabled({
      slug: "schedule-hourly-ping",
      enabled: true,
      now: "2026-06-13T03:00:00.000Z",
    })) as { enabled: boolean; next_due_at: string };
    assert.equal(on.enabled, true);
    assert.equal(on.next_due_at, "2026-06-13T04:00:00.000Z");
  });

  test("get_schedule refuses a slug that belongs to a non-schedule doc", async () => {
    const { MEMORY_HANDLERS } = await import("../handlers.js");
    await MEMORY_HANDLERS.upsert_library_doc({
      slug: "schedule-imposter",
      title: "Imposter",
      category: "reference",
      content: "not a schedule",
      tags: [],
    });
    const got = (await MEMORY_HANDLERS.get_schedule({ slug: "schedule-imposter" })) as {
      found: boolean;
      error?: string;
    };
    assert.equal(got.found, false);
    assert.match(got.error ?? "", /not a schedule/);
  });
});
