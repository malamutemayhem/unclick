export type EyeMaskType = "silk_contoured" | "memory_foam_molded" | "cooling_gel_insert" | "weighted_pressure" | "light_block_travel";

export function lightBlock(t: EyeMaskType): number {
  const m: Record<EyeMaskType, number> = {
    silk_contoured: 8, memory_foam_molded: 10, cooling_gel_insert: 7, weighted_pressure: 9, light_block_travel: 9,
  };
  return m[t];
}

export function comfort(t: EyeMaskType): number {
  const m: Record<EyeMaskType, number> = {
    silk_contoured: 10, memory_foam_molded: 8, cooling_gel_insert: 7, weighted_pressure: 9, light_block_travel: 6,
  };
  return m[t];
}

export function breathability(t: EyeMaskType): number {
  const m: Record<EyeMaskType, number> = {
    silk_contoured: 9, memory_foam_molded: 5, cooling_gel_insert: 4, weighted_pressure: 6, light_block_travel: 7,
  };
  return m[t];
}

export function portability(t: EyeMaskType): number {
  const m: Record<EyeMaskType, number> = {
    silk_contoured: 9, memory_foam_molded: 5, cooling_gel_insert: 4, weighted_pressure: 3, light_block_travel: 10,
  };
  return m[t];
}

export function maskCost(t: EyeMaskType): number {
  const m: Record<EyeMaskType, number> = {
    silk_contoured: 7, memory_foam_molded: 6, cooling_gel_insert: 5, weighted_pressure: 8, light_block_travel: 3,
  };
  return m[t];
}

export function washable(t: EyeMaskType): boolean {
  const m: Record<EyeMaskType, boolean> = {
    silk_contoured: true, memory_foam_molded: false, cooling_gel_insert: false, weighted_pressure: true, light_block_travel: true,
  };
  return m[t];
}

export function adjustableStrap(t: EyeMaskType): boolean {
  const m: Record<EyeMaskType, boolean> = {
    silk_contoured: true, memory_foam_molded: true, cooling_gel_insert: true, weighted_pressure: true, light_block_travel: true,
  };
  return m[t];
}

export function maskMaterial(t: EyeMaskType): string {
  const m: Record<EyeMaskType, string> = {
    silk_contoured: "mulberry_silk_contour_cup",
    memory_foam_molded: "viscoelastic_foam_velvet",
    cooling_gel_insert: "gel_bead_lycra_shell",
    weighted_pressure: "micro_glass_bead_cotton",
    light_block_travel: "nylon_blackout_compact_fold",
  };
  return m[t];
}

export function bestUse(t: EyeMaskType): string {
  const m: Record<EyeMaskType, string> = {
    silk_contoured: "nightly_sleep_luxury",
    memory_foam_molded: "side_sleeper_zero_pressure",
    cooling_gel_insert: "migraine_puffy_eye_relief",
    weighted_pressure: "anxiety_calm_deep_rest",
    light_block_travel: "airplane_hotel_on_the_go",
  };
  return m[t];
}

export function eyeMasks(): EyeMaskType[] {
  return ["silk_contoured", "memory_foam_molded", "cooling_gel_insert", "weighted_pressure", "light_block_travel"];
}
