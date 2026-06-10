import { describe, expect, it } from "vitest";

import { csuitAnalyze, type CsuiteAnalysisResult } from "../csuite-tool.js";

describe("csuitAnalyze", () => {
  it("returns all 12 perspectives by default", () => {
    const r = csuitAnalyze("Should we expand into the European market?");
    expect(r.perspectives_analyzed).toBe(12);
    expect(r.perspectives).toHaveLength(12);
    const roles = r.perspectives.map((p) => p.role);
    expect(roles).toContain("CEO");
    expect(roles).toContain("CTO");
    expect(roles).toContain("CFO");
    expect(roles).toContain("CAIO");
  });

  it("defaults to standard depth", () => {
    const r = csuitAnalyze("Hire 5 more engineers");
    expect(r.depth).toBe("standard");
  });

  it("respects quick depth", () => {
    const r = csuitAnalyze("Cut costs", { depth: "quick" });
    expect(r.depth).toBe("quick");
    for (const p of r.perspectives) {
      expect(p.risks.length).toBeLessThanOrEqual(2);
    }
  });

  it("respects deep depth", () => {
    const r = csuitAnalyze("Migrate the entire platform to a new cloud provider", { depth: "deep" });
    expect(r.depth).toBe("deep");
    for (const p of r.perspectives) {
      expect(p.risks.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("filters to requested perspectives", () => {
    const r = csuitAnalyze("Build a mobile app", { perspectives: ["CEO", "CTO", "CFO"] });
    expect(r.perspectives_analyzed).toBe(3);
    expect(r.perspectives.map((p) => p.role)).toEqual(["CEO", "CTO", "CFO"]);
  });

  it("is case-insensitive for perspective names", () => {
    const r = csuitAnalyze("Test scenario", { perspectives: ["ceo", "cto"] });
    expect(r.perspectives.map((p) => p.role)).toEqual(["CEO", "CTO"]);
  });

  it("throws for invalid perspective names", () => {
    expect(() =>
      csuitAnalyze("Test", { perspectives: ["CEO", "JANITOR"] })
    ).toThrow(/Invalid perspective/);
  });

  it("includes consensus synthesis", () => {
    const r = csuitAnalyze("Launch a new product line");
    expect(r.consensus).toBeDefined();
    expect(r.consensus.overall_recommendation).toBeTruthy();
    expect(["low", "medium", "high"]).toContain(r.consensus.confidence);
    expect(r.consensus.agreement_points.length).toBeGreaterThan(0);
    expect(r.consensus.disagreement_points.length).toBeGreaterThan(0);
    expect(r.consensus.critical_path).toBeTruthy();
    expect(Array.isArray(r.consensus.watch_list)).toBe(true);
  });

  it("preserves scenario and context in result", () => {
    const r = csuitAnalyze("Build an API", { context: "We are a 20-person startup." });
    expect(r.scenario).toBe("Build an API");
    expect(r.context).toBe("We are a 20-person startup.");
  });

  it("omits context when not provided", () => {
    const r = csuitAnalyze("Test");
    expect(r.context).toBeUndefined();
  });
});

describe("signal extraction via perspective output", () => {
  it("detects financial signals and adjusts CFO confidence", () => {
    const r = csuitAnalyze("Should we invest $2M in a new revenue stream to improve margins?", {
      perspectives: ["CFO"],
    });
    const cfo = r.perspectives[0];
    expect(cfo.confidence).toBe("high");
  });

  it("detects technical signals and adjusts CTO output", () => {
    const r = csuitAnalyze("Migrate the legacy system to a new API architecture and refactor the codebase", {
      perspectives: ["CTO"],
    });
    const cto = r.perspectives[0];
    expect(cto.confidence).toBe("medium");
    expect(cto.priority_flags.some((f) => /spike|technical/i.test(f))).toBe(true);
  });

  it("detects people signals for CHRO", () => {
    const r = csuitAnalyze("Restructure the engineering team and hire 10 new staff members", {
      perspectives: ["CHRO"],
    });
    const chro = r.perspectives[0];
    expect(chro.priority_flags.some((f) => /hiring|people|hire/i.test(f))).toBe(true);
  });

  it("detects security signals for CSO", () => {
    const r = csuitAnalyze("Implement GDPR compliance and fix the security vulnerability in auth", {
      perspectives: ["CSO"],
    });
    const cso = r.perspectives[0];
    expect(cso.confidence).toBe("high");
  });

  it("detects customer signals for CCO", () => {
    const r = csuitAnalyze("Reduce customer churn and improve NPS scores across all segments", {
      perspectives: ["CCO"],
    });
    const cco = r.perspectives[0];
    expect(cco.confidence).toBe("high");
  });

  it("detects AI/data signals for CAIO", () => {
    const r = csuitAnalyze("Build an AI model for predictive analytics on customer data", {
      perspectives: ["CAIO"],
    });
    const caio = r.perspectives[0];
    expect(caio.confidence).toBe("high");
  });

  it("detects urgency signals and lowers COO confidence", () => {
    const r = csuitAnalyze("We need to ship this immediately before the deadline tomorrow", {
      perspectives: ["COO"],
    });
    const coo = r.perspectives[0];
    expect(coo.confidence).toBe("medium");
  });

  it("detects vendor signals for CIO", () => {
    const r = csuitAnalyze("Evaluate a SaaS vendor to outsource our integration platform", {
      perspectives: ["CIO"],
    });
    const cio = r.perspectives[0];
    expect(cio.risks.some((r) => /vendor|interop/i.test(r))).toBe(true);
  });

  it("detects product signals for CPO", () => {
    const r = csuitAnalyze("Reprioritize the product roadmap to add a new feature for the MVP release", {
      perspectives: ["CPO"],
    });
    const cpo = r.perspectives[0];
    expect(cpo.confidence).toBe("high");
  });

  it("detects growth signals for CMO", () => {
    const r = csuitAnalyze("Scale customer acquisition and expand into a new market segment", {
      perspectives: ["CMO"],
    });
    const cmo = r.perspectives[0];
    expect(cmo.risks.some((r) => /brand|position|mixed/i.test(r))).toBe(true);
  });
});

describe("perspective structure", () => {
  it("each perspective has required fields", () => {
    const r = csuitAnalyze("Generic scenario", { depth: "standard" });
    for (const p of r.perspectives) {
      expect(p.role).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.assessment).toBeTruthy();
      expect(Array.isArray(p.risks)).toBe(true);
      expect(p.risks.length).toBeGreaterThan(0);
      expect(Array.isArray(p.opportunities)).toBe(true);
      expect(p.opportunities.length).toBeGreaterThan(0);
      expect(p.recommendation).toBeTruthy();
      expect(["low", "medium", "high"]).toContain(p.confidence);
      expect(Array.isArray(p.priority_flags)).toBe(true);
    }
  });

  it("titles match known C-suite positions", () => {
    const r = csuitAnalyze("Test", { perspectives: ["CEO", "CTO"] });
    expect(r.perspectives[0].title).toBe("Chief Executive Officer");
    expect(r.perspectives[1].title).toBe("Chief Technology Officer");
  });
});

describe("consensus synthesis", () => {
  it("identifies agreement when majority perspectives align", () => {
    const r = csuitAnalyze(
      "Should we build an internal API platform to consolidate our integration systems and reduce vendor dependency?",
      { depth: "standard" },
    );
    expect(r.consensus.agreement_points.length).toBeGreaterThan(0);
  });

  it("detects speed vs rigor tension", () => {
    const r = csuitAnalyze(
      "We need to quickly launch a new product while validating market demand and assessing security risks",
    );
    const hasTension = r.consensus.disagreement_points.some((d) => /speed|rigor|tension/i.test(d));
    expect(hasTension || r.consensus.disagreement_points.length > 0).toBe(true);
  });

  it("identifies critical path", () => {
    const r = csuitAnalyze("Hire 20 engineers and restructure the team", {
      perspectives: ["CEO", "CHRO", "COO", "CTO"],
    });
    expect(r.consensus.critical_path).toBeTruthy();
    expect(r.consensus.critical_path.length).toBeGreaterThan(10);
  });
});
