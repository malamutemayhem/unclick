import { z } from "zod";

export const CompliancePassCategoryIdSchema = z.enum([
  "code_maintainability",
  "secure_development",
  "evidence_over_claims",
  "documentation_quality",
  "credential_environment_hygiene",
  "investor_readiness",
  "ai_governance_readiness",
]);

export const CompliancePassStatusSchema = z.enum([
  "pass",
  "partial",
  "fail",
  "unknown",
  "na",
]);

export const CompliancePassSeveritySchema = z.enum([
  "critical",
  "high",
  "medium",
  "low",
  "info",
]);

export const CompliancePassBandSchema = z.enum([
  "green",
  "amber",
  "red",
  "unknown",
]);

export const CompliancePassEvidenceSchema = z.object({
  type: z.enum(["file", "doc", "workflow", "package", "public_receipt", "derived", "missing"]),
  path: z.string().min(1).optional(),
  label: z.string().min(1),
  summary: z.string().min(1),
  confidence: z.enum(["high", "medium", "low"]).default("high"),
  line: z.number().int().positive().optional(),
});

export const CompliancePassFindingSchema = z.object({
  id: z.string().min(1),
  severity: CompliancePassSeveritySchema,
  title: z.string().min(1),
  summary: z.string().min(1),
  recommendation: z.string().min(1),
  evidence: z.array(CompliancePassEvidenceSchema).default([]),
});

export const CompliancePassGapSeverityCountsSchema = z.object({
  critical: z.number().int().nonnegative(),
  high: z.number().int().nonnegative(),
  medium: z.number().int().nonnegative(),
  low: z.number().int().nonnegative(),
  info: z.number().int().nonnegative(),
});

export const CompliancePassCheckSchema = z.object({
  id: z.string().min(1),
  category_id: CompliancePassCategoryIdSchema,
  title: z.string().min(1),
  status: CompliancePassStatusSchema,
  score: z.number().min(0).max(100),
  summary: z.string().min(1),
  evidence: z.array(CompliancePassEvidenceSchema).default([]),
  findings: z.array(CompliancePassFindingSchema).default([]),
  recommendation: z.string().min(1).optional(),
});

export const CompliancePassCategorySchema = z.object({
  id: CompliancePassCategoryIdSchema,
  name: z.string().min(1),
  status: CompliancePassStatusSchema,
  score: z.number().min(0).max(100),
  band: CompliancePassBandSchema,
  summary: z.string().min(1),
  checks: z.array(CompliancePassCheckSchema).min(1),
});

export const CompliancePassReportSchema = z.object({
  schema_version: z.literal("1.0"),
  generated_at: z.string().datetime(),
  valid_until: z.string().datetime(),
  source: z.string().min(1),
  product: z.literal("CompliancePass"),
  legacy_aliases: z.array(z.literal("EnterprisePass")).default(["EnterprisePass"]),
  headline: z.string().min(1),
  target: z.object({
    name: z.string().min(1),
    surface: z.string().min(1),
    repo_path: z.string().min(1).optional(),
  }),
  status: z.literal("complete"),
  readiness_band: CompliancePassBandSchema,
  wording_notice: z.string().min(1),
  readiness_score: z.object({
    value: z.number().min(0).max(100),
    band: CompliancePassBandSchema,
    traffic_light: z.enum(["green", "yellow", "red", "grey"]),
    rationale: z.string().min(1),
  }),
  summary: z.object({
    score_overall: z.number().min(0).max(100),
    headline: z.string().min(1),
    checks_total: z.number().int().nonnegative(),
    checks_pass: z.number().int().nonnegative(),
    checks_partial: z.number().int().nonnegative(),
    checks_fail: z.number().int().nonnegative(),
    checks_unknown: z.number().int().nonnegative(),
    checks_na: z.number().int().nonnegative(),
    checks_pending: z.literal(0),
    gap_severity_counts: CompliancePassGapSeverityCountsSchema,
    blocking_gap_count: z.number().int().nonnegative(),
  }),
  report_integrity: z.object({
    categories_total: z.number().int().positive(),
    checks_total_matches_categories: z.literal(true),
    gap_count_matches_findings: z.literal(true),
    green_requires_no_high_or_critical_gaps: z.literal(true),
    max_public_age_hours: z.number().int().positive(),
  }),
  report_sections: z.array(z.string().min(1)).min(1),
  categories: z.array(CompliancePassCategorySchema).min(1),
  next_actions: z.array(z.string().min(1)).default([]),
  gaps: z.array(CompliancePassFindingSchema).default([]),
  future_regret_notes: z.array(z.string().min(1)).default([]),
  evidence: z.array(CompliancePassEvidenceSchema).default([]),
  exclusions: z.array(z.string().min(1)).default([]),
  disclaimer: z.string().min(1),
});

export const CompliancePassReceiptSchema = z.object({
  kind: z.literal("compliancepass_receipt_v1"),
  status: z.enum(["PASS", "WARN", "BLOCKER"]),
  run_id: z.string().min(1),
  target_name: z.string().min(1),
  target_sha: z.string().min(1).optional(),
  generated_at: z.string().datetime(),
  valid_until: z.string().datetime(),
  readiness_score: z.object({
    value: z.number().min(0).max(100),
    band: CompliancePassBandSchema,
    traffic_light: z.enum(["green", "yellow", "red", "grey"]),
    rationale: z.string().min(1),
  }),
  checked: z.object({
    total: z.number().int().nonnegative(),
    pass: z.number().int().nonnegative(),
    partial: z.number().int().nonnegative(),
    fail: z.number().int().nonnegative(),
    unknown: z.number().int().nonnegative(),
    na: z.number().int().nonnegative(),
    pending: z.literal(0),
  }),
  gap_severity_counts: CompliancePassGapSeverityCountsSchema,
  blocking_gap_count: z.number().int().nonnegative(),
  evidence_sources: z.array(CompliancePassEvidenceSchema).default([]),
  action_needed: z.array(z.string().min(1)).default([]),
  boundaries: z.array(z.string().min(1)).min(1),
});

export type CompliancePassCategoryId = z.infer<typeof CompliancePassCategoryIdSchema>;
export type CompliancePassStatus = z.infer<typeof CompliancePassStatusSchema>;
export type CompliancePassSeverity = z.infer<typeof CompliancePassSeveritySchema>;
export type CompliancePassBand = z.infer<typeof CompliancePassBandSchema>;
export type CompliancePassEvidence = z.infer<typeof CompliancePassEvidenceSchema>;
export type CompliancePassFinding = z.infer<typeof CompliancePassFindingSchema>;
export type CompliancePassGapSeverityCounts = z.infer<typeof CompliancePassGapSeverityCountsSchema>;
export type CompliancePassCheck = z.infer<typeof CompliancePassCheckSchema>;
export type CompliancePassCategory = z.infer<typeof CompliancePassCategorySchema>;
export type CompliancePassReport = z.infer<typeof CompliancePassReportSchema>;
export type CompliancePassReceipt = z.infer<typeof CompliancePassReceiptSchema>;
