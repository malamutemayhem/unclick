export type WaterHeaterCommercialType =
  | "storage_tank_gas"
  | "tankless_instantaneous"
  | "condensing_high_eff"
  | "heat_pump_hybrid"
  | "indirect_boiler_fired";

interface WaterHeaterCommercialData {
  efficiency: number;
  recoveryRate: number;
  firstHourDelivery: number;
  spaceSaving: number;
  whCost: number;
  tankless: boolean;
  forHighDemand: boolean;
  heating: string;
  bestUse: string;
}

const DATA: Record<WaterHeaterCommercialType, WaterHeaterCommercialData> = {
  storage_tank_gas: {
    efficiency: 6, recoveryRate: 7, firstHourDelivery: 8, spaceSaving: 3, whCost: 4,
    tankless: false, forHighDemand: true,
    heating: "atmospheric_or_power_burner_glass_lined_steel_tank",
    bestUse: "restaurant_hotel_laundry_steady_high_volume_demand",
  },
  tankless_instantaneous: {
    efficiency: 8, recoveryRate: 10, firstHourDelivery: 7, spaceSaving: 10, whCost: 6,
    tankless: true, forHighDemand: false,
    heating: "modulating_gas_burner_plate_heat_exchanger_on_demand",
    bestUse: "small_office_restroom_point_of_use_space_constrained",
  },
  condensing_high_eff: {
    efficiency: 10, recoveryRate: 8, firstHourDelivery: 8, spaceSaving: 5, whCost: 8,
    tankless: false, forHighDemand: true,
    heating: "condensing_burner_secondary_heat_exchanger_pvc_vent",
    bestUse: "high_use_facility_school_gym_energy_code_compliance",
  },
  heat_pump_hybrid: {
    efficiency: 10, recoveryRate: 5, firstHourDelivery: 6, spaceSaving: 4, whCost: 7,
    tankless: false, forHighDemand: false,
    heating: "air_source_heat_pump_compressor_evaporator_backup",
    bestUse: "mild_climate_building_low_operating_cost_electric",
  },
  indirect_boiler_fired: {
    efficiency: 9, recoveryRate: 9, firstHourDelivery: 9, spaceSaving: 5, whCost: 7,
    tankless: false, forHighDemand: true,
    heating: "boiler_heated_coil_in_tank_stainless_exchanger",
    bestUse: "building_with_existing_boiler_multi_zone_heating",
  },
};

function get(t: WaterHeaterCommercialType): WaterHeaterCommercialData {
  return DATA[t];
}

export const efficiency = (t: WaterHeaterCommercialType) => get(t).efficiency;
export const recoveryRate = (t: WaterHeaterCommercialType) => get(t).recoveryRate;
export const firstHourDelivery = (t: WaterHeaterCommercialType) => get(t).firstHourDelivery;
export const spaceSaving = (t: WaterHeaterCommercialType) => get(t).spaceSaving;
export const whCost = (t: WaterHeaterCommercialType) => get(t).whCost;
export const tankless = (t: WaterHeaterCommercialType) => get(t).tankless;
export const forHighDemand = (t: WaterHeaterCommercialType) => get(t).forHighDemand;
export const heating = (t: WaterHeaterCommercialType) => get(t).heating;
export const bestUse = (t: WaterHeaterCommercialType) => get(t).bestUse;
export const waterHeaterCommercialTypes = (): WaterHeaterCommercialType[] =>
  Object.keys(DATA) as WaterHeaterCommercialType[];
