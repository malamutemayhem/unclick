export type ChromatographyMethod = "hplc" | "gas_chromatography" | "thin_layer" | "ion_exchange" | "size_exclusion";

export function separationResolution(c: ChromatographyMethod): number {
  const m: Record<ChromatographyMethod, number> = {
    hplc: 10, gas_chromatography: 9, thin_layer: 4, ion_exchange: 7, size_exclusion: 6,
  };
  return m[c];
}

export function analysisSpeed(c: ChromatographyMethod): number {
  const m: Record<ChromatographyMethod, number> = {
    hplc: 7, gas_chromatography: 9, thin_layer: 5, ion_exchange: 4, size_exclusion: 3,
  };
  return m[c];
}

export function sampleThroughput(c: ChromatographyMethod): number {
  const m: Record<ChromatographyMethod, number> = {
    hplc: 8, gas_chromatography: 9, thin_layer: 10, ion_exchange: 5, size_exclusion: 4,
  };
  return m[c];
}

export function equipmentCost(c: ChromatographyMethod): number {
  const m: Record<ChromatographyMethod, number> = {
    hplc: 9, gas_chromatography: 8, thin_layer: 2, ion_exchange: 7, size_exclusion: 6,
  };
  return m[c];
}

export function sensitivity(c: ChromatographyMethod): number {
  const m: Record<ChromatographyMethod, number> = {
    hplc: 9, gas_chromatography: 10, thin_layer: 3, ion_exchange: 6, size_exclusion: 5,
  };
  return m[c];
}

export function requiresVolatileSample(c: ChromatographyMethod): boolean {
  const m: Record<ChromatographyMethod, boolean> = {
    hplc: false, gas_chromatography: true, thin_layer: false, ion_exchange: false, size_exclusion: false,
  };
  return m[c];
}

export function quantitative(c: ChromatographyMethod): boolean {
  const m: Record<ChromatographyMethod, boolean> = {
    hplc: true, gas_chromatography: true, thin_layer: false, ion_exchange: true, size_exclusion: true,
  };
  return m[c];
}

export function detectorType(c: ChromatographyMethod): string {
  const m: Record<ChromatographyMethod, string> = {
    hplc: "uv_vis_diode_array", gas_chromatography: "flame_ionization_mass_spec",
    thin_layer: "visual_uv_lamp", ion_exchange: "conductivity_detector",
    size_exclusion: "refractive_index",
  };
  return m[c];
}

export function bestApplication(c: ChromatographyMethod): string {
  const m: Record<ChromatographyMethod, string> = {
    hplc: "pharmaceutical_purity", gas_chromatography: "volatile_organic_analysis",
    thin_layer: "quick_screening_natural_product", ion_exchange: "water_treatment_protein",
    size_exclusion: "polymer_molecular_weight",
  };
  return m[c];
}

export function chromatographyMethods(): ChromatographyMethod[] {
  return ["hplc", "gas_chromatography", "thin_layer", "ion_exchange", "size_exclusion"];
}
