export type PropellerType =
  | "fixed_pitch_solid"
  | "controllable_pitch_hub"
  | "ducted_kort_nozzle"
  | "azimuth_podded_drive"
  | "waterjet_impeller_pump";

const DATA: Record<PropellerType, {
  efficiency: number; thrust: number; maneuver: number;
  cavitation: number; ppCost: number; variablePitch: boolean;
  forDeepDraft: boolean; drive: string; bestUse: string;
}> = {
  fixed_pitch_solid: {
    efficiency: 8, thrust: 7, maneuver: 3,
    cavitation: 6, ppCost: 1, variablePitch: false,
    forDeepDraft: true, drive: "direct_shaft_line_fixed",
    bestUse: "bulk_carrier_tanker_steady",
  },
  controllable_pitch_hub: {
    efficiency: 7, thrust: 8, maneuver: 8,
    cavitation: 7, ppCost: 4, variablePitch: true,
    forDeepDraft: true, drive: "hydraulic_hub_blade_rotate",
    bestUse: "naval_vessel_variable_speed",
  },
  ducted_kort_nozzle: {
    efficiency: 9, thrust: 10, maneuver: 4,
    cavitation: 8, ppCost: 3, variablePitch: false,
    forDeepDraft: false, drive: "nozzle_accelerated_flow",
    bestUse: "tug_boat_bollard_pull_max",
  },
  azimuth_podded_drive: {
    efficiency: 7, thrust: 7, maneuver: 10,
    cavitation: 7, ppCost: 5, variablePitch: false,
    forDeepDraft: false, drive: "electric_pod_360_rotate",
    bestUse: "cruise_ship_dp_vessel_station",
  },
  waterjet_impeller_pump: {
    efficiency: 6, thrust: 6, maneuver: 9,
    cavitation: 9, ppCost: 4, variablePitch: false,
    forDeepDraft: false, drive: "impeller_nozzle_steering",
    bestUse: "fast_ferry_patrol_shallow_draft",
  },
};

const get = (t: PropellerType) => DATA[t];

export const efficiency = (t: PropellerType) => get(t).efficiency;
export const thrust = (t: PropellerType) => get(t).thrust;
export const maneuver = (t: PropellerType) => get(t).maneuver;
export const cavitation = (t: PropellerType) => get(t).cavitation;
export const ppCost = (t: PropellerType) => get(t).ppCost;
export const variablePitch = (t: PropellerType) => get(t).variablePitch;
export const forDeepDraft = (t: PropellerType) => get(t).forDeepDraft;
export const drive = (t: PropellerType) => get(t).drive;
export const bestUse = (t: PropellerType) => get(t).bestUse;
export const propellerTypes = (): PropellerType[] => Object.keys(DATA) as PropellerType[];
