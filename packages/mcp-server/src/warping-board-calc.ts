export type WarpingBoardType = "wall_mount_fixed" | "floor_stand_large" | "table_clamp_small" | "folding_travel_port" | "warping_mill_rotate";

export function warpLength(t: WarpingBoardType): number {
  const m: Record<WarpingBoardType, number> = {
    wall_mount_fixed: 8, floor_stand_large: 10, table_clamp_small: 5, folding_travel_port: 6, warping_mill_rotate: 10,
  };
  return m[t];
}

export function easeOfUse(t: WarpingBoardType): number {
  const m: Record<WarpingBoardType, number> = {
    wall_mount_fixed: 8, floor_stand_large: 7, table_clamp_small: 9, folding_travel_port: 7, warping_mill_rotate: 6,
  };
  return m[t];
}

export function portability(t: WarpingBoardType): number {
  const m: Record<WarpingBoardType, number> = {
    wall_mount_fixed: 2, floor_stand_large: 3, table_clamp_small: 8, folding_travel_port: 10, warping_mill_rotate: 3,
  };
  return m[t];
}

export function stability(t: WarpingBoardType): number {
  const m: Record<WarpingBoardType, number> = {
    wall_mount_fixed: 10, floor_stand_large: 9, table_clamp_small: 6, folding_travel_port: 5, warping_mill_rotate: 8,
  };
  return m[t];
}

export function boardCost(t: WarpingBoardType): number {
  const m: Record<WarpingBoardType, number> = {
    wall_mount_fixed: 3, floor_stand_large: 4, table_clamp_small: 2, folding_travel_port: 3, warping_mill_rotate: 5,
  };
  return m[t];
}

export function wallMount(t: WarpingBoardType): boolean {
  const m: Record<WarpingBoardType, boolean> = {
    wall_mount_fixed: true, floor_stand_large: false, table_clamp_small: false, folding_travel_port: false, warping_mill_rotate: false,
  };
  return m[t];
}

export function rotary(t: WarpingBoardType): boolean {
  const m: Record<WarpingBoardType, boolean> = {
    wall_mount_fixed: false, floor_stand_large: false, table_clamp_small: false, folding_travel_port: false, warping_mill_rotate: true,
  };
  return m[t];
}

export function boardMaterial(t: WarpingBoardType): string {
  const m: Record<WarpingBoardType, string> = {
    wall_mount_fixed: "hardwood_peg_board",
    floor_stand_large: "maple_frame_pegs",
    table_clamp_small: "birch_clamp_pegs",
    folding_travel_port: "pine_hinge_fold",
    warping_mill_rotate: "oak_drum_spindle",
  };
  return m[t];
}

export function bestUse(t: WarpingBoardType): string {
  const m: Record<WarpingBoardType, string> = {
    wall_mount_fixed: "home_studio_warp",
    floor_stand_large: "long_warp_project",
    table_clamp_small: "short_warp_sample",
    folding_travel_port: "travel_workshop_warp",
    warping_mill_rotate: "production_long_warp",
  };
  return m[t];
}

export function warpingBoards(): WarpingBoardType[] {
  return ["wall_mount_fixed", "floor_stand_large", "table_clamp_small", "folding_travel_port", "warping_mill_rotate"];
}
