export type TraceEvidence = "fiber" | "hair" | "glass_fragment" | "paint_chip" | "gunshot_residue";

export function transferPersistence(t: TraceEvidence): number {
  const m: Record<TraceEvidence, number> = {
    fiber: 3, hair: 5, glass_fragment: 8, paint_chip: 7, gunshot_residue: 2,
  };
  return m[t];
}

export function collectionDifficulty(t: TraceEvidence): number {
  const m: Record<TraceEvidence, number> = {
    fiber: 7, hair: 5, glass_fragment: 4, paint_chip: 3, gunshot_residue: 8,
  };
  return m[t];
}

export function analysisMethods(t: TraceEvidence): number {
  const m: Record<TraceEvidence, number> = {
    fiber: 6, hair: 8, glass_fragment: 7, paint_chip: 9, gunshot_residue: 5,
  };
  return m[t];
}

export function individualizationPotential(t: TraceEvidence): number {
  const m: Record<TraceEvidence, number> = {
    fiber: 4, hair: 8, glass_fragment: 6, paint_chip: 7, gunshot_residue: 3,
  };
  return m[t];
}

export function environmentalStability(t: TraceEvidence): number {
  const m: Record<TraceEvidence, number> = {
    fiber: 6, hair: 9, glass_fragment: 10, paint_chip: 8, gunshot_residue: 3,
  };
  return m[t];
}

export function microscopeRequired(t: TraceEvidence): boolean {
  const m: Record<TraceEvidence, boolean> = {
    fiber: true, hair: true, glass_fragment: true, paint_chip: true, gunshot_residue: true,
  };
  return m[t];
}

export function dnaExtractable(t: TraceEvidence): boolean {
  const m: Record<TraceEvidence, boolean> = {
    fiber: false, hair: true, glass_fragment: false, paint_chip: false, gunshot_residue: false,
  };
  return m[t];
}

export function primaryInstrument(t: TraceEvidence): string {
  const m: Record<TraceEvidence, string> = {
    fiber: "comparison_microscope", hair: "polarized_light_microscope",
    glass_fragment: "refractive_index", paint_chip: "ftir_spectroscopy",
    gunshot_residue: "sem_eds",
  };
  return m[t];
}

export function evidenceClass(t: TraceEvidence): string {
  const m: Record<TraceEvidence, string> = {
    fiber: "class_evidence", hair: "individual_or_class",
    glass_fragment: "class_evidence", paint_chip: "class_evidence",
    gunshot_residue: "associative",
  };
  return m[t];
}

export function traceEvidenceTypes(): TraceEvidence[] {
  return ["fiber", "hair", "glass_fragment", "paint_chip", "gunshot_residue"];
}
