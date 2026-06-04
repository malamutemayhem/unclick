export type BoardroomSignalPolishReason =
  | "retired-automation-check"
  | "stale-boardroom-source"
  | null;

export interface BoardroomSignalPolishInput {
  sourceKind?: string | null;
  source?: string | null;
  status?: string | null;
  summary?: unknown;
  tags?: string[] | null;
  actorAgentId?: string | null;
  tool?: string | null;
  action?: string | null;
  severity?: string | null;
  payload?: unknown;
}

export interface BoardroomSignalPolishResult {
  summary: string;
  tags: string[];
  isNoise: boolean;
  reason: BoardroomSignalPolishReason;
}

const LEGACY_BOARDROOM_SOURCE_PATTERN = /\bfishbowl(?:-(?:message|checkin))?\b/gi;
const LEGACY_BOARDROOM_CHECKIN_PATTERN = /\bfishbowl-checkin:/gi;
const LEGACY_BOARDROOM_MESSAGE_PATTERN = /\bfishbowl-message:/gi;
const BOARDROOM_SOURCE_PATTERN = /\b(?:fishbowl|boardroom)(?:-(?:message|checkin))?\b/i;
const RETIRED_AUTOMATION_PATTERN = /\b(?:cursor[\s_-]*)?bugbot\b/i;

export function normalizeBoardroomTerminology(input: unknown): string {
  return stringify(input)
    .replace(LEGACY_BOARDROOM_CHECKIN_PATTERN, "boardroom-checkin:")
    .replace(LEGACY_BOARDROOM_MESSAGE_PATTERN, "boardroom-message:")
    .replace(LEGACY_BOARDROOM_SOURCE_PATTERN, (match) => {
      if (match === match.toUpperCase()) return "BOARDROOM";
      if (match[0] === match[0].toUpperCase()) return "Boardroom";
      return "boardroom";
    });
}

export function polishBoardroomSignal(input: BoardroomSignalPolishInput): BoardroomSignalPolishResult {
  if (isRetiredAutomationCheck(input)) {
    return {
      summary: "Discontinued automation check ignored as non-operational noise.",
      tags: uniqueTags([...normalizeBoardroomTags(input.tags), "noise:retired-automation"]),
      isNoise: true,
      reason: "retired-automation-check",
    };
  }

  const summary = normalizeBoardroomTerminology(input.summary);
  if (isStaleBoardroomSource(input)) {
    return {
      summary,
      tags: uniqueTags([...normalizeBoardroomTags(input.tags), "noise:stale-source"]),
      isNoise: true,
      reason: "stale-boardroom-source",
    };
  }

  return {
    summary,
    tags: normalizeBoardroomTags(input.tags),
    isNoise: false,
    reason: null,
  };
}

export function isRetiredBoardroomSignalNoise(input: BoardroomSignalPolishInput): boolean {
  return hasNoiseTag(input.tags) || isRetiredAutomationCheck(input) || isStaleBoardroomSource(input);
}

function isRetiredAutomationCheck(input: BoardroomSignalPolishInput): boolean {
  return RETIRED_AUTOMATION_PATTERN.test(evidenceText(input));
}

function hasNoiseTag(tags?: string[] | null): boolean {
  return (tags ?? []).some((tag) => typeof tag === "string" && tag.toLowerCase().startsWith("noise:"));
}

function isStaleBoardroomSource(input: BoardroomSignalPolishInput): boolean {
  if ((input.sourceKind ?? "").toLowerCase() !== "dispatch") return false;

  const status = (input.status ?? "").toLowerCase();
  const tags = normalizeBoardroomTags(input.tags).map((tag) => tag.toLowerCase());
  const isStale = status === "stale" || tags.includes("stale");
  if (!isStale) return false;

  const text = evidenceText(input);
  if (BOARDROOM_SOURCE_PATTERN.test(text)) return true;

  return /\bwakepass\b/i.test(text) && isRoutineWakeNoise(text);
}

function isRoutineWakeNoise(text: string): boolean {
  return (
    /\b(?:fishbowl|boardroom)-checkin:/.test(text) ||
    /\bmissed_next_checkin\b/.test(text) ||
    /\bissue_comment\b/.test(text) ||
    /\bsuperseded_status_comment\b/.test(text) ||
    (/\bbridge_status\b/.test(text) && /\bsuppress\b/.test(text)) ||
    (/\bduplicate\b/.test(text) && /\b(?:ack|wake)\b/.test(text))
  );
}

function normalizeBoardroomTags(tags?: string[] | null): string[] {
  return uniqueTags(
    (tags ?? [])
      .filter((tag): tag is string => typeof tag === "string" && tag.trim().length > 0)
      .map((tag) => normalizeBoardroomTerminology(tag).trim())
      .map((tag) => (RETIRED_AUTOMATION_PATTERN.test(tag) ? "retired-automation" : tag)),
  );
}

function evidenceText(input: BoardroomSignalPolishInput): string {
  return [
    input.sourceKind,
    input.source,
    input.status,
    input.summary,
    input.actorAgentId,
    input.tool,
    input.action,
    input.severity,
    input.payload,
    ...(input.tags ?? []),
  ]
    .map((value) => normalizeBoardroomTerminology(value))
    .join(" ")
    .toLowerCase();
}

function uniqueTags(tags: string[]): string[] {
  return Array.from(new Set(tags.filter((tag) => tag.trim().length > 0)));
}

function stringify(input: unknown): string {
  if (input == null) return "";
  if (typeof input === "string") return input;
  try {
    return JSON.stringify(input);
  } catch {
    return String(input);
  }
}
