/**
 * Deterministic check catalogue for the uxpass-core profile.
 *
 * Each check inspects the captured CheckContext (one HTTP fetch of the
 * target URL plus an optional /llms.txt fetch) and returns a Verdict plus
 * evidence. Fetch-only checks operate on raw HTML, headers, and timings.
 * Browser-backed checks run only when a caller attaches a VisualAuditSnapshot,
 * so the default runner stays edge-friendly and bounded.
 *
 * Heavier capture (Playwright, viewport sweeps, axe-core) and LLM hats land
 * in later chunks. The check ids are namespaced by hat so future LLM-backed
 * hats can extend the same hat without renumbering.
 */

import type {
  CheckEvaluation,
  RunBreakdown,
  RuntimeFinding,
  UXScoreBreakdown,
  Verdict,
} from "./types.js";
import { buildCriticBreakdown, criticDefinitionsById } from "./critics.js";
import {
  evaluateVisualAuditSnapshot,
  visualIssuesByKind,
  type VisualAuditIssueKind,
  type VisualAuditSnapshot,
  type VisualAuditSummary,
} from "./visual-audit.js";

type CheckSeverity = "critical" | "high" | "medium" | "low";

export interface CheckContext {
  url: string;
  status: number;
  headers: Record<string, string>;
  responseTimeMs: number;
  bodyText: string;
  bodySize: number;
  llmsTxtStatus: number | null;
  visualAudit?: VisualAuditSnapshot;
}

export interface CheckResult {
  verdict: Verdict;
  evidence?: Record<string, unknown>;
}

export interface CheckSpec {
  id: string;
  hat: string;
  category: string;
  severity: CheckSeverity;
  title: string;
  remediation: string;
  evaluate: (ctx: CheckContext) => CheckResult;
}

const lower = (s: string): string => s.toLowerCase();

function hasTag(body: string, tagPattern: RegExp): boolean {
  return tagPattern.test(body);
}

function countMatches(body: string, pattern: RegExp): number {
  const m = body.match(pattern);
  return m ? m.length : 0;
}

function visualSummary(ctx: CheckContext): VisualAuditSummary | null {
  return ctx.visualAudit ? evaluateVisualAuditSnapshot(ctx.visualAudit) : null;
}

function visualCheck(
  ctx: CheckContext,
  kind: VisualAuditIssueKind,
): CheckResult {
  const summary = visualSummary(ctx);
  if (!summary) {
    return {
      verdict: "na",
      evidence: { reason: "visual_snapshot_missing" },
    };
  }
  const issues = visualIssuesByKind(summary, kind);
  return {
    verdict: issues.length === 0 ? "pass" : "fail",
    evidence: {
      issue_count: issues.length,
      examples: issues.slice(0, 5).map((issue) => ({
        title: issue.title,
        description: issue.description,
        selector: issue.selector,
        evidence: issue.evidence,
      })),
      screenshot_path: ctx.visualAudit?.screenshotPath ?? null,
      viewport: ctx.visualAudit?.viewport ?? null,
    },
  };
}

