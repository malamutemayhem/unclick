import { z } from "zod";
import {
  JurisdictionListSchema,
  SeveritySchema,
} from "./pack-schema.js";

const HttpUrlSchema = z.string().url().refine((value) => {
  const url = new URL(value);
  return url.protocol === "http:" || url.protocol === "https:";
}, "must be an http(s) URL");

function addDuplicateObjectKeyIssues<T extends Record<string, unknown>>(
  values: T[],
  key: keyof T,
  ctx: z.RefinementCtx,
  message: string,
): void {
  const seen = new Set<string>();
  values.forEach((value, index) => {
    const raw = value[key];
    if (typeof raw !== "string") return;
    if (seen.has(raw)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message,
        path: [index, String(key)],
      });
      return;
    }
    seen.add(raw);
  });
}

export const LegalPassPhaseOneHatIdSchema = z.enum([
  "privacy-policy",
  "tos-unfair-terms",
  "oss-licence",
]);

export const LegalPassDocumentKindSchema = z.enum([
  "privacy-policy",
  "terms-of-service",
  "oss-manifest",
  "licence-file",
  "repository",
  "website",
  "composite",
]);

export const LegalPassEvidenceKindSchema = z.enum([
  "public-page",
  "policy-text",
  "clause",
  "package-manifest",
  "licence-file",
  "fixture",
  "primary-source",
  "shared-scanner-signal",
  "manual-note",
]);

export const LegalPassHatVerdictSchema = z.enum([
  "pass",
  "warn",
  "fail",
  "unknown",
]);

export const LegalPassReportVerdictSchema = z.enum([
  "ready",
  "needs-review",
  "blocked",
  "unknown",
]);

export const LegalPassModeSchema = z.enum([
  "plan-only",
  "fixture",
  "live-readonly",
]);

export const LegalPassTargetSchema = z.object({
  name: z.string().min(1),
  url: HttpUrlSchema.optional(),
});

export const LegalPassEvidenceSchema = z.object({
  kind: LegalPassEvidenceKindSchema,
  label: z.string().min(1),
  source_url: HttpUrlSchema.optional(),
  summary: z.string().min(1),
});

export const LegalPassDocumentSchema = z.object({
  id: z.string().min(1),
  kind: LegalPassDocumentKindSchema,
  title: z.string().min(1),
  source_url: HttpUrlSchema.optional(),
  content_ref: z.string().min(1).optional(),
  public_only: z.boolean().default(true),
});

export const LegalPassFixtureDocumentSchema = LegalPassDocumentSchema.extend({
  text: z.string().min(1),
});

export const LegalPassFindingSchema = z.object({
  id: z.string().min(1),
  hat_id: LegalPassPhaseOneHatIdSchema,
  severity: SeveritySchema,
  title: z.string().min(1),
  summary: z.string().min(1),
  evidence: z.array(LegalPassEvidenceSchema).min(1),
  issue_spotting_note: z.string().min(1).optional(),
  practitioner_review_flag: z.boolean().default(false),
});

export const LegalPassHatCheckSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  severity: SeveritySchema,
  evidence_kinds: z.array(LegalPassEvidenceKindSchema).min(1),
  fixture_terms: z.array(z.string().min(1)).default([]),
  issue_spotting_note: z.string().min(1),
});

export const LegalPassHatDefinitionSchema = z.object({
  id: LegalPassPhaseOneHatIdSchema,
  label: z.string().min(1),
  summary: z.string().min(1),
  target_documents: z.array(LegalPassDocumentKindSchema).min(1),
  jurisdictions: JurisdictionListSchema,
  checks: z
    .array(LegalPassHatCheckSchema)
    .min(1)
    .superRefine((values, ctx) => {
      addDuplicateObjectKeyIssues(values, "id", ctx, "hat check ids must be unique");
    }),
});

export const LegalPassHatResultSchema = z.object({
  hat_id: LegalPassPhaseOneHatIdSchema,
  label: z.string().min(1),
  score: z.number().min(0).max(100),
  verdict: LegalPassHatVerdictSchema,
  findings: z
    .array(LegalPassFindingSchema)
    .default([])
    .superRefine((values, ctx) => {
      addDuplicateObjectKeyIssues(values, "id", ctx, "finding ids must be unique");
    }),
  comments: z.array(z.string().min(1)).default([]),
});

export const LegalPassScannerSourceSchema = z.object({
  kind: z.enum(["geopass-plan", "fixture", "manual"]),
  mode: LegalPassModeSchema.default("plan-only"),
  target_url: HttpUrlSchema.optional(),
  shared_check_ids: z.array(z.string().min(1)).default([]),
});

export const LegalPassReportSchema = z.object({
  target: LegalPassTargetSchema,
  generated_at: z.string().datetime(),
  mode: LegalPassModeSchema.default("plan-only"),
  jurisdictions: JurisdictionListSchema,
  overall_score: z.number().min(0).max(100),
  verdict: LegalPassReportVerdictSchema,
  hats: z
    .array(LegalPassHatResultSchema)
    .min(1)
    .superRefine((values, ctx) => {
      addDuplicateObjectKeyIssues(values, "hat_id", ctx, "report hat ids must be unique");
    }),
  scanner_source: LegalPassScannerSourceSchema,
  disclaimers: z.array(z.string().min(1)).min(1),
  notes: z.array(z.string().min(1)).default([]),
});

export const LegalPassGeoPassAdapterSchema = z.object({
  source: z.literal("geopass"),
  target_url: HttpUrlSchema,
  mode: LegalPassModeSchema.optional(),
  shared_check_ids: z.array(z.string().min(1)).default([]),
});

export type LegalPassPhaseOneHatId = z.infer<typeof LegalPassPhaseOneHatIdSchema>;
export type LegalPassDocumentKind = z.infer<typeof LegalPassDocumentKindSchema>;
export type LegalPassEvidenceKind = z.infer<typeof LegalPassEvidenceKindSchema>;
export type LegalPassHatVerdict = z.infer<typeof LegalPassHatVerdictSchema>;
export type LegalPassReportVerdict = z.infer<typeof LegalPassReportVerdictSchema>;
export type LegalPassMode = z.infer<typeof LegalPassModeSchema>;
export type LegalPassTarget = z.infer<typeof LegalPassTargetSchema>;
export type LegalPassEvidence = z.infer<typeof LegalPassEvidenceSchema>;
export type LegalPassDocument = z.infer<typeof LegalPassDocumentSchema>;
export type LegalPassFixtureDocument = z.infer<typeof LegalPassFixtureDocumentSchema>;
export type LegalPassFixtureDocumentInput = z.input<typeof LegalPassFixtureDocumentSchema>;
export type LegalPassFinding = z.infer<typeof LegalPassFindingSchema>;
export type LegalPassHatCheck = z.infer<typeof LegalPassHatCheckSchema>;
export type LegalPassHatDefinition = z.infer<typeof LegalPassHatDefinitionSchema>;
export type LegalPassHatResult = z.infer<typeof LegalPassHatResultSchema>;
export type LegalPassScannerSource = z.infer<typeof LegalPassScannerSourceSchema>;
export type LegalPassReport = z.infer<typeof LegalPassReportSchema>;
export type LegalPassGeoPassAdapter = z.infer<typeof LegalPassGeoPassAdapterSchema>;
