export type GrammarCase = "nominative" | "accusative" | "genitive" | "dative" | "ablative";

export function usageFrequency(c: GrammarCase): number {
  const m: Record<GrammarCase, number> = {
    nominative: 10, accusative: 9, genitive: 7, dative: 6, ablative: 3,
  };
  return m[c];
}

export function learningDifficulty(c: GrammarCase): number {
  const m: Record<GrammarCase, number> = {
    nominative: 2, accusative: 4, genitive: 6, dative: 7, ablative: 9,
  };
  return m[c];
}

export function languagesWithCase(c: GrammarCase): number {
  const m: Record<GrammarCase, number> = {
    nominative: 100, accusative: 95, genitive: 80, dative: 60, ablative: 20,
  };
  return m[c];
}

export function semanticSpecificity(c: GrammarCase): number {
  const m: Record<GrammarCase, number> = {
    nominative: 3, accusative: 5, genitive: 7, dative: 8, ablative: 9,
  };
  return m[c];
}

export function morphologicalDistinctness(c: GrammarCase): number {
  const m: Record<GrammarCase, number> = {
    nominative: 4, accusative: 5, genitive: 8, dative: 7, ablative: 9,
  };
  return m[c];
}

export function subjectCase(c: GrammarCase): boolean {
  const m: Record<GrammarCase, boolean> = {
    nominative: true, accusative: false, genitive: false, dative: false, ablative: false,
  };
  return m[c];
}

export function survivesInEnglish(c: GrammarCase): boolean {
  const m: Record<GrammarCase, boolean> = {
    nominative: true, accusative: true, genitive: true, dative: false, ablative: false,
  };
  return m[c];
}

export function syntacticRole(c: GrammarCase): string {
  const m: Record<GrammarCase, string> = {
    nominative: "subject", accusative: "direct_object",
    genitive: "possession", dative: "indirect_object",
    ablative: "separation",
  };
  return m[c];
}

export function exampleLanguage(c: GrammarCase): string {
  const m: Record<GrammarCase, string> = {
    nominative: "german", accusative: "turkish",
    genitive: "russian", dative: "greek",
    ablative: "latin",
  };
  return m[c];
}

export function grammarCases(): GrammarCase[] {
  return ["nominative", "accusative", "genitive", "dative", "ablative"];
}
