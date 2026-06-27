// cooling-fan-calc - electronics cooling fan types

export type CoolingFan =
  | "axial_case_standard"
  | "blower_centrifugal"
  | "noctua_silent_premium"
  | "high_static_radiator"
  | "slim_profile_compact";

const DATA: Record<CoolingFan, {
  airflow: number; noiseLevel: number; staticPressure: number; durability: number;
  cost: number; pwmControl: boolean; silent: boolean; bearingType: string; bestUse: string;
}> = {
  axial_case_standard:     { airflow: 7, noiseLevel: 5, staticPressure: 5, durability: 7, cost: 3, pwmControl: false, silent: false, bearingType: "sleeve_bearing_basic", bestUse: "general_case_airflow" },
  blower_centrifugal:      { airflow: 6, noiseLevel: 4, staticPressure: 9, durability: 8, cost: 5, pwmControl: true, silent: false, bearingType: "dual_ball_bearing", bestUse: "restricted_exhaust" },
  noctua_silent_premium:   { airflow: 8, noiseLevel: 10, staticPressure: 7, durability: 10, cost: 8, pwmControl: true, silent: true, bearingType: "sso2_fluid_dynamic", bestUse: "silent_build_cool" },
  high_static_radiator:    { airflow: 7, noiseLevel: 6, staticPressure: 10, durability: 9, cost: 6, pwmControl: true, silent: false, bearingType: "fluid_dynamic_sealed", bestUse: "radiator_heatsink_push" },
  slim_profile_compact:    { airflow: 5, noiseLevel: 6, staticPressure: 4, durability: 6, cost: 4, pwmControl: false, silent: false, bearingType: "rifle_bearing_thin", bestUse: "tight_space_airflow" },
};

const get = (f: CoolingFan) => DATA[f];
export const airflow = (f: CoolingFan) => get(f).airflow;
export const noiseLevel = (f: CoolingFan) => get(f).noiseLevel;
export const staticPressure = (f: CoolingFan) => get(f).staticPressure;
export const durability = (f: CoolingFan) => get(f).durability;
export const fanCost = (f: CoolingFan) => get(f).cost;
export const pwmControl = (f: CoolingFan) => get(f).pwmControl;
export const silent = (f: CoolingFan) => get(f).silent;
export const bearingType = (f: CoolingFan) => get(f).bearingType;
export const bestUse = (f: CoolingFan) => get(f).bestUse;
export const coolingFans = (): CoolingFan[] => Object.keys(DATA) as CoolingFan[];
