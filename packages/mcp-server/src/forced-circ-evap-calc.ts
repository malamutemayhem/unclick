export type ForcedCircEvapType =
  | "submerged_tube_standard"
  | "flash_evap_multi_stage"
  | "mvr_mechanical_vapor"
  | "tvr_thermal_vapor"
  | "multiple_effect_cascade";

interface ForcedCircEvapData {
  energyEfficiency: number;
  capacity: number;
  scalingHandle: number;
  flexibility: number;
  fcCost: number;
  vaporRecompress: boolean;
  forHighCapacity: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<ForcedCircEvapType, ForcedCircEvapData> = {
  submerged_tube_standard: {
    energyEfficiency: 5, capacity: 8, scalingHandle: 9, flexibility: 7, fcCost: 5,
    vaporRecompress: false, forHighCapacity: true,
    method: "pump_circulate_submerged_tube_heater",
    bestUse: "crystallizer_salt_sodium_sulfate_scaling",
  },
  flash_evap_multi_stage: {
    energyEfficiency: 7, capacity: 10, scalingHandle: 8, flexibility: 5, fcCost: 9,
    vaporRecompress: false, forHighCapacity: true,
    method: "multi_stage_flash_pressure_reduction",
    bestUse: "seawater_desalination_large_scale_msf",
  },
  mvr_mechanical_vapor: {
    energyEfficiency: 10, capacity: 7, scalingHandle: 6, flexibility: 8, fcCost: 8,
    vaporRecompress: true, forHighCapacity: false,
    method: "mechanical_compressor_vapor_recompress",
    bestUse: "wastewater_zero_liquid_discharge_energy",
  },
  tvr_thermal_vapor: {
    energyEfficiency: 8, capacity: 8, scalingHandle: 6, flexibility: 7, fcCost: 6,
    vaporRecompress: true, forHighCapacity: true,
    method: "steam_jet_thermocompressor_vapor_boost",
    bestUse: "chemical_plant_where_steam_is_available",
  },
  multiple_effect_cascade: {
    energyEfficiency: 9, capacity: 9, scalingHandle: 7, flexibility: 6, fcCost: 7,
    vaporRecompress: false, forHighCapacity: true,
    method: "cascade_multiple_body_vapor_to_next_heat",
    bestUse: "pulp_mill_black_liquor_sugar_refinery",
  },
};

function get(t: ForcedCircEvapType): ForcedCircEvapData {
  return DATA[t];
}

export const energyEfficiency = (t: ForcedCircEvapType) => get(t).energyEfficiency;
export const capacity = (t: ForcedCircEvapType) => get(t).capacity;
export const scalingHandle = (t: ForcedCircEvapType) => get(t).scalingHandle;
export const flexibility = (t: ForcedCircEvapType) => get(t).flexibility;
export const fcCost = (t: ForcedCircEvapType) => get(t).fcCost;
export const vaporRecompress = (t: ForcedCircEvapType) => get(t).vaporRecompress;
export const forHighCapacity = (t: ForcedCircEvapType) => get(t).forHighCapacity;
export const method = (t: ForcedCircEvapType) => get(t).method;
export const bestUse = (t: ForcedCircEvapType) => get(t).bestUse;
export const forcedCircEvapTypes = (): ForcedCircEvapType[] =>
  Object.keys(DATA) as ForcedCircEvapType[];
