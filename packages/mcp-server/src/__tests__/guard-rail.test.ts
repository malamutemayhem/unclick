import { describe, it, expect } from "vitest";
import { maxLengthGuard, blockedWordsGuard, regexGuard, piiGuard, jsonOutputGuard, combineGuards, runGuards } from "../guard-rail.js";

describe("maxLengthGuard", () => {
  it("passes short text", () => {
    expect(maxLengthGuard(100)("hello").passed).toBe(true);
  });
  it("fails long text", () => {
    const r = maxLengthGuard(5)("hello world");
    expect(r.passed).toBe(false);
    expect(r.violations.length).toBe(1);
  });
});

describe("blockedWordsGuard", () => {
  it("passes clean text", () => {
    expect(blockedWordsGuard(["bad", "evil"])("this is fine").passed).toBe(true);
  });
  it("catches blocked words", () => {
    const r = blockedWordsGuard(["password", "secret"])("The password is secret");
    expect(r.passed).toBe(false);
    expect(r.violations.length).toBe(2);
  });
  it("is case insensitive", () => {
    expect(blockedWordsGuard(["bad"])("This is BAD").passed).toBe(false);
  });
});

describe("regexGuard", () => {
  it("detects pattern matches", () => {
    const guard = regexGuard([{ pattern: /\bTODO\b/, message: "Contains TODO" }]);
    expect(guard("Fix this TODO").passed).toBe(false);
    expect(guard("All done").passed).toBe(true);
  });
});

describe("piiGuard", () => {
  it("detects SSN", () => {
    expect(piiGuard()("My SSN is 123-45-6789").passed).toBe(false);
  });
  it("detects email", () => {
    expect(piiGuard()("Email: test@example.com").passed).toBe(false);
  });
  it("passes clean text", () => {
    expect(piiGuard()("Hello, how are you?").passed).toBe(true);
  });
});

describe("jsonOutputGuard", () => {
  it("passes valid JSON", () => {
    expect(jsonOutputGuard()('{"key":"value"}').passed).toBe(true);
  });
  it("fails invalid JSON", () => {
    expect(jsonOutputGuard()("not json").passed).toBe(false);
  });
});

describe("combineGuards", () => {
  it("combines multiple guards", () => {
    const guard = combineGuards(maxLengthGuard(100), blockedWordsGuard(["bad"]));
    expect(guard("this is fine").passed).toBe(true);
    expect(guard("this is bad").passed).toBe(false);
  });
  it("collects all violations", () => {
    const guard = combineGuards(maxLengthGuard(5), blockedWordsGuard(["hello"]));
    const r = guard("hello world");
    expect(r.violations.length).toBe(2);
  });
});

describe("runGuards", () => {
  it("runs array of guards", () => {
    const r = runGuards("test", [maxLengthGuard(100)]);
    expect(r.passed).toBe(true);
  });
});
