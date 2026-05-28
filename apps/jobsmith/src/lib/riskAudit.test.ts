// apps/jobsmith/src/lib/riskAudit.test.ts

import { describe, test, expect } from "vitest";

import {
  extractQuantifiedClaims,
  scanAgeSignals,
  scanTone,
} from "./riskAudit";

describe("scanTone", () => {
  test("flags em-dashes", () => {
    const findings = scanTone("I worked here — and there.");
    expect(findings.some((f) => f.kind === "em-dash")).toBe(true);
  });

  test("flags curly quotes", () => {
    const findings = scanTone("He said “hello” to me.");
    expect(findings.some((f) => f.kind === "curly-quote")).toBe(true);
  });

  test("flags AI-era tell words including suffix variants", () => {
    const findings = scanTone(
      "I delve into the intricate tapestry and showcasing my bolstered skills.",
    );
    const tells = findings.filter((f) => f.kind === "gpt-tell");
    expect(tells.length).toBeGreaterThanOrEqual(4);
  });

  test("returns nothing for clean copy", () => {
    expect(scanTone("I led the design team and shipped the product.")).toEqual(
      [],
    );
  });
});

describe("extractQuantifiedClaims", () => {
  test("lists sentences that contain numbers", () => {
    const claims = extractQuantifiedClaims(
      "I led a team. I improved conversion by 18% last year. We shipped fast.",
    );
    expect(claims).toContain("I improved conversion by 18% last year.");
    expect(claims).not.toContain("I led a team.");
  });

  test("returns an empty list when there are no quantified claims", () => {
    expect(
      extractQuantifiedClaims("I led the team and shipped the product."),
    ).toEqual([]);
  });
});

describe("scanAgeSignals", () => {
  test("flags visible years", () => {
    const findings = scanAgeSignals("Graduated in 2004 from the university.");
    expect(findings.some((f) => f.kind === "year")).toBe(true);
  });

  test("flags long experience spans over 15 years", () => {
    const findings = scanAgeSignals("With over 20 years of experience.");
    expect(findings.some((f) => f.kind === "long-experience")).toBe(true);
  });

  test("does not flag a short experience span", () => {
    const findings = scanAgeSignals("With 6 years of experience.");
    expect(findings.some((f) => f.kind === "long-experience")).toBe(false);
  });
});
