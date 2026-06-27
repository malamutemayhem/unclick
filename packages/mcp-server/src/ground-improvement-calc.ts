export type GroundImprovement = "vibro_compaction" | "dynamic_compaction" | "grouting" | "soil_mixing" | "preloading";

export function depthEffectiveness(g: GroundImprovement): number {
  const m: Record<GroundImprovement, number> = {
    vibro_compaction: 8, dynamic_compaction: 6, grouting: 10, soil_mixing: 9, preloading: 4,
  };
  return m[g];
}

export function treatmentSpeed(g: GroundImprovement): number {
  const m: Record<GroundImprovement, number> = {
    vibro_compaction: 7, dynamic_compaction: 8, grouting: 5, soil_mixing: 6, preloading: 2,
  };
  return m[g];
}

export function strengthGain(g: GroundImprovement): number {
  const m: Record<GroundImprovement, number> = {
    vibro_compaction: 7, dynamic_compaction: 6, grouting: 9, soil_mixing: 10, preloading: 5,
  };
  return m[g];
}

export function environmentalImpact(g: GroundImprovement): number {
  const m: Record<GroundImprovement, number> = {
    vibro_compaction: 5, dynamic_compaction: 8, grouting: 4, soil_mixing: 3, preloading: 2,
  };
  return m[g];
}

export function projectCost(g: GroundImprovement): number {
  const m: Record<GroundImprovement, number> = {
    vibro_compaction: 6, dynamic_compaction: 5, grouting: 9, soil_mixing: 8, preloading: 3,
  };
  return m[g];
}

export function requiresSpecialistRig(g: GroundImprovement): boolean {
  const m: Record<GroundImprovement, boolean> = {
    vibro_compaction: true, dynamic_compaction: false, grouting: true, soil_mixing: true, preloading: false,
  };
  return m[g];
}

export function suitableForClay(g: GroundImprovement): boolean {
  const m: Record<GroundImprovement, boolean> = {
    vibro_compaction: false, dynamic_compaction: false, grouting: true, soil_mixing: true, preloading: true,
  };
  return m[g];
}

export function mechanism(g: GroundImprovement): string {
  const m: Record<GroundImprovement, string> = {
    vibro_compaction: "vibratory_probe_densification", dynamic_compaction: "heavy_weight_drop_impact",
    grouting: "cementite_slurry_injection", soil_mixing: "auger_binder_blend",
    preloading: "surcharge_fill_consolidation",
  };
  return m[g];
}

export function bestSoilType(g: GroundImprovement): string {
  const m: Record<GroundImprovement, string> = {
    vibro_compaction: "loose_granular_sand", dynamic_compaction: "fill_rubble_loose_sand",
    grouting: "fractured_rock_void_fill", soil_mixing: "soft_clay_organic_soil",
    preloading: "compressible_clay_silt",
  };
  return m[g];
}

export function groundImprovements(): GroundImprovement[] {
  return ["vibro_compaction", "dynamic_compaction", "grouting", "soil_mixing", "preloading"];
}
