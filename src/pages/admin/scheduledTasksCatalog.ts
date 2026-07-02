// Scheduled tasks catalog (read-only data layer).
//
// First safe slice for Boardroom job 06479889 ("Add admin UI surface for
// scheduled tasks - cron / description / SKILL drift detector").
//
// This module is the data + cron-prose layer only. It does NOT pick the
// admin IA (standalone page vs section vs an /admin/system band cluster) -
// that decision is pinned per the 2026-04-26 Designer/Skeptic
// thread on the todo. A future admin page can render this catalog under
// whichever IA the operator chooses.
//
// Drift-detection design (per the Skeptic comment): the catalog stores the
// raw `cron` and the human `description` only. `describeCron` derives the
// cadence prose at render time, so a future table can show cron, derived
// prose, and description side by side. The visual mismatch IS the v1 drift
// signal - no regex or arbitrary threshold. A real metadata cadence field
// and an automated 3-way detector are deliberately left to v1.5 / v2.
//
// Source of truth: the repo's own scheduled GitHub Actions workflows. Keep
// this list in sync when a cron workflow is added, removed, or rescheduled.

export type ScheduledTaskOwner =
  | "PinballWake"
  | "TestPass"
  | "Brainmap"
  | "Fleet"
  | "Dogfood"
  | "Merge";

export interface ScheduledTask {
  /** Stable id for the task row. */
  id: string;
  /** Human-friendly task name (matches the workflow `name:`). */
  name: string;
  /** Raw 5-field cron expression. All UnClick crons run in UTC. */
  cron: string;
  /** One-line plain-English description of what the task does. */
  description: string;
  /** Workflow file under .github/workflows that owns the schedule. */
  workflowFile: string;
  /** Which subsystem owns the task. */
  owner: ScheduledTaskOwner;
}

// Mirrors the scheduled (cron) workflows in .github/workflows as of 2026-06-02.
export const SCHEDULED_TASKS: ScheduledTask[] = [
  {
    id: "pinballwake-autonomous-runner",
    name: "PinballWake Autonomous Runner",
    cron: "3,13,23,33,43,53 * * * *",
    description: "Runs the PinballWake autonomous runner on a staggered ten-minute beat.",
    workflowFile: ".github/workflows/autonomous-runner.yml",
    owner: "PinballWake",
  },
  {
    id: "testpass-scheduled-smoke",
    name: "TestPass Scheduled Smoke",
    cron: "*/5 * * * *",
    description: "Fires the TestPass smoke pack so regressions surface fast.",
    workflowFile: ".github/workflows/testpass-scheduled-smoke.yml",
    owner: "TestPass",
  },
  {
    id: "scheduled-build-self-test",
    name: "Scheduled Build Self-Test",
    cron: "7,17,27,37,47,57 * * * *",
    description: "Builds the site to confirm the tree still compiles between merges.",
    workflowFile: ".github/workflows/scheduled-build-self-test.yml",
    owner: "PinballWake",
  },
  {
    id: "fleet-throughput-watch",
    name: "Fleet Throughput Watch",
    cron: "7,22,37,52 * * * *",
    description: "Watches worker throughput every fifteen minutes and flags stalls.",
    workflowFile: ".github/workflows/fleet-throughput-watch.yml",
    owner: "Fleet",
  },
  {
    id: "tier2-auto-merge-queue-check",
    name: "Tier-2 Auto-Merge Queue Check",
    cron: "*/10 * * * *",
    description: "Checks the tier-2 auto-merge queue for safe-class PRs that are ready.",
    workflowFile: ".github/workflows/tier2-auto-merge-queue-check.yml",
    owner: "Merge",
  },
  {
    id: "continuous-improvement-watch",
    name: "Continuous Improvement Watch",
    cron: "23 */2 * * *",
    description: "Reviews recent activity every two hours for improvement notes.",
    workflowFile: ".github/workflows/continuous-improvement-watch.yml",
    owner: "Fleet",
  },
  {
    id: "brainmap-auto-update",
    name: "Brainmap Auto Update",
    cron: "17 */6 * * *",
    description: "Regenerates the brainmap every six hours so docs stay current.",
    workflowFile: ".github/workflows/brainmap-auto-update.yml",
    owner: "Brainmap",
  },
  {
    id: "dogfood-report",
    name: "Dogfood Report",
    cron: "17 16 * * *",
    description: "Posts the daily dogfood report once per day.",
    workflowFile: ".github/workflows/dogfood-report.yml",
    owner: "Dogfood",
  },
];

const CRON_FIELD_BOUNDS = {
  minute: { min: 0, max: 59 },
  hour: { min: 0, max: 23 },
  dayOfMonth: { min: 1, max: 31 },
  month: { min: 1, max: 12 },
  dayOfWeek: { min: 0, max: 6 },
} as const;

type CronFieldName = keyof typeof CRON_FIELD_BOUNDS;

function splitCron(cron: string): string[] {
  const fields = cron.trim().split(/\s+/);
  if (fields.length !== 5) {
    throw new Error(`Unsupported cron expression (expected 5 fields): "${cron}"`);
  }
  return fields;
}

/**
 * Expand a single cron field into the concrete set of values it matches.
 * Supports `*`, `* / N` steps, `a-b` ranges, comma lists, and single ints.
 */
