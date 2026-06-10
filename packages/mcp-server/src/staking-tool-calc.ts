// Staking tool calculator - clockmaking jewel/hand setting tools

export type StakingToolType =
  | "flat_stake_punch"
  | "riveting_stake_set"
  | "jewel_push_fit"
  | "hand_press_canon"
  | "universal_stump_kit";

const STAKING_DATA: Record<
  StakingToolType,
  {
    pushForce: number;
    alignment: number;
    punchVariety: number;
    portability: number;
    cost: number;
    hasStump: boolean;
    forJewels: boolean;
    baseType: string;
    bestUse: string;
  }
> = {
  flat_stake_punch: {
    pushForce: 6,
    alignment: 5,
    punchVariety: 4,
    portability: 8,
    cost: 3,
    hasStump: false,
    forJewels: false,
    baseType: "flat_steel_anvil",
    bestUse: "pin_rivet_set",
  },
  riveting_stake_set: {
    pushForce: 7,
    alignment: 7,
    punchVariety: 7,
    portability: 5,
    cost: 6,
    hasStump: true,
    forJewels: false,
    baseType: "tapered_stump_hole",
    bestUse: "wheel_rivet_close",
  },
  jewel_push_fit: {
    pushForce: 4,
    alignment: 9,
    punchVariety: 5,
    portability: 7,
    cost: 7,
    hasStump: true,
    forJewels: true,
    baseType: "precision_stump_bore",
    bestUse: "jewel_setting_press",
  },
  hand_press_canon: {
    pushForce: 8,
    alignment: 8,
    punchVariety: 6,
    portability: 4,
    cost: 8,
    hasStump: true,
    forJewels: false,
    baseType: "lever_press_arm",
    bestUse: "canon_pinion_press",
  },
  universal_stump_kit: {
    pushForce: 7,
    alignment: 9,
    punchVariety: 9,
    portability: 3,
    cost: 9,
    hasStump: true,
    forJewels: true,
    baseType: "multi_hole_stump",
    bestUse: "full_service_bench",
  },
};

export function pushForce(type: StakingToolType): number {
  return STAKING_DATA[type].pushForce;
}
export function alignment(type: StakingToolType): number {
  return STAKING_DATA[type].alignment;
}
export function punchVariety(type: StakingToolType): number {
  return STAKING_DATA[type].punchVariety;
}
export function portability(type: StakingToolType): number {
  return STAKING_DATA[type].portability;
}
export function stakingCost(type: StakingToolType): number {
  return STAKING_DATA[type].cost;
}
export function hasStump(type: StakingToolType): boolean {
  return STAKING_DATA[type].hasStump;
}
export function forJewels(type: StakingToolType): boolean {
  return STAKING_DATA[type].forJewels;
}
export function baseType(type: StakingToolType): string {
  return STAKING_DATA[type].baseType;
}
export function bestUse(type: StakingToolType): string {
  return STAKING_DATA[type].bestUse;
}
export function stakingTools(): StakingToolType[] {
  return Object.keys(STAKING_DATA) as StakingToolType[];
}
