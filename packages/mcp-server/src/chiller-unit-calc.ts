export type ChillerUnitType =
  | "air_cooled_scroll"
  | "water_cooled_centrifugal"
  | "absorption"
  | "magnetic_bearing"
  | "air_cooled_screw";

interface ChillerUnitData {
  efficiency: number;
  capacity: number;
  noiseLevel: number;
  maintenance: number;
  cuCost: number;
  requiresCoolingTower: boolean;
  forLargeBuilding: boolean;
  compressor: string;
  bestUse: string;
}

const DATA: Record<ChillerUnitType, ChillerUnitData> = {
  air_cooled_scroll: {
    efficiency: 6, capacity: 4, noiseLevel: 5, maintenance: 8, cuCost: 4,
    requiresCoolingTower: false, forLargeBuilding: false,
    compressor: "hermetic_scroll_compressor_air_cooled_condenser_packaged",
    bestUse: "small_commercial_office_retail_light_industrial_cooling",
  },
  water_cooled_centrifugal: {
    efficiency: 10, capacity: 10, noiseLevel: 8, maintenance: 5, cuCost: 9,
    requiresCoolingTower: true, forLargeBuilding: true,
    compressor: "centrifugal_impeller_water_cooled_condenser_high_capacity",
    bestUse: "large_campus_hospital_data_center_district_cooling_plant",
  },
  absorption: {
    efficiency: 5, capacity: 8, noiseLevel: 10, maintenance: 6, cuCost: 8,
    requiresCoolingTower: true, forLargeBuilding: true,
    compressor: "lithium_bromide_water_heat_driven_no_mechanical_compressor",
    bestUse: "waste_heat_recovery_cogeneration_steam_available_site",
  },
  magnetic_bearing: {
    efficiency: 10, capacity: 9, noiseLevel: 10, maintenance: 10, cuCost: 10,
    requiresCoolingTower: true, forLargeBuilding: true,
    compressor: "oil_free_magnetic_bearing_centrifugal_variable_speed_drive",
    bestUse: "premium_data_center_pharma_cleanroom_low_maintenance_site",
  },
  air_cooled_screw: {
    efficiency: 7, capacity: 7, noiseLevel: 6, maintenance: 7, cuCost: 6,
    requiresCoolingTower: false, forLargeBuilding: false,
    compressor: "semi_hermetic_twin_screw_air_cooled_condenser_modular",
    bestUse: "medium_commercial_process_cooling_no_cooling_tower_site",
  },
};

function get(t: ChillerUnitType): ChillerUnitData {
  return DATA[t];
}

export const efficiency = (t: ChillerUnitType) => get(t).efficiency;
export const capacity = (t: ChillerUnitType) => get(t).capacity;
export const noiseLevel = (t: ChillerUnitType) => get(t).noiseLevel;
export const maintenance = (t: ChillerUnitType) => get(t).maintenance;
export const cuCost = (t: ChillerUnitType) => get(t).cuCost;
export const requiresCoolingTower = (t: ChillerUnitType) => get(t).requiresCoolingTower;
export const forLargeBuilding = (t: ChillerUnitType) => get(t).forLargeBuilding;
export const compressor = (t: ChillerUnitType) => get(t).compressor;
export const bestUse = (t: ChillerUnitType) => get(t).bestUse;
export const chillerUnitTypes = (): ChillerUnitType[] =>
  Object.keys(DATA) as ChillerUnitType[];
