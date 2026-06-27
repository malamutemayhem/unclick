export type MacrameDowelType = "wood_round_smooth" | "brass_pipe_modern" | "driftwood_branch_natural" | "copper_tube_rose" | "bamboo_pole_light";

export function hangStrength(t: MacrameDowelType): number {
  const m: Record<MacrameDowelType, number> = {
    wood_round_smooth: 8, brass_pipe_modern: 10, driftwood_branch_natural: 5, copper_tube_rose: 9, bamboo_pole_light: 6,
  };
  return m[t];
}

export function aesthetics(t: MacrameDowelType): number {
  const m: Record<MacrameDowelType, number> = {
    wood_round_smooth: 7, brass_pipe_modern: 9, driftwood_branch_natural: 10, copper_tube_rose: 9, bamboo_pole_light: 7,
  };
  return m[t];
}

export function weightBear(t: MacrameDowelType): number {
  const m: Record<MacrameDowelType, number> = {
    wood_round_smooth: 8, brass_pipe_modern: 10, driftwood_branch_natural: 4, copper_tube_rose: 9, bamboo_pole_light: 5,
  };
  return m[t];
}

export function cuttingEase(t: MacrameDowelType): number {
  const m: Record<MacrameDowelType, number> = {
    wood_round_smooth: 9, brass_pipe_modern: 5, driftwood_branch_natural: 3, copper_tube_rose: 6, bamboo_pole_light: 8,
  };
  return m[t];
}

export function dowelCost(t: MacrameDowelType): number {
  const m: Record<MacrameDowelType, number> = {
    wood_round_smooth: 1, brass_pipe_modern: 4, driftwood_branch_natural: 0, copper_tube_rose: 3, bamboo_pole_light: 1,
  };
  return m[t];
}

export function metallic(t: MacrameDowelType): boolean {
  const m: Record<MacrameDowelType, boolean> = {
    wood_round_smooth: false, brass_pipe_modern: true, driftwood_branch_natural: false, copper_tube_rose: true, bamboo_pole_light: false,
  };
  return m[t];
}

export function naturalShape(t: MacrameDowelType): boolean {
  const m: Record<MacrameDowelType, boolean> = {
    wood_round_smooth: false, brass_pipe_modern: false, driftwood_branch_natural: true, copper_tube_rose: false, bamboo_pole_light: false,
  };
  return m[t];
}

export function dowelMaterial(t: MacrameDowelType): string {
  const m: Record<MacrameDowelType, string> = {
    wood_round_smooth: "hardwood_birch_oak",
    brass_pipe_modern: "solid_brass_tube",
    driftwood_branch_natural: "weathered_beach_wood",
    copper_tube_rose: "copper_plumbing_tube",
    bamboo_pole_light: "dried_bamboo_cane",
  };
  return m[t];
}

export function bestStyle(t: MacrameDowelType): string {
  const m: Record<MacrameDowelType, string> = {
    wood_round_smooth: "classic_boho_hang",
    brass_pipe_modern: "modern_minimal_hang",
    driftwood_branch_natural: "coastal_organic_hang",
    copper_tube_rose: "industrial_rose_hang",
    bamboo_pole_light: "zen_natural_hang",
  };
  return m[t];
}

export function macrameDowels(): MacrameDowelType[] {
  return ["wood_round_smooth", "brass_pipe_modern", "driftwood_branch_natural", "copper_tube_rose", "bamboo_pole_light"];
}
