export type RaisingStakeType = "mushroom_head_round" | "t_stake_flat_face" | "cow_tongue_long" | "mandrel_cone_taper" | "bick_horn_narrow";

export function curveControl(t: RaisingStakeType): number {
  const m: Record<RaisingStakeType, number> = {
    mushroom_head_round: 9, t_stake_flat_face: 6, cow_tongue_long: 8, mandrel_cone_taper: 7, bick_horn_narrow: 8,
  };
  return m[t];
}

export function surfaceArea(t: RaisingStakeType): number {
  const m: Record<RaisingStakeType, number> = {
    mushroom_head_round: 8, t_stake_flat_face: 10, cow_tongue_long: 7, mandrel_cone_taper: 6, bick_horn_narrow: 4,
  };
  return m[t];
}

export function versatility(t: RaisingStakeType): number {
  const m: Record<RaisingStakeType, number> = {
    mushroom_head_round: 9, t_stake_flat_face: 7, cow_tongue_long: 8, mandrel_cone_taper: 8, bick_horn_narrow: 6,
  };
  return m[t];
}

export function stabilityInVise(t: RaisingStakeType): number {
  const m: Record<RaisingStakeType, number> = {
    mushroom_head_round: 7, t_stake_flat_face: 9, cow_tongue_long: 6, mandrel_cone_taper: 8, bick_horn_narrow: 7,
  };
  return m[t];
}

export function stakeCost(t: RaisingStakeType): number {
  const m: Record<RaisingStakeType, number> = {
    mushroom_head_round: 2, t_stake_flat_face: 2, cow_tongue_long: 3, mandrel_cone_taper: 3, bick_horn_narrow: 2,
  };
  return m[t];
}

export function polished(t: RaisingStakeType): boolean {
  const m: Record<RaisingStakeType, boolean> = {
    mushroom_head_round: true, t_stake_flat_face: true, cow_tongue_long: true, mandrel_cone_taper: true, bick_horn_narrow: false,
  };
  return m[t];
}

export function tapered(t: RaisingStakeType): boolean {
  const m: Record<RaisingStakeType, boolean> = {
    mushroom_head_round: false, t_stake_flat_face: false, cow_tongue_long: true, mandrel_cone_taper: true, bick_horn_narrow: true,
  };
  return m[t];
}

export function stakeMetal(t: RaisingStakeType): string {
  const m: Record<RaisingStakeType, string> = {
    mushroom_head_round: "hardened_steel_forged",
    t_stake_flat_face: "mild_steel_machined",
    cow_tongue_long: "tool_steel_ground",
    mandrel_cone_taper: "chrome_steel_polished",
    bick_horn_narrow: "cast_iron_turned",
  };
  return m[t];
}

export function bestUse(t: RaisingStakeType): string {
  const m: Record<RaisingStakeType, string> = {
    mushroom_head_round: "bowl_vessel_form",
    t_stake_flat_face: "flat_sheet_planish",
    cow_tongue_long: "deep_vessel_reach",
    mandrel_cone_taper: "cone_funnel_shape",
    bick_horn_narrow: "spout_neck_form",
  };
  return m[t];
}

export function raisingStakes(): RaisingStakeType[] {
  return ["mushroom_head_round", "t_stake_flat_face", "cow_tongue_long", "mandrel_cone_taper", "bick_horn_narrow"];
}
