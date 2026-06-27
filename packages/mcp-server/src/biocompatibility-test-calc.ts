export type BiocompatibilityTest = "cytotoxicity" | "sensitization" | "irritation" | "systemic_toxicity" | "hemocompatibility";

export function regulatoryImportance(t: BiocompatibilityTest): number {
  const m: Record<BiocompatibilityTest, number> = {
    cytotoxicity: 10, sensitization: 8, irritation: 7, systemic_toxicity: 9, hemocompatibility: 8,
  };
  return m[t];
}

export function testDuration(t: BiocompatibilityTest): number {
  const m: Record<BiocompatibilityTest, number> = {
    cytotoxicity: 3, sensitization: 7, irritation: 5, systemic_toxicity: 9, hemocompatibility: 4,
  };
  return m[t];
}

export function costLevel(t: BiocompatibilityTest): number {
  const m: Record<BiocompatibilityTest, number> = {
    cytotoxicity: 3, sensitization: 6, irritation: 5, systemic_toxicity: 10, hemocompatibility: 7,
  };
  return m[t];
}

export function sampleSize(t: BiocompatibilityTest): number {
  const m: Record<BiocompatibilityTest, number> = {
    cytotoxicity: 2, sensitization: 7, irritation: 5, systemic_toxicity: 9, hemocompatibility: 4,
  };
  return m[t];
}

export function dataComplexity(t: BiocompatibilityTest): number {
  const m: Record<BiocompatibilityTest, number> = {
    cytotoxicity: 4, sensitization: 6, irritation: 5, systemic_toxicity: 9, hemocompatibility: 8,
  };
  return m[t];
}

export function inVitro(t: BiocompatibilityTest): boolean {
  const m: Record<BiocompatibilityTest, boolean> = {
    cytotoxicity: true, sensitization: false, irritation: false, systemic_toxicity: false, hemocompatibility: true,
  };
  return m[t];
}

export function requiredForAllDevices(t: BiocompatibilityTest): boolean {
  const m: Record<BiocompatibilityTest, boolean> = {
    cytotoxicity: true, sensitization: true, irritation: true, systemic_toxicity: false, hemocompatibility: false,
  };
  return m[t];
}

export function isoStandard(t: BiocompatibilityTest): string {
  const m: Record<BiocompatibilityTest, string> = {
    cytotoxicity: "iso_10993_5", sensitization: "iso_10993_10",
    irritation: "iso_10993_10", systemic_toxicity: "iso_10993_11",
    hemocompatibility: "iso_10993_4",
  };
  return m[t];
}

export function measurementEndpoint(t: BiocompatibilityTest): string {
  const m: Record<BiocompatibilityTest, string> = {
    cytotoxicity: "cell_viability_percent", sensitization: "immune_response_score",
    irritation: "tissue_inflammation_grade", systemic_toxicity: "organ_function_markers",
    hemocompatibility: "hemolysis_coagulation_rate",
  };
  return m[t];
}

export function biocompatibilityTests(): BiocompatibilityTest[] {
  return ["cytotoxicity", "sensitization", "irritation", "systemic_toxicity", "hemocompatibility"];
}
