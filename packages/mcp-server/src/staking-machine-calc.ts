export type StakingMachineType =
  | "rotary_staker"
  | "toggle_staker"
  | "vibrating_staker"
  | "multi_pin_staker"
  | "hand_staking";

interface StakingMachineData {
  softnessResult: number;
  throughput: number;
  grainBreak: number;
  uniformity: number;
  skCost: number;
  automated: boolean;
  forGarment: boolean;
  machineConfig: string;
  bestUse: string;
}

const DATA: Record<StakingMachineType, StakingMachineData> = {
  rotary_staker: {
    softnessResult: 9, throughput: 9, grainBreak: 8, uniformity: 9, skCost: 7,
    automated: true, forGarment: true,
    machineConfig: "rotary_staker_spinning_pin_wheel_flex_hide_soften_fiber_separate",
    bestUse: "commercial_tannery_rotary_staker_high_volume_garment_upholstery",
  },
  toggle_staker: {
    softnessResult: 8, throughput: 7, grainBreak: 9, uniformity: 8, skCost: 6,
    automated: true, forGarment: true,
    machineConfig: "toggle_staker_reciprocating_blade_stretch_flex_leather_soften",
    bestUse: "mid_size_tannery_toggle_staker_stretch_flex_shoe_leather_soften",
  },
  vibrating_staker: {
    softnessResult: 10, throughput: 8, grainBreak: 7, uniformity: 10, skCost: 9,
    automated: true, forGarment: true,
    machineConfig: "vibrating_staker_oscillating_plate_gentle_flex_uniform_soft_result",
    bestUse: "premium_tannery_vibrating_staker_gentle_uniform_soft_nappa_leather",
  },
  multi_pin_staker: {
    softnessResult: 8, throughput: 10, grainBreak: 6, uniformity: 7, skCost: 8,
    automated: true, forGarment: false,
    machineConfig: "multi_pin_staker_array_pin_penetrate_fiber_break_aggressive_soft",
    bestUse: "industrial_tannery_multi_pin_staker_aggressive_heavy_hide_soften",
  },
  hand_staking: {
    softnessResult: 7, throughput: 2, grainBreak: 10, uniformity: 5, skCost: 1,
    automated: false, forGarment: true,
    machineConfig: "hand_staking_manual_blade_pull_stretch_artisan_craft_small_skin",
    bestUse: "artisan_tanner_hand_staking_manual_pull_stretch_craft_small_skin",
  },
};

function get(t: StakingMachineType): StakingMachineData {
  return DATA[t];
}

export const softnessResult = (t: StakingMachineType) => get(t).softnessResult;
export const throughput = (t: StakingMachineType) => get(t).throughput;
export const grainBreak = (t: StakingMachineType) => get(t).grainBreak;
export const uniformity = (t: StakingMachineType) => get(t).uniformity;
export const skCost = (t: StakingMachineType) => get(t).skCost;
export const automated = (t: StakingMachineType) => get(t).automated;
export const forGarment = (t: StakingMachineType) => get(t).forGarment;
export const machineConfig = (t: StakingMachineType) => get(t).machineConfig;
export const bestUse = (t: StakingMachineType) => get(t).bestUse;
export const stakingMachineTypes = (): StakingMachineType[] =>
  Object.keys(DATA) as StakingMachineType[];
