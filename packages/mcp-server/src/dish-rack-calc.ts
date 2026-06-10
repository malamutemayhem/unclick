export type DishRackType = "two_tier_steel_drain" | "collapsible_silicone_fold" | "over_sink_adjustable" | "bamboo_wooden_air" | "wall_mount_vertical";

export function capacity(t: DishRackType): number {
  const m: Record<DishRackType, number> = {
    two_tier_steel_drain: 10, collapsible_silicone_fold: 5, over_sink_adjustable: 8, bamboo_wooden_air: 7, wall_mount_vertical: 6,
  };
  return m[t];
}

export function drainEfficiency(t: DishRackType): number {
  const m: Record<DishRackType, number> = {
    two_tier_steel_drain: 9, collapsible_silicone_fold: 6, over_sink_adjustable: 10, bamboo_wooden_air: 5, wall_mount_vertical: 8,
  };
  return m[t];
}

export function spaceEfficiency(t: DishRackType): number {
  const m: Record<DishRackType, number> = {
    two_tier_steel_drain: 5, collapsible_silicone_fold: 9, over_sink_adjustable: 10, bamboo_wooden_air: 6, wall_mount_vertical: 10,
  };
  return m[t];
}

export function aesthetics(t: DishRackType): number {
  const m: Record<DishRackType, number> = {
    two_tier_steel_drain: 5, collapsible_silicone_fold: 6, over_sink_adjustable: 7, bamboo_wooden_air: 10, wall_mount_vertical: 8,
  };
  return m[t];
}

export function rackCost(t: DishRackType): number {
  const m: Record<DishRackType, number> = {
    two_tier_steel_drain: 5, collapsible_silicone_fold: 4, over_sink_adjustable: 7, bamboo_wooden_air: 6, wall_mount_vertical: 8,
  };
  return m[t];
}

export function foldable(t: DishRackType): boolean {
  const m: Record<DishRackType, boolean> = {
    two_tier_steel_drain: false, collapsible_silicone_fold: true, over_sink_adjustable: false, bamboo_wooden_air: false, wall_mount_vertical: false,
  };
  return m[t];
}

export function hasDrainBoard(t: DishRackType): boolean {
  const m: Record<DishRackType, boolean> = {
    two_tier_steel_drain: true, collapsible_silicone_fold: false, over_sink_adjustable: false, bamboo_wooden_air: true, wall_mount_vertical: false,
  };
  return m[t];
}

export function frameMaterial(t: DishRackType): string {
  const m: Record<DishRackType, string> = {
    two_tier_steel_drain: "chrome_plated_steel",
    collapsible_silicone_fold: "silicone_coated_steel",
    over_sink_adjustable: "stainless_steel_304",
    bamboo_wooden_air: "moso_bamboo_oiled",
    wall_mount_vertical: "powder_coated_aluminum",
  };
  return m[t];
}

export function bestKitchen(t: DishRackType): string {
  const m: Record<DishRackType, string> = {
    two_tier_steel_drain: "large_family_kitchen",
    collapsible_silicone_fold: "tiny_kitchen_rv_camp",
    over_sink_adjustable: "small_counter_maximize",
    bamboo_wooden_air: "modern_farmhouse_style",
    wall_mount_vertical: "commercial_restaurant",
  };
  return m[t];
}

export function dishRacks(): DishRackType[] {
  return ["two_tier_steel_drain", "collapsible_silicone_fold", "over_sink_adjustable", "bamboo_wooden_air", "wall_mount_vertical"];
}
