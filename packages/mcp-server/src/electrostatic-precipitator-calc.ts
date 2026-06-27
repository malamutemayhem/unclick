export type ElectrostaticPrecipitatorType =
  | "dry_plate_wire"
  | "wet_tubular"
  | "two_stage"
  | "cold_side"
  | "hot_side";

interface ElectrostaticPrecipitatorData {
  efficiency: number;
  gasVolume: number;
  pressureDrop: number;
  particleSize: number;
  epCost: number;
  wet: boolean;
  forPowerPlant: boolean;
  electrode: string;
  bestUse: string;
}

const DATA: Record<ElectrostaticPrecipitatorType, ElectrostaticPrecipitatorData> = {
  dry_plate_wire: {
    efficiency: 9, gasVolume: 10, pressureDrop: 9, particleSize: 7, epCost: 8,
    wet: false, forPowerPlant: true,
    electrode: "rigid_discharge_electrode_collecting_plate_rapping_hammer",
    bestUse: "coal_fired_power_plant_fly_ash_capture_large_volume_flue",
  },
  wet_tubular: {
    efficiency: 10, gasVolume: 6, pressureDrop: 8, particleSize: 10, epCost: 9,
    wet: true, forPowerPlant: false,
    electrode: "tubular_collecting_electrode_water_film_flush_fine_mist",
    bestUse: "acid_mist_tar_fog_fine_aerosol_sulfuric_acid_plant_metal",
  },
  two_stage: {
    efficiency: 8, gasVolume: 5, pressureDrop: 9, particleSize: 8, epCost: 6,
    wet: false, forPowerPlant: false,
    electrode: "ionizer_wire_first_stage_collector_plate_second_stage",
    bestUse: "commercial_hvac_kitchen_exhaust_indoor_air_clean_oil_mist",
  },
  cold_side: {
    efficiency: 9, gasVolume: 10, pressureDrop: 9, particleSize: 7, epCost: 7,
    wet: false, forPowerPlant: true,
    electrode: "weighted_wire_spiral_electrode_cold_side_after_air_heater",
    bestUse: "power_plant_after_air_preheater_lower_temp_higher_resistivity",
  },
  hot_side: {
    efficiency: 9, gasVolume: 10, pressureDrop: 9, particleSize: 8, epCost: 9,
    wet: false, forPowerPlant: true,
    electrode: "rigid_frame_electrode_hot_side_before_air_heater_low_resist",
    bestUse: "high_resistivity_ash_low_sulfur_coal_before_air_preheater",
  },
};

function get(t: ElectrostaticPrecipitatorType): ElectrostaticPrecipitatorData {
  return DATA[t];
}

export const efficiency = (t: ElectrostaticPrecipitatorType) => get(t).efficiency;
export const gasVolume = (t: ElectrostaticPrecipitatorType) => get(t).gasVolume;
export const pressureDrop = (t: ElectrostaticPrecipitatorType) => get(t).pressureDrop;
export const particleSize = (t: ElectrostaticPrecipitatorType) => get(t).particleSize;
export const epCost = (t: ElectrostaticPrecipitatorType) => get(t).epCost;
export const wet = (t: ElectrostaticPrecipitatorType) => get(t).wet;
export const forPowerPlant = (t: ElectrostaticPrecipitatorType) => get(t).forPowerPlant;
export const electrode = (t: ElectrostaticPrecipitatorType) => get(t).electrode;
export const bestUse = (t: ElectrostaticPrecipitatorType) => get(t).bestUse;
export const electrostaticPrecipitatorTypes = (): ElectrostaticPrecipitatorType[] =>
  Object.keys(DATA) as ElectrostaticPrecipitatorType[];
