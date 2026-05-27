import { describe, it, expect } from "vitest";
import {
  CORE_CHECKS,
  buildBreakdown,
  computeUxScore,
  evaluateAllChecks,
  failingFindings,
  type CheckContext,
} from "../checks.js";
import { HAT_IDS } from "../schema.js";
import { UXPASS_CRITICS, criticIds, validateCriticRoster } from "../critics.js";
import type { VisualAuditSnapshot } from "../visual-audit.js";

const goodHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Hello</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="A great page">
<link rel="icon" href="/favicon.svg">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"Hello"}</script>
</head>
<body>
<header><h1>Hello</h1></header>
<nav></nav>
<main>
<img src="/a.png" alt="a">
<img src="/b.png" alt="">
</main>
<footer></footer>
</body>
</html>`;

const badHtml = `<!doctype html>
<html>
<body>
<div>Hello</div>
<img src="/a.png">
</body>
</html>`;

const goodVisualAudit: VisualAuditSnapshot = {
  url: "https://example.com",
  viewport: { name: "desktop", width: 1440, height: 900 },
  document: { scrollWidth: 1440, scrollHeight: 900, clientWidth: 1440, clientHeight: 900 },
  elements: [
    {
      selector: "h1",
      tagName: "h1",
      text: "Hello",
      visible: true,
      rect: { x: 80, y: 80, width: 300, height: 48, top: 80, right: 380, bottom: 128, left: 80 },
      scrollWidth: 300,
      scrollHeight: 48,
      clientWidth: 300,
      clientHeight: 48,
      fontSize: 32,
      fontWeight: 700,
      color: "rgb(255, 255, 255)",
      backgroundColor: "rgb(0, 0, 0)",
    },
    {
      selector: "button",
      tagName: "button",
      role: "button",
      text: "Save",
      visible: true,
      rect: { x: 80, y: 150, width: 120, height: 40, top: 150, right: 200, bottom: 190, left: 80 },
      scrollWidth: 120,
      scrollHeight: 40,
      clientWidth: 120,
      clientHeight: 40,
      fontSize: 14,
      color: "rgb(255, 255, 255)",
      backgroundColor: "rgb(15, 23, 42)",
    },
  ],
};

const denseTextElements = Array.from({ length: 100 }, (_, index) => {
  const top = 300 + Math.floor(index / 10) * 18;
  const left = 10 + (index % 10) * 40;
  return {
    selector: `.t-${index}`,
    tagName: "span",
    text: `Tiny ${index}`,
    visible: true,
    rect: {
      x: left,
      y: top,
      width: 35,
      height: 12,
      top,
      right: left + 35,
      bottom: top + 12,
      left,
    },
    scrollWidth: 35,
    scrollHeight: 12,
    clientWidth: 35,
    clientHeight: 12,
    fontSize: 12,
    color: "rgb(120, 120, 120)",
    backgroundColor: "rgb(120, 120, 120)",
  };
});

const badVisualAudit: VisualAuditSnapshot = {
  url: "https://example.com",
  viewport: { name: "desktop", width: 320, height: 700 },
  document: { scrollWidth: 420, scrollHeight: 900, clientWidth: 320, clientHeight: 700 },
  elements: [
    {
      selector: ".cropped-title",
      tagName: "div",
      text: "This important title is visibly cropped by the box",
      visible: true,
      rect: { x: 8, y: 20, width: 100, height: 18, top: 20, right: 108, bottom: 38, left: 8 },
      parentRect: { x: 8, y: 20, width: 100, height: 18, top: 20, right: 108, bottom: 38, left: 8 },
      scrollWidth: 260,
      scrollHeight: 18,
      clientWidth: 100,
      clientHeight: 18,
      fontSize: 14,
      color: "rgb(120, 120, 120)",
      backgroundColor: "rgb(120, 120, 120)",
    },
    {
      selector: ".escaping",
      tagName: "span",
      text: "Runs outside",
      visible: true,
      rect: { x: 300, y: 50, width: 80, height: 18, top: 50, right: 380, bottom: 68, left: 300 },
      parentRect: { x: 280, y: 50, width: 30, height: 18, top: 50, right: 310, bottom: 68, left: 280 },
      scrollWidth: 80,
      scrollHeight: 18,
      clientWidth: 80,
      clientHeight: 18,
      fontSize: 14,
      color: "rgb(120, 120, 120)",
      backgroundColor: "rgb(120, 120, 120)",
    },
    {
      selector: ".tiny-button",
      tagName: "button",
      role: "button",
      text: "x",
      visible: true,
      rect: { x: 8, y: 90, width: 18, height: 18, top: 90, right: 26, bottom: 108, left: 8 },
      scrollWidth: 18,
      scrollHeight: 18,
      clientWidth: 18,
      clientHeight: 18,
      fontSize: 12,
      color: "rgb(120, 120, 120)",
      backgroundColor: "rgb(120, 120, 120)",
    },
    ...["HIGH", "ACTIVE", "NEEDS PROOF", "BRIEF", "BUILD"].map((label, index) => {
      const left = 8 + index * 55;
      return {
        selector: `.badge-${index}`,
        tagName: "span",
        text: label,
        className: "rounded badge",
        visible: true,
        rect: { x: left, y: 130, width: 48, height: 20, top: 130, right: left + 48, bottom: 150, left },
        scrollWidth: 48,
        scrollHeight: 20,
        clientWidth: 48,
        clientHeight: 20,
        fontSize: 12,
        color: "rgb(120, 120, 120)",
        backgroundColor: "rgb(120, 120, 120)",
      };
    }),
    ...denseTextElements,
  ],
};

const baseCtx = (overrides: Partial<CheckContext> = {}): CheckContext => ({
  url: "https://example.com",
  status: 200,
  headers: { "strict-transport-security": "max-age=63072000; includeSubDomains; preload" },
  responseTimeMs: 200,
  bodyText: goodHtml,
  bodySize: goodHtml.length,
  llmsTxtStatus: 200,
  visualAudit: goodVisualAudit,
  ...overrides,
});

describe("CORE_CHECKS", () => {
  it("has unique check ids", () => {
    const ids = CORE_CHECKS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("covers at least seven hats", () => {
    const hats = new Set(CORE_CHECKS.map((c) => c.hat));
    expect(hats.size).toBeGreaterThanOrEqual(8);
  });

  it("maps deterministic checks to canonical critics", () => {
    const critics = new Set(criticIds());
    for (const check of CORE_CHECKS) {
      expect(critics.has(check.hat)).toBe(true);
    }
  });

  it("only uses severities allowed by the uxpass_findings schema", () => {
    const allowed = new Set(["critical", "high", "medium", "low"]);
    for (const c of CORE_CHECKS) {
      expect(allowed.has(c.severity)).toBe(true);
    }
  });
});

describe("UXPASS_CRITICS", () => {
  it("declares the full 18-critic roster from the schema", () => {
    expect(UXPASS_CRITICS).toHaveLength(18);
    expect(validateCriticRoster()).toBe(true);
    expect(criticIds()).toEqual([...HAT_IDS]);
  });

  it("keeps deterministic critics aligned with CORE_CHECKS", () => {
    const deterministicCritics = new Set(
      UXPASS_CRITICS.filter((critic) => critic.mode === "deterministic").map((critic) => critic.id),
    );
    const deterministicChecks = new Set(CORE_CHECKS.map((check) => check.hat));
    expect(deterministicCritics).toEqual(deterministicChecks);
  });
});

describe("evaluateAllChecks - happy path", () => {
  it("passes every deterministic check on a well-formed page", () => {
    const evaluations = evaluateAllChecks(baseCtx());
    const failing = evaluations.filter((e) => e.verdict === "fail");
    expect(failing).toEqual([]);
    expect(evaluations).toHaveLength(CORE_CHECKS.length);
  });

  it("attaches non-empty remediation to every check", () => {
    const evaluations = evaluateAllChecks(baseCtx());
    for (const e of evaluations) {
      expect(typeof e.remediation).toBe("string");
      expect((e.remediation ?? "").length).toBeGreaterThan(0);
    }
  });

  it("yields a perfect UX Score for an all-pass run", () => {
    const evaluations = evaluateAllChecks(baseCtx());
    expect(computeUxScore(evaluations)).toBe(100);
  });
});

describe("evaluateAllChecks - failure paths", () => {
  it("flags a missing lang attribute", () => {
    const evaluations = evaluateAllChecks(baseCtx({ bodyText: badHtml, bodySize: badHtml.length }));
    const a11y001 = evaluations.find((e) => e.check_id === "A11Y-001");
    expect(a11y001?.verdict).toBe("fail");
  });

  it("flags missing alt attributes on <img>", () => {
    const evaluations = evaluateAllChecks(baseCtx({ bodyText: badHtml, bodySize: badHtml.length }));
    const a11y003 = evaluations.find((e) => e.check_id === "A11Y-003");
    expect(a11y003?.verdict).toBe("fail");
    expect(a11y003?.evidence).toMatchObject({ img_count: 1, missing_alt: 1 });
  });

  it("flags a missing title", () => {
    const evaluations = evaluateAllChecks(baseCtx({ bodyText: badHtml, bodySize: badHtml.length }));
    const fe002 = evaluations.find((e) => e.check_id === "FE-002");
    expect(fe002?.verdict).toBe("fail");
  });

  it("flags HTTP status non-200", () => {
    const evaluations = evaluateAllChecks(baseCtx({ status: 500 }));
    const fe001 = evaluations.find((e) => e.check_id === "FE-001");
    expect(fe001?.verdict).toBe("fail");
    expect(fe001?.evidence).toMatchObject({ status: 500 });
  });

  it("flags slow responses", () => {
    const evaluations = evaluateAllChecks(baseCtx({ responseTimeMs: 5000 }));
    const perf001 = evaluations.find((e) => e.check_id === "PERF-001");
    expect(perf001?.verdict).toBe("fail");
  });

  it("flags missing HSTS header", () => {
    const evaluations = evaluateAllChecks(baseCtx({ headers: {} }));
    const pt002 = evaluations.find((e) => e.check_id === "PT-002");
    expect(pt002?.verdict).toBe("fail");
  });

  it("flags non-HTTPS URLs", () => {
    const evaluations = evaluateAllChecks(baseCtx({ url: "http://example.com" }));
    const pt001 = evaluations.find((e) => e.check_id === "PT-001");
    expect(pt001?.verdict).toBe("fail");
  });

  it("flags missing /llms.txt", () => {
    const evaluations = evaluateAllChecks(baseCtx({ llmsTxtStatus: 404 }));
    const ar001 = evaluations.find((e) => e.check_id === "AR-001");
    expect(ar001?.verdict).toBe("fail");
  });

  it("flags browser-evidence visual layout failures", () => {
    const evaluations = evaluateAllChecks(baseCtx({ visualAudit: badVisualAudit }));
    expect(evaluations.find((e) => e.check_id === "VD-002")?.verdict).toBe("fail");
    expect(evaluations.find((e) => e.check_id === "VD-003")?.verdict).toBe("fail");
    expect(evaluations.find((e) => e.check_id === "VD-004")?.verdict).toBe("fail");
    expect(evaluations.find((e) => e.check_id === "MOB-002")?.verdict).toBe("fail");
    expect(evaluations.find((e) => e.check_id === "A11Y-004")?.verdict).toBe("fail");
    expect(evaluations.find((e) => e.check_id === "CL-001")?.verdict).toBe("fail");
    expect(evaluations.find((e) => e.check_id === "CL-002")?.verdict).toBe("fail");
  });

  it("marks visual checks as N/A when no browser snapshot is attached", () => {
    const evaluations = evaluateAllChecks(baseCtx({ visualAudit: undefined }));
    expect(evaluations.find((e) => e.check_id === "VD-003")?.verdict).toBe("na");
    expect(evaluations.find((e) => e.check_id === "VD-003")?.evidence).toMatchObject({
      reason: "visual_snapshot_missing",
    });
  });
});

describe("computeUxScore", () => {
  it("returns 0 when every check fails", () => {
    const evaluations = evaluateAllChecks(
      baseCtx({
        bodyText: badHtml,
        bodySize: 600_000,
        headers: {},
        status: 500,
        responseTimeMs: 5000,
        url: "http://example.com",
        llmsTxtStatus: 404,
        visualAudit: badVisualAudit,
      }),
    );
    expect(computeUxScore(evaluations)).toBe(0);
  });

  it("weights critical fails heavier than low fails", () => {
    const baseEvals = evaluateAllChecks(baseCtx());
    const oneCriticalFail = baseEvals.map((e, i) =>
      i === 0 ? { ...e, severity: "critical" as const, verdict: "fail" as const } : e,
    );
    const oneLowFail = baseEvals.map((e, i) =>
      i === 0 ? { ...e, severity: "low" as const, verdict: "fail" as const } : e,
    );
    expect(computeUxScore(oneCriticalFail)).toBeLessThan(computeUxScore(oneLowFail));
  });

  it("ignores na verdicts", () => {
    const baseEvals = evaluateAllChecks(baseCtx());
    const someNa = baseEvals.map((e, i) =>
      i < 3 ? { ...e, verdict: "na" as const } : e,
    );
    expect(computeUxScore(someNa)).toBe(100);
  });
});

describe("buildBreakdown", () => {
  it("produces the five-component score shape from the brief", () => {
    const evaluations = evaluateAllChecks(baseCtx());
    const breakdown = buildBreakdown(evaluations);
    expect(breakdown.score_components).toEqual({
      agent_readability: 100,
      dark_pattern_cleanliness: 100,
      aesthetic_coherence: 100,
      motion_quality: null,
      first_run_quality: 100,
    });
  });

  it("groups pass/fail/na counts by hat", () => {
    const evaluations = evaluateAllChecks(baseCtx());
    const breakdown = buildBreakdown(evaluations);
    expect(breakdown.by_hat["accessibility"]).toEqual({ pass: 4, fail: 0, na: 0 });
    expect(breakdown.by_hat["agent-readability"]).toEqual({ pass: 3, fail: 0, na: 0 });
  });

  it("lists every check id that ran", () => {
    const evaluations = evaluateAllChecks(baseCtx());
    const breakdown = buildBreakdown(evaluations);
    expect(breakdown.checks_run).toHaveLength(CORE_CHECKS.length);
  });

  it("includes critic coverage for all 18 hats", () => {
    const evaluations = evaluateAllChecks(baseCtx());
    const breakdown = buildBreakdown(evaluations);
    expect(breakdown.critics).toHaveLength(18);
    expect(breakdown.critics?.map((critic) => critic.id)).toEqual([...HAT_IDS]);
    expect(breakdown.critics?.find((critic) => critic.id === "accessibility")).toMatchObject({
      status: "ran",
      mode: "deterministic",
      pass: 4,
      fail: 0,
      na: 0,
    });
    expect(breakdown.critics?.find((critic) => critic.id === "motion")).toMatchObject({
      status: "queued",
      mode: "llm",
      pass: 0,
      fail: 0,
      na: 0,
    });
  });
});

describe("failingFindings", () => {
  it("returns no findings when all checks pass", () => {
    const evaluations = evaluateAllChecks(baseCtx());
    expect(failingFindings(evaluations)).toEqual([]);
  });

  it("emits one finding per failing check, with severity and remediation", () => {
    const evaluations = evaluateAllChecks(baseCtx({ bodyText: badHtml, bodySize: badHtml.length }));
    const findings = failingFindings(evaluations);
    expect(findings.length).toBeGreaterThan(0);
    for (const f of findings) {
      expect(["critical", "high", "medium", "low"]).toContain(f.severity);
      expect(f.title).toMatch(/^[A-Z0-9-]+:/);
      expect(Array.isArray(f.remediation)).toBe(true);
      expect(f.evidence).toBeDefined();
    }
  });

  it("includes the check_id in the evidence payload", () => {
    const evaluations = evaluateAllChecks(baseCtx({ status: 500 }));
    const findings = failingFindings(evaluations);
    const fe001 = findings.find((f) => f.title.startsWith("FE-001:"));
    expect(fe001?.evidence).toMatchObject({ check_id: "FE-001", status: 500 });
  });
});
