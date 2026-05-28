// apps/jobsmith/src/lib/appLog.test.ts

import { describe, test, expect } from "vitest";

import {
  createApplicationRecord,
  hashString,
  isApplicationRecord,
  jdHash,
} from "./appLog";

describe("hashString / jdHash", () => {
  test("is deterministic for the same input", () => {
    expect(hashString("hello")).toBe(hashString("hello"));
  });

  test("differs for different input", () => {
    expect(hashString("hello")).not.toBe(hashString("world"));
  });

  test("jdHash ignores whitespace and case differences", () => {
    expect(jdHash("Senior Designer\n\nSydney")).toBe(
      jdHash("  senior   designer sydney  "),
    );
  });
});

describe("createApplicationRecord", () => {
  const input = {
    company: "Ampersand International",
    role: "Digital Media Designer",
    jobText: "Digital Media Designer at Ampersand International",
    cvText: "CV body text",
    letterText: "Cover letter body text",
  };

  test("populates the full schema", () => {
    const record = createApplicationRecord(input);
    expect(record.id).toBeTruthy();
    expect(record.company).toBe("Ampersand International");
    expect(record.role).toBe("Digital Media Designer");
    expect(record.jdHash).toBe(jdHash(input.jobText));
    expect(record.sentAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(record.status).toBe("draft");
    expect(record.cvVersionId).toBe(hashString("CV body text"));
    expect(record.letterVersionId).toBe(hashString("Cover letter body text"));
  });

  test("gives each record a unique id", () => {
    const a = createApplicationRecord(input);
    const b = createApplicationRecord(input);
    expect(a.id).not.toBe(b.id);
  });

  test("falls back to 'none' version ids when a draft is empty", () => {
    const record = createApplicationRecord({ ...input, cvText: "" });
    expect(record.cvVersionId).toBe("none");
  });

  test("produces a record that passes isApplicationRecord", () => {
    expect(isApplicationRecord(createApplicationRecord(input))).toBe(true);
  });
});

describe("isApplicationRecord", () => {
  test("rejects non-records and unknown statuses", () => {
    expect(isApplicationRecord(null)).toBe(false);
    expect(isApplicationRecord({ id: "x" })).toBe(false);
    expect(
      isApplicationRecord({
        id: "x",
        company: "c",
        role: "r",
        jdHash: "h",
        sentAt: "t",
        status: "not-a-status",
        cvVersionId: "v",
        letterVersionId: "v",
      }),
    ).toBe(false);
  });
});
