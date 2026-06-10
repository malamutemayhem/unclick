export type FeltNeedleType = "triangle_standard_general" | "star_point_fast" | "spiral_twist_smooth" | "reverse_barb_pull" | "crown_point_surface";

export function feltSpeed(t: FeltNeedleType): number {
  const m: Record<FeltNeedleType, number> = {
    triangle_standard_general: 7, star_point_fast: 10, spiral_twist_smooth: 6, reverse_barb_pull: 4, crown_point_surface: 5,
  };
  return m[t];
}

export function surfaceFinish(t: FeltNeedleType): number {
  const m: Record<FeltNeedleType, number> = {
    triangle_standard_general: 6, star_point_fast: 5, spiral_twist_smooth: 9, reverse_barb_pull: 8, crown_point_surface: 10,
  };
  return m[t];
}

export function detailWork(t: FeltNeedleType): number {
  const m: Record<FeltNeedleType, number> = {
    triangle_standard_general: 6, star_point_fast: 7, spiral_twist_smooth: 8, reverse_barb_pull: 5, crown_point_surface: 10,
  };
  return m[t];
}

export function breakResist(t: FeltNeedleType): number {
  const m: Record<FeltNeedleType, number> = {
    triangle_standard_general: 8, star_point_fast: 6, spiral_twist_smooth: 7, reverse_barb_pull: 7, crown_point_surface: 5,
  };
  return m[t];
}

export function needleCost(t: FeltNeedleType): number {
  const m: Record<FeltNeedleType, number> = {
    triangle_standard_general: 1, star_point_fast: 2, spiral_twist_smooth: 2, reverse_barb_pull: 3, crown_point_surface: 3,
  };
  return m[t];
}

export function pullsFiber(t: FeltNeedleType): boolean {
  const m: Record<FeltNeedleType, boolean> = {
    triangle_standard_general: false, star_point_fast: false, spiral_twist_smooth: false, reverse_barb_pull: true, crown_point_surface: false,
  };
  return m[t];
}

export function forBeginners(t: FeltNeedleType): boolean {
  const m: Record<FeltNeedleType, boolean> = {
    triangle_standard_general: true, star_point_fast: true, spiral_twist_smooth: false, reverse_barb_pull: false, crown_point_surface: false,
  };
  return m[t];
}

export function barbPattern(t: FeltNeedleType): string {
  const m: Record<FeltNeedleType, string> = {
    triangle_standard_general: "three_edge_notch",
    star_point_fast: "four_edge_notch",
    spiral_twist_smooth: "helical_groove_barb",
    reverse_barb_pull: "upward_facing_barb",
    crown_point_surface: "forked_tip_catch",
  };
  return m[t];
}

export function bestUse(t: FeltNeedleType): string {
  const m: Record<FeltNeedleType, string> = {
    triangle_standard_general: "general_shaping_bulk",
    star_point_fast: "fast_dense_sculpt",
    spiral_twist_smooth: "smooth_finish_blend",
    reverse_barb_pull: "fuzzy_texture_fur",
    crown_point_surface: "surface_detail_pattern",
  };
  return m[t];
}

export function feltNeedles(): FeltNeedleType[] {
  return ["triangle_standard_general", "star_point_fast", "spiral_twist_smooth", "reverse_barb_pull", "crown_point_surface"];
}
