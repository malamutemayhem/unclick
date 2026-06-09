import { describe, expect, it } from "vitest";

import { csuitAnalyze } from "./csuite-tool.js";
import type { CsuiteAnalysisResult, CsuiteRole } from "./csuite-tool.js";

describe("csuite connector (L2)", () => {
  // ── basic invocation ──────────────────────────────────────────────────────

  it("analyzes a scenario with all perspectives by default", () => {
    const r = csuitAnalyze("Should we acquire a competitor?");
    expect(r.scenario).toBe("Should we acquire a competitor?");
    expect(r.depth).toBe("standard");
    expect(r.perspectives_analyzed).toBeGreaterThan(0);
    expect(r.perspectives.length).toBe(r.perspectives_analyzed);
    expect(r.consensus).toBeDefined();
    expect(r.consensus.overall_recommendation).toBeDefined();
    expect(r.consensus.confidence).toMatch(/^(low|medium|high)$/);
  });

  it("includes all 12 C-suite roles when no perspectives specified", () => {
    const r = csuitAnalyze("Launch a new product line");
    const roles = r.perspectives.map((p) => p.role);
    const expected: CsuiteRole[] = [
      "CEO", "COO", "CTO", "CFO", "CMO", "CIO",
      "CHRO", "CDO", "CPO", "CSO", "CCO", "CAIO",
    ];
    for (const role of expected) {
      expect(roles).toContain(role);
    }
  });

  // ── depth levels ──────────────────────────────────────────────────────────

  it("respects the quick depth level", () => {
    const r = csuitAnalyze("Reduce headcount by 10%", { depth: "quick" });
    expect(r.depth).toBe("quick");
    expect(r.perspectives.length).toBeGreaterThan(0);
  });

  it("respects the deep depth level", () => {
    const r = csuitAnalyze("Enter a new international market", { depth: "deep" });
    expect(r.depth).toBe("deep");
    expect(r.perspectives.length).toBeGreaterThan(0);
  });

  // ── filtered perspectives ─────────────────────────────────────────────────

  it("filters to specific perspectives", () => {
    const r = csuitAnalyze("Migrate to cloud", { perspectives: ["CTO", "CFO", "CIO"] });
    expect(r.perspectives_analyzed).toBe(3);
    const roles = r.perspectives.map((p) => p.role);
    expect(roles).toContain("CTO");
    expect(roles).toContain("CFO");
    expect(roles).toContain("CIO");
    expect(roles).not.toContain("CMO");
  });

  it("accepts lowercase perspective names", () => {
    const r = csuitAnalyze("Hire a VP of Sales", { perspectives: ["ceo", "chro"] });
    expect(r.perspectives_analyzed).toBe(2);
  });

  // ── invalid perspectives ──────────────────────────────────────────────────

  it("throws on invalid perspective names", () => {
    expect(() =>
      csuitAnalyze("Test", { perspectives: ["WIZARD"] })
    ).toThrow(/Invalid perspective/);
  });

  // ── context and focus ─────────────────────────────────────────────────────

  it("includes context when provided", () => {
    const r = csuitAnalyze("Should we raise prices?", {
      context: "Competitor just raised theirs 15%",
    });
    expect(r.context).toBe("Competitor just raised theirs 15%");
  });

  it("omits context field when not provided", () => {
    const r = csuitAnalyze("Simple question");
    expect(r.context).toBeUndefined();
  });

  it("accepts a focus parameter", () => {
    const r = csuitAnalyze("Expand to Asia", {
      perspectives: ["CEO", "CFO"],
      focus: "risk management",
    });
    expect(r.perspectives_analyzed).toBe(2);
  });

  // ── perspective structure ─────────────────────────────────────────────────

  it("returns well-structured perspective results", () => {
    const r = csuitAnalyze("Restructure the engineering team", {
      perspectives: ["CTO"],
    });
    const p = r.perspectives[0];
    expect(p.role).toBe("CTO");
    expect(p.title).toBeDefined();
    expect(typeof p.assessment).toBe("string");
    expect(Array.isArray(p.risks)).toBe(true);
    expect(Array.isArray(p.opportunities)).toBe(true);
    expect(typeof p.recommendation).toBe("string");
    expect(p.confidence).toMatch(/^(low|medium|high)$/);
    expect(Array.isArray(p.priority_flags)).toBe(true);
  });

  // ── consensus structure ───────────────────────────────────────────────────

  it("returns a well-structured consensus", () => {
    const r = csuitAnalyze("Double the marketing budget");
    const c = r.consensus;
    expect(typeof c.overall_recommendation).toBe("string");
    expect(c.confidence).toMatch(/^(low|medium|high)$/);
    expect(Array.isArray(c.agreement_points)).toBe(true);
    expect(Array.isArray(c.disagreement_points)).toBe(true);
    expect(typeof c.critical_path).toBe("string");
    expect(Array.isArray(c.watch_list)).toBe(true);
  });

  // ── signal extraction ─────────────────────────────────────────────────────

  it("extracts financial signals from scenario text", () => {
    const r = csuitAnalyze("We need to cut costs by $2M and improve margins", {
      perspectives: ["CFO"],
    });
    const cfoPerspective = r.perspectives[0];
    expect(cfoPerspective.risks.length).toBeGreaterThan(0);
  });

  it("extracts technology signals from scenario text", () => {
    const r = csuitAnalyze("Migrate our legacy monolith to microservices on Kubernetes", {
      perspectives: ["CTO"],
    });
    const ctoPerspective = r.perspectives[0];
    expect(ctoPerspective.assessment.length).toBeGreaterThan(0);
  });
});
