const BACKGROUND_RECALL_CATEGORIES = new Set(["identity", "preference", "standing_rule"]);
const BACKGROUND_RECALL_PATTERNS = [
  /^chris('s)?\s/i,
  /^user\s/i,
  /should always/i,
  /never use/i,
  /operator timezone/i,
  /standing rule/i,
  /profile/i,
  /preference/i,
];

type RecallFactInput = {
  category?: string | null;
  fact?: string | null;
  access_count?: number | null;
  invalidated_at?: string | null;
  source_type?: string | null;
  startup_fact_kind?: string | null;
  status?: string | null;
  valid_from?: string | null;
  valid_to?: string | null;
};

export type RecallSignal = "top-of-mind" | "background-heavy";

export type AnnotatedRecallFact<T extends RecallFactInput> = T & {
  recall_signal: RecallSignal;
  recall_note: string;
};

export function annotateRecallFact<T extends RecallFactInput>(fact: T): AnnotatedRecallFact<T> {
  const category = String(fact.category ?? "").toLowerCase();
  const text = String(fact.fact ?? "");
  const accessCount = Number(fact.access_count ?? 0);
  const looksStatic =
    BACKGROUND_RECALL_CATEGORIES.has(category) ||
    BACKGROUND_RECALL_PATTERNS.some((pattern) => pattern.test(text));
  const isBackgroundHeavy = accessCount >= 100 && looksStatic;

  return {
    ...fact,
    recall_signal: isBackgroundHeavy ? "background-heavy" : "top-of-mind",
    recall_note: isBackgroundHeavy ? "Startup or heartbeat reads" : "Human-facing recall",
  };
}

function parsedTime(value: string | null | undefined): number | null {
  if (!value) return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function hasOperationalSignal(...values: Array<string | null | undefined>): boolean {
  const text = values.filter(Boolean).join(" ").toLowerCase();
  if (!text) return false;
  if (text.includes("heartbeat")) return true;
  if (text.includes("self-report") || text.includes("self report")) return true;
  if (text.includes("testpass_cron_user_id")) return true;
  if (text.includes("cron") && text.includes("resolved")) return true;
  if (text.includes("signal") && text.includes("blocked")) return true;
  return /\b(self[_ -]?report|cron|system|heartbeat)\b/.test(text);
}

export function isRecallVisibleFact(fact: RecallFactInput, asOf: Date = new Date()): boolean {
  if (fact.status && fact.status !== "active") return false;

  const point = asOf.getTime();
  const validFrom = parsedTime(fact.valid_from);
  if (validFrom !== null && validFrom > point) return false;

  const validTo = parsedTime(fact.valid_to);
  if (validTo !== null && validTo <= point) return false;

  const invalidatedAt = parsedTime(fact.invalidated_at);
  if (invalidatedAt !== null && invalidatedAt <= point) return false;

  const startupKind = String(fact.startup_fact_kind ?? "legacy_unspecified");
  if (startupKind === "operational" || startupKind === "excluded") return false;

  return !hasOperationalSignal(fact.source_type, fact.category, fact.fact);
}

export function buildRecallFactSections<T extends RecallFactInput>(
  topFacts: T[],
  topOfMindCandidates: T[] = topFacts,
) {
  const annotatedTopFacts = topFacts.map(annotateRecallFact);
  const visibleTopOfMindCandidates = topOfMindCandidates.filter((fact) => isRecallVisibleFact(fact));
  const annotatedTopOfMindCandidates = visibleTopOfMindCandidates.map(annotateRecallFact);
  const topOfMindFacts = annotatedTopOfMindCandidates
    .filter((fact) => fact.recall_signal === "top-of-mind")
    .slice(0, 10);
  const backgroundHeavyCount = annotatedTopFacts.filter((fact) => fact.recall_signal === "background-heavy").length;
  const backgroundHeavyCandidateCount = annotatedTopOfMindCandidates.filter(
    (fact) => fact.recall_signal === "background-heavy",
  ).length;

  return {
    top_facts: annotatedTopFacts,
    top_of_mind_facts: topOfMindFacts,
    recall_diagnostics: {
      inspected_top_facts: annotatedTopFacts.length,
      inspected_top_of_mind_candidates: annotatedTopOfMindCandidates.length,
      excluded_ineligible_candidate_count: topOfMindCandidates.length - visibleTopOfMindCandidates.length,
      background_heavy_count: backgroundHeavyCount,
      background_heavy_candidate_count: backgroundHeavyCandidateCount,
    },
  };
}
