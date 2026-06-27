export type LaptopStandType = "aluminum_riser" | "adjustable_arm" | "wooden_minimalist" | "cooling_fan_base" | "portable_fold_flat";

export function ergonomicLift(t: LaptopStandType): number {
  const m: Record<LaptopStandType, number> = {
    aluminum_riser: 7, adjustable_arm: 10, wooden_minimalist: 6, cooling_fan_base: 5, portable_fold_flat: 8,
  };
  return m[t];
}

export function stability(t: LaptopStandType): number {
  const m: Record<LaptopStandType, number> = {
    aluminum_riser: 9, adjustable_arm: 7, wooden_minimalist: 8, cooling_fan_base: 6, portable_fold_flat: 4,
  };
  return m[t];
}

export function heatDissipation(t: LaptopStandType): number {
  const m: Record<LaptopStandType, number> = {
    aluminum_riser: 8, adjustable_arm: 5, wooden_minimalist: 3, cooling_fan_base: 10, portable_fold_flat: 6,
  };
  return m[t];
}

export function portability(t: LaptopStandType): number {
  const m: Record<LaptopStandType, number> = {
    aluminum_riser: 4, adjustable_arm: 2, wooden_minimalist: 5, cooling_fan_base: 3, portable_fold_flat: 10,
  };
  return m[t];
}

export function standCost(t: LaptopStandType): number {
  const m: Record<LaptopStandType, number> = {
    aluminum_riser: 5, adjustable_arm: 9, wooden_minimalist: 6, cooling_fan_base: 4, portable_fold_flat: 3,
  };
  return m[t];
}

export function heightAdjustable(t: LaptopStandType): boolean {
  const m: Record<LaptopStandType, boolean> = {
    aluminum_riser: false, adjustable_arm: true, wooden_minimalist: false, cooling_fan_base: false, portable_fold_flat: true,
  };
  return m[t];
}

export function activeCooling(t: LaptopStandType): boolean {
  const m: Record<LaptopStandType, boolean> = {
    aluminum_riser: false, adjustable_arm: false, wooden_minimalist: false, cooling_fan_base: true, portable_fold_flat: false,
  };
  return m[t];
}

export function frameMaterial(t: LaptopStandType): string {
  const m: Record<LaptopStandType, string> = {
    aluminum_riser: "cnc_aluminum_unibody",
    adjustable_arm: "steel_arm_clamp_mount",
    wooden_minimalist: "bamboo_walnut_plywood",
    cooling_fan_base: "plastic_mesh_fan_tray",
    portable_fold_flat: "abs_hinge_fold_legs",
  };
  return m[t];
}

export function bestSetup(t: LaptopStandType): string {
  const m: Record<LaptopStandType, string> = {
    aluminum_riser: "home_office_dual_screen",
    adjustable_arm: "standing_desk_float",
    wooden_minimalist: "cafe_aesthetic_desk",
    cooling_fan_base: "gaming_heavy_workload",
    portable_fold_flat: "travel_cowork_nomad",
  };
  return m[t];
}

export function laptopStands(): LaptopStandType[] {
  return ["aluminum_riser", "adjustable_arm", "wooden_minimalist", "cooling_fan_base", "portable_fold_flat"];
}
