import { describe, expect, it } from "vitest";
import { shouldSuppressCleanScheduledRunSignal } from "./testpass-run";

const clean = { fail: 0, other: 0, pending: 0 };

describe("shouldSuppressCleanScheduledRunSignal", () => {
  it("suppresses a fully clean scheduled completion", () => {
    expect(shouldSuppressCleanScheduledRunSignal("complete", clean)).toBe(true);
  });

  it("keeps failed runs", () => {
    expect(shouldSuppressCleanScheduledRunSignal("failed", { ...clean, fail: 2 })).toBe(false);
  });

  it("keeps completions with attention (other) verdicts", () => {
    expect(shouldSuppressCleanScheduledRunSignal("complete", { ...clean, other: 1 })).toBe(false);
  });

  it("keeps runs stuck in running with pending items", () => {
    expect(shouldSuppressCleanScheduledRunSignal("running", { ...clean, pending: 3 })).toBe(false);
  });
});
