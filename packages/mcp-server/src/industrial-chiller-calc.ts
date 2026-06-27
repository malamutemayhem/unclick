export type IndustrialChillerType =
  | "scroll_compressor_small"
  | "screw_compressor_medium"
  | "centrifugal_large_cap"
  | "absorption_steam_fired"
  | "magnetic_bearing_oil_free";

interface IndustrialChillerData {
  efficiency: number;
  capacity: number;
  partLoad: number;
  noise: number;
  icCost: number;
  oilFree: boolean;
  forLargeScale: boolean;
  compressor: string;
  bestUse: string;
}

const DATA: Record<IndustrialChillerType, IndustrialChillerData> = {
  scroll_compressor_small: {
    efficiency: 6, capacity: 3, partLoad: 5, noise: 7, icCost: 3,
    oilFree: false, forLargeScale: false,
    compressor: "hermetic_scroll_orbital_fixed_ratio",
    bestUse: "small_process_lab_comfort_cooling",
  },
  screw_compressor_medium: {
    efficiency: 8, capacity: 7, partLoad: 7, noise: 5, icCost: 6,
    oilFree: false, forLargeScale: false,
    compressor: "twin_screw_rotary_variable_volume",
    bestUse: "medium_industrial_plastics_food_process",
  },
  centrifugal_large_cap: {
    efficiency: 9, capacity: 10, partLoad: 8, noise: 4, icCost: 8,
    oilFree: false, forLargeScale: true,
    compressor: "multi_stage_centrifugal_impeller",
    bestUse: "large_plant_district_cooling_campus",
  },
  absorption_steam_fired: {
    efficiency: 5, capacity: 8, partLoad: 6, noise: 9, icCost: 7,
    oilFree: true, forLargeScale: true,
    compressor: "lithium_bromide_absorption_no_compress",
    bestUse: "waste_heat_recovery_cogen_steam_avail",
  },
  magnetic_bearing_oil_free: {
    efficiency: 10, capacity: 9, partLoad: 10, noise: 10, icCost: 10,
    oilFree: true, forLargeScale: true,
    compressor: "magnetic_levitation_bearing_frictionless",
    bestUse: "pharma_cleanroom_data_center_oil_free",
  },
};

function get(t: IndustrialChillerType): IndustrialChillerData {
  return DATA[t];
}

export const efficiency = (t: IndustrialChillerType) => get(t).efficiency;
export const capacity = (t: IndustrialChillerType) => get(t).capacity;
export const partLoad = (t: IndustrialChillerType) => get(t).partLoad;
export const noise = (t: IndustrialChillerType) => get(t).noise;
export const icCost = (t: IndustrialChillerType) => get(t).icCost;
export const oilFree = (t: IndustrialChillerType) => get(t).oilFree;
export const forLargeScale = (t: IndustrialChillerType) => get(t).forLargeScale;
export const compressor = (t: IndustrialChillerType) => get(t).compressor;
export const bestUse = (t: IndustrialChillerType) => get(t).bestUse;
export const industrialChillerTypes = (): IndustrialChillerType[] =>
  Object.keys(DATA) as IndustrialChillerType[];
