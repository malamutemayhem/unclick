// Safe argument coercion for connector tool calls.
// LLMs send tool arguments as unknown types - sometimes a number arrives
// as "42" instead of 42, booleans as "true", or optional fields as empty
// strings instead of undefined. Every connector currently does its own
// String(args.X) / Number(args.X) casting with no safety checks.
//
// This module provides safe, predictable coercion that handles the
// weird edge cases LLMs throw at us: NaN, Infinity, empty strings,
// "null"/"undefined" as literal strings, etc.
//
// Modeled on OpenClaw's normalization-core package but shaped for
// UnClick's connector arg pattern.

// ─── Strings ─────────────────────────────────────────────────────────────────

export function asString(value: unknown): string | undefined {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "" || trimmed === "null" || trimmed === "undefined") return undefined;
    return trimmed;
  }
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return undefined;
}

export function requireString(value: unknown, field: string): string {
  const result = asString(value);
  if (result === undefined) throw new Error(`Missing required field: ${field}`);
  return result;
}

export function asStringOrDefault(value: unknown, fallback: string): string {
  return asString(value) ?? fallback;
}

// ─── Numbers ─────────────────────────────────────────────────────────────────

export function asNumber(value: unknown): number | undefined {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined;
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") return undefined;
    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

export function asInteger(value: unknown): number | undefined {
  const num = asNumber(value);
  if (num === undefined) return undefined;
  return Number.isSafeInteger(num) ? num : Math.round(num);
}

export function asPositiveInteger(value: unknown): number | undefined {
  const num = asInteger(value);
  if (num === undefined || num < 1) return undefined;
  return num;
}

export function asNumberOrDefault(value: unknown, fallback: number): number {
  return asNumber(value) ?? fallback;
}

export function asIntegerOrDefault(value: unknown, fallback: number): number {
  return asInteger(value) ?? fallback;
}

export function clampNumber(value: unknown, min: number, max: number, fallback: number): number {
  const num = asNumber(value);
  if (num === undefined) return fallback;
  return Math.max(min, Math.min(max, num));
}

// ─── Booleans ────────────────────────────────────────────────────────────────

const TRUTHY = new Set(["true", "yes", "on", "1"]);
const FALSY = new Set(["false", "no", "off", "0"]);

export function asBoolean(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    const lower = value.trim().toLowerCase();
    if (TRUTHY.has(lower)) return true;
    if (FALSY.has(lower)) return false;
  }
  return undefined;
}

export function asBooleanOrDefault(value: unknown, fallback: boolean): boolean {
  return asBoolean(value) ?? fallback;
}

// ─── Arrays ──────────────────────────────────────────────────────────────────

export function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(asString).filter((v): v is string => v !== undefined);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }
  return [];
}

// ─── Records ─────────────────────────────────────────────────────────────────

export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function asRecord(value: unknown): Record<string, unknown> {
  return isRecord(value) ? value : {};
}

// ─── Enum / pick-list ────────────────────────────────────────────────────────

export function asEnum<T extends string>(value: unknown, allowed: readonly T[]): T | undefined {
  const str = asString(value);
  if (str === undefined) return undefined;
  const lower = str.toLowerCase();
  return allowed.find((a) => a.toLowerCase() === lower);
}

export function asEnumOrDefault<T extends string>(
  value: unknown,
  allowed: readonly T[],
  fallback: T,
): T {
  return asEnum(value, allowed) ?? fallback;
}

// ─── Pagination helpers (very common pattern across connectors) ──────────────

export interface PaginationArgs {
  limit: number;
  offset?: number;
  cursor?: string;
}

export function asPagination(
  args: Record<string, unknown>,
  defaults: { limit?: number; maxLimit?: number } = {},
): PaginationArgs {
  const maxLimit = defaults.maxLimit ?? 100;
  const defaultLimit = defaults.limit ?? 20;
  return {
    limit: clampNumber(args.limit, 1, maxLimit, defaultLimit),
    offset: asPositiveInteger(args.offset),
    cursor: asString(args.cursor ?? args.starting_after ?? args.page_token),
  };
}
