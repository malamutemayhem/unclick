export type ChillerHvacType =
  | "air_cooled_scroll"
  | "air_cooled_screw"
  | "water_cooled_centrifugal"
  | "water_cooled_screw"
  | "absorption_lithium_bromide";

interface ChillerHvacData {
  efficiency: number;
  capacity: number;
  noiseLevel: number;
  maintenance: number;
  chCost: number;
  waterCooled: boolean;
  forLargeBuilding: boolean;
  compressor: string;
  bestUse: string;
}

const DATA: Record<ChillerHvacType, ChillerHvacData> = {
  air_cooled_scroll: {
    efficiency: 6, capacity: 4, noiseLevel: 6, maintenance: 8, chCost: 4,
    waterCooled: false, forLargeBuilding: false,
    compressor: "hermetic_scroll_compressor_r410a_air_cooled_condenser",
    bestUse: "small_office_retail_store_restaurant_comfort_cooling",
  },
  air_cooled_screw: {
    efficiency: 7, capacity: 7, noiseLevel: 5, maintenance: 7, chCost: 6,
    waterCooled: false, forLargeBuilding: false,
    compressor: "semi_hermetic_screw_compressor_variable_speed_drive_air",
    bestUse: "medium_commercial_building_school_hospital_no_tower_site",
  },
  water_cooled_centrifugal: {
    efficiency: 10, capacity: 10, noiseLevel: 8, maintenance: 6, chCost: 9,
    waterCooled: true, forLargeBuilding: true,
    compressor: "centrifugal_impeller_magnetic_bearing_oil_free_high_cop",
    bestUse: "large_campus_data_center_high_rise_district_cooling_plant",
  },
  water_cooled_screw: {
    efficiency: 8, capacity: 8, noiseLevel: 7, maintenance: 7, chCost: 7,
    waterCooled: true, forLargeBuilding: true,
    compressor: "twin_screw_compressor_water_cooled_condenser_vsd_part_load",
    bestUse: "industrial_process_cooling_hotel_convention_center_medium",
  },
  absorption_lithium_bromide: {
    efficiency: 5, capacity: 9, noiseLevel: 10, maintenance: 5, chCost: 8,
    waterCooled: true, forLargeBuilding: true,
    compressor: "lithium_bromide_water_absorption_cycle_steam_hot_water",
    bestUse: "cogeneration_waste_heat_recovery_hospital_campus_steam_site",
  },
};

function get(t: ChillerHvacType): ChillerHvacData {
  return DATA[t];
}

export const efficiency = (t: ChillerHvacType) => get(t).efficiency;
export const capacity = (t: ChillerHvacType) => get(t).capacity;
export const noiseLevel = (t: ChillerHvacType) => get(t).noiseLevel;
export const maintenance = (t: ChillerHvacType) => get(t).maintenance;
export const chCost = (t: ChillerHvacType) => get(t).chCost;
export const waterCooled = (t: ChillerHvacType) => get(t).waterCooled;
export const forLargeBuilding = (t: ChillerHvacType) => get(t).forLargeBuilding;
export const compressor = (t: ChillerHvacType) => get(t).compressor;
export const bestUse = (t: ChillerHvacType) => get(t).bestUse;
export const chillerHvacTypes = (): ChillerHvacType[] =>
  Object.keys(DATA) as ChillerHvacType[];
