export type DrywallScrewType = "fine_thread_steel" | "coarse_thread_wood" | "self_drilling_metal" | "trim_head_small" | "cement_board_notched";

export function holdPower(t: DrywallScrewType): number {
  const m: Record<DrywallScrewType, number> = {
    fine_thread_steel: 8, coarse_thread_wood: 7, self_drilling_metal: 9, trim_head_small: 5, cement_board_notched: 10,
  };
  return m[t];
}

export function driveEase(t: DrywallScrewType): number {
  const m: Record<DrywallScrewType, number> = {
    fine_thread_steel: 8, coarse_thread_wood: 9, self_drilling_metal: 7, trim_head_small: 8, cement_board_notched: 5,
  };
  return m[t];
}

export function headConcealment(t: DrywallScrewType): number {
  const m: Record<DrywallScrewType, number> = {
    fine_thread_steel: 8, coarse_thread_wood: 8, self_drilling_metal: 7, trim_head_small: 10, cement_board_notched: 6,
  };
  return m[t];
}

export function stripResist(t: DrywallScrewType): number {
  const m: Record<DrywallScrewType, number> = {
    fine_thread_steel: 7, coarse_thread_wood: 6, self_drilling_metal: 9, trim_head_small: 5, cement_board_notched: 10,
  };
  return m[t];
}

export function screwCost(t: DrywallScrewType): number {
  const m: Record<DrywallScrewType, number> = {
    fine_thread_steel: 3, coarse_thread_wood: 3, self_drilling_metal: 6, trim_head_small: 5, cement_board_notched: 7,
  };
  return m[t];
}

export function needsPilotHole(t: DrywallScrewType): boolean {
  const m: Record<DrywallScrewType, boolean> = {
    fine_thread_steel: false, coarse_thread_wood: false, self_drilling_metal: false, trim_head_small: false, cement_board_notched: true,
  };
  return m[t];
}

export function rustResistant(t: DrywallScrewType): boolean {
  const m: Record<DrywallScrewType, boolean> = {
    fine_thread_steel: false, coarse_thread_wood: false, self_drilling_metal: true, trim_head_small: false, cement_board_notched: true,
  };
  return m[t];
}

export function threadPattern(t: DrywallScrewType): string {
  const m: Record<DrywallScrewType, string> = {
    fine_thread_steel: "fine_pitch_metal_stud",
    coarse_thread_wood: "coarse_pitch_wood_stud",
    self_drilling_metal: "drill_point_flute_tip",
    trim_head_small: "fine_thread_small_bugle",
    cement_board_notched: "hi_lo_notched_wafer",
  };
  return m[t];
}

export function bestSubstrate(t: DrywallScrewType): string {
  const m: Record<DrywallScrewType, string> = {
    fine_thread_steel: "metal_stud_framing",
    coarse_thread_wood: "wood_stud_framing",
    self_drilling_metal: "steel_joist_deck",
    trim_head_small: "finish_trim_corner_bead",
    cement_board_notched: "tile_backer_wet_area",
  };
  return m[t];
}

export function drywallScrews(): DrywallScrewType[] {
  return ["fine_thread_steel", "coarse_thread_wood", "self_drilling_metal", "trim_head_small", "cement_board_notched"];
}
