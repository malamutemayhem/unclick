import { z } from "zod";

const SeveritySchema = z.enum(["critical", "high", "medium", "low"]);
const CheckTypeSchema = z.enum(["deterministic", "agent", "hybrid"]);
const VerdictValueSchema = z.enum(["check", "na", "fail", "other"]);
const EvidenceRequiredSchema = z.union([
  z.boolean(),
  z.array(z.string().min(1)),
]);

const VerifySchema = z.object({
  type: z.enum([
    "agent",
    "http",
    "shell",
    "regex",
    "jsonschema",
    "ast",
    "file-parse",
    "db-query",
    "pr-body",
  ]),
  instruction: z.string().optional(),
  timeout_ms: z.number().int().positive().optional(),
  cost_budget_usd: z.number().nonnegative().optional(),
  token_budget: z.number().int().positive().optional(),
}).passthrough();

const WaiverSchema = z.object({
  allowed: z.boolean(),
  reason_required: z.boolean().optional(),
  expires_at: z.string().optional(),
  signer: z.string().optional(),
}).passthrough();

const PackItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  spec_ref: z.string().optional(),
  severity: SeveritySchema,
  verdict_values: z.array(VerdictValueSchema).optional(),
  evidence_required: EvidenceRequiredSchema.optional(),
  check_type: CheckTypeSchema,
  description: z.string().optional(),
  instruction: z.string().optional(),
  expected: z.unknown().optional(),
  verify: VerifySchema.optional(),
  on_fail: z.string().optional(),
  on_fail_template: z.string().optional(),
  estimated_seconds: z.number().int().nonnegative().optional(),
  retry_on: z.array(z.string().min(1)).optional(),
  waiver: WaiverSchema.optional(),
  tags: z.array(z.string()).optional().default([]),
  profiles: z.array(z.enum(["smoke", "standard", "deep"])).optional().default(["smoke", "standard", "deep"]),
});

export const PackSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, "must be semver"),
  description: z.string().optional().default(""),
  extends: z.string().optional(),
  include: z.array(z.string()).optional(),
  exclude: z.array(z.string()).optional(),
  overrides: z.record(z.string(), PackItemSchema.omit({ id: true }).partial()).optional(),
  items: z.array(PackItemSchema).min(1),
});

export type PackItemInput = z.input<typeof PackItemSchema>;
export type PackInput = z.input<typeof PackSchema>;
