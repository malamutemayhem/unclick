import { describe, it, expect, beforeEach } from "vitest";
import { shortId, prefixedId, timestampId, sequentialId, hexId, resetSequence } from "../id-generator.js";

describe("shortId", () => {
  it("generates string of requested length", () => {
    expect(shortId(8)).toHaveLength(8);
    expect(shortId(16)).toHaveLength(16);
  });

  it("defaults to 12 characters", () => {
    expect(shortId()).toHaveLength(12);
  });

  it("generates unique values", () => {
    const ids = new Set(Array.from({ length: 100 }, () => shortId()));
    expect(ids.size).toBe(100);
  });

  it("uses only alphanumeric characters", () => {
    expect(shortId(100)).toMatch(/^[0-9a-z]+$/);
  });
});

describe("prefixedId", () => {
  it("starts with prefix", () => {
    expect(prefixedId("usr")).toMatch(/^usr_[0-9a-z]{12}$/);
  });
});

describe("timestampId", () => {
  it("contains a dash separator", () => {
    expect(timestampId()).toMatch(/^[0-9a-z]+-[0-9a-z]{6}$/);
  });
});

describe("sequentialId", () => {
  beforeEach(() => resetSequence());

  it("increments on each call", () => {
    expect(sequentialId()).toBe("000001");
    expect(sequentialId()).toBe("000002");
  });

  it("supports prefix", () => {
    expect(sequentialId("req")).toBe("req-000001");
  });
});

describe("hexId", () => {
  it("generates hex string of requested length", () => {
    expect(hexId(8)).toHaveLength(8);
    expect(hexId(8)).toMatch(/^[0-9a-f]+$/);
  });
});
