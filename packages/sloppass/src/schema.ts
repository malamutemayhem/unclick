import { z } from "zod";

export const SlopPassSeveritySchema = z.enum(["critical", "high", "medium", "low", "info"]);

export const SlopPassCategorySchema = z.enum([
  "grounding_api_reality",
  "logic_plausibility",
  "scaffold_without_substance",
  "test_proof_theatre",
  "slopocalypse_failure_mode",
  "maintenance_change_risk",
]);

export const SlopPassTargetSchema = z.object({
  kind: z.enum(["repo", "branch", "diff", "files", "pr", "artifact"]),
  label: z.string().min(1),
  files: z.array(z.string()).optional(),
  ref: z.string().optional(),
});

export const SlopPassFindingSchema = z.object({
  title: z.string().min(1),
  category: SlopPassCategorySchema,
  severity: SlopPassSeveritySchema,
  why_it_matters: z.string().min(1),
  evidence: z.string().min(1),
  suggested_fix: z.string().min(1),
  confidence_note: z.string().optional(),
  file: z.string().optional(),
  line: z.number().int().positive().optional(),
});

export const SlopPassRunInputSchema = z.object({
  target: SlopPassTargetSchema,
  files: z
    .array(
      z.object({
        path: z.string().min(1),
        content: z.string(),
      })
    )
    .min(1),
  checks: z.array(SlopPassCategorySchema).optional(),
  provider: z.enum(["openai", "anthropic", "google", "ollama", "http"]).default("http"),
});

export type SlopPassRunInput = z.input<typeof SlopPassRunInputSchema>;
export type SlopPassParsedRunInput = z.output<typeof SlopPassRunInputSchema>;
