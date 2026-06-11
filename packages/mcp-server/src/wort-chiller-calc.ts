export type WortChillerType =
  | "immersion_coil"
  | "counterflow_plate"
  | "shell_tube"
  | "glycol_jacketed"
  | "ice_bank";

interface WortChillerData {
  coolingSpeed: number;
  heatExchange: number;
  sanitization: number;
  waterEfficiency: number;
  wcCost: number;
  recirculating: boolean;
  forLargeBatch: boolean;
  chillerConfig: string;
  bestUse: string;
}

const DATA: Record<WortChillerType, WortChillerData> = {
  immersion_coil: {
    coolingSpeed: 6, heatExchange: 6, sanitization: 9, waterEfficiency: 5, wcCost: 2,
    recirculating: false, forLargeBatch: false,
    chillerConfig: "copper_stainless_coil_submerge_in_wort_cold_water_flow_through",
    bestUse: "homebrewer_small_craft_batch_simple_immersion_cool_kettle",
  },
  counterflow_plate: {
    coolingSpeed: 9, heatExchange: 10, sanitization: 7, waterEfficiency: 8, wcCost: 6,
    recirculating: false, forLargeBatch: true,
    chillerConfig: "plate_heat_exchanger_counterflow_wort_water_parallel_channel",
    bestUse: "craft_brewery_fast_knockout_plate_exchanger_inline_cooling",
  },
  shell_tube: {
    coolingSpeed: 8, heatExchange: 9, sanitization: 8, waterEfficiency: 7, wcCost: 7,
    recirculating: false, forLargeBatch: true,
    chillerConfig: "shell_tube_bundle_wort_inside_coolant_outside_cip_cleanable",
    bestUse: "industrial_brewery_large_batch_shell_tube_robust_cooling",
  },
  glycol_jacketed: {
    coolingSpeed: 7, heatExchange: 7, sanitization: 8, waterEfficiency: 10, wcCost: 8,
    recirculating: true, forLargeBatch: true,
    chillerConfig: "glycol_chilled_jacket_tank_recirculate_coolant_ferment_control",
    bestUse: "fermentation_temperature_control_glycol_jacket_lager_ale_tank",
  },
  ice_bank: {
    coolingSpeed: 10, heatExchange: 8, sanitization: 6, waterEfficiency: 9, wcCost: 9,
    recirculating: true, forLargeBatch: false,
    chillerConfig: "ice_bank_reservoir_pre_chill_water_store_cold_peak_demand_use",
    bestUse: "peak_demand_cooling_pre_chill_water_reserve_multi_batch_brew",
  },
};

function get(t: WortChillerType): WortChillerData {
  return DATA[t];
}

export const coolingSpeed = (t: WortChillerType) => get(t).coolingSpeed;
export const heatExchange = (t: WortChillerType) => get(t).heatExchange;
export const sanitization = (t: WortChillerType) => get(t).sanitization;
export const waterEfficiency = (t: WortChillerType) => get(t).waterEfficiency;
export const wcCost = (t: WortChillerType) => get(t).wcCost;
export const recirculating = (t: WortChillerType) => get(t).recirculating;
export const forLargeBatch = (t: WortChillerType) => get(t).forLargeBatch;
export const chillerConfig = (t: WortChillerType) => get(t).chillerConfig;
export const bestUse = (t: WortChillerType) => get(t).bestUse;
export const wortChillerTypes = (): WortChillerType[] =>
  Object.keys(DATA) as WortChillerType[];
