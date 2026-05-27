import { z } from "zod";

const HttpUrlSchema = z.string().url().refine((value) => {
  const url = new URL(value);
  return url.protocol === "http:" || url.protocol === "https:";
}, "must be an http(s) URL");

function addDuplicateStringIssues(
  values: string[],
  ctx: z.RefinementCtx,
  message: string,
): void {
  const seen = new Map<string, number>();
  values.forEach((value, index) => {
    if (seen.has(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message,
        path: [index],
      });
      return;
    }
    seen.set(value, index);
  });
}

function addDuplicateObjectKeyIssues<T extends Record<string, unknown>>(
  values: T[],
  key: keyof T,
  ctx: z.RefinementCtx,
  message: string,
): void {
  const seen = new Map<string, number>();
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
    seen.set(raw, index);
  });
}

// Full LegalPass pack schema supports the twelve-hat product panel. The
// current deterministic runner executes the phase-one hats. Citation Verifier
// remains a hard-veto: every claim from the other hats must trace to a primary
// source or it is dropped from the verdict.
export const HatIdSchema = z.enum([
  "privacy",
  "consumer_tos",
  "contracts",
  "oss_licence",
  "ai_ethics",
  "ip",
  "marketing_claims",
  "litigator",
  "plain_english",
  "compliance",
  "jurisdiction_router",
  "citation_verifier",
]);

export const JurisdictionCodeSchema = z.enum([
  "AU",
  "EU",
  "US-CA",
  "US-NY",
  "UK",
  "CA",
  "NZ",
  "SG",
]);

export const SeveritySchema = z.enum(["critical", "high", "medium", "low"]);
export const ProfileSchema = z.enum(["smoke", "standard", "deep"]);
export const TargetKindSchema = z.enum(["url", "contract_upload", "repo"]);
export const TargetKindListSchema = z
  .array(TargetKindSchema)
  .min(1, "pack must declare at least one target kind")
  .superRefine((values, ctx) => {
    addDuplicateStringIssues(values, ctx, "target kinds must be unique");
  });
export const JurisdictionListSchema = z
  .array(JurisdictionCodeSchema)
  .min(1, "pack must declare at least one jurisdiction")
  .superRefine((values, ctx) => {
    addDuplicateStringIssues(values, ctx, "jurisdictions must be unique");
  });
export const JurisdictionScopeListSchema = z
  .array(JurisdictionCodeSchema)
  .superRefine((values, ctx) => {
    addDuplicateStringIssues(values, ctx, "jurisdictions must be unique");
  });
export const ProfileListSchema = z
  .array(ProfileSchema)
  .superRefine((values, ctx) => {
    addDuplicateStringIssues(values, ctx, "profiles must be unique");
  });

export const TargetSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("url"),
    url: HttpUrlSchema,
  }),
  z.object({
    kind: z.literal("contract_upload"),
    upload_ref: z.string().min(1),
  }),
  z.object({
    kind: z.literal("repo"),
    repo: z.string().min(1),
    branch: z.string().optional(),
    commit: z.string().optional(),
  }),
]);

export const HatRosterEntrySchema = z.object({
  hat_id: HatIdSchema,
  enabled: z.boolean().default(true),
  weight: z.number().min(0).max(1).default(1),
  rubric_ref: z.string().optional(),
});

export const PackItemSchema = z.object({
  id: z.string().min(1),
  hat_id: HatIdSchema,
  title: z.string().min(1),
  category: z.string().min(1),
  severity: SeveritySchema,
  description: z.string().optional(),
  expected: z.unknown().optional(),
  on_fail: z.string().optional(),
  jurisdictions: JurisdictionScopeListSchema.optional().default([]),
  profiles: ProfileListSchema.optional().default(["smoke", "standard", "deep"]),
  tags: z.array(z.string()).optional().default([]),
});

export const PackSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, "must be semver"),
  description: z.string().optional().default(""),
  targets: TargetKindListSchema,
  jurisdictions: JurisdictionListSchema,
  hats: z
    .array(HatRosterEntrySchema)
    .min(1, "pack must include at least one hat in the roster")
    .superRefine((values, ctx) => {
      addDuplicateObjectKeyIssues(values, "hat_id", ctx, "hat ids must be unique");
    }),
  profile: ProfileSchema.default("standard"),
  items: z
    .array(PackItemSchema)
    .min(1)
    .superRefine((values, ctx) => {
      addDuplicateObjectKeyIssues(values, "id", ctx, "pack item ids must be unique");
    }),
});

export type PackInput = z.input<typeof PackSchema>;
export type PackItemInput = z.input<typeof PackItemSchema>;
