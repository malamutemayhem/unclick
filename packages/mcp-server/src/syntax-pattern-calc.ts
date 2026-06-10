export type SyntaxPattern = "svo" | "sov" | "vso" | "vos" | "free_order";

export function globalFrequency(s: SyntaxPattern): number {
  const m: Record<SyntaxPattern, number> = {
    svo: 8, sov: 10, vso: 3, vos: 1, free_order: 4,
  };
  return m[s];
}

export function processingEase(s: SyntaxPattern): number {
  const m: Record<SyntaxPattern, number> = {
    svo: 9, sov: 7, vso: 5, vos: 4, free_order: 3,
  };
  return m[s];
}

export function ambiguityLevel(s: SyntaxPattern): number {
  const m: Record<SyntaxPattern, number> = {
    svo: 3, sov: 4, vso: 5, vos: 6, free_order: 9,
  };
  return m[s];
}

export function headDirectionScore(s: SyntaxPattern): number {
  const m: Record<SyntaxPattern, number> = {
    svo: 7, sov: 3, vso: 10, vos: 9, free_order: 5,
  };
  return m[s];
}

export function caseMarkingNeed(s: SyntaxPattern): number {
  const m: Record<SyntaxPattern, number> = {
    svo: 3, sov: 5, vso: 4, vos: 6, free_order: 10,
  };
  return m[s];
}

export function verbInitial(s: SyntaxPattern): boolean {
  const m: Record<SyntaxPattern, boolean> = {
    svo: false, sov: false, vso: true, vos: true, free_order: false,
  };
  return m[s];
}

export function subjectFirst(s: SyntaxPattern): boolean {
  const m: Record<SyntaxPattern, boolean> = {
    svo: true, sov: true, vso: false, vos: false, free_order: false,
  };
  return m[s];
}

export function exampleLanguage(s: SyntaxPattern): string {
  const m: Record<SyntaxPattern, string> = {
    svo: "english_mandarin", sov: "japanese_korean",
    vso: "irish_arabic", vos: "malagasy_fijian",
    free_order: "latin_russian",
  };
  return m[s];
}

export function prepositionType(s: SyntaxPattern): string {
  const m: Record<SyntaxPattern, string> = {
    svo: "prepositions", sov: "postpositions",
    vso: "prepositions", vos: "prepositions",
    free_order: "mixed",
  };
  return m[s];
}

export function syntaxPatterns(): SyntaxPattern[] {
  return ["svo", "sov", "vso", "vos", "free_order"];
}
