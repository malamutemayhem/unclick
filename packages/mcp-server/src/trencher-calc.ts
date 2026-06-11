export type TrencherType =
  | "chain_trencher"
  | "wheel_trencher"
  | "rock_wheel"
  | "micro_trencher"
  | "portable_walk_behind";

interface TrencherData {
  trenchDepth: number;
  trenchSpeed: number;
  rockCapability: number;
  precision: number;
  trCost: number;
  selfPropelled: boolean;
  forUtility: boolean;
  cutting: string;
  bestUse: string;
}

const DATA: Record<TrencherType, TrencherData> = {
  chain_trencher: {
    trenchDepth: 8, trenchSpeed: 8, rockCapability: 6, precision: 6, trCost: 6,
    selfPropelled: true, forUtility: true,
    cutting: "continuous_chain_boom_digging_teeth_crumb_conveyor_spoil",
    bestUse: "utility_cable_pipe_installation_moderate_depth_general_use",
  },
  wheel_trencher: {
    trenchDepth: 10, trenchSpeed: 9, rockCapability: 8, precision: 5, trCost: 9,
    selfPropelled: true, forUtility: true,
    cutting: "large_cutting_wheel_bucket_teeth_high_volume_spoil_cast",
    bestUse: "deep_pipeline_sewer_main_large_diameter_high_production",
  },
  rock_wheel: {
    trenchDepth: 7, trenchSpeed: 5, rockCapability: 10, precision: 7, trCost: 10,
    selfPropelled: true, forUtility: false,
    cutting: "carbide_pick_rock_wheel_hydraulic_drive_hard_ground_cut",
    bestUse: "rock_excavation_frozen_ground_concrete_removal_hard_dig",
  },
  micro_trencher: {
    trenchDepth: 3, trenchSpeed: 10, rockCapability: 4, precision: 10, trCost: 7,
    selfPropelled: true, forUtility: true,
    cutting: "diamond_blade_narrow_slot_fiber_optic_micro_duct_install",
    bestUse: "fiber_optic_cable_urban_road_surface_minimal_disruption",
  },
  portable_walk_behind: {
    trenchDepth: 4, trenchSpeed: 4, rockCapability: 3, precision: 8, trCost: 3,
    selfPropelled: false, forUtility: true,
    cutting: "small_chain_bar_walk_behind_manual_guide_light_duty_cut",
    bestUse: "landscape_irrigation_sprinkler_line_small_cable_residential",
  },
};

function get(t: TrencherType): TrencherData {
  return DATA[t];
}

export const trenchDepth = (t: TrencherType) => get(t).trenchDepth;
export const trenchSpeed = (t: TrencherType) => get(t).trenchSpeed;
export const rockCapability = (t: TrencherType) => get(t).rockCapability;
export const precision = (t: TrencherType) => get(t).precision;
export const trCost = (t: TrencherType) => get(t).trCost;
export const selfPropelled = (t: TrencherType) => get(t).selfPropelled;
export const forUtility = (t: TrencherType) => get(t).forUtility;
export const cutting = (t: TrencherType) => get(t).cutting;
export const bestUse = (t: TrencherType) => get(t).bestUse;
export const trencherTypes = (): TrencherType[] =>
  Object.keys(DATA) as TrencherType[];
