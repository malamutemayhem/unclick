import { stampMeta } from "./connector-meta.js";

export async function countdownCalc(args: Record<string, unknown>) {
  const dateStr = String(args.date ?? "").trim();
  if (!dateStr) return { error: "date is required (YYYY-MM-DD)" };
  const target = new Date(dateStr + "T00:00:00Z");
  if (isNaN(target.getTime())) return { error: `Invalid date: ${dateStr}` };
  const now = new Date();
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const diffMs = target.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const absDays = Math.abs(diffDays);
  const weeks = Math.floor(absDays / 7);
  const remainingDays = absDays % 7;
  const direction = diffDays > 0 ? "future" : diffDays < 0 ? "past" : "today";
  const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][target.getUTCDay()];
  return stampMeta({
    date: dateStr,
    days: diffDays,
    absolute_days: absDays,
    weeks,
    remaining_days: remainingDays,
    weeks_and_days: `${weeks} weeks and ${remainingDays} days`,
    direction,
    day_of_week: dayOfWeek,
  }, {
    source: "local countdown calculator",
    fetched_at: new Date().toISOString(),
    next_steps: ["positive days means future, negative means past", "day_of_week shows what day the date falls on"],
  });
}
