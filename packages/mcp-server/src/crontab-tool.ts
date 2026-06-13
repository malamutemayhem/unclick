import { stampMeta } from "./connector-meta.js";

const FIELDS = ["minute", "hour", "day_of_month", "month", "day_of_week"] as const;
const NAMES: Record<string, string> = {
  "@yearly": "0 0 1 1 *",
  "@annually": "0 0 1 1 *",
  "@monthly": "0 0 1 * *",
  "@weekly": "0 0 * * 0",
  "@daily": "0 0 * * *",
  "@midnight": "0 0 * * *",
  "@hourly": "0 * * * *",
};

export async function crontabExplain(args: Record<string, unknown>) {
  const expr = String(args.expression ?? "").trim();
  if (!expr) return { error: "expression (cron expression) is required" };
  const resolved = NAMES[expr.toLowerCase()] ?? expr;
  const parts = resolved.split(/\s+/);
  if (parts.length < 5 || parts.length > 6) {
    return { error: `Expected 5 or 6 fields, got ${parts.length}. Format: min hour dom month dow [year]` };
  }
  const breakdown: Record<string, string> = {};
  for (let i = 0; i < Math.min(parts.length, 5); i++) {
    breakdown[FIELDS[i]] = parts[i];
  }
  if (parts.length === 6) breakdown.year = parts[5];
  const descriptions: string[] = [];
  if (parts[0] === "0" && parts[1] === "0") descriptions.push("at midnight");
  else if (parts[0] === "0") descriptions.push(`at minute 0 of hour ${parts[1]}`);
  else if (parts[0] !== "*") descriptions.push(`at minute ${parts[0]}`);
  if (parts[3] !== "*") descriptions.push(`in month ${parts[3]}`);
  if (parts[4] !== "*") descriptions.push(`on weekday ${parts[4]}`);
  if (parts[2] !== "*") descriptions.push(`on day ${parts[2]}`);
  const humanReadable = descriptions.length > 0 ? descriptions.join(", ") : "every minute";
  return stampMeta({ expression: resolved, breakdown, human_readable: humanReadable, valid: true }, {
    source: "local cron parser",
    fetched_at: new Date().toISOString(),
    next_steps: ["check breakdown for field values", "use named shortcuts like @daily, @hourly"],
  });
}
