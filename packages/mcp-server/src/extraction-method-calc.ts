export type ExtractionMethod = "steam_distillation" | "cold_press" | "solvent" | "enfleurage" | "co2";

export function yieldRate(e: ExtractionMethod): number {
  const m: Record<ExtractionMethod, number> = {
    steam_distillation: 7, cold_press: 8, solvent: 9, enfleurage: 3, co2: 6,
  };
  return m[e];
}

export function oilPurity(e: ExtractionMethod): number {
  const m: Record<ExtractionMethod, number> = {
    steam_distillation: 8, cold_press: 9, solvent: 5, enfleurage: 10, co2: 10,
  };
  return m[e];
}

export function processingCost(e: ExtractionMethod): number {
  const m: Record<ExtractionMethod, number> = {
    steam_distillation: 5, cold_press: 4, solvent: 6, enfleurage: 10, co2: 9,
  };
  return m[e];
}

export function scentFidelity(e: ExtractionMethod): number {
  const m: Record<ExtractionMethod, number> = {
    steam_distillation: 7, cold_press: 9, solvent: 6, enfleurage: 10, co2: 9,
  };
  return m[e];
}

export function scalability(e: ExtractionMethod): number {
  const m: Record<ExtractionMethod, number> = {
    steam_distillation: 9, cold_press: 8, solvent: 10, enfleurage: 1, co2: 6,
  };
  return m[e];
}

export function chemicalFree(e: ExtractionMethod): boolean {
  const m: Record<ExtractionMethod, boolean> = {
    steam_distillation: true, cold_press: true, solvent: false, enfleurage: true, co2: true,
  };
  return m[e];
}

export function heatApplied(e: ExtractionMethod): boolean {
  const m: Record<ExtractionMethod, boolean> = {
    steam_distillation: true, cold_press: false, solvent: false, enfleurage: false, co2: false,
  };
  return m[e];
}

export function bestMaterial(e: ExtractionMethod): string {
  const m: Record<ExtractionMethod, string> = {
    steam_distillation: "herbs_flowers_leaves", cold_press: "citrus_peels",
    solvent: "delicate_flowers_resins", enfleurage: "jasmine_tuberose",
    co2: "spices_roots_seeds",
  };
  return m[e];
}

export function outputForm(e: ExtractionMethod): string {
  const m: Record<ExtractionMethod, string> = {
    steam_distillation: "essential_oil_hydrosol", cold_press: "expressed_oil",
    solvent: "absolute_concrete", enfleurage: "pomade_absolute",
    co2: "co2_extract",
  };
  return m[e];
}

export function extractionMethods(): ExtractionMethod[] {
  return ["steam_distillation", "cold_press", "solvent", "enfleurage", "co2"];
}
