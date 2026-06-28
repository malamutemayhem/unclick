// Generic request/value helpers for the memory-admin endpoint.
//
// Extracted verbatim from api/memory-admin.ts as part of splitting that
// endpoint into api/lib/admin/* domain modules. Pure utilities with no
// Supabase or request-object dependency, shared across the admin handlers.

export function normalizeFishbowlText(input: string): string {
  return input.replace(/[–—]/g, "-");
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function getClampedLimit(value: unknown, fallback = 50, max = 200): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.min(Math.floor(parsed), max);
}

export function firstRequestValue(value: unknown): unknown {
  return Array.isArray(value) ? value[0] : value;
}

export function parseBooleanRequestValue(value: unknown, fallback: boolean): boolean {
  const first = firstRequestValue(value);
  if (typeof first === "boolean") return first;
  if (typeof first === "number") return first !== 0;
  if (typeof first !== "string") return fallback;
  const normalized = first.trim().toLowerCase();
  if (["1", "true", "yes", "y", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "n", "off"].includes(normalized)) return false;
  return fallback;
}