export function expandCronField(field: string, fieldName: CronFieldName): Set<number> {
  const { min, max } = CRON_FIELD_BOUNDS[fieldName];
  const values = new Set<number>();

  for (const part of field.split(",")) {
    const [rangePart, stepPart] = part.split("/");
    const step = stepPart ? Number(stepPart) : 1;
    if (!Number.isInteger(step) || step <= 0) {
      throw new Error(`Invalid step in cron field "${field}" for ${fieldName}`);
    }

    let rangeStart: number = min;
    let rangeEnd: number = max;
    if (rangePart !== "*") {
      const [startStr, endStr] = rangePart.split("-");
      rangeStart = Number(startStr);
      rangeEnd = endStr !== undefined ? Number(endStr) : (stepPart ? max : rangeStart);
      if (!Number.isInteger(rangeStart) || !Number.isInteger(rangeEnd)) {
        throw new Error(`Invalid value in cron field "${field}" for ${fieldName}`);
      }
    }

    for (let value = rangeStart; value <= rangeEnd; value += step) {
      if (value < min || value > max) {
        throw new Error(`Cron value ${value} out of range for ${fieldName}`);
      }
      values.add(value);
    }
  }

  return values;
}

/**
 * True when the given UTC instant matches the cron expression (minute
 * granularity). Day-of-month and day-of-week both default to OR semantics
 * only when one is restricted, matching standard cron behaviour; here all
 * catalog tasks use `*` for both so the common path is a plain AND match.
 */
export function cronMatchesUtc(cron: string, date: Date): boolean {
  const [minuteF, hourF, domF, monthF, dowF] = splitCron(cron);

  const minute = date.getUTCMinutes();
  const hour = date.getUTCHours();
  const dom = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const dow = date.getUTCDay();

  const minuteMatch = expandCronField(minuteF, "minute").has(minute);
  const hourMatch = expandCronField(hourF, "hour").has(hour);
  const monthMatch = expandCronField(monthF, "month").has(month);

  const domRestricted = domF !== "*";
  const dowRestricted = dowF !== "*";
  const domMatch = expandCronField(domF, "dayOfMonth").has(dom);
  const dowMatch = expandCronField(dowF, "dayOfWeek").has(dow);

  let dayMatch: boolean;
  if (domRestricted && dowRestricted) {
    dayMatch = domMatch || dowMatch;
  } else {
    dayMatch = domMatch && dowMatch;
  }

  return minuteMatch && hourMatch && monthMatch && dayMatch;
}

function evenGap(sortedMinutes: number[]): number | null {
  if (sortedMinutes.length < 2) return null;
  const gap = sortedMinutes[1] - sortedMinutes[0];
  for (let i = 2; i < sortedMinutes.length; i += 1) {
    if (sortedMinutes[i] - sortedMinutes[i - 1] !== gap) return null;
  }
  // Confirm the wrap-around gap (last back to first across the hour) matches.
  const wrap = 60 - sortedMinutes[sortedMinutes.length - 1] + sortedMinutes[0];
  return wrap === gap ? gap : null;
}

/**
 * Derive a human-readable cadence from a cron expression. Intentionally small
 * and covers the patterns the catalog actually uses; anything else falls back
 * to the raw expression so a reader still sees the truth instead of a guess.
 */
export function describeCron(cron: string): string {
  let fields: string[];
  try {
    fields = splitCron(cron);
  } catch {
    return cron;
  }
  const [minuteF, hourF, domF, monthF, dowF] = fields;
  const dateOnlyWildcards = domF === "*" && monthF === "*" && dowF === "*";

  // every N minutes: "*/N * * * *"
  const stepMinute = /^\*\/(\d+)$/.exec(minuteF);
  if (stepMinute && hourF === "*" && dateOnlyWildcards) {
    return `every ${Number(stepMinute[1])} minutes`;
  }

  // comma list of minutes, evenly spaced, every hour
  if (minuteF.includes(",") && hourF === "*" && dateOnlyWildcards) {
    const minutes = [...expandCronField(minuteF, "minute")].sort((a, b) => a - b);
    const gap = evenGap(minutes);
    if (gap) return `every ${gap} minutes`;
    return `at minutes ${minutes.join(", ")} of every hour (UTC)`;
  }

  // every N hours at a fixed minute: "M */N * * *"
  const stepHour = /^\*\/(\d+)$/.exec(hourF);
  const singleMinute = /^\d+$/.test(minuteF);
  if (stepHour && singleMinute && dateOnlyWildcards) {
    return `every ${Number(stepHour[1])} hours at :${minuteF.padStart(2, "0")} (UTC)`;
  }

  // daily at a fixed time: "M H * * *"
  if (singleMinute && /^\d+$/.test(hourF) && dateOnlyWildcards) {
    const hh = hourF.padStart(2, "0");
    const mm = minuteF.padStart(2, "0");
    return `daily at ${hh}:${mm} UTC`;
  }

  return cron;
}

export function summarizeScheduledTasks(tasks = SCHEDULED_TASKS) {
  const byOwner: Record<string, number> = {};
  for (const task of tasks) {
    byOwner[task.owner] = (byOwner[task.owner] ?? 0) + 1;
  }
  return { total: tasks.length, byOwner };
}
