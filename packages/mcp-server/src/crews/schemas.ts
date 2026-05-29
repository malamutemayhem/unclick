// Zod schemas for the Crews v1 inline-loop engine.
//
// The user's chat model (Claude Sonnet, GPT-5, etc.) does ALL cognition.
// Server-side code only validates that the model's structured output conforms
// to the schemas below. One retry on parse failure is allowed; the second
// failure marks the run as 'incomplete'.

import { z } from "zod";

export const HAT_CONFIDENCE = ["low", "medium", "high"] as const;
export type HatConfidence = (typeof HAT_CONFIDENCE)[number];

export const HatTurnV1 = z.object({
  hat_id: z.string().min(1, "hat_id required"),
  hat_name: z.string().min(1, "hat_name required"),
  key_points: z
    .array(z.string().min(1, "key_points entries must be non-empty"))
    .min(1, "key_points must contain at least one item"),
  confidence: z.enum(HAT_CONFIDENCE),
  risks: z.array(z.string().min(1, "risks entries must be non-empty")),
  dissent: z.string().nullable(),
});
export type HatTurnV1 = z.infer<typeof HatTurnV1>;

export const SynthesisV1 = z.object({
  verdict: z.string().min(1, "verdict required"),
  key_decision: z.string().min(1, "key_decision required"),
  strongest_agreement: z.string().min(1, "strongest_agreement required"),
  sharpest_disagreement: z.string().min(1, "sharpest_disagreement required"),
  risks: z.array(z.string().min(1, "risks entries must be non-empty")),
  unknowns: z.array(z.string().min(1, "unknowns entries must be non-empty")),
  recommendation: z.string().min(1, "recommendation required"),
  hats_consulted: z
    .array(z.string().min(1, "hats_consulted entries must be non-empty"))
    .min(1, "hats_consulted must include at least one hat name"),
});
export type SynthesisV1 = z.infer<typeof SynthesisV1>;

export type ParseOk<T> = { ok: true; value: T };
export type ParseErr = { ok: false; error: string };
export type ParseResult<T> = ParseOk<T> | ParseErr;

function formatZodError(err: z.ZodError): string {
  return err.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join(".") : "<root>";
      return `${path}: ${issue.message}`;
    })
    .join("; ");
}

export function parseHatTurn(input: unknown): ParseResult<HatTurnV1> {
  const r = HatTurnV1.safeParse(input);
  if (r.success) return { ok: true, value: r.data };
  return { ok: false, error: formatZodError(r.error) };
}

export function parseSynthesis(input: unknown): ParseResult<SynthesisV1> {
  const r = SynthesisV1.safeParse(input);
  if (r.success) return { ok: true, value: r.data };
  return { ok: false, error: formatZodError(r.error) };
}
