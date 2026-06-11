export type SoilNailType =
  | "grouted_drill_hole_bar"
  | "self_drilling_hollow_bar"
  | "launched_compressed_air"
  | "screw_in_helical_plate"
  | "jet_grouted_column_nail";

interface SoilNailData {
  pullout: number;
  speed: number;
  depth: number;
  versatility: number;
  snCost: number;
  groutRequired: boolean;
  forSlope: boolean;
  installation: string;
  bestUse: string;
}

const DATA: Record<SoilNailType, SoilNailData> = {
  grouted_drill_hole_bar: {
    pullout: 9, speed: 5, depth: 8, versatility: 8, snCost: 6,
    groutRequired: true, forSlope: true,
    installation: "drill_insert_bar_gravity_grout",
    bestUse: "permanent_slope_cut_wall_retain",
  },
  self_drilling_hollow_bar: {
    pullout: 8, speed: 8, depth: 7, versatility: 7, snCost: 7,
    groutRequired: true, forSlope: true,
    installation: "hollow_bar_drill_grout_simultaneous",
    bestUse: "collapsing_ground_cobble_fill_fast",
  },
  launched_compressed_air: {
    pullout: 5, speed: 10, depth: 4, versatility: 4, snCost: 4,
    groutRequired: false, forSlope: false,
    installation: "compressed_air_ballistic_launch",
    bestUse: "temporary_emergency_shallow_quick",
  },
  screw_in_helical_plate: {
    pullout: 7, speed: 7, depth: 6, versatility: 6, snCost: 5,
    groutRequired: false, forSlope: true,
    installation: "torque_motor_screw_helical_plate",
    bestUse: "soft_clay_low_vibration_sensitive",
  },
  jet_grouted_column_nail: {
    pullout: 10, speed: 4, depth: 9, versatility: 5, snCost: 9,
    groutRequired: true, forSlope: true,
    installation: "high_pressure_jet_grout_column",
    bestUse: "deep_excavation_soft_ground_high_load",
  },
};

function get(t: SoilNailType): SoilNailData {
  return DATA[t];
}

export const pullout = (t: SoilNailType) => get(t).pullout;
export const speed = (t: SoilNailType) => get(t).speed;
export const depth = (t: SoilNailType) => get(t).depth;
export const versatility = (t: SoilNailType) => get(t).versatility;
export const snCost = (t: SoilNailType) => get(t).snCost;
export const groutRequired = (t: SoilNailType) => get(t).groutRequired;
export const forSlope = (t: SoilNailType) => get(t).forSlope;
export const installation = (t: SoilNailType) => get(t).installation;
export const bestUse = (t: SoilNailType) => get(t).bestUse;
export const soilNailTypes = (): SoilNailType[] =>
  Object.keys(DATA) as SoilNailType[];
