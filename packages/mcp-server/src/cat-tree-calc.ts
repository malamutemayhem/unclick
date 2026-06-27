export type CatTreeType = "tall_tower_condo" | "wall_mounted_shelf" | "window_perch" | "scratching_post_sisal" | "modern_furniture_blend";

export function climbHeight(t: CatTreeType): number {
  const m: Record<CatTreeType, number> = {
    tall_tower_condo: 10, wall_mounted_shelf: 8, window_perch: 3, scratching_post_sisal: 4, modern_furniture_blend: 6,
  };
  return m[t];
}

export function scratchSurface(t: CatTreeType): number {
  const m: Record<CatTreeType, number> = {
    tall_tower_condo: 8, wall_mounted_shelf: 4, window_perch: 2, scratching_post_sisal: 10, modern_furniture_blend: 6,
  };
  return m[t];
}

export function floorSpace(t: CatTreeType): number {
  const m: Record<CatTreeType, number> = {
    tall_tower_condo: 3, wall_mounted_shelf: 10, window_perch: 10, scratching_post_sisal: 8, modern_furniture_blend: 6,
  };
  return m[t];
}

export function hidingSpots(t: CatTreeType): number {
  const m: Record<CatTreeType, number> = {
    tall_tower_condo: 10, wall_mounted_shelf: 3, window_perch: 2, scratching_post_sisal: 1, modern_furniture_blend: 7,
  };
  return m[t];
}

export function treeCost(t: CatTreeType): number {
  const m: Record<CatTreeType, number> = {
    tall_tower_condo: 7, wall_mounted_shelf: 6, window_perch: 2, scratching_post_sisal: 3, modern_furniture_blend: 9,
  };
  return m[t];
}

export function multiCat(t: CatTreeType): boolean {
  const m: Record<CatTreeType, boolean> = {
    tall_tower_condo: true, wall_mounted_shelf: true, window_perch: false, scratching_post_sisal: false, modern_furniture_blend: true,
  };
  return m[t];
}

export function wallMount(t: CatTreeType): boolean {
  const m: Record<CatTreeType, boolean> = {
    tall_tower_condo: false, wall_mounted_shelf: true, window_perch: false, scratching_post_sisal: false, modern_furniture_blend: false,
  };
  return m[t];
}

export function mainMaterial(t: CatTreeType): string {
  const m: Record<CatTreeType, string> = {
    tall_tower_condo: "carpet_sisal_particle_board",
    wall_mounted_shelf: "solid_wood_sisal_step",
    window_perch: "suction_cup_hammock_pad",
    scratching_post_sisal: "sisal_rope_wrapped_post",
    modern_furniture_blend: "wood_veneer_fabric_pad",
  };
  return m[t];
}

export function bestCat(t: CatTreeType): string {
  const m: Record<CatTreeType, string> = {
    tall_tower_condo: "active_multi_cat_household",
    wall_mounted_shelf: "small_apartment_vertical",
    window_perch: "bird_watcher_sun_napper",
    scratching_post_sisal: "furniture_saver_scratcher",
    modern_furniture_blend: "design_conscious_owner",
  };
  return m[t];
}

export function catTrees(): CatTreeType[] {
  return ["tall_tower_condo", "wall_mounted_shelf", "window_perch", "scratching_post_sisal", "modern_furniture_blend"];
}
