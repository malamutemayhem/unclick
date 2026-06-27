export type BalanceBoardType = "rocker_flat" | "wobble_round" | "roller_cylinder" | "spring_trainer" | "standing_desk_active";

export function balanceChallenge(t: BalanceBoardType): number {
  const m: Record<BalanceBoardType, number> = {
    rocker_flat: 4, wobble_round: 7, roller_cylinder: 10, spring_trainer: 8, standing_desk_active: 3,
  };
  return m[t];
}

export function stabilityCore(t: BalanceBoardType): number {
  const m: Record<BalanceBoardType, number> = {
    rocker_flat: 6, wobble_round: 9, roller_cylinder: 10, spring_trainer: 8, standing_desk_active: 5,
  };
  return m[t];
}

export function beginnerFriendly(t: BalanceBoardType): number {
  const m: Record<BalanceBoardType, number> = {
    rocker_flat: 10, wobble_round: 6, roller_cylinder: 2, spring_trainer: 5, standing_desk_active: 9,
  };
  return m[t];
}

export function deckSize(t: BalanceBoardType): number {
  const m: Record<BalanceBoardType, number> = {
    rocker_flat: 7, wobble_round: 5, roller_cylinder: 9, spring_trainer: 6, standing_desk_active: 8,
  };
  return m[t];
}

export function boardCost(t: BalanceBoardType): number {
  const m: Record<BalanceBoardType, number> = {
    rocker_flat: 2, wobble_round: 3, roller_cylinder: 6, spring_trainer: 8, standing_desk_active: 5,
  };
  return m[t];
}

export function multiAxis(t: BalanceBoardType): boolean {
  const m: Record<BalanceBoardType, boolean> = {
    rocker_flat: false, wobble_round: true, roller_cylinder: false, spring_trainer: true, standing_desk_active: true,
  };
  return m[t];
}

export function antiSlipDeck(t: BalanceBoardType): boolean {
  const m: Record<BalanceBoardType, boolean> = {
    rocker_flat: true, wobble_round: true, roller_cylinder: true, spring_trainer: true, standing_desk_active: true,
  };
  return m[t];
}

export function fulcrumType(t: BalanceBoardType): string {
  const m: Record<BalanceBoardType, string> = {
    rocker_flat: "fixed_curved_rail",
    wobble_round: "half_sphere_dome",
    roller_cylinder: "separate_cylinder_tube",
    spring_trainer: "coil_spring_base",
    standing_desk_active: "cushioned_dome_low",
  };
  return m[t];
}

export function bestActivity(t: BalanceBoardType): string {
  const m: Record<BalanceBoardType, string> = {
    rocker_flat: "rehab_ankle_strengthen",
    wobble_round: "surf_skate_prep",
    roller_cylinder: "advanced_board_sport",
    spring_trainer: "trick_training_dynamic",
    standing_desk_active: "office_micro_movement",
  };
  return m[t];
}

export function balanceBoards(): BalanceBoardType[] {
  return ["rocker_flat", "wobble_round", "roller_cylinder", "spring_trainer", "standing_desk_active"];
}
