// apps/jobsmith/src/lib/cvFacts.test.ts

import { describe, test, expect } from "vitest";

import {
  CV_FACTS_TEMPLATE,
  collectFactIds,
  parseMasterCvFacts,
  validateDates,
} from "./cvFacts";

describe("parseMasterCvFacts", () => {
  test("accepts the built-in template", () => {
    const result = parseMasterCvFacts(JSON.stringify(CV_FACTS_TEMPLATE));
    expect(result.ok).toBe(true);
  });

  test("rejects invalid JSON", () => {
    const result = parseMasterCvFacts("{ not json");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/Not valid JSON/);
  });

  test("rejects missing required fields", () => {
    const result = parseMasterCvFacts(
      JSON.stringify({ contact: "x", experience: [], education: [], skills: [] }),
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/name/);
  });

  test("rejects duplicate fact ids", () => {
    const dupe = {
      name: "Test",
      contact: "test@example.com",
      experience: [
        {
          id: "exp-1",
          org: "Org",
          title: "Role",
          startDate: "01/2020",
          endDate: "Present",
          bullets: [
            { id: "dup", text: "One" },
            { id: "dup", text: "Two" },
          ],
        },
      ],
      education: [],
      skills: [],
    };
    const result = parseMasterCvFacts(JSON.stringify(dupe));
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/unique/);
  });
});

describe("validateDates", () => {
  test("flags a startDate that is not MM/YYYY", () => {
    const issues = validateDates({
      name: "Test",
      contact: "test@example.com",
      experience: [
        {
          id: "exp-1",
          org: "Org",
          title: "Role",
          startDate: "2020",
          endDate: "Present",
          bullets: [],
        },
      ],
      education: [],
      skills: [],
    });
    expect(issues.length).toBeGreaterThan(0);
    expect(issues[0]).toMatch(/MM\/YYYY/);
  });

  test("accepts MM/YYYY dates and 'Present'", () => {
    const issues = validateDates({
      name: "Test",
      contact: "test@example.com",
      experience: [
        {
          id: "exp-1",
          org: "Org",
          title: "Role",
          startDate: "03/2015",
          endDate: "Present",
          bullets: [],
        },
      ],
      education: [],
      skills: [],
    });
    expect(issues).toHaveLength(0);
  });
});

describe("collectFactIds", () => {
  test("collects every id once", () => {
    const ids = collectFactIds(CV_FACTS_TEMPLATE);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain("exp-1");
    expect(ids).toContain("exp-1-b1");
  });
});
