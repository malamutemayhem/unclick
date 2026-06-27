export type ArgumentStructure = "deductive" | "inductive" | "abductive" | "analogical" | "causal";

export function conclusionCertainty(a: ArgumentStructure): number {
  const m: Record<ArgumentStructure, number> = {
    deductive: 10, inductive: 6, abductive: 5, analogical: 4, causal: 7,
  };
  return m[a];
}

export function evidenceRequirement(a: ArgumentStructure): number {
  const m: Record<ArgumentStructure, number> = {
    deductive: 3, inductive: 9, abductive: 6, analogical: 5, causal: 8,
  };
  return m[a];
}

export function creativePotential(a: ArgumentStructure): number {
  const m: Record<ArgumentStructure, number> = {
    deductive: 2, inductive: 5, abductive: 10, analogical: 8, causal: 6,
  };
  return m[a];
}

export function scientificUse(a: ArgumentStructure): number {
  const m: Record<ArgumentStructure, number> = {
    deductive: 7, inductive: 10, abductive: 8, analogical: 4, causal: 9,
  };
  return m[a];
}

export function everydayFrequency(a: ArgumentStructure): number {
  const m: Record<ArgumentStructure, number> = {
    deductive: 5, inductive: 8, abductive: 9, analogical: 7, causal: 10,
  };
  return m[a];
}

export function truthPreserving(a: ArgumentStructure): boolean {
  const m: Record<ArgumentStructure, boolean> = {
    deductive: true, inductive: false, abductive: false, analogical: false, causal: false,
  };
  return m[a];
}

export function ampliative(a: ArgumentStructure): boolean {
  const m: Record<ArgumentStructure, boolean> = {
    deductive: false, inductive: true, abductive: true, analogical: true, causal: true,
  };
  return m[a];
}

export function classicExample(a: ArgumentStructure): string {
  const m: Record<ArgumentStructure, string> = {
    deductive: "all_men_are_mortal", inductive: "sun_rises_daily",
    abductive: "best_explanation", analogical: "similar_cases",
    causal: "cause_and_effect",
  };
  return m[a];
}

export function strengthMeasure(a: ArgumentStructure): string {
  const m: Record<ArgumentStructure, string> = {
    deductive: "validity", inductive: "probability",
    abductive: "explanatory_power", analogical: "relevance_of_similarity",
    causal: "correlation_strength",
  };
  return m[a];
}

export function argumentStructures(): ArgumentStructure[] {
  return ["deductive", "inductive", "abductive", "analogical", "causal"];
}
