export type CylinderHeadType =
  | "flathead_sidevalve_l"
  | "overhead_valve_ohv_wedge"
  | "hemispherical_hemi_dome"
  | "pentroof_four_valve_dohc"
  | "crossflow_intake_exhaust_opp";

const DATA: Record<CylinderHeadType, {
  flow: number; combustion: number; cooling: number;
  compactness: number; chCost: number; multiValve: boolean;
  forPerformance: boolean; chamber: string; bestUse: string;
}> = {
  flathead_sidevalve_l: {
    flow: 3, combustion: 3, cooling: 4,
    compactness: 8, chCost: 1, multiValve: false,
    forPerformance: false, chamber: "flat_deck_side_pocket_valve",
    bestUse: "vintage_engine_simple_low_cost",
  },
  overhead_valve_ohv_wedge: {
    flow: 5, combustion: 6, cooling: 6,
    compactness: 7, chCost: 2, multiValve: false,
    forPerformance: false, chamber: "wedge_shape_angled_valve_pushrod",
    bestUse: "truck_v8_compact_reliable",
  },
  hemispherical_hemi_dome: {
    flow: 9, combustion: 8, cooling: 7,
    compactness: 4, chCost: 4, multiValve: false,
    forPerformance: true, chamber: "dome_hemi_large_valve_angle",
    bestUse: "high_output_muscle_car_racing",
  },
  pentroof_four_valve_dohc: {
    flow: 10, combustion: 9, cooling: 8,
    compactness: 5, chCost: 4, multiValve: true,
    forPerformance: true, chamber: "pent_roof_central_spark_4valve",
    bestUse: "modern_performance_engine_turbo",
  },
  crossflow_intake_exhaust_opp: {
    flow: 7, combustion: 7, cooling: 9,
    compactness: 6, chCost: 3, multiValve: false,
    forPerformance: false, chamber: "intake_one_side_exhaust_other",
    bestUse: "inline_engine_good_thermal_flow",
  },
};

const get = (t: CylinderHeadType) => DATA[t];

export const flow = (t: CylinderHeadType) => get(t).flow;
export const combustion = (t: CylinderHeadType) => get(t).combustion;
export const cooling = (t: CylinderHeadType) => get(t).cooling;
export const compactness = (t: CylinderHeadType) => get(t).compactness;
export const chCost = (t: CylinderHeadType) => get(t).chCost;
export const multiValve = (t: CylinderHeadType) => get(t).multiValve;
export const forPerformance = (t: CylinderHeadType) => get(t).forPerformance;
export const chamber = (t: CylinderHeadType) => get(t).chamber;
export const bestUse = (t: CylinderHeadType) => get(t).bestUse;
export const cylinderHeadTypes = (): CylinderHeadType[] => Object.keys(DATA) as CylinderHeadType[];
