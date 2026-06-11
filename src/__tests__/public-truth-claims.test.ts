import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Truth locks for the public pages cleaned in the 2026-06-11 surgery
 * (Creative Studio Council findings). Receipts over assertions: no revenue
 * promises for a paused marketplace, no fabricated testimonials, no wrong
 * package names, no mojibake, no self-awarded production-readiness.
 */

const read = (p: string) => readFileSync(resolve(process.cwd(), p), "utf8");

describe("developer pages stay beta-honest", () => {
  it("the landing page makes no marketplace revenue promises", () => {
    const src = read("src/pages/Developers.tsx");
    for (const banned of [
      "Earn forever",
      "passive income",
      "80%",
      "$0.001",
      "Founding Developer",
      "revenue calculator",
      "Pulled out $340",
      "Jamie K.",
      "Alex M.",
      "Sam R.",
      "npx unclick test",
    ]) {
      expect(src, `Developers.tsx must not contain "${banned}"`).not.toContain(banned);
    }
    expect(src).toContain("in beta");
  });

  it("the developer docs no longer describe a revenue program", () => {
    const src = read("src/pages/DeveloperDocs.tsx");
    for (const banned of ["Revenue & Payments", "RevenueSection", "80%", "$0.001", "payout", "Payout", "Stripe"]) {
      expect(src, `DeveloperDocs.tsx must not contain "${banned}"`).not.toContain(banned);
    }
  });
});

describe("smart home page claims stay verifiable", () => {
  const src = read("src/pages/SmartHome.tsx");

  it("ships no mojibake and no wrong package names", () => {
    expect(src).not.toMatch(/Â|â/);
    expect(src).not.toContain("@anthropic/");
    expect(src).toContain("unclick-mcp-server.tgz");
  });

  it("ships no hand-typed third-party counts", () => {
    for (const banned of ["87 MCP tools", "87 tools", "87+", "2.2k", "2,000+", "23\n            categories"]) {
      expect(src, `SmartHome.tsx must not contain "${banned}"`).not.toContain(banned);
    }
  });

  it("keeps the honest miss in the comparison (no fake green)", () => {
    expect(src).toContain('{ feature: "Voice control", unclick: false');
  });
});

describe("crews page does not argue with itself", () => {
  const src = read("src/pages/Crews.tsx");

  it("carries no self-awarded production-ready mark while in alpha", () => {
    expect(src.toLowerCase()).not.toContain("production ready");
    expect(src.toLowerCase()).toContain("private alpha");
  });

  it("names no competitor frameworks", () => {
    for (const banned of ["CrewAI", "AutoGen", "LangGraph"]) {
      expect(src, `Crews.tsx must not contain "${banned}"`).not.toContain(banned);
    }
  });

  it("derives the advisor count from the roster instead of hand-typing it", () => {
    expect(src).toContain("MOCK_AGENTS.length");
    expect(src).not.toMatch(/180 advisors/);
  });
});
