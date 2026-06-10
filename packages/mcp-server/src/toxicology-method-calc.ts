export type ToxicologyMethod = "immunoassay" | "gas_chromatography" | "mass_spectrometry" | "hplc" | "spectrophotometry";

export function sensitivity(t: ToxicologyMethod): number {
  const m: Record<ToxicologyMethod, number> = {
    immunoassay: 6, gas_chromatography: 9, mass_spectrometry: 10, hplc: 8, spectrophotometry: 5,
  };
  return m[t];
}

export function specificity(t: ToxicologyMethod): number {
  const m: Record<ToxicologyMethod, number> = {
    immunoassay: 4, gas_chromatography: 8, mass_spectrometry: 10, hplc: 7, spectrophotometry: 3,
  };
  return m[t];
}

export function turnaroundTime(t: ToxicologyMethod): number {
  const m: Record<ToxicologyMethod, number> = {
    immunoassay: 10, gas_chromatography: 4, mass_spectrometry: 3, hplc: 5, spectrophotometry: 8,
  };
  return m[t];
}

export function costPerTest(t: ToxicologyMethod): number {
  const m: Record<ToxicologyMethod, number> = {
    immunoassay: 2, gas_chromatography: 7, mass_spectrometry: 10, hplc: 6, spectrophotometry: 3,
  };
  return m[t];
}

export function sampleSizeRequired(t: ToxicologyMethod): number {
  const m: Record<ToxicologyMethod, number> = {
    immunoassay: 2, gas_chromatography: 5, mass_spectrometry: 3, hplc: 4, spectrophotometry: 6,
  };
  return m[t];
}

export function confirmatory(t: ToxicologyMethod): boolean {
  const m: Record<ToxicologyMethod, boolean> = {
    immunoassay: false, gas_chromatography: true, mass_spectrometry: true, hplc: true, spectrophotometry: false,
  };
  return m[t];
}

export function screeningCapable(t: ToxicologyMethod): boolean {
  const m: Record<ToxicologyMethod, boolean> = {
    immunoassay: true, gas_chromatography: false, mass_spectrometry: false, hplc: false, spectrophotometry: true,
  };
  return m[t];
}

export function bestDetects(t: ToxicologyMethod): string {
  const m: Record<ToxicologyMethod, string> = {
    immunoassay: "drug_classes_screening", gas_chromatography: "volatile_compounds",
    mass_spectrometry: "unknown_substances", hplc: "non_volatile_drugs",
    spectrophotometry: "known_compounds",
  };
  return m[t];
}

export function samplePrep(t: ToxicologyMethod): string {
  const m: Record<ToxicologyMethod, string> = {
    immunoassay: "minimal_dilution", gas_chromatography: "extraction_derivatization",
    mass_spectrometry: "extraction_ionization", hplc: "filtration_extraction",
    spectrophotometry: "dilution_reagent",
  };
  return m[t];
}

export function toxicologyMethods(): ToxicologyMethod[] {
  return ["immunoassay", "gas_chromatography", "mass_spectrometry", "hplc", "spectrophotometry"];
}
