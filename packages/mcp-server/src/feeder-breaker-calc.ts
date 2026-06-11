export type FeederBreakerType =
  | "single_roll"
  | "dual_roll"
  | "chain_curtain"
  | "apron_pan"
  | "sizer_roll";

interface FeederBreakerData {
  breakingCapacity: number;
  feedRate: number;
  productSize: number;
  powerDraw: number;
  fbCost: number;
  reversible: boolean;
  forCoal: boolean;
  breakerConfig: string;
  bestUse: string;
}

const DATA: Record<FeederBreakerType, FeederBreakerData> = {
  single_roll: {
    breakingCapacity: 7, feedRate: 7, productSize: 7, powerDraw: 6, fbCost: 4,
    reversible: true, forCoal: true,
    breakerConfig: "single_toothed_roll_crusher_chain_conveyor_feed_size_reduce",
    bestUse: "standard_coal_mine_section_loading_point_oversize_reduction",
  },
  dual_roll: {
    breakingCapacity: 9, feedRate: 9, productSize: 9, powerDraw: 8, fbCost: 7,
    reversible: true, forCoal: true,
    breakerConfig: "dual_toothed_roll_counter_rotate_crush_high_capacity_coal_run",
    bestUse: "high_capacity_longwall_face_coal_sizing_dual_roll_fast_feed",
  },
  chain_curtain: {
    breakingCapacity: 6, feedRate: 8, productSize: 6, powerDraw: 5, fbCost: 3,
    reversible: false, forCoal: true,
    breakerConfig: "chain_curtain_impact_breaker_hanging_chain_reduce_oversize",
    bestUse: "simple_oversize_reduction_transfer_point_chain_impact_breaker",
  },
  apron_pan: {
    breakingCapacity: 5, feedRate: 10, productSize: 5, powerDraw: 7, fbCost: 6,
    reversible: false, forCoal: false,
    breakerConfig: "armored_face_conveyor_apron_pan_feeder_continuous_discharge",
    bestUse: "continuous_miner_discharge_armored_pan_conveyor_face_haulage",
  },
  sizer_roll: {
    breakingCapacity: 10, feedRate: 8, productSize: 10, powerDraw: 9, fbCost: 9,
    reversible: true, forCoal: false,
    breakerConfig: "mineral_sizer_low_speed_high_torque_roll_crush_hard_rock_ore",
    bestUse: "hard_rock_underground_mine_ore_sizing_sizer_crusher_primary",
  },
};

function get(t: FeederBreakerType): FeederBreakerData {
  return DATA[t];
}

export const breakingCapacity = (t: FeederBreakerType) => get(t).breakingCapacity;
export const feedRate = (t: FeederBreakerType) => get(t).feedRate;
export const productSize = (t: FeederBreakerType) => get(t).productSize;
export const powerDraw = (t: FeederBreakerType) => get(t).powerDraw;
export const fbCost = (t: FeederBreakerType) => get(t).fbCost;
export const reversible = (t: FeederBreakerType) => get(t).reversible;
export const forCoal = (t: FeederBreakerType) => get(t).forCoal;
export const breakerConfig = (t: FeederBreakerType) => get(t).breakerConfig;
export const bestUse = (t: FeederBreakerType) => get(t).bestUse;
export const feederBreakerTypes = (): FeederBreakerType[] =>
  Object.keys(DATA) as FeederBreakerType[];
