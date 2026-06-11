export type VavBoxType =
  | "single_duct_pressure"
  | "single_duct_reheat"
  | "dual_duct_mixing"
  | "fan_powered_parallel"
  | "fan_powered_series";

interface VavBoxData {
  efficiency: number;
  comfort: number;
  noise: number;
  flexibility: number;
  vbCost: number;
  hasFan: boolean;
  forPerimeter: boolean;
  control: string;
  bestUse: string;
}

const DATA: Record<VavBoxType, VavBoxData> = {
  single_duct_pressure: {
    efficiency: 9, comfort: 6, noise: 8, flexibility: 6, vbCost: 3,
    hasFan: false, forPerimeter: false,
    control: "pressure_independent_actuator",
    bestUse: "interior_zone_cooling_only",
  },
  single_duct_reheat: {
    efficiency: 7, comfort: 9, noise: 8, flexibility: 9, vbCost: 5,
    hasFan: false, forPerimeter: true,
    control: "hot_water_electric_reheat_coil",
    bestUse: "perimeter_zone_heat_cool",
  },
  dual_duct_mixing: {
    efficiency: 5, comfort: 8, noise: 7, flexibility: 8, vbCost: 7,
    hasFan: false, forPerimeter: true,
    control: "hot_cold_deck_mixing_damper",
    bestUse: "lab_hospital_precise_temp",
  },
  fan_powered_parallel: {
    efficiency: 7, comfort: 9, noise: 6, flexibility: 8, vbCost: 6,
    hasFan: true, forPerimeter: true,
    control: "ecm_fan_plenum_induction",
    bestUse: "perimeter_office_heating_mode",
  },
  fan_powered_series: {
    efficiency: 6, comfort: 8, noise: 5, flexibility: 7, vbCost: 7,
    hasFan: true, forPerimeter: false,
    control: "constant_volume_fan_series",
    bestUse: "constant_airflow_ceiling_dist",
  },
};

function get(t: VavBoxType): VavBoxData {
  return DATA[t];
}

export const efficiency = (t: VavBoxType) => get(t).efficiency;
export const comfort = (t: VavBoxType) => get(t).comfort;
export const noise = (t: VavBoxType) => get(t).noise;
export const flexibility = (t: VavBoxType) => get(t).flexibility;
export const vbCost = (t: VavBoxType) => get(t).vbCost;
export const hasFan = (t: VavBoxType) => get(t).hasFan;
export const forPerimeter = (t: VavBoxType) => get(t).forPerimeter;
export const control = (t: VavBoxType) => get(t).control;
export const bestUse = (t: VavBoxType) => get(t).bestUse;
export const vavBoxTypes = (): VavBoxType[] =>
  Object.keys(DATA) as VavBoxType[];
