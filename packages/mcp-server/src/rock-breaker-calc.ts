export type RockBreakerType =
  | "hydraulic_hammer"
  | "drop_ball"
  | "pedestal_boom"
  | "handheld_pneumatic"
  | "impactor_mounted";

interface RockBreakerData {
  breakingForce: number;
  cycleSpeed: number;
  reachRange: number;
  mobilityRating: number;
  rbCost: number;
  mounted: boolean;
  forPrimary: boolean;
  breakerConfig: string;
  bestUse: string;
}

const DATA: Record<RockBreakerType, RockBreakerData> = {
  hydraulic_hammer: {
    breakingForce: 9, cycleSpeed: 9, reachRange: 7, mobilityRating: 8, rbCost: 7,
    mounted: true, forPrimary: true,
    breakerConfig: "excavator_mounted_hydraulic_piston_chisel_tool_impact_break",
    bestUse: "quarry_oversize_boulder_breaking_demolition_excavator_mounted",
  },
  drop_ball: {
    breakingForce: 10, cycleSpeed: 4, reachRange: 5, mobilityRating: 3, rbCost: 3,
    mounted: false, forPrimary: true,
    breakerConfig: "crane_suspended_steel_ball_gravity_drop_impact_massive_rock",
    bestUse: "massive_boulder_primary_breaking_quarry_pit_gravity_drop_ball",
  },
  pedestal_boom: {
    breakingForce: 8, cycleSpeed: 8, reachRange: 9, mobilityRating: 4, rbCost: 8,
    mounted: true, forPrimary: false,
    breakerConfig: "fixed_pedestal_articulated_boom_hydraulic_hammer_grizzly_clear",
    bestUse: "crusher_feed_grizzly_oversize_clearing_fixed_position_breaker",
  },
  handheld_pneumatic: {
    breakingForce: 4, cycleSpeed: 7, reachRange: 3, mobilityRating: 10, rbCost: 2,
    mounted: false, forPrimary: false,
    breakerConfig: "pneumatic_handheld_jackhammer_chisel_bit_compressed_air_drive",
    bestUse: "secondary_breaking_trim_scaling_underground_handheld_portable",
  },
  impactor_mounted: {
    breakingForce: 8, cycleSpeed: 10, reachRange: 8, mobilityRating: 7, rbCost: 9,
    mounted: true, forPrimary: true,
    breakerConfig: "loader_mounted_impact_hammer_rapid_cycle_mobile_crushing_feed",
    bestUse: "mobile_crushing_plant_feed_preparation_rapid_oversize_breaking",
  },
};

function get(t: RockBreakerType): RockBreakerData {
  return DATA[t];
}

export const breakingForce = (t: RockBreakerType) => get(t).breakingForce;
export const cycleSpeed = (t: RockBreakerType) => get(t).cycleSpeed;
export const reachRange = (t: RockBreakerType) => get(t).reachRange;
export const mobilityRating = (t: RockBreakerType) => get(t).mobilityRating;
export const rbCost = (t: RockBreakerType) => get(t).rbCost;
export const mounted = (t: RockBreakerType) => get(t).mounted;
export const forPrimary = (t: RockBreakerType) => get(t).forPrimary;
export const breakerConfig = (t: RockBreakerType) => get(t).breakerConfig;
export const bestUse = (t: RockBreakerType) => get(t).bestUse;
export const rockBreakerTypes = (): RockBreakerType[] =>
  Object.keys(DATA) as RockBreakerType[];
