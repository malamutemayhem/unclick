// Operator timezone context for the memory-admin endpoint.
//
// Extracted verbatim from api/memory-admin.ts as part of splitting that
// endpoint into api/lib/admin/* domain modules. The operator's timezone lives
// in mc_business_context as a single preference/operator_timezone row.

import type { SupabaseClient } from "@supabase/supabase-js";
import { isRecord } from "./request.js";

export type OperatorTimeSource = "browser" | "manual";

export interface OperatorTimeContextValue {
  timezone: string;
  source: OperatorTimeSource;
  detected_at?: string | null;
  manual_override_at?: string | null;
  updated_at: string;
  privacy: "timezone-only";
}

export const OPERATOR_TIME_CATEGORY = "preference";
export const OPERATOR_TIME_KEY = "operator_timezone";

export function isValidTimeZoneName(timezone: string): boolean {
  if (!timezone || timezone.length > 80) return false;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: timezone }).format(new Date());
    return true;
  } catch {
    return false;
  }
}

export function parseOperatorTimeValue(value: unknown, updatedAt?: string | null): OperatorTimeContextValue | null {
  let parsed: unknown = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      return null;
    }
  }
  if (!isRecord(parsed)) return null;
  const timezone = typeof parsed.timezone === "string" ? parsed.timezone.trim() : "";
  if (!isValidTimeZoneName(timezone)) return null;
  const source = parsed.source === "manual" || parsed.source === "browser" ? parsed.source : "browser";
  return {
    timezone,
    source,
    detected_at: typeof parsed.detected_at === "string" ? parsed.detected_at : null,
    manual_override_at: typeof parsed.manual_override_at === "string" ? parsed.manual_override_at : null,
    updated_at: typeof parsed.updated_at === "string" ? parsed.updated_at : updatedAt ?? new Date().toISOString(),
    privacy: "timezone-only",
  };
}

export async function readOperatorTimeContext(
  supabase: SupabaseClient,
  apiKeyHash: string,
): Promise<OperatorTimeContextValue | null> {
  const { data, error } = await supabase
    .from("mc_business_context")
    .select("value, updated_at")
    .eq("api_key_hash", apiKeyHash)
    .eq("category", OPERATOR_TIME_CATEGORY)
    .eq("key", OPERATOR_TIME_KEY)
    .maybeSingle();
  if (error) throw error;
  return data ? parseOperatorTimeValue(data.value, data.updated_at as string | null) : null;
}
