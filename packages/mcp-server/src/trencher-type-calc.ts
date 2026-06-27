export type TrencherType =
  | "chain_trencher_ladder"
  | "wheel_trencher_rockwheel"
  | "micro_trencher_fiber"
  | "portable_walk_behind"
  | "tractor_mounted_pto";

interface TrencherData {
  depth: number;
  speed: number;
  width: number;
  versatility: number;
  trCost: number;
  selfPropelled: boolean;
  forUtility: boolean;
  cutter: string;
  bestUse: string;
}

const DATA: Record<TrencherType, TrencherData> = {
  chain_trencher_ladder: {
    depth: 9, speed: 7, width: 6, versatility: 7, trCost: 7,
    selfPropelled: true, forUtility: true,
    cutter: "chain_boom_carbide_tooth",
    bestUse: "deep_utility_trench_pipe_cable",
  },
  wheel_trencher_rockwheel: {
    depth: 7, speed: 9, width: 8, versatility: 5, trCost: 8,
    selfPropelled: true, forUtility: true,
    cutter: "rotating_wheel_carbide_pick",
    bestUse: "road_crossing_rock_hard_ground",
  },
  micro_trencher_fiber: {
    depth: 3, speed: 10, width: 2, versatility: 3, trCost: 6,
    selfPropelled: true, forUtility: true,
    cutter: "diamond_blade_narrow_slot",
    bestUse: "fiber_optic_urban_minimal_disrupt",
  },
  portable_walk_behind: {
    depth: 4, speed: 4, width: 4, versatility: 8, trCost: 2,
    selfPropelled: false, forUtility: false,
    cutter: "small_chain_manual_guide",
    bestUse: "landscape_irrigation_sprinkler_line",
  },
  tractor_mounted_pto: {
    depth: 6, speed: 6, width: 5, versatility: 7, trCost: 4,
    selfPropelled: false, forUtility: true,
    cutter: "pto_driven_chain_three_point",
    bestUse: "farm_drain_tile_fence_post_line",
  },
};

function get(t: TrencherType): TrencherData {
  return DATA[t];
}

export const depth = (t: TrencherType) => get(t).depth;
export const speed = (t: TrencherType) => get(t).speed;
export const width = (t: TrencherType) => get(t).width;
export const versatility = (t: TrencherType) => get(t).versatility;
export const trCost = (t: TrencherType) => get(t).trCost;
export const selfPropelled = (t: TrencherType) => get(t).selfPropelled;
export const forUtility = (t: TrencherType) => get(t).forUtility;
export const cutter = (t: TrencherType) => get(t).cutter;
export const bestUse = (t: TrencherType) => get(t).bestUse;
export const trencherTypes = (): TrencherType[] =>
  Object.keys(DATA) as TrencherType[];
