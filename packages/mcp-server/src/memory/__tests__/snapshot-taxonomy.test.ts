import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  buildMemoryTaxonomySnapshots,
  isSensitiveMemorySnapshotText,
} from "../supabase.js";

describe("memory taxonomy snapshots", () => {
  test("classifies technology documentaries as technology first with ordered secondary tags", () => {
    const [snapshot] = buildMemoryTaxonomySnapshots([
      {
        id: "fact-1",
        kind: "fact",
        text: "Chris loves technology documentaries",
        category: "preference",
        confidence: 0.93,
        updated_at: "2026-05-10T10:00:00.000Z",
      },
    ]);

    assert.equal(snapshot.primary_category, "17 Technology & Engineering");
    assert.deepEqual(snapshot.secondary_categories.slice(0, 2), [
      "18 Media & Entertainment",
      "04 Preferences & Taste",
    ]);
    assert.deepEqual(snapshot.source_ids, ["fact-1"]);
    assert.ok(snapshot.content.includes("Sources: fact:fact-1"));
  });

  test("skips raw secret, auth, and billing-like memory text", () => {
    assert.equal(isSensitiveMemorySnapshotText("Authorization: Bearer abc123token"), true);
    const snapshots = buildMemoryTaxonomySnapshots([
      {
        id: "fact-secret",
        kind: "fact",
        text: "The Stripe billing token is sk_live_example",
        category: "billing",
        confidence: 1,
      },
      {
        id: "fact-safe",
        kind: "fact",
        text: "Memory snapshots should keep compact source pointers",
        category: "technical",
        confidence: 0.8,
      },
    ]);

    assert.equal(snapshots.length, 1);
    assert.deepEqual(snapshots[0].source_ids, ["fact-safe"]);
    assert.equal(snapshots[0].content.includes("sk_live_example"), false);
  });

  test("dedupes repeated facts and keeps the strongest source", () => {
    const [snapshot] = buildMemoryTaxonomySnapshots([
      {
        id: "fact-low",
        kind: "fact",
        text: "UnClick memory uses taxonomy shelves",
        category: "memory",
        confidence: 0.4,
        updated_at: "2026-05-09T10:00:00.000Z",
      },
      {
        id: "fact-high",
        kind: "fact",
        text: "UnClick memory uses taxonomy shelves",
        category: "memory",
        confidence: 0.9,
        updated_at: "2026-05-10T10:00:00.000Z",
      },
    ]);

    assert.deepEqual(snapshot.source_ids, ["fact-high"]);
    assert.equal(snapshot.confidence, 0.9);
    assert.equal(snapshot.last_confirmed_at, "2026-05-10T10:00:00.000Z");
  });
});
