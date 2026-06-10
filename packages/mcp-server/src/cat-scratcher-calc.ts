export type CatScratcherType = "cardboard_pad_flat" | "sisal_post_vertical" | "carpet_ramp_incline" | "tree_tower_multi" | "wall_mount_shelf";

export function scratchSatisfaction(t: CatScratcherType): number {
  const m: Record<CatScratcherType, number> = {
    cardboard_pad_flat: 7, sisal_post_vertical: 9, carpet_ramp_incline: 6, tree_tower_multi: 10, wall_mount_shelf: 8,
  };
  return m[t];
}

export function durability(t: CatScratcherType): number {
  const m: Record<CatScratcherType, number> = {
    cardboard_pad_flat: 3, sisal_post_vertical: 8, carpet_ramp_incline: 6, tree_tower_multi: 9, wall_mount_shelf: 10,
  };
  return m[t];
}

export function spaceEfficiency(t: CatScratcherType): number {
  const m: Record<CatScratcherType, number> = {
    cardboard_pad_flat: 9, sisal_post_vertical: 7, carpet_ramp_incline: 5, tree_tower_multi: 3, wall_mount_shelf: 10,
  };
  return m[t];
}

export function catEngagement(t: CatScratcherType): number {
  const m: Record<CatScratcherType, number> = {
    cardboard_pad_flat: 6, sisal_post_vertical: 8, carpet_ramp_incline: 5, tree_tower_multi: 10, wall_mount_shelf: 7,
  };
  return m[t];
}

export function scratcherCost(t: CatScratcherType): number {
  const m: Record<CatScratcherType, number> = {
    cardboard_pad_flat: 2, sisal_post_vertical: 5, carpet_ramp_incline: 4, tree_tower_multi: 9, wall_mount_shelf: 7,
  };
  return m[t];
}

export function replaceable(t: CatScratcherType): boolean {
  const m: Record<CatScratcherType, boolean> = {
    cardboard_pad_flat: true, sisal_post_vertical: true, carpet_ramp_incline: false, tree_tower_multi: true, wall_mount_shelf: false,
  };
  return m[t];
}

export function multiCatFriendly(t: CatScratcherType): boolean {
  const m: Record<CatScratcherType, boolean> = {
    cardboard_pad_flat: false, sisal_post_vertical: false, carpet_ramp_incline: false, tree_tower_multi: true, wall_mount_shelf: true,
  };
  return m[t];
}

export function surfaceMaterial(t: CatScratcherType): string {
  const m: Record<CatScratcherType, string> = {
    cardboard_pad_flat: "corrugated_recycled_card",
    sisal_post_vertical: "natural_sisal_rope",
    carpet_ramp_incline: "looped_berber_carpet",
    tree_tower_multi: "sisal_carpet_plush_combo",
    wall_mount_shelf: "solid_wood_sisal_wrap",
  };
  return m[t];
}

export function bestCat(t: CatScratcherType): string {
  const m: Record<CatScratcherType, string> = {
    cardboard_pad_flat: "budget_casual_scratcher",
    sisal_post_vertical: "active_stretching_cat",
    carpet_ramp_incline: "older_low_mobility",
    tree_tower_multi: "energetic_multi_cat_home",
    wall_mount_shelf: "small_apartment_climber",
  };
  return m[t];
}

export function catScratchers(): CatScratcherType[] {
  return ["cardboard_pad_flat", "sisal_post_vertical", "carpet_ramp_incline", "tree_tower_multi", "wall_mount_shelf"];
}
