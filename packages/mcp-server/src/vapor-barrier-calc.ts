export type VaporBarrier = "polyethylene" | "kraft_paper" | "foil_faced" | "smart_membrane" | "liquid_applied";

export function moistureResistance(v: VaporBarrier): number {
  const m: Record<VaporBarrier, number> = {
    polyethylene: 10, kraft_paper: 5, foil_faced: 9, smart_membrane: 7, liquid_applied: 8,
  };
  return m[v];
}

export function breathability(v: VaporBarrier): number {
  const m: Record<VaporBarrier, number> = {
    polyethylene: 1, kraft_paper: 5, foil_faced: 2, smart_membrane: 10, liquid_applied: 6,
  };
  return m[v];
}

export function installEase(v: VaporBarrier): number {
  const m: Record<VaporBarrier, number> = {
    polyethylene: 7, kraft_paper: 9, foil_faced: 6, smart_membrane: 5, liquid_applied: 4,
  };
  return m[v];
}

export function materialCost(v: VaporBarrier): number {
  const m: Record<VaporBarrier, number> = {
    polyethylene: 2, kraft_paper: 3, foil_faced: 6, smart_membrane: 9, liquid_applied: 8,
  };
  return m[v];
}

export function durabilityScore(v: VaporBarrier): number {
  const m: Record<VaporBarrier, number> = {
    polyethylene: 7, kraft_paper: 4, foil_faced: 8, smart_membrane: 9, liquid_applied: 8,
  };
  return m[v];
}

export function adaptivePermeance(v: VaporBarrier): boolean {
  const m: Record<VaporBarrier, boolean> = {
    polyethylene: false, kraft_paper: false, foil_faced: false, smart_membrane: true, liquid_applied: false,
  };
  return m[v];
}

export function seamless(v: VaporBarrier): boolean {
  const m: Record<VaporBarrier, boolean> = {
    polyethylene: false, kraft_paper: false, foil_faced: false, smart_membrane: false, liquid_applied: true,
  };
  return m[v];
}

export function permRating(v: VaporBarrier): string {
  const m: Record<VaporBarrier, string> = {
    polyethylene: "class_i_below_0_1", kraft_paper: "class_ii_0_1_to_1",
    foil_faced: "class_i_below_0_1", smart_membrane: "class_ii_variable",
    liquid_applied: "class_ii_0_5_to_1",
  };
  return m[v];
}

export function bestClimate(v: VaporBarrier): string {
  const m: Record<VaporBarrier, string> = {
    polyethylene: "cold_heating_dominant", kraft_paper: "moderate_mixed",
    foil_faced: "cold_with_radiant_benefit", smart_membrane: "mixed_humid_climate",
    liquid_applied: "retrofit_complex_geometry",
  };
  return m[v];
}

export function vaporBarriers(): VaporBarrier[] {
  return ["polyethylene", "kraft_paper", "foil_faced", "smart_membrane", "liquid_applied"];
}