export const CORE_CHECKS: CheckSpec[] = [
  // ── frontend ─────────────────────────────────────────────────────────────
  {
    id: "FE-001",
    hat: "frontend",
    category: "html",
    severity: "high",
    title: "Page returns HTTP 200",
    remediation: "Fix the route or upstream so the URL responds with 200.",
    evaluate: (ctx) => ({
      verdict: ctx.status === 200 ? "pass" : "fail",
      evidence: { status: ctx.status },
    }),
  },
  {
    id: "FE-002",
    hat: "frontend",
    category: "html",
    severity: "high",
    title: "<title> is present and non-empty",
    remediation: "Add a descriptive <title> tag in the document head.",
    evaluate: (ctx) => {
      const m = ctx.bodyText.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const title = m?.[1]?.trim() ?? "";
      return {
        verdict: title.length > 0 ? "pass" : "fail",
        evidence: { title },
      };
    },
  },
  {
    id: "FE-003",
    hat: "frontend",
    category: "html",
    severity: "medium",
    title: "<meta charset> is declared",
    remediation: "Add <meta charset=\"utf-8\"> as the first child of <head>.",
    evaluate: (ctx) => ({
      verdict: hasTag(ctx.bodyText, /<meta[^>]+charset\s*=/i) ? "pass" : "fail",
    }),
  },
  {
    id: "FE-004",
    hat: "frontend",
    category: "html",
    severity: "medium",
    title: "<meta name=\"description\"> is present",
    remediation: "Add a description meta tag for SEO and link previews.",
    evaluate: (ctx) => ({
      verdict: hasTag(ctx.bodyText, /<meta[^>]+name\s*=\s*["']description["']/i) ? "pass" : "fail",
    }),
  },

  // ── accessibility ────────────────────────────────────────────────────────
  {
    id: "A11Y-001",
    hat: "accessibility",
    category: "a11y",
    severity: "high",
    title: "<html> declares lang attribute",
    remediation: "Add lang=\"en\" (or the appropriate ISO code) to the <html> tag.",
    evaluate: (ctx) => ({
      verdict: hasTag(ctx.bodyText, /<html[^>]+\blang\s*=/i) ? "pass" : "fail",
    }),
  },
  {
    id: "A11Y-002",
    hat: "accessibility",
    category: "a11y",
    severity: "high",
    title: "Page has at least one <h1>",
    remediation: "Add a single <h1> headline summarising the page.",
    evaluate: (ctx) => {
      const count = countMatches(ctx.bodyText, /<h1[\s>]/gi);
      return {
        verdict: count >= 1 ? "pass" : "fail",
        evidence: { h1_count: count },
      };
    },
  },
  {
    id: "A11Y-003",
    hat: "accessibility",
    category: "a11y",
    severity: "medium",
    title: "All <img> tags declare an alt attribute",
    remediation: "Add alt=\"...\" to every <img>; use empty alt=\"\" for decorative images.",
    evaluate: (ctx) => {
      const imgs = ctx.bodyText.match(/<img\b[^>]*>/gi) ?? [];
      const missing = imgs.filter((tag) => !/\balt\s*=/i.test(tag));
      return {
        verdict: imgs.length === 0 || missing.length === 0 ? "pass" : "fail",
        evidence: { img_count: imgs.length, missing_alt: missing.length },
      };
    },
  },
  {
    id: "A11Y-004",
    hat: "accessibility",
    category: "visual-a11y",
    severity: "high",
    title: "Visible text meets contrast target",
    remediation: "Increase foreground/background contrast for failing text states.",
    evaluate: (ctx) => visualCheck(ctx, "low_contrast"),
  },
  {
    id: "A11Y-005",
    hat: "accessibility",
    category: "visual-a11y",
    severity: "high",
    title: "Interactive actions have useful accessible names",
    remediation: "Give icon-only and compact actions a clear aria-label, title, or visible label.",
    evaluate: (ctx) => visualCheck(ctx, "unlabelled_action"),
  },

  // ── mobile ───────────────────────────────────────────────────────────────
  {
    id: "MOB-001",
    hat: "mobile",
    category: "mobile",
    severity: "high",
    title: "<meta name=\"viewport\"> is declared",
    remediation: "Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">.",
    evaluate: (ctx) => ({
      verdict: hasTag(ctx.bodyText, /<meta[^>]+name\s*=\s*["']viewport["']/i) ? "pass" : "fail",
    }),
  },
  {
    id: "MOB-002",
    hat: "mobile",
    category: "visual-mobile",
    severity: "high",
    title: "Interactive targets meet 24px minimum",
    remediation: "Increase the hit area for links, buttons, tabs, and icon controls to at least 24 by 24 CSS pixels.",
    evaluate: (ctx) => visualCheck(ctx, "small_target"),
  },

  // ── agent-readability ────────────────────────────────────────────────────
  {
    id: "AR-001",
    hat: "agent-readability",
    category: "agent",
    severity: "medium",
    title: "/llms.txt is reachable",
    remediation: "Publish an llms.txt file at the site root describing the product for LLM agents.",
    evaluate: (ctx) => ({
      verdict: ctx.llmsTxtStatus === 200 ? "pass" : "fail",
      evidence: { llms_txt_status: ctx.llmsTxtStatus },
    }),
  },
  {
    id: "AR-002",
    hat: "agent-readability",
    category: "agent",
    severity: "medium",
    title: "Page exposes JSON-LD structured data",
    remediation: "Add a <script type=\"application/ld+json\"> block describing the page (Schema.org).",
    evaluate: (ctx) => ({
      verdict: hasTag(ctx.bodyText, /<script[^>]+type\s*=\s*["']application\/ld\+json["']/i)
        ? "pass"
        : "fail",
    }),
  },
  {
    id: "AR-003",
    hat: "agent-readability",
    category: "agent",
    severity: "low",
    title: "Page uses semantic landmark elements",
    remediation: "Wrap content in <main>, <header>, <nav>, or <footer> instead of generic <div>s.",
    evaluate: (ctx) => {
      const landmarks = ["<main", "<header", "<nav", "<footer", "<article", "<section"];
      const present = landmarks.filter((l) => lower(ctx.bodyText).includes(l));
      return {
        verdict: present.length >= 2 ? "pass" : "fail",
        evidence: { landmarks_present: present },
      };
    },
  },

  // ── performance ──────────────────────────────────────────────────────────
  {
    id: "PERF-001",
    hat: "performance",
    category: "perf",
    severity: "high",
    title: "Page responds in under 2000 ms",
    remediation: "Optimise server response time; cache the HTML or move heavy work off the request path.",
    evaluate: (ctx) => ({
      verdict: ctx.responseTimeMs < 2000 ? "pass" : "fail",
      evidence: { response_time_ms: ctx.responseTimeMs },
    }),
  },
  {
    id: "PERF-002",
    hat: "performance",
    category: "perf",
    severity: "medium",
    title: "HTML payload is under 500 KB",
    remediation: "Trim inline content, lazy-load below-the-fold sections, or move data into separate fetches.",
    evaluate: (ctx) => ({
      verdict: ctx.bodySize < 500_000 ? "pass" : "fail",
      evidence: { body_size_bytes: ctx.bodySize },
    }),
  },

  // ── privacy-trust ────────────────────────────────────────────────────────
  {
    id: "PT-001",
    hat: "privacy-trust",
    category: "security",
    severity: "high",
    title: "Site is served over HTTPS",
    remediation: "Force HTTPS at the edge and redirect HTTP to HTTPS.",
    evaluate: (ctx) => ({
      verdict: ctx.url.startsWith("https://") ? "pass" : "fail",
    }),
  },
  {
    id: "PT-002",
    hat: "privacy-trust",
    category: "security",
    severity: "medium",
    title: "Strict-Transport-Security header is set",
    remediation: "Set Strict-Transport-Security with max-age >= 6 months and includeSubDomains.",
    evaluate: (ctx) => {
      const hsts = ctx.headers["strict-transport-security"];
      return {
        verdict: hsts ? "pass" : "fail",
        evidence: hsts ? { hsts } : undefined,
      };
    },
  },

  // ── visual-designer ──────────────────────────────────────────────────────
  {
    id: "VD-001",
    hat: "visual-designer",
    category: "visual",
    severity: "low",
    title: "Page declares a favicon",
    remediation: "Add <link rel=\"icon\" href=\"/favicon.ico\"> (or an SVG) in the document head.",
    evaluate: (ctx) => ({
      verdict: hasTag(ctx.bodyText, /<link[^>]+rel\s*=\s*["'][^"']*icon[^"']*["']/i)
        ? "pass"
        : "fail",
    }),
  },
  {
    id: "VD-002",
    hat: "visual-designer",
    category: "visual-layout",
    severity: "high",
    title: "Page has no horizontal overflow",
    remediation: "Constrain grids, tables, badges, and fixed-width panels so the page never scrolls sideways.",
    evaluate: (ctx) => visualCheck(ctx, "horizontal_overflow"),
  },
  {
    id: "VD-003",
    hat: "visual-designer",
    category: "visual-layout",
    severity: "high",
    title: "Visible text is not clipped",
    remediation: "Wrap text, widen the container, move secondary metadata into a detail surface, or provide a full fallback label.",
    evaluate: (ctx) => visualCheck(ctx, "clipped_text"),
  },
  {
    id: "VD-004",
    hat: "visual-designer",
    category: "visual-layout",
    severity: "high",
    title: "Text stays inside its visual container",
    remediation: "Fix layout constraints, grid tracks, min-width rules, or wrapping so text cannot run outside boxes.",
    evaluate: (ctx) => visualCheck(ctx, "text_out_of_bounds"),
  },
  {
    id: "VD-005",
    hat: "visual-designer",
    category: "visual-composition",
    severity: "medium",
    title: "First viewport has clear visual hierarchy",
    remediation: "Add a dominant heading, section hierarchy, or primary work area so the page has an obvious scan order.",
    evaluate: (ctx) => visualCheck(ctx, "weak_visual_hierarchy"),
  },
  {
    id: "VD-006",
    hat: "visual-designer",
    category: "visual-composition",
    severity: "medium",
    title: "Page avoids nested panel clutter",
    remediation: "Flatten cards-inside-cards into bands, sections, row expansion, or a detail panel.",
    evaluate: (ctx) => visualCheck(ctx, "nested_panel_clutter"),
  },
  {
    id: "VD-007",
    hat: "visual-designer",
    category: "visual-system",
    severity: "medium",
    title: "First viewport uses a deliberate type scale",
    remediation: "Define page, section, row, metadata, and control type roles so scan order is visible at a glance.",
    evaluate: (ctx) => visualCheck(ctx, "flat_type_scale"),
  },
  {
    id: "VD-008",
    hat: "visual-designer",
    category: "visual-system",
    severity: "medium",
    title: "Colour system stays disciplined",
    remediation: "Limit saturated colours to named semantic roles and keep structural surfaces neutral.",
    evaluate: (ctx) => visualCheck(ctx, "palette_indiscipline"),
  },
  {
    id: "CL-001",
    hat: "cognitive-load",
    category: "visual-density",
    severity: "medium",
    title: "Rows avoid badge overload",
    remediation: "Group secondary statuses, use a summary cell, or move lower-priority metadata behind row expansion.",
    evaluate: (ctx) => visualCheck(ctx, "badge_overload"),
  },
  {
    id: "CL-002",
    hat: "cognitive-load",
    category: "visual-density",
    severity: "medium",
    title: "First viewport stays scannable",
    remediation: "Reduce inline text fragments, add section hierarchy, or progressively disclose low-priority details.",
    evaluate: (ctx) => visualCheck(ctx, "dense_first_screen"),
  },
  {
    id: "CL-003",
    hat: "cognitive-load",
    category: "action-clarity",
    severity: "medium",
    title: "First viewport has a clear primary action when actions exist",
    remediation: "Give the primary action a useful label and stable comfortable dimensions, then demote secondary actions.",
    evaluate: (ctx) => visualCheck(ctx, "unclear_primary_action"),
  },
];

// Severity weights for the UX score. Higher severity dominates the score so
// a critical fail drags the headline more than a low fail.
export const SEVERITY_WEIGHT: Record<CheckSeverity, number> = {
  critical: 5,
  high: 3,
  medium: 2,
  low: 1,
};

export function evaluateAllChecks(ctx: CheckContext): CheckEvaluation[] {
  return CORE_CHECKS.map((spec) => {
    const start = Date.now();
    let result: CheckResult;
    try {
      result = spec.evaluate(ctx);
    } catch (err) {
      result = {
        verdict: "na",
        evidence: { error: (err as Error).message },
      };
    }
    return {
      check_id: spec.id,
      hat: spec.hat,
      category: spec.category,
      severity: spec.severity,
      title: spec.title,
      verdict: result.verdict,
      evidence: result.evidence,
      remediation: spec.remediation,
      time_ms: Date.now() - start,
    };
  });
}

export function computeUxScore(evaluations: CheckEvaluation[]): number {
  let totalWeight = 0;
  let earnedWeight = 0;
  for (const e of evaluations) {
    if (e.verdict === "na") continue;
    const w = SEVERITY_WEIGHT[e.severity] ?? 1;
    totalWeight += w;
    if (e.verdict === "pass") earnedWeight += w;
  }
  if (totalWeight === 0) return 0;
  return Math.round((earnedWeight / totalWeight) * 100 * 100) / 100;
}

/**
 * Map the per-hat results onto the five UX Score components from the brief.
 * Deterministic checks only cover agent-readability fully; the other four
 * components are recorded as null so the LLM hats can populate them later
 * without changing the breakdown shape.
 */
function computeScoreComponents(evaluations: CheckEvaluation[]): UXScoreBreakdown {
  const critics = criticDefinitionsById();
  const components: Record<keyof UXScoreBreakdown, CheckEvaluation[]> = {
    agent_readability: [],
    dark_pattern_cleanliness: [],
    aesthetic_coherence: [],
    motion_quality: [],
    first_run_quality: [],
  };
  for (const evaluation of evaluations) {
    if (evaluation.verdict === "na") continue;
    const component = critics[evaluation.hat]?.score_component;
    if (component) components[component].push(evaluation);
  }

  function scoreFor(componentEvaluations: CheckEvaluation[]): number | null {
    if (componentEvaluations.length === 0) return null;
    let total = 0;
    let earned = 0;
    for (const e of componentEvaluations) {
      const w = SEVERITY_WEIGHT[e.severity] ?? 1;
      total += w;
      if (e.verdict === "pass") earned += w;
    }
    return total > 0 ? Math.round((earned / total) * 100 * 100) / 100 : null;
  }

  return {
    agent_readability: scoreFor(components.agent_readability),
    dark_pattern_cleanliness: scoreFor(components.dark_pattern_cleanliness),
    aesthetic_coherence: scoreFor(components.aesthetic_coherence),
    motion_quality: scoreFor(components.motion_quality),
    first_run_quality: scoreFor(components.first_run_quality),
  };
}

export function buildBreakdown(evaluations: CheckEvaluation[]): RunBreakdown {
  const byHat: Record<string, { pass: number; fail: number; na: number }> = {};
  for (const e of evaluations) {
    if (!byHat[e.hat]) byHat[e.hat] = { pass: 0, fail: 0, na: 0 };
    byHat[e.hat][e.verdict]++;
  }
  return {
    version: "deterministic-mvp",
    score_components: computeScoreComponents(evaluations),
    by_hat: byHat,
    checks_run: evaluations.map((e) => e.check_id),
    critics: buildCriticBreakdown(evaluations),
  };
}

/**
 * Convert each failing evaluation into a uxpass_findings row payload.
 * Passes and na verdicts are not persisted; they are summarised via the
 * breakdown jsonb on the run row instead.
 */
export function failingFindings(evaluations: CheckEvaluation[]): RuntimeFinding[] {
  return evaluations
    .filter((e) => e.verdict === "fail")
    .map((e) => ({
      hat_id: e.hat,
      title: `${e.check_id}: ${e.title}`,
      description: describeEvidence(e.evidence),
      severity: e.severity,
      evidence: { check_id: e.check_id, ...(e.evidence ?? {}) },
      remediation: e.remediation ? [e.remediation] : [],
    }));
}

function describeEvidence(evidence: Record<string, unknown> | undefined): string {
  if (!evidence) return "";
  const entries = Object.entries(evidence);
  if (entries.length === 0) return "";
  return entries
    .map(([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : String(v)}`)
    .join("; ");
}
