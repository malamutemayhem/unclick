export type ThermalEnergyStorageType =
  | "chilled_water_tank"
  | "ice_storage"
  | "eutectic_salt"
  | "molten_salt"
  | "borehole_seasonal";

interface ThermalEnergyStorageData {
  capacity: number;
  efficiency: number;
  chargeRate: number;
  duration: number;
  teCost: number;
  passive: boolean;
  forPeakShift: boolean;
  medium: string;
  bestUse: string;
}

const DATA: Record<ThermalEnergyStorageType, ThermalEnergyStorageData> = {
  chilled_water_tank: {
    capacity: 7, efficiency: 9, chargeRate: 8, duration: 6, teCost: 5,
    passive: true, forPeakShift: true,
    medium: "stratified_chilled_water_tank_thermocline_diffuser_system",
    bestUse: "campus_district_cooling_peak_demand_shift_overnight_charge",
  },
  ice_storage: {
    capacity: 9, efficiency: 7, chargeRate: 6, duration: 7, teCost: 6,
    passive: false, forPeakShift: true,
    medium: "ice_on_coil_encapsulated_ice_ball_glycol_loop_freeze_melt",
    bestUse: "commercial_building_peak_electric_rate_shift_load_level",
  },
  eutectic_salt: {
    capacity: 8, efficiency: 8, chargeRate: 7, duration: 7, teCost: 7,
    passive: true, forPeakShift: true,
    medium: "phase_change_material_eutectic_salt_encapsulated_module",
    bestUse: "cold_chain_transport_telecom_shelter_backup_cooling_pcm",
  },
  molten_salt: {
    capacity: 10, efficiency: 8, chargeRate: 7, duration: 9, teCost: 9,
    passive: false, forPeakShift: false,
    medium: "binary_nitrate_salt_60_40_nano3_kno3_two_tank_solar_csp",
    bestUse: "concentrated_solar_power_csp_plant_dispatchable_solar_gen",
  },
  borehole_seasonal: {
    capacity: 10, efficiency: 6, chargeRate: 3, duration: 10, teCost: 8,
    passive: true, forPeakShift: false,
    medium: "vertical_borehole_field_ground_heat_exchanger_seasonal",
    bestUse: "district_heating_seasonal_solar_excess_summer_to_winter",
  },
};

function get(t: ThermalEnergyStorageType): ThermalEnergyStorageData {
  return DATA[t];
}

export const capacity = (t: ThermalEnergyStorageType) => get(t).capacity;
export const efficiency = (t: ThermalEnergyStorageType) => get(t).efficiency;
export const chargeRate = (t: ThermalEnergyStorageType) => get(t).chargeRate;
export const duration = (t: ThermalEnergyStorageType) => get(t).duration;
export const teCost = (t: ThermalEnergyStorageType) => get(t).teCost;
export const passive = (t: ThermalEnergyStorageType) => get(t).passive;
export const forPeakShift = (t: ThermalEnergyStorageType) => get(t).forPeakShift;
export const medium = (t: ThermalEnergyStorageType) => get(t).medium;
export const bestUse = (t: ThermalEnergyStorageType) => get(t).bestUse;
export const thermalEnergyStorageTypes = (): ThermalEnergyStorageType[] =>
  Object.keys(DATA) as ThermalEnergyStorageType[];
