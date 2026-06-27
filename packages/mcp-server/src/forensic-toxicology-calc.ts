export type ForensicToxicology = "immunoassay" | "gc_ms" | "lc_ms" | "spectrophotometry" | "hplc";

export function sensitivityLevel(f: ForensicToxicology): number {
  const m: Record<ForensicToxicology, number> = {
    immunoassay: 5, gc_ms: 9, lc_ms: 10, spectrophotometry: 3, hplc: 7,
  };
  return m[f];
}

export function specificityLevel(f: ForensicToxicology): number {
  const m: Record<ForensicToxicology, number> = {
    immunoassay: 4, gc_ms: 10, lc_ms: 10, spectrophotometry: 5, hplc: 7,
  };
  return m[f];
}

export function throughputSamplesPerDay(f: ForensicToxicology): number {
  const m: Record<ForensicToxicology, number> = {
    immunoassay: 200, gc_ms: 30, lc_ms: 25, spectrophotometry: 100, hplc: 40,
  };
  return m[f];
}

export function equipmentCost(f: ForensicToxicology): number {
  const m: Record<ForensicToxicology, number> = {
    immunoassay: 3, gc_ms: 8, lc_ms: 10, spectrophotometry: 2, hplc: 6,
  };
  return m[f];
}

export function operatorSkillRequired(f: ForensicToxicology): number {
  const m: Record<ForensicToxicology, number> = {
    immunoassay: 2, gc_ms: 8, lc_ms: 9, spectrophotometry: 4, hplc: 7,
  };
  return m[f];
}

export function confirmatory(f: ForensicToxicology): boolean {
  const m: Record<ForensicToxicology, boolean> = {
    immunoassay: false, gc_ms: true, lc_ms: true, spectrophotometry: false, hplc: false,
  };
  return m[f];
}

export function screeningMethod(f: ForensicToxicology): boolean {
  const m: Record<ForensicToxicology, boolean> = {
    immunoassay: true, gc_ms: false, lc_ms: false, spectrophotometry: true, hplc: false,
  };
  return m[f];
}

export function detectionTarget(f: ForensicToxicology): string {
  const m: Record<ForensicToxicology, string> = {
    immunoassay: "drug_classes", gc_ms: "volatile_compounds",
    lc_ms: "polar_metabolites", spectrophotometry: "colored_compounds",
    hplc: "non_volatile_compounds",
  };
  return m[f];
}

export function courtAcceptance(f: ForensicToxicology): string {
  const m: Record<ForensicToxicology, string> = {
    immunoassay: "presumptive_only", gc_ms: "gold_standard",
    lc_ms: "gold_standard", spectrophotometry: "supplementary",
    hplc: "accepted",
  };
  return m[f];
}

export function forensicToxicologyMethods(): ForensicToxicology[] {
  return ["immunoassay", "gc_ms", "lc_ms", "spectrophotometry", "hplc"];
}
