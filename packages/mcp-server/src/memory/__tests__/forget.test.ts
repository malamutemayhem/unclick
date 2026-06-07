import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  isHardForgetEnabled,
  FORGOTTEN_TOMBSTONE_TEXT,
  NEUTRALIZED_SNAPSHOT_CONTENT,
  factSnapshotPointer,
  forgetComplianceScore,
  sessionEventBelongsToForgottenFact,
} from "../forget.js";

describe("isHardForgetEnabled", () => {
  const FLAG = "MEMORY_HARD_FORGET_ENABLED";
  let saved: string | undefined;

  function withFlag(value: string | undefined, fn: () => void): void {
    saved = process.env[FLAG];
    if (value === undefined) delete process.env[FLAG];
    else process.env[FLAG] = value;
    try { fn(); } finally {
      if (saved === undefined) delete process.env[FLAG];
      else process.env[FLAG] = saved;
    }
  }

  test("returns true for '1'", () => {
    withFlag("1", () => assert.equal(isHardForgetEnabled(), true));
  });

  test("returns true for 'true' (case-insensitive)", () => {
    withFlag("True", () => assert.equal(isHardForgetEnabled(), true));
  });

  test("returns false when unset", () => {
    withFlag(undefined, () => assert.equal(isHardForgetEnabled(), false));
  });

  test("returns false for '0'", () => {
    withFlag("0", () => assert.equal(isHardForgetEnabled(), false));
  });

  test("returns false for 'false'", () => {
    withFlag("false", () => assert.equal(isHardForgetEnabled(), false));
  });
});

describe("factSnapshotPointer", () => {
  test("formats a fact ID as a snapshot pointer", () => {
    assert.equal(factSnapshotPointer("abc-123"), "fact:abc-123");
  });

  test("handles empty string", () => {
    assert.equal(factSnapshotPointer(""), "fact:");
  });
});

describe("forgetComplianceScore", () => {
  test("returns 1 when verified_clean is true", () => {
    assert.equal(
      forgetComplianceScore({ verified_clean: true } as any),
      1,
    );
  });

  test("returns 0 when verified_clean is false", () => {
    assert.equal(
      forgetComplianceScore({ verified_clean: false } as any),
      0,
    );
  });
});

describe("sessionEventBelongsToForgottenFact", () => {
  const factId = "fact-42";
  const originalText = "Chris prefers TypeScript for all projects.";

  test("matches by source_fact_id", () => {
    assert.equal(
      sessionEventBelongsToForgottenFact(
        { source_fact_id: "fact-42", content: "unrelated" },
        factId,
        originalText,
      ),
      true,
    );
  });

  test("matches by exact content when source_fact_id is null", () => {
    assert.equal(
      sessionEventBelongsToForgottenFact(
        { source_fact_id: null, content: originalText },
        factId,
        originalText,
      ),
      true,
    );
  });

  test("does not match when content is a substring", () => {
    assert.equal(
      sessionEventBelongsToForgottenFact(
        { source_fact_id: null, content: "Chris prefers TypeScript" },
        factId,
        originalText,
      ),
      false,
    );
  });

  test("does not match unrelated event", () => {
    assert.equal(
      sessionEventBelongsToForgottenFact(
        { source_fact_id: "fact-99", content: "something else" },
        factId,
        originalText,
      ),
      false,
    );
  });

  test("does not match on empty original text", () => {
    assert.equal(
      sessionEventBelongsToForgottenFact(
        { source_fact_id: null, content: "" },
        factId,
        "",
      ),
      false,
    );
  });

  test("matches source_fact_id even when content is undefined", () => {
    assert.equal(
      sessionEventBelongsToForgottenFact(
        { source_fact_id: "fact-42" },
        factId,
        originalText,
      ),
      true,
    );
  });
});

describe("constants", () => {
  test("tombstone text is content-free", () => {
    assert.equal(FORGOTTEN_TOMBSTONE_TEXT, "[forgotten]");
  });

  test("neutralized snapshot content instructs rebuild", () => {
    assert.ok(NEUTRALIZED_SNAPSHOT_CONTENT.includes("refresh_taxonomy_snapshots"));
  });
});
