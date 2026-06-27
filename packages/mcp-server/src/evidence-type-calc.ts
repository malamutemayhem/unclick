export type EvidenceType = "physical" | "digital" | "biological" | "trace" | "documentary";

export function courtWeightScore(e: EvidenceType): number {
  const m: Record<EvidenceType, number> = {
    physical: 9, digital: 7, biological: 10, trace: 6, documentary: 8,
  };
  return m[e];
}

export function collectionDifficulty(e: EvidenceType): number {
  const m: Record<EvidenceType, number> = {
    physical: 5, digital: 7, biological: 9, trace: 10, documentary: 3,
  };
  return m[e];
}

export function contaminationRisk(e: EvidenceType): number {
  const m: Record<EvidenceType, number> = {
    physical: 5, digital: 2, biological: 10, trace: 9, documentary: 1,
  };
  return m[e];
}

export function storageDifficulty(e: EvidenceType): number {
  const m: Record<EvidenceType, number> = {
    physical: 5, digital: 3, biological: 10, trace: 8, documentary: 2,
  };
  return m[e];
}

export function analysisTime(e: EvidenceType): number {
  const m: Record<EvidenceType, number> = {
    physical: 5, digital: 8, biological: 9, trace: 7, documentary: 3,
  };
  return m[e];
}

export function requiresLabAnalysis(e: EvidenceType): boolean {
  const m: Record<EvidenceType, boolean> = {
    physical: false, digital: false, biological: true, trace: true, documentary: false,
  };
  return m[e];
}

export function chainOfCustodyCritical(e: EvidenceType): boolean {
  const m: Record<EvidenceType, boolean> = {
    physical: true, digital: true, biological: true, trace: true, documentary: true,
  };
  return m[e];
}

export function exampleItem(e: EvidenceType): string {
  const m: Record<EvidenceType, string> = {
    physical: "weapon_tool_clothing", digital: "hard_drive_phone_logs",
    biological: "blood_dna_hair", trace: "fiber_gunshot_residue",
    documentary: "contracts_records",
  };
  return m[e];
}

export function primaryExpert(e: EvidenceType): string {
  const m: Record<EvidenceType, string> = {
    physical: "crime_scene_investigator", digital: "digital_forensic_analyst",
    biological: "forensic_biologist", trace: "trace_evidence_examiner",
    documentary: "questioned_document_examiner",
  };
  return m[e];
}

export function evidenceTypes(): EvidenceType[] {
  return ["physical", "digital", "biological", "trace", "documentary"];
}
