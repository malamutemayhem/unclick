export type SolarInverter =
  | "string_central_mppt"
  | "micro_panel_level"
  | "central_utility_scale"
  | "hybrid_battery_coupled"
  | "power_optimizer_dc";

const DATA: Record<SolarInverter, {
  efficiency: number; monitoring: number; shadeHandle: number;
  reliability: number; siCost: number; batteryReady: boolean;
  forResidential: boolean; topology: string; bestUse: string;
}> = {
  string_central_mppt: {
    efficiency: 8, monitoring: 5, shadeHandle: 4,
    reliability: 8, siCost: 2, batteryReady: false,
    forResidential: true, topology: "single_stage_hbridge_mppt",
    bestUse: "residential_rooftop_simple",
  },
  micro_panel_level: {
    efficiency: 7, monitoring: 10, shadeHandle: 10,
    reliability: 7, siCost: 4, batteryReady: false,
    forResidential: true, topology: "panel_mount_ac_module",
    bestUse: "complex_roof_partial_shade",
  },
  central_utility_scale: {
    efficiency: 9, monitoring: 6, shadeHandle: 3,
    reliability: 9, siCost: 1, batteryReady: false,
    forResidential: false, topology: "three_phase_igbt_bridge",
    bestUse: "solar_farm_utility_megawatt",
  },
  hybrid_battery_coupled: {
    efficiency: 8, monitoring: 8, shadeHandle: 5,
    reliability: 7, siCost: 4, batteryReady: true,
    forResidential: true, topology: "bidirectional_dc_ac_bms",
    bestUse: "home_battery_solar_self_consume",
  },
  power_optimizer_dc: {
    efficiency: 9, monitoring: 9, shadeHandle: 9,
    reliability: 8, siCost: 3, batteryReady: false,
    forResidential: true, topology: "panel_dcdc_plus_string_inv",
    bestUse: "residential_mixed_orientation",
  },
};

const get = (t: SolarInverter) => DATA[t];

export const efficiency = (t: SolarInverter) => get(t).efficiency;
export const monitoring = (t: SolarInverter) => get(t).monitoring;
export const shadeHandle = (t: SolarInverter) => get(t).shadeHandle;
export const reliability = (t: SolarInverter) => get(t).reliability;
export const siCost = (t: SolarInverter) => get(t).siCost;
export const batteryReady = (t: SolarInverter) => get(t).batteryReady;
export const forResidential = (t: SolarInverter) => get(t).forResidential;
export const topology = (t: SolarInverter) => get(t).topology;
export const bestUse = (t: SolarInverter) => get(t).bestUse;
export const solarInverters = (): SolarInverter[] => Object.keys(DATA) as SolarInverter[];
