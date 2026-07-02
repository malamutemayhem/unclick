import { test } from "node:test";
import assert from "node:assert/strict";
import { buildRow, upsertByDate, trendLines, readLog } from "./visibility-snapshot.mjs";

test("buildRow keeps missing values as null, never zero", () => {
  const row = buildRow({ date: "2026-06-11" });
  assert.equal(row.date, "2026-06-11");
  assert.equal(row.npm_version, null);
  assert.equal(row.npm_downloads_last_30d, null);
  assert.equal(row.github_stars, null);
  assert.deepEqual(row.notes, []);
});

test("upsertByDate replaces the same-date row instead of duplicating", () => {
  const a = buildRow({ date: "2026-06-10", stars: 4 });
  const b = buildRow({ date: "2026-06-11", stars: 4 });
  const bUpdated = buildRow({ date: "2026-06-11", stars: 5 });

  let rows = upsertByDate([], a);
  rows = upsertByDate(rows, b);
  rows = upsertByDate(rows, bUpdated);

  assert.equal(rows.length, 2);
  assert.equal(rows[1].github_stars, 5);
});

test("upsertByDate keeps rows sorted by date", () => {
  const rows = upsertByDate(
    upsertByDate([], buildRow({ date: "2026-06-11" })),
    buildRow({ date: "2026-06-09" }),
  );
  assert.deepEqual(rows.map((r) => r.date), ["2026-06-09", "2026-06-11"]);
});

test("trendLines shows deltas between runs", () => {
  const prev = buildRow({ date: "2026-06-04", npmDownloads30d: 8900, stars: 4, forks: 1, watchers: 2 });
  const curr = buildRow({ date: "2026-06-11", npmDownloads30d: 9200, stars: 6, forks: 1, watchers: 2, npmVersion: "0.3.110" });
  const lines = trendLines(prev, curr);

  assert.ok(lines.some((l) => l.includes("8900 -> 9200 (+300)")));
  assert.ok(lines.some((l) => l.includes("4 -> 6 (+2)")));
  assert.ok(lines.some((l) => l.includes("(no change)")));
  assert.ok(lines.some((l) => l.includes("0.3.110")));
});

test("trendLines tolerates a missing previous row and null fields", () => {
  const curr = buildRow({ date: "2026-06-11", npmDownloads30d: 9200 });
  const lines = trendLines(null, curr);

  assert.ok(lines.some((l) => l.includes("npm downloads (30d): 9200")));
  assert.ok(lines.some((l) => l.includes("GitHub stars: unavailable this run")));
});

test("readLog returns an empty shell when the log file does not exist", () => {
  const log = readLog("/tmp/does-not-exist-visibility-log.json");
  assert.equal(log.package, "@unclick/mcp-server");
  assert.deepEqual(log.snapshots, []);
});
