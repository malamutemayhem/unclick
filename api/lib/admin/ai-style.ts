// ---------------------------------------------------------------------------
// AI style preferences
//
// The operator's standing tone rules (length, complexity, format, emoji, and
// free-text instructions) live in mc_business_context as a single
// high-priority `preference`/`ai_style` row. get_startup_context surfaces
// business_context as standing rules that agents must follow, so writing the
// rules here reinforces them at every session entrance (load_memory) for every
// connected agent, with no MCP-package change required. The stored value also
// carries a compact `directive` string, kept as the first key so strict and
// compact clients still see the rules after JSON truncation, that states the
// rules imperatively for the agent to obey.
//
// Extracted from api/memory-admin.ts into api/lib/admin/* as part of splitting
// that endpoint. Behavior-preserving.
// ---------------------------------------------------------------------------

import type { SupabaseClient } from "@supabase/supabase-js";
import { isRecord } from "./request.js";

export const AI_STYLE_CATEGORY = "preference";
export const AI_STYLE_KEY = "ai_style";
export const AI_STYLE_PRIORITY = 99;

export const AI_STYLE_RESPONSE_LENGTHS = ["brief", "medium", "detailed"] as const;
export const AI_STYLE_COMPLEXITIES = ["simple", "standard", "technical"] as const;
export const AI_STYLE_ANALOGIES = ["off", "on"] as const;
export const AI_STYLE_FORMATS = ["prose", "bullets", "visual"] as const;
export const AI_STYLE_EMOJI_LEVELS = ["none", "light", "expressive"] as const;

export type AiStyleResponseLength = (typeof AI_STYLE_RESPONSE_LENGTHS)[number];
export type AiStyleComplexity = (typeof AI_STYLE_COMPLEXITIES)[number];
export type AiStyleAnalogies = (typeof AI_STYLE_ANALOGIES)[number];
export type AiStyleFormat = (typeof AI_STYLE_FORMATS)[number];
export type AiStyleEmojiLevel = (typeof AI_STYLE_EMOJI_LEVELS)[number];

export interface AiStylePreferencesValue {
  directive: string;
  response_length: AiStyleResponseLength;
  complexity: AiStyleComplexity;
  analogies: AiStyleAnalogies;
  format: AiStyleFormat;
  emoji_level: AiStyleEmojiLevel;
  custom_instructions: string;
  updated_at: string;
  privacy: "style-only";
}

export const AI_STYLE_DEFAULTS = {
  response_length: "medium" as AiStyleResponseLength,
  complexity: "simple" as AiStyleComplexity,
  analogies: "on" as AiStyleAnalogies,
  format: "prose" as AiStyleFormat,
  emoji_level: "light" as AiStyleEmojiLevel,
};

const AI_STYLE_LENGTH_PHRASE: Record<AiStyleResponseLength, string> = {
  brief: "keep replies brief and to the point",
  medium: "use medium-length replies",
  detailed: "give detailed, thorough replies",
};
const AI_STYLE_COMPLEXITY_PHRASE: Record<AiStyleComplexity, string> = {
  simple: "use simple, plain English",
  standard: "use a standard level of detail",
  technical: "be precise and technical",
};
const AI_STYLE_FORMAT_PHRASE: Record<AiStyleFormat, string> = {
  prose: "write in flowing prose",
  bullets: "prefer bullet points and short sections",
  visual: "lead with visuals such as tables, steps, and examples",
};
const AI_STYLE_EMOJI_PHRASE: Record<AiStyleEmojiLevel, string> = {
  none: "use no emoji",
  light: "use light emoji",
  expressive: "use expressive emoji",
};

function pickAiStyleEnum<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === "string" && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : fallback;
}

export function buildAiStyleDirective(fields: {
  response_length: AiStyleResponseLength;
  complexity: AiStyleComplexity;
  analogies: AiStyleAnalogies;
  format: AiStyleFormat;
  emoji_level: AiStyleEmojiLevel;
  custom_instructions: string;
}): string {
  const analogyClause = fields.analogies === "on" ? ", and use analogies to explain" : "";
  const core =
    `Operator AI style, always honor unless overridden in-session: ` +
    `${AI_STYLE_LENGTH_PHRASE[fields.response_length]}; ` +
    `${AI_STYLE_COMPLEXITY_PHRASE[fields.complexity]}${analogyClause}; ` +
    `${AI_STYLE_FORMAT_PHRASE[fields.format]}; ` +
    `${AI_STYLE_EMOJI_PHRASE[fields.emoji_level]}.`;
  const extra = fields.custom_instructions.trim();
  const full = extra ? `${core} Also: ${extra}` : core;
  return full.length > 300 ? `${full.slice(0, 297)}...` : full;
}

export function normalizeAiStyleValue(value: unknown, updatedAt?: string | null): AiStylePreferencesValue {
  let parsed: unknown = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      parsed = {};
    }
  }
  const rec = isRecord(parsed) ? parsed : {};
  // Migration: the legacy "analogies" complexity value conflated reading level
  // with the analogies technique, which made "Simple English" ambiguous. Map it
  // to plain-English reading level + analogies on, so the two are now separate
  // and unambiguous controls.
  const legacyAnalogiesComplexity = rec.complexity === "analogies";
  const fields = {
    response_length: pickAiStyleEnum(rec.response_length, AI_STYLE_RESPONSE_LENGTHS, AI_STYLE_DEFAULTS.response_length),
    complexity: legacyAnalogiesComplexity
      ? ("simple" as AiStyleComplexity)
      : pickAiStyleEnum(rec.complexity, AI_STYLE_COMPLEXITIES, AI_STYLE_DEFAULTS.complexity),
    analogies: rec.analogies === undefined && legacyAnalogiesComplexity
      ? ("on" as AiStyleAnalogies)
      : pickAiStyleEnum(rec.analogies, AI_STYLE_ANALOGIES, AI_STYLE_DEFAULTS.analogies),
    format: pickAiStyleEnum(rec.format, AI_STYLE_FORMATS, AI_STYLE_DEFAULTS.format),
    emoji_level: pickAiStyleEnum(rec.emoji_level, AI_STYLE_EMOJI_LEVELS, AI_STYLE_DEFAULTS.emoji_level),
    custom_instructions: typeof rec.custom_instructions === "string"
      ? rec.custom_instructions.replace(/\s+/g, " ").trim().slice(0, 600)
      : "",
  };
  return {
    directive: buildAiStyleDirective(fields),
    ...fields,
    updated_at: typeof rec.updated_at === "string" ? rec.updated_at : updatedAt ?? new Date().toISOString(),
    privacy: "style-only",
  };
}

export async function readAiStylePreferences(
  supabase: SupabaseClient,
  apiKeyHash: string,
): Promise<AiStylePreferencesValue | null> {
  const { data, error } = await supabase
    .from("mc_business_context")
    .select("value, updated_at")
    .eq("api_key_hash", apiKeyHash)
    .eq("category", AI_STYLE_CATEGORY)
    .eq("key", AI_STYLE_KEY)
    .maybeSingle();
  if (error) throw error;
  return data ? normalizeAiStyleValue(data.value, data.updated_at as string | null) : null;
}
