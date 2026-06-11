export type AirHandlingType =
  | "constant_volume_single"
  | "variable_volume_vav"
  | "dual_duct_mixing"
  | "dedicated_outdoor_doas"
  | "energy_recovery_erv";

interface AirHandlingData {
  energyEff: number;
  airQuality: number;
  zoneControl: number;
  humidity: number;
  ahCost: number;
  variableFlow: boolean;
  forHighOccupancy: boolean;
  airPath: string;
  bestUse: string;
}

const DATA: Record<AirHandlingType, AirHandlingData> = {
  constant_volume_single: {
    energyEff: 4, airQuality: 6, zoneControl: 3, humidity: 5, ahCost: 3,
    variableFlow: false, forHighOccupancy: false,
    airPath: "single_supply_duct_constant_fan_speed_thermostat",
    bestUse: "small_single_zone_retail_store_simple_comfort",
  },
  variable_volume_vav: {
    energyEff: 9, airQuality: 8, zoneControl: 10, humidity: 7, ahCost: 7,
    variableFlow: true, forHighOccupancy: true,
    airPath: "variable_speed_fan_vav_box_per_zone_reheat_coil",
    bestUse: "large_office_campus_multi_zone_individual_control",
  },
  dual_duct_mixing: {
    energyEff: 5, airQuality: 8, zoneControl: 9, humidity: 7, ahCost: 8,
    variableFlow: false, forHighOccupancy: false,
    airPath: "hot_cold_duct_mixing_box_per_zone_simultaneous",
    bestUse: "laboratory_hospital_precise_zone_temp_no_crossover",
  },
  dedicated_outdoor_doas: {
    energyEff: 8, airQuality: 10, zoneControl: 6, humidity: 10, ahCost: 7,
    variableFlow: true, forHighOccupancy: true,
    airPath: "100_pct_outdoor_air_energy_wheel_dew_point_control",
    bestUse: "humid_climate_school_ventilation_decoupled_latent",
  },
  energy_recovery_erv: {
    energyEff: 10, airQuality: 9, zoneControl: 5, humidity: 9, ahCost: 6,
    variableFlow: true, forHighOccupancy: true,
    airPath: "enthalpy_wheel_plate_exchanger_exhaust_to_supply",
    bestUse: "cold_hot_climate_high_ventilation_rate_energy_saving",
  },
};

function get(t: AirHandlingType): AirHandlingData {
  return DATA[t];
}

export const energyEff = (t: AirHandlingType) => get(t).energyEff;
export const airQuality = (t: AirHandlingType) => get(t).airQuality;
export const zoneControl = (t: AirHandlingType) => get(t).zoneControl;
export const humidity = (t: AirHandlingType) => get(t).humidity;
export const ahCost = (t: AirHandlingType) => get(t).ahCost;
export const variableFlow = (t: AirHandlingType) => get(t).variableFlow;
export const forHighOccupancy = (t: AirHandlingType) => get(t).forHighOccupancy;
export const airPath = (t: AirHandlingType) => get(t).airPath;
export const bestUse = (t: AirHandlingType) => get(t).bestUse;
export const airHandlingTypes = (): AirHandlingType[] =>
  Object.keys(DATA) as AirHandlingType[];
