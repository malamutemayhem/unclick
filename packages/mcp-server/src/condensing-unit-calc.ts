export type CondensingUnitType =
  | "air_cooled_cond"
  | "water_cooled_cond"
  | "evaporative_cond"
  | "remote_condenser"
  | "microchannel_cond";

interface CondensingUnitData {
  coolingCapacity: number;
  throughput: number;
  energyEfficiency: number;
  footprint: number;
  cuCost: number;
  waterFree: boolean;
  forRefrigeration: boolean;
  unitConfig: string;
  bestUse: string;
}

const DATA: Record<CondensingUnitType, CondensingUnitData> = {
  air_cooled_cond: {
    coolingCapacity: 6, throughput: 8, energyEfficiency: 6, footprint: 5, cuCost: 4,
    waterFree: true, forRefrigeration: true,
    unitConfig: "air_cooled_condenser_unit_fan_coil_ambient_reject_simple_install",
    bestUse: "retail_store_air_cooled_condenser_unit_simple_no_water_roof_mount",
  },
  water_cooled_cond: {
    coolingCapacity: 9, throughput: 9, energyEfficiency: 9, footprint: 8, cuCost: 7,
    waterFree: false, forRefrigeration: true,
    unitConfig: "water_cooled_condenser_unit_shell_tube_tower_water_low_head_press",
    bestUse: "data_center_water_cooled_condenser_unit_efficient_low_head_pressure",
  },
  evaporative_cond: {
    coolingCapacity: 10, throughput: 9, energyEfficiency: 8, footprint: 7, cuCost: 8,
    waterFree: false, forRefrigeration: true,
    unitConfig: "evaporative_condenser_unit_spray_coil_wet_bulb_approach_compact",
    bestUse: "cold_storage_evaporative_condenser_unit_high_capacity_compact",
  },
  remote_condenser: {
    coolingCapacity: 7, throughput: 7, energyEfficiency: 7, footprint: 9, cuCost: 6,
    waterFree: true, forRefrigeration: true,
    unitConfig: "remote_condenser_unit_split_system_long_line_set_flexible_place",
    bestUse: "restaurant_remote_condenser_unit_quiet_indoor_flexible_placement",
  },
  microchannel_cond: {
    coolingCapacity: 8, throughput: 8, energyEfficiency: 8, footprint: 10, cuCost: 5,
    waterFree: true, forRefrigeration: false,
    unitConfig: "microchannel_condenser_unit_flat_tube_low_charge_light_weight",
    bestUse: "rooftop_hvac_microchannel_condenser_unit_low_charge_light_compact",
  },
};

function get(t: CondensingUnitType): CondensingUnitData {
  return DATA[t];
}

export const coolingCapacity = (t: CondensingUnitType) => get(t).coolingCapacity;
export const throughput = (t: CondensingUnitType) => get(t).throughput;
export const energyEfficiency = (t: CondensingUnitType) => get(t).energyEfficiency;
export const footprint = (t: CondensingUnitType) => get(t).footprint;
export const cuCost = (t: CondensingUnitType) => get(t).cuCost;
export const waterFree = (t: CondensingUnitType) => get(t).waterFree;
export const forRefrigeration = (t: CondensingUnitType) => get(t).forRefrigeration;
export const unitConfig = (t: CondensingUnitType) => get(t).unitConfig;
export const bestUse = (t: CondensingUnitType) => get(t).bestUse;
export const condensingUnitTypes = (): CondensingUnitType[] =>
  Object.keys(DATA) as CondensingUnitType[];
