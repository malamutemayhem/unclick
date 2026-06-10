export type StabilityDiscType = "inflatable_wobble_cushion" | "balance_pad_foam" | "rocker_board_round" | "bosu_half_ball" | "air_filled_disc_textured";

export function balanceChallenge(t: StabilityDiscType): number {
  const m: Record<StabilityDiscType, number> = {
    inflatable_wobble_cushion: 7, balance_pad_foam: 5, rocker_board_round: 8, bosu_half_ball: 9, air_filled_disc_textured: 6,
  };
  return m[t];
}

export function seatComfort(t: StabilityDiscType): number {
  const m: Record<StabilityDiscType, number> = {
    inflatable_wobble_cushion: 9, balance_pad_foam: 8, rocker_board_round: 3, bosu_half_ball: 4, air_filled_disc_textured: 8,
  };
  return m[t];
}

export function portability(t: StabilityDiscType): number {
  const m: Record<StabilityDiscType, number> = {
    inflatable_wobble_cushion: 9, balance_pad_foam: 7, rocker_board_round: 5, bosu_half_ball: 4, air_filled_disc_textured: 9,
  };
  return m[t];
}

export function exerciseRange(t: StabilityDiscType): number {
  const m: Record<StabilityDiscType, number> = {
    inflatable_wobble_cushion: 6, balance_pad_foam: 7, rocker_board_round: 7, bosu_half_ball: 10, air_filled_disc_textured: 5,
  };
  return m[t];
}

export function discCost(t: StabilityDiscType): number {
  const m: Record<StabilityDiscType, number> = {
    inflatable_wobble_cushion: 1, balance_pad_foam: 1, rocker_board_round: 2, bosu_half_ball: 3, air_filled_disc_textured: 1,
  };
  return m[t];
}

export function adjustableFirmness(t: StabilityDiscType): boolean {
  const m: Record<StabilityDiscType, boolean> = {
    inflatable_wobble_cushion: true, balance_pad_foam: false, rocker_board_round: false, bosu_half_ball: true, air_filled_disc_textured: true,
  };
  return m[t];
}

export function dualSide(t: StabilityDiscType): boolean {
  const m: Record<StabilityDiscType, boolean> = {
    inflatable_wobble_cushion: true, balance_pad_foam: false, rocker_board_round: false, bosu_half_ball: true, air_filled_disc_textured: true,
  };
  return m[t];
}

export function surfaceType(t: StabilityDiscType): string {
  const m: Record<StabilityDiscType, string> = {
    inflatable_wobble_cushion: "nub_textured_pvc",
    balance_pad_foam: "closed_cell_tpe_foam",
    rocker_board_round: "wood_grip_tape_top",
    bosu_half_ball: "rubber_dome_flat_base",
    air_filled_disc_textured: "smooth_ridged_pvc",
  };
  return m[t];
}

export function bestUse(t: StabilityDiscType): string {
  const m: Record<StabilityDiscType, string> = {
    inflatable_wobble_cushion: "active_sitting_posture",
    balance_pad_foam: "ankle_rehab_proprioception",
    rocker_board_round: "skateboard_surf_prep",
    bosu_half_ball: "full_body_balance_train",
    air_filled_disc_textured: "desk_chair_core_engage",
  };
  return m[t];
}

export function stabilityDiscs(): StabilityDiscType[] {
  return ["inflatable_wobble_cushion", "balance_pad_foam", "rocker_board_round", "bosu_half_ball", "air_filled_disc_textured"];
}
