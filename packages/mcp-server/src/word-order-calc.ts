export type WordOrder = "svo" | "sov" | "vso" | "vos" | "ovs";

export function languagePercentage(w: WordOrder): number {
  const m: Record<WordOrder, number> = {
    svo: 42, sov: 45, vso: 9, vos: 3, ovs: 1,
  };
  return m[w];
}

export function processingEase(w: WordOrder): number {
  const m: Record<WordOrder, number> = {
    svo: 9, sov: 8, vso: 5, vos: 4, ovs: 3,
  };
  return m[w];
}

export function ambiguityLevel(w: WordOrder): number {
  const m: Record<WordOrder, number> = {
    svo: 4, sov: 3, vso: 6, vos: 7, ovs: 8,
  };
  return m[w];
}

export function headDirection(w: WordOrder): number {
  const m: Record<WordOrder, number> = {
    svo: 7, sov: 3, vso: 9, vos: 8, ovs: 4,
  };
  return m[w];
}

export function morphologyDependence(w: WordOrder): number {
  const m: Record<WordOrder, number> = {
    svo: 4, sov: 6, vso: 7, vos: 8, ovs: 9,
  };
  return m[w];
}

export function prepositionUsing(w: WordOrder): boolean {
  const m: Record<WordOrder, boolean> = {
    svo: true, sov: false, vso: true, vos: true, ovs: false,
  };
  return m[w];
}

export function verbInitial(w: WordOrder): boolean {
  const m: Record<WordOrder, boolean> = {
    svo: false, sov: false, vso: true, vos: true, ovs: false,
  };
  return m[w];
}

export function exampleLanguage(w: WordOrder): string {
  const m: Record<WordOrder, string> = {
    svo: "english", sov: "japanese", vso: "welsh",
    vos: "malagasy", ovs: "hixkaryana",
  };
  return m[w];
}

export function typologicalCorrelation(w: WordOrder): string {
  const m: Record<WordOrder, string> = {
    svo: "head_initial", sov: "head_final",
    vso: "strongly_head_initial", vos: "mixed",
    ovs: "strongly_head_final",
  };
  return m[w];
}

export function wordOrders(): WordOrder[] {
  return ["svo", "sov", "vso", "vos", "ovs"];
}
