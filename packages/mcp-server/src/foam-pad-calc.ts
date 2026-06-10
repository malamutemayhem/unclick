export type FoamPadType = "high_density_firm" | "brush_mat_bristle" | "multi_surface_stack" | "finger_guard_thimble" | "clover_mat_travel";

export function needleProtect(t: FoamPadType): number {
  const m: Record<FoamPadType, number> = {
    high_density_firm: 8, brush_mat_bristle: 10, multi_surface_stack: 7, finger_guard_thimble: 3, clover_mat_travel: 6,
  };
  return m[t];
}

export function workSurface(t: FoamPadType): number {
  const m: Record<FoamPadType, number> = {
    high_density_firm: 8, brush_mat_bristle: 9, multi_surface_stack: 10, finger_guard_thimble: 2, clover_mat_travel: 6,
  };
  return m[t];
}

export function durability(t: FoamPadType): number {
  const m: Record<FoamPadType, number> = {
    high_density_firm: 6, brush_mat_bristle: 9, multi_surface_stack: 7, finger_guard_thimble: 10, clover_mat_travel: 5,
  };
  return m[t];
}

export function portability(t: FoamPadType): number {
  const m: Record<FoamPadType, number> = {
    high_density_firm: 6, brush_mat_bristle: 4, multi_surface_stack: 3, finger_guard_thimble: 10, clover_mat_travel: 9,
  };
  return m[t];
}

export function padCost(t: FoamPadType): number {
  const m: Record<FoamPadType, number> = {
    high_density_firm: 1, brush_mat_bristle: 3, multi_surface_stack: 2, finger_guard_thimble: 1, clover_mat_travel: 2,
  };
  return m[t];
}

export function reusable(t: FoamPadType): boolean {
  const m: Record<FoamPadType, boolean> = {
    high_density_firm: false, brush_mat_bristle: true, multi_surface_stack: true, finger_guard_thimble: true, clover_mat_travel: false,
  };
  return m[t];
}

export function wornOnHand(t: FoamPadType): boolean {
  const m: Record<FoamPadType, boolean> = {
    high_density_firm: false, brush_mat_bristle: false, multi_surface_stack: false, finger_guard_thimble: true, clover_mat_travel: false,
  };
  return m[t];
}

export function padMaterial(t: FoamPadType): string {
  const m: Record<FoamPadType, string> = {
    high_density_firm: "polyurethane_block",
    brush_mat_bristle: "nylon_bristle_base",
    multi_surface_stack: "layered_foam_stack",
    finger_guard_thimble: "leather_metal_cap",
    clover_mat_travel: "compressed_foam_sheet",
  };
  return m[t];
}

export function bestUse(t: FoamPadType): string {
  const m: Record<FoamPadType, string> = {
    high_density_firm: "flat_piece_shaping",
    brush_mat_bristle: "three_d_sculpt_all",
    multi_surface_stack: "large_project_base",
    finger_guard_thimble: "finger_safety_only",
    clover_mat_travel: "portable_small_work",
  };
  return m[t];
}

export function foamPads(): FoamPadType[] {
  return ["high_density_firm", "brush_mat_bristle", "multi_surface_stack", "finger_guard_thimble", "clover_mat_travel"];
}
