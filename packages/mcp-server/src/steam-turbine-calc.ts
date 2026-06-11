export type SteamTurbineType =
  | "condensing_power_gen"
  | "back_pressure_process"
  | "extraction_combined"
  | "reheat_supercritical"
  | "geared_turbine_small";

interface SteamTurbineData {
  efficiency: number;
  powerOutput: number;
  flexibility: number;
  reliability: number;
  stCost: number;
  cogeneration: boolean;
  forBaseload: boolean;
  config: string;
  bestUse: string;
}

const DATA: Record<SteamTurbineType, SteamTurbineData> = {
  condensing_power_gen: {
    efficiency: 8, powerOutput: 10, flexibility: 6, reliability: 9, stCost: 8,
    cogeneration: false, forBaseload: true,
    config: "full_expansion_condenser_vacuum_exhaust",
    bestUse: "utility_power_plant_baseload_generation",
  },
  back_pressure_process: {
    efficiency: 9, powerOutput: 6, flexibility: 8, reliability: 9, stCost: 5,
    cogeneration: true, forBaseload: false,
    config: "exhaust_at_process_pressure_no_condenser",
    bestUse: "industrial_cogeneration_process_steam_supply",
  },
  extraction_combined: {
    efficiency: 8, powerOutput: 8, flexibility: 10, reliability: 8, stCost: 7,
    cogeneration: true, forBaseload: false,
    config: "controlled_extraction_ports_variable_steam",
    bestUse: "refinery_paper_mill_variable_steam_demand",
  },
  reheat_supercritical: {
    efficiency: 10, powerOutput: 10, flexibility: 5, reliability: 8, stCost: 10,
    cogeneration: false, forBaseload: true,
    config: "double_reheat_supercritical_steam_high_eff",
    bestUse: "large_coal_nuclear_plant_ultra_supercritical",
  },
  geared_turbine_small: {
    efficiency: 6, powerOutput: 4, flexibility: 9, reliability: 9, stCost: 3,
    cogeneration: true, forBaseload: false,
    config: "single_stage_gear_reducer_small_frame",
    bestUse: "small_industrial_drive_pump_fan_generator",
  },
};

function get(t: SteamTurbineType): SteamTurbineData {
  return DATA[t];
}

export const efficiency = (t: SteamTurbineType) => get(t).efficiency;
export const powerOutput = (t: SteamTurbineType) => get(t).powerOutput;
export const flexibility = (t: SteamTurbineType) => get(t).flexibility;
export const reliability = (t: SteamTurbineType) => get(t).reliability;
export const stCost = (t: SteamTurbineType) => get(t).stCost;
export const cogeneration = (t: SteamTurbineType) => get(t).cogeneration;
export const forBaseload = (t: SteamTurbineType) => get(t).forBaseload;
export const config = (t: SteamTurbineType) => get(t).config;
export const bestUse = (t: SteamTurbineType) => get(t).bestUse;
export const steamTurbineTypes = (): SteamTurbineType[] =>
  Object.keys(DATA) as SteamTurbineType[];
