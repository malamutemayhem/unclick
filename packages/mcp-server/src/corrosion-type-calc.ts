export type CorrosionType = "uniform" | "pitting" | "crevice" | "galvanic" | "stress_corrosion";

export function damageRate(c: CorrosionType): number {
  const m: Record<CorrosionType, number> = {
    uniform: 4, pitting: 9, crevice: 7, galvanic: 6, stress_corrosion: 10,
  };
  return m[c];
}

export function detectability(c: CorrosionType): number {
  const m: Record<CorrosionType, number> = {
    uniform: 9, pitting: 3, crevice: 4, galvanic: 7, stress_corrosion: 2,
  };
  return m[c];
}

export function predictability(c: CorrosionType): number {
  const m: Record<CorrosionType, number> = {
    uniform: 9, pitting: 2, crevice: 4, galvanic: 7, stress_corrosion: 3,
  };
  return m[c];
}

export function structuralRisk(c: CorrosionType): number {
  const m: Record<CorrosionType, number> = {
    uniform: 3, pitting: 8, crevice: 6, galvanic: 5, stress_corrosion: 10,
  };
  return m[c];
}

export function preventionCost(c: CorrosionType): number {
  const m: Record<CorrosionType, number> = {
    uniform: 3, pitting: 7, crevice: 6, galvanic: 4, stress_corrosion: 9,
  };
  return m[c];
}

export function requiresMechanicalStress(c: CorrosionType): boolean {
  const m: Record<CorrosionType, boolean> = {
    uniform: false, pitting: false, crevice: false, galvanic: false, stress_corrosion: true,
  };
  return m[c];
}

export function localized(c: CorrosionType): boolean {
  const m: Record<CorrosionType, boolean> = {
    uniform: false, pitting: true, crevice: true, galvanic: true, stress_corrosion: true,
  };
  return m[c];
}

export function commonEnvironment(c: CorrosionType): string {
  const m: Record<CorrosionType, string> = {
    uniform: "atmospheric_exposure", pitting: "chloride_solutions",
    crevice: "stagnant_fluid_gaps", galvanic: "dissimilar_metal_joints",
    stress_corrosion: "hot_caustic_chloride",
  };
  return m[c];
}

export function preventionMethod(c: CorrosionType): string {
  const m: Record<CorrosionType, string> = {
    uniform: "protective_coating", pitting: "molybdenum_alloy",
    crevice: "seal_crevices", galvanic: "insulate_metals",
    stress_corrosion: "stress_relief_annealing",
  };
  return m[c];
}

export function corrosionTypes(): CorrosionType[] {
  return ["uniform", "pitting", "crevice", "galvanic", "stress_corrosion"];
}
