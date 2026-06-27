export type GasTurbineType =
  | "heavy_duty_frame"
  | "aeroderivative_light"
  | "industrial_mid_range"
  | "micro_turbine_small"
  | "combined_cycle_ccgt";

interface GasTurbineData {
  efficiency: number;
  powerOutput: number;
  startupTime: number;
  fuelFlex: number;
  gtCost: number;
  combined: boolean;
  forPeaking: boolean;
  compressor: string;
  bestUse: string;
}

const DATA: Record<GasTurbineType, GasTurbineData> = {
  heavy_duty_frame: {
    efficiency: 7, powerOutput: 10, startupTime: 4, fuelFlex: 7, gtCost: 8,
    combined: false, forPeaking: false,
    compressor: "multi_stage_axial_compressor_heavy_rotor",
    bestUse: "baseload_power_generation_large_utility",
  },
  aeroderivative_light: {
    efficiency: 8, powerOutput: 6, startupTime: 9, fuelFlex: 6, gtCost: 7,
    combined: false, forPeaking: true,
    compressor: "aircraft_engine_derived_light_rotor_fast",
    bestUse: "peaking_power_offshore_platform_fast_start",
  },
  industrial_mid_range: {
    efficiency: 7, powerOutput: 7, startupTime: 7, fuelFlex: 8, gtCost: 6,
    combined: false, forPeaking: false,
    compressor: "robust_industrial_axial_centrifugal_hybrid",
    bestUse: "oil_gas_processing_mechanical_drive_cogen",
  },
  micro_turbine_small: {
    efficiency: 5, powerOutput: 2, startupTime: 10, fuelFlex: 9, gtCost: 3,
    combined: false, forPeaking: true,
    compressor: "single_stage_centrifugal_recuperated_cycle",
    bestUse: "distributed_gen_chp_biogas_remote_site_small",
  },
  combined_cycle_ccgt: {
    efficiency: 10, powerOutput: 10, startupTime: 3, fuelFlex: 5, gtCost: 10,
    combined: true, forPeaking: false,
    compressor: "gas_turbine_plus_hrsg_steam_turbine_bottoming",
    bestUse: "high_efficiency_baseload_power_grid_anchor",
  },
};

function get(t: GasTurbineType): GasTurbineData {
  return DATA[t];
}

export const efficiency = (t: GasTurbineType) => get(t).efficiency;
export const powerOutput = (t: GasTurbineType) => get(t).powerOutput;
export const startupTime = (t: GasTurbineType) => get(t).startupTime;
export const fuelFlex = (t: GasTurbineType) => get(t).fuelFlex;
export const gtCost = (t: GasTurbineType) => get(t).gtCost;
export const combined = (t: GasTurbineType) => get(t).combined;
export const forPeaking = (t: GasTurbineType) => get(t).forPeaking;
export const compressor = (t: GasTurbineType) => get(t).compressor;
export const bestUse = (t: GasTurbineType) => get(t).bestUse;
export const gasTurbineTypes = (): GasTurbineType[] =>
  Object.keys(DATA) as GasTurbineType[];
