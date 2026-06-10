export type CarvingGougeType = "sweep_3_flat" | "sweep_7_medium" | "sweep_11_deep" | "fishtail_wide_end" | "spoon_bent_scoop";

export function cutDepth(t: CarvingGougeType): number {
  const m: Record<CarvingGougeType, number> = {
    sweep_3_flat: 3, sweep_7_medium: 7, sweep_11_deep: 10, fishtail_wide_end: 4, spoon_bent_scoop: 9,
  };
  return m[t];
}

export function controlFine(t: CarvingGougeType): number {
  const m: Record<CarvingGougeType, number> = {
    sweep_3_flat: 9, sweep_7_medium: 8, sweep_11_deep: 5, fishtail_wide_end: 10, spoon_bent_scoop: 6,
  };
  return m[t];
}

export function versatility(t: CarvingGougeType): number {
  const m: Record<CarvingGougeType, number> = {
    sweep_3_flat: 8, sweep_7_medium: 10, sweep_11_deep: 6, fishtail_wide_end: 7, spoon_bent_scoop: 5,
  };
  return m[t];
}

export function edgeHold(t: CarvingGougeType): number {
  const m: Record<CarvingGougeType, number> = {
    sweep_3_flat: 8, sweep_7_medium: 7, sweep_11_deep: 6, fishtail_wide_end: 7, spoon_bent_scoop: 9,
  };
  return m[t];
}

export function gougeCost(t: CarvingGougeType): number {
  const m: Record<CarvingGougeType, number> = {
    sweep_3_flat: 3, sweep_7_medium: 3, sweep_11_deep: 3, fishtail_wide_end: 4, spoon_bent_scoop: 4,
  };
  return m[t];
}

export function forRelief(t: CarvingGougeType): boolean {
  const m: Record<CarvingGougeType, boolean> = {
    sweep_3_flat: true, sweep_7_medium: true, sweep_11_deep: false, fishtail_wide_end: true, spoon_bent_scoop: false,
  };
  return m[t];
}

export function bentShaft(t: CarvingGougeType): boolean {
  const m: Record<CarvingGougeType, boolean> = {
    sweep_3_flat: false, sweep_7_medium: false, sweep_11_deep: false, fishtail_wide_end: false, spoon_bent_scoop: true,
  };
  return m[t];
}

export function steelType(t: CarvingGougeType): string {
  const m: Record<CarvingGougeType, string> = {
    sweep_3_flat: "high_carbon_forged",
    sweep_7_medium: "high_carbon_forged",
    sweep_11_deep: "high_carbon_forged",
    fishtail_wide_end: "tool_steel_ground",
    spoon_bent_scoop: "spring_steel_bent",
  };
  return m[t];
}

export function bestUse(t: CarvingGougeType): string {
  const m: Record<CarvingGougeType, string> = {
    sweep_3_flat: "smooth_flat_surface",
    sweep_7_medium: "general_carving_shape",
    sweep_11_deep: "deep_channel_groove",
    fishtail_wide_end: "tight_corner_clean",
    spoon_bent_scoop: "hollow_bowl_carve",
  };
  return m[t];
}

export function carvingGouges(): CarvingGougeType[] {
  return ["sweep_3_flat", "sweep_7_medium", "sweep_11_deep", "fishtail_wide_end", "spoon_bent_scoop"];
}
