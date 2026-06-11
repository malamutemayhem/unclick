export type CrankshaftType =
  | "forged_steel_crossplane"
  | "forged_steel_flatplane"
  | "cast_iron_nodular"
  | "billet_machined_racing"
  | "assembled_press_fit";

const DATA: Record<CrankshaftType, {
  strength: number; balance: number; weight: number;
  rpm: number; ckCost: number; forged: boolean;
  forPerformance: boolean; material: string; bestUse: string;
}> = {
  forged_steel_crossplane: {
    strength: 9, balance: 9, weight: 5,
    rpm: 7, ckCost: 3, forged: true,
    forPerformance: false, material: "4340_alloy_steel_forged",
    bestUse: "production_v8_smooth_torque",
  },
  forged_steel_flatplane: {
    strength: 8, balance: 6, weight: 7,
    rpm: 9, ckCost: 4, forged: true,
    forPerformance: true, material: "4340_alloy_steel_flat_forged",
    bestUse: "high_rev_v8_racing_ferrari_type",
  },
  cast_iron_nodular: {
    strength: 6, balance: 7, weight: 3,
    rpm: 5, ckCost: 1, forged: false,
    forPerformance: false, material: "ductile_iron_nodular_graphite",
    bestUse: "economy_engine_low_stress_daily",
  },
  billet_machined_racing: {
    strength: 10, balance: 10, weight: 8,
    rpm: 10, ckCost: 5, forged: false,
    forPerformance: true, material: "en40b_billet_cnc_machined",
    bestUse: "drag_race_f1_extreme_rpm_load",
  },
  assembled_press_fit: {
    strength: 5, balance: 6, weight: 6,
    rpm: 6, ckCost: 2, forged: false,
    forPerformance: false, material: "steel_pin_press_assembly",
    bestUse: "motorcycle_small_engine_split_case",
  },
};

const get = (t: CrankshaftType) => DATA[t];

export const strength = (t: CrankshaftType) => get(t).strength;
export const balance = (t: CrankshaftType) => get(t).balance;
export const weight = (t: CrankshaftType) => get(t).weight;
export const rpm = (t: CrankshaftType) => get(t).rpm;
export const ckCost = (t: CrankshaftType) => get(t).ckCost;
export const forged = (t: CrankshaftType) => get(t).forged;
export const forPerformance = (t: CrankshaftType) => get(t).forPerformance;
export const material = (t: CrankshaftType) => get(t).material;
export const bestUse = (t: CrankshaftType) => get(t).bestUse;
export const crankshaftTypes = (): CrankshaftType[] => Object.keys(DATA) as CrankshaftType[];
