export type DuctHeaterType =
  | "open_coil_duct"
  | "finned_tubular_duct"
  | "ceramic_element_duct"
  | "duct_furnace"
  | "steam_coil_duct";

interface DuctHeaterData {
  heatingCapacity: number;
  throughput: number;
  responseSpeed: number;
  airTempUniformity: number;
  dhCost: number;
  electric: boolean;
  forHighVelocity: boolean;
  heaterConfig: string;
  bestUse: string;
}

const DATA: Record<DuctHeaterType, DuctHeaterData> = {
  open_coil_duct: {
    heatingCapacity: 8, throughput: 9, responseSpeed: 10, airTempUniformity: 6, dhCost: 3,
    electric: true, forHighVelocity: false,
    heaterConfig: "open_coil_duct_heater_nichrome_wire_fast_heat_low_mass_direct",
    bestUse: "small_duct_open_coil_heater_fast_response_reheat_zone_trim",
  },
  finned_tubular_duct: {
    heatingCapacity: 9, throughput: 9, responseSpeed: 8, airTempUniformity: 8, dhCost: 5,
    electric: true, forHighVelocity: true,
    heaterConfig: "finned_tubular_duct_heater_sheathed_element_fin_spread_uniform",
    bestUse: "ahu_finned_tubular_duct_heater_uniform_heat_high_velocity_safe",
  },
  ceramic_element_duct: {
    heatingCapacity: 7, throughput: 7, responseSpeed: 9, airTempUniformity: 9, dhCost: 7,
    electric: true, forHighVelocity: false,
    heaterConfig: "ceramic_element_duct_heater_ptc_self_limiting_temp_safe_no_overheat",
    bestUse: "cleanroom_ceramic_element_duct_heater_ptc_self_limit_no_particle",
  },
  duct_furnace: {
    heatingCapacity: 10, throughput: 10, responseSpeed: 6, airTempUniformity: 7, dhCost: 8,
    electric: false, forHighVelocity: true,
    heaterConfig: "duct_furnace_gas_fired_heat_exchanger_flue_vent_high_capacity",
    bestUse: "warehouse_duct_furnace_gas_fired_high_capacity_makeup_air_heat",
  },
  steam_coil_duct: {
    heatingCapacity: 10, throughput: 8, responseSpeed: 7, airTempUniformity: 9, dhCost: 6,
    electric: false, forHighVelocity: true,
    heaterConfig: "steam_coil_duct_heater_tube_bundle_condensate_trap_modulate_valve",
    bestUse: "hospital_ahu_steam_coil_duct_heater_central_plant_precise_reheat",
  },
};

function get(t: DuctHeaterType): DuctHeaterData {
  return DATA[t];
}

export const heatingCapacity = (t: DuctHeaterType) => get(t).heatingCapacity;
export const throughput = (t: DuctHeaterType) => get(t).throughput;
export const responseSpeed = (t: DuctHeaterType) => get(t).responseSpeed;
export const airTempUniformity = (t: DuctHeaterType) => get(t).airTempUniformity;
export const dhCost = (t: DuctHeaterType) => get(t).dhCost;
export const electric = (t: DuctHeaterType) => get(t).electric;
export const forHighVelocity = (t: DuctHeaterType) => get(t).forHighVelocity;
export const heaterConfig = (t: DuctHeaterType) => get(t).heaterConfig;
export const bestUse = (t: DuctHeaterType) => get(t).bestUse;
export const ductHeaterTypes = (): DuctHeaterType[] =>
  Object.keys(DATA) as DuctHeaterType[];
