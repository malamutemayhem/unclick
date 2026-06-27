export type AutoclaveCuringType =
  | "standard_autoclave"
  | "quick_cycle"
  | "large_aerospace"
  | "out_of_autoclave"
  | "microwave_cure";

interface AutoclaveCuringData {
  cureQuality: number;
  throughput: number;
  pressureRange: number;
  voidContent: number;
  acCost: number;
  highPressure: boolean;
  forAerospace: boolean;
  curingConfig: string;
  bestUse: string;
}

const DATA: Record<AutoclaveCuringType, AutoclaveCuringData> = {
  standard_autoclave: {
    cureQuality: 9, throughput: 5, pressureRange: 8, voidContent: 9, acCost: 7,
    highPressure: true, forAerospace: true,
    curingConfig: "standard_autoclave_curing_pressure_vessel_nitrogen_heat_vacuum",
    bestUse: "aircraft_panel_standard_autoclave_curing_pressure_heat_vacuum",
  },
  quick_cycle: {
    cureQuality: 8, throughput: 8, pressureRange: 7, voidContent: 8, acCost: 8,
    highPressure: true, forAerospace: false,
    curingConfig: "quick_cycle_autoclave_curing_rapid_heat_cool_short_cycle_auto",
    bestUse: "auto_composite_quick_cycle_autoclave_curing_rapid_short_cycle",
  },
  large_aerospace: {
    cureQuality: 10, throughput: 3, pressureRange: 10, voidContent: 10, acCost: 10,
    highPressure: true, forAerospace: true,
    curingConfig: "large_aerospace_autoclave_curing_wide_body_fuselage_wing_skin",
    bestUse: "fuselage_skin_large_aerospace_autoclave_curing_wide_body_wing",
  },
  out_of_autoclave: {
    cureQuality: 7, throughput: 7, pressureRange: 4, voidContent: 7, acCost: 5,
    highPressure: false, forAerospace: false,
    curingConfig: "out_of_autoclave_curing_oven_vacuum_bag_low_pressure_prepreg",
    bestUse: "marine_hull_out_of_autoclave_curing_oven_vacuum_bag_prepreg",
  },
  microwave_cure: {
    cureQuality: 7, throughput: 6, pressureRange: 3, voidContent: 7, acCost: 6,
    highPressure: false, forAerospace: false,
    curingConfig: "microwave_cure_autoclave_2450mhz_volumetric_heat_fast_cycle",
    bestUse: "prototype_part_microwave_cure_autoclave_volumetric_heat_fast",
  },
};

function get(t: AutoclaveCuringType): AutoclaveCuringData {
  return DATA[t];
}

export const cureQuality = (t: AutoclaveCuringType) => get(t).cureQuality;
export const throughput = (t: AutoclaveCuringType) => get(t).throughput;
export const pressureRange = (t: AutoclaveCuringType) => get(t).pressureRange;
export const voidContent = (t: AutoclaveCuringType) => get(t).voidContent;
export const acCost = (t: AutoclaveCuringType) => get(t).acCost;
export const highPressure = (t: AutoclaveCuringType) => get(t).highPressure;
export const forAerospace = (t: AutoclaveCuringType) => get(t).forAerospace;
export const curingConfig = (t: AutoclaveCuringType) => get(t).curingConfig;
export const bestUse = (t: AutoclaveCuringType) => get(t).bestUse;
export const autoclaveCuringTypes = (): AutoclaveCuringType[] =>
  Object.keys(DATA) as AutoclaveCuringType[];
