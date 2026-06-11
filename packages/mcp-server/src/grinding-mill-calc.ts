export type GrindingMillType =
  | "ball_mill_tumbling"
  | "sag_semi_autogenous"
  | "rod_mill_coarse"
  | "vertical_roller_vrm"
  | "stirred_media_isa";

const DATA: Record<GrindingMillType, {
  fineness: number; capacity: number; efficiency: number;
  mediaWear: number; gmCost: number; autogenous: boolean;
  forCement: boolean; grinding: string; bestUse: string;
}> = {
  ball_mill_tumbling: {
    fineness: 8, capacity: 8, efficiency: 5,
    mediaWear: 5, gmCost: 3, autogenous: false,
    forCement: true, grinding: "steel_ball_cascade_impact",
    bestUse: "cement_clinker_final_grind",
  },
  sag_semi_autogenous: {
    fineness: 5, capacity: 10, efficiency: 6,
    mediaWear: 7, gmCost: 5, autogenous: true,
    forCement: false, grinding: "ore_charge_plus_steel_balls",
    bestUse: "gold_copper_primary_grind_comminution",
  },
  rod_mill_coarse: {
    fineness: 4, capacity: 7, efficiency: 6,
    mediaWear: 6, gmCost: 3, autogenous: false,
    forCement: false, grinding: "steel_rod_parallel_grind",
    bestUse: "open_circuit_coarse_grind_prep",
  },
  vertical_roller_vrm: {
    fineness: 9, capacity: 9, efficiency: 9,
    mediaWear: 8, gmCost: 4, autogenous: false,
    forCement: true, grinding: "roller_table_pressure_grind",
    bestUse: "raw_meal_slag_cement_dry_grind",
  },
  stirred_media_isa: {
    fineness: 10, capacity: 5, efficiency: 8,
    mediaWear: 4, gmCost: 4, autogenous: false,
    forCement: false, grinding: "ceramic_bead_stirred_attrition",
    bestUse: "ultrafine_regrind_concentrate",
  },
};

const get = (t: GrindingMillType) => DATA[t];

export const fineness = (t: GrindingMillType) => get(t).fineness;
export const capacity = (t: GrindingMillType) => get(t).capacity;
export const efficiency = (t: GrindingMillType) => get(t).efficiency;
export const mediaWear = (t: GrindingMillType) => get(t).mediaWear;
export const gmCost = (t: GrindingMillType) => get(t).gmCost;
export const autogenous = (t: GrindingMillType) => get(t).autogenous;
export const forCement = (t: GrindingMillType) => get(t).forCement;
export const grinding = (t: GrindingMillType) => get(t).grinding;
export const bestUse = (t: GrindingMillType) => get(t).bestUse;
export const grindingMillTypes = (): GrindingMillType[] => Object.keys(DATA) as GrindingMillType[];
