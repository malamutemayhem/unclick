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

export function buildRecallFactSections<T extends RecallFactInput>(
  topFacts: T[],
  topOfMindCandidates: T[] = topFacts,
) {
  const annotatedTopFacts = topFacts.map(annotateRecallFact);
  const annotatedTopOfMindCandidates = topOfMindCandidates.map(annotateRecallFact);
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
      background_heavy_count: backgroundHeavyCount,
      background_heavy_candidate_count: backgroundHeavyCandidateCount,
    },
  };
}
