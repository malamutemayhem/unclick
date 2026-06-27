export type ChillerSystemType =
  | "centrifugal_water_cooled"
  | "screw_water_cooled"
  | "scroll_air_cooled"
  | "absorption_steam_fired"
  | "magnetic_bearing_oil";

interface ChillerSystemData {
  efficiency: number;
  capacity: number;
  partLoadPerf: number;
  maintenance: number;
  chCost: number;
  oilFree: boolean;
  forLargeBuilding: boolean;
  compressor: string;
  bestUse: string;
}

const DATA: Record<ChillerSystemType, ChillerSystemData> = {
  centrifugal_water_cooled: {
    efficiency: 9, capacity: 10, partLoadPerf: 8, maintenance: 7, chCost: 9,
    oilFree: false, forLargeBuilding: true,
    compressor: "centrifugal_impeller_inlet_guide_vane_vfd_capacity",
    bestUse: "large_campus_hospital_data_center_central_plant",
  },
  screw_water_cooled: {
    efficiency: 8, capacity: 7, partLoadPerf: 8, maintenance: 8, chCost: 7,
    oilFree: false, forLargeBuilding: true,
    compressor: "twin_screw_rotor_slide_valve_unload_water_condenser",
    bestUse: "mid_size_commercial_industrial_process_cooling",
  },
  scroll_air_cooled: {
    efficiency: 7, capacity: 4, partLoadPerf: 7, maintenance: 9, chCost: 5,
    oilFree: false, forLargeBuilding: false,
    compressor: "hermetic_scroll_modular_air_cooled_condenser_fan",
    bestUse: "small_office_retail_no_cooling_tower_available",
  },
  absorption_steam_fired: {
    efficiency: 5, capacity: 8, partLoadPerf: 6, maintenance: 5, chCost: 8,
    oilFree: true, forLargeBuilding: true,
    compressor: "lithium_bromide_water_absorber_generator_steam_heat",
    bestUse: "waste_heat_recovery_cogeneration_site_low_elec_cost",
  },
  magnetic_bearing_oil: {
    efficiency: 10, capacity: 9, partLoadPerf: 10, maintenance: 10, chCost: 10,
    oilFree: true, forLargeBuilding: true,
    compressor: "magnetic_bearing_centrifugal_oil_free_vfd_levitated",
    bestUse: "data_center_pharma_clean_room_oil_free_critical",
  },
};

function get(t: ChillerSystemType): ChillerSystemData {
  return DATA[t];
}

export const efficiency = (t: ChillerSystemType) => get(t).efficiency;
export const capacity = (t: ChillerSystemType) => get(t).capacity;
export const partLoadPerf = (t: ChillerSystemType) => get(t).partLoadPerf;
export const maintenance = (t: ChillerSystemType) => get(t).maintenance;
export const chCost = (t: ChillerSystemType) => get(t).chCost;
export const oilFree = (t: ChillerSystemType) => get(t).oilFree;
export const forLargeBuilding = (t: ChillerSystemType) => get(t).forLargeBuilding;
export const compressor = (t: ChillerSystemType) => get(t).compressor;
export const bestUse = (t: ChillerSystemType) => get(t).bestUse;
export const chillerSystemTypes = (): ChillerSystemType[] =>
  Object.keys(DATA) as ChillerSystemType[];
