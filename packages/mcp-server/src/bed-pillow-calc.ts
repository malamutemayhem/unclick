export type BedPillowType = "memory_foam_contour" | "down_feather_soft" | "latex_natural_firm" | "buckwheat_hull_adjust" | "gel_fiber_cooling";

export function support(t: BedPillowType): number {
  const m: Record<BedPillowType, number> = {
    memory_foam_contour: 9, down_feather_soft: 4, latex_natural_firm: 10, buckwheat_hull_adjust: 8, gel_fiber_cooling: 6,
  };
  return m[t];
}

export function softness(t: BedPillowType): number {
  const m: Record<BedPillowType, number> = {
    memory_foam_contour: 6, down_feather_soft: 10, latex_natural_firm: 3, buckwheat_hull_adjust: 2, gel_fiber_cooling: 8,
  };
  return m[t];
}

export function breathability(t: BedPillowType): number {
  const m: Record<BedPillowType, number> = {
    memory_foam_contour: 4, down_feather_soft: 7, latex_natural_firm: 8, buckwheat_hull_adjust: 10, gel_fiber_cooling: 9,
  };
  return m[t];
}

export function durability(t: BedPillowType): number {
  const m: Record<BedPillowType, number> = {
    memory_foam_contour: 7, down_feather_soft: 5, latex_natural_firm: 10, buckwheat_hull_adjust: 9, gel_fiber_cooling: 6,
  };
  return m[t];
}

export function pillowCost(t: BedPillowType): number {
  const m: Record<BedPillowType, number> = {
    memory_foam_contour: 6, down_feather_soft: 8, latex_natural_firm: 7, buckwheat_hull_adjust: 5, gel_fiber_cooling: 4,
  };
  return m[t];
}

export function hypoallergenic(t: BedPillowType): boolean {
  const m: Record<BedPillowType, boolean> = {
    memory_foam_contour: true, down_feather_soft: false, latex_natural_firm: true, buckwheat_hull_adjust: true, gel_fiber_cooling: true,
  };
  return m[t];
}

export function machineWash(t: BedPillowType): boolean {
  const m: Record<BedPillowType, boolean> = {
    memory_foam_contour: false, down_feather_soft: true, latex_natural_firm: false, buckwheat_hull_adjust: false, gel_fiber_cooling: true,
  };
  return m[t];
}

export function fillType(t: BedPillowType): string {
  const m: Record<BedPillowType, string> = {
    memory_foam_contour: "viscoelastic_foam_molded",
    down_feather_soft: "goose_down_cluster",
    latex_natural_firm: "talalay_latex_core",
    buckwheat_hull_adjust: "organic_buckwheat_hull",
    gel_fiber_cooling: "gel_infused_polyester",
  };
  return m[t];
}

export function bestSleeper(t: BedPillowType): string {
  const m: Record<BedPillowType, string> = {
    memory_foam_contour: "side_sleeper_neck_align",
    down_feather_soft: "stomach_sleeper_low_loft",
    latex_natural_firm: "back_sleeper_firm_support",
    buckwheat_hull_adjust: "custom_loft_any_position",
    gel_fiber_cooling: "hot_sleeper_cool_night",
  };
  return m[t];
}

export function bedPillows(): BedPillowType[] {
  return ["memory_foam_contour", "down_feather_soft", "latex_natural_firm", "buckwheat_hull_adjust", "gel_fiber_cooling"];
}
