export type DnaAnalysis = "str_profiling" | "mtdna" | "y_str" | "snp_genotyping" | "rapid_dna";

export function discriminationPower(d: DnaAnalysis): number {
  const m: Record<DnaAnalysis, number> = {
    str_profiling: 10, mtdna: 5, y_str: 7, snp_genotyping: 9, rapid_dna: 8,
  };
  return m[d];
}

export function processingTimeHours(d: DnaAnalysis): number {
  const m: Record<DnaAnalysis, number> = {
    str_profiling: 24, mtdna: 72, y_str: 36, snp_genotyping: 48, rapid_dna: 2,
  };
  return m[d];
}

export function sampleRequirementNg(d: DnaAnalysis): number {
  const m: Record<DnaAnalysis, number> = {
    str_profiling: 1, mtdna: 0.01, y_str: 1, snp_genotyping: 10, rapid_dna: 5,
  };
  return m[d];
}

export function costPerSample(d: DnaAnalysis): number {
  const m: Record<DnaAnalysis, number> = {
    str_profiling: 5, mtdna: 8, y_str: 6, snp_genotyping: 9, rapid_dna: 3,
  };
  return m[d];
}

export function degradedSampleTolerance(d: DnaAnalysis): number {
  const m: Record<DnaAnalysis, number> = {
    str_profiling: 5, mtdna: 10, y_str: 6, snp_genotyping: 8, rapid_dna: 3,
  };
  return m[d];
}

export function identifiesLineage(d: DnaAnalysis): boolean {
  const m: Record<DnaAnalysis, boolean> = {
    str_profiling: false, mtdna: true, y_str: true, snp_genotyping: false, rapid_dna: false,
  };
  return m[d];
}

export function fieldDeployable(d: DnaAnalysis): boolean {
  const m: Record<DnaAnalysis, boolean> = {
    str_profiling: false, mtdna: false, y_str: false, snp_genotyping: false, rapid_dna: true,
  };
  return m[d];
}

export function databaseCompatibility(d: DnaAnalysis): string {
  const m: Record<DnaAnalysis, string> = {
    str_profiling: "codis", mtdna: "empop", y_str: "yhrd",
    snp_genotyping: "research_databases", rapid_dna: "codis",
  };
  return m[d];
}

export function bestApplication(d: DnaAnalysis): string {
  const m: Record<DnaAnalysis, string> = {
    str_profiling: "individual_identification", mtdna: "ancient_samples",
    y_str: "paternal_lineage", snp_genotyping: "ancestry_phenotype",
    rapid_dna: "booking_stations",
  };
  return m[d];
}

export function dnaAnalysisMethods(): DnaAnalysis[] {
  return ["str_profiling", "mtdna", "y_str", "snp_genotyping", "rapid_dna"];
}
