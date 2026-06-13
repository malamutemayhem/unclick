import { stampMeta } from "./connector-meta.js";

export async function epochConvert(args: Record<string, unknown>) {
  const ts = args.timestamp;
  if (ts === undefined || ts === null || ts === "") return { error: "timestamp is required (Unix epoch seconds or milliseconds)" };
  const num = Number(ts);
  if (isNaN(num)) return { error: "timestamp must be a number" };
  const isMs = num > 1e12;
  const ms = isMs ? num : num * 1000;
  const d = new Date(ms);
  if (isNaN(d.getTime())) return { error: "Invalid timestamp" };
  return stampMeta({
    unix_seconds: Math.floor(ms / 1000),
    unix_milliseconds: ms,
    iso8601: d.toISOString(),
    utc_string: d.toUTCString(),
    detected_format: isMs ? "milliseconds" : "seconds",
  }, {
    source: "local epoch converter",
    fetched_at: new Date().toISOString(),
    next_steps: ["use iso8601 for standard date format", "unix_seconds is the standard epoch time"],
  });
}

export async function epochNow(_args: Record<string, unknown>) {
  const now = Date.now();
  const d = new Date(now);
  return stampMeta({
    unix_seconds: Math.floor(now / 1000),
    unix_milliseconds: now,
    iso8601: d.toISOString(),
    utc_string: d.toUTCString(),
  }, {
    source: "local Date.now()",
    fetched_at: d.toISOString(),
    next_steps: ["use as reference timestamp", "compare with other epoch values"],
  });
}
