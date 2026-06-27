export type MilkingParlorType =
  | "herringbone"
  | "parallel"
  | "rotary_platform"
  | "robotic_ams"
  | "swing_over";

interface MilkingParlorData {
  throughput: number;
  laborEfficiency: number;
  cowComfort: number;
  milkQuality: number;
  mpCost: number;
  automated: boolean;
  forLargeHerd: boolean;
  system: string;
  bestUse: string;
}

const DATA: Record<MilkingParlorType, MilkingParlorData> = {
  herringbone: {
    throughput: 7, laborEfficiency: 7, cowComfort: 7, milkQuality: 7, mpCost: 5,
    automated: false, forLargeHerd: false,
    system: "angled_stall_herringbone_side_opening_manual_attach_unit",
    bestUse: "medium_dairy_100_300_cow_traditional_twice_daily_milking",
  },
  parallel: {
    throughput: 8, laborEfficiency: 8, cowComfort: 8, milkQuality: 8, mpCost: 7,
    automated: false, forLargeHerd: true,
    system: "parallel_rapid_exit_rear_udder_access_quick_throughput",
    bestUse: "large_dairy_300_plus_cow_rapid_exit_efficient_milking_flow",
  },
  rotary_platform: {
    throughput: 10, laborEfficiency: 9, cowComfort: 8, milkQuality: 8, mpCost: 9,
    automated: false, forLargeHerd: true,
    system: "rotating_platform_carousel_continuous_flow_auto_detach",
    bestUse: "very_large_dairy_1000_plus_cow_three_times_daily_milking",
  },
  robotic_ams: {
    throughput: 6, laborEfficiency: 10, cowComfort: 10, milkQuality: 10, mpCost: 10,
    automated: true, forLargeHerd: false,
    system: "robotic_arm_laser_teat_finder_voluntary_milking_24_7",
    bestUse: "progressive_dairy_voluntary_milking_labor_saving_welfare",
  },
  swing_over: {
    throughput: 5, laborEfficiency: 6, cowComfort: 7, milkQuality: 7, mpCost: 3,
    automated: false, forLargeHerd: false,
    system: "swing_over_shared_cluster_alternate_side_low_cost_small",
    bestUse: "small_dairy_under_100_cow_family_farm_low_capital_start",
  },
};

function get(t: MilkingParlorType): MilkingParlorData {
  return DATA[t];
}

export const throughput = (t: MilkingParlorType) => get(t).throughput;
export const laborEfficiency = (t: MilkingParlorType) => get(t).laborEfficiency;
export const cowComfort = (t: MilkingParlorType) => get(t).cowComfort;
export const milkQuality = (t: MilkingParlorType) => get(t).milkQuality;
export const mpCost = (t: MilkingParlorType) => get(t).mpCost;
export const automated = (t: MilkingParlorType) => get(t).automated;
export const forLargeHerd = (t: MilkingParlorType) => get(t).forLargeHerd;
export const system = (t: MilkingParlorType) => get(t).system;
export const bestUse = (t: MilkingParlorType) => get(t).bestUse;
export const milkingParlorTypes = (): MilkingParlorType[] =>
  Object.keys(DATA) as MilkingParlorType[];
