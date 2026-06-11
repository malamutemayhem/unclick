export type AirCooledHxType =
  | "forced_draft_horizontal"
  | "induced_draft_horizontal"
  | "natural_draft_vertical"
  | "air_cooled_condenser"
  | "fin_fan_recirculation";

interface AirCooledHxData {
  coolingCapacity: number;
  airDistribution: number;
  maintenance: number;
  noiseLevel: number;
  ahCost: number;
  fanOnTop: boolean;
  forCondensing: boolean;
  airflow: string;
  bestUse: string;
}

const DATA: Record<AirCooledHxType, AirCooledHxData> = {
  forced_draft_horizontal: {
    coolingCapacity: 8, airDistribution: 7, maintenance: 9, noiseLevel: 5, ahCost: 5,
    fanOnTop: false, forCondensing: false,
    airflow: "fan_below_bundle_push_air_upward_easy_access",
    bestUse: "refinery_process_cooling_general_industrial",
  },
  induced_draft_horizontal: {
    coolingCapacity: 9, airDistribution: 9, maintenance: 7, noiseLevel: 7, ahCost: 6,
    fanOnTop: true, forCondensing: false,
    airflow: "fan_above_bundle_pull_air_uniform_distribute",
    bestUse: "petrochemical_high_duty_uniform_cooling",
  },
  natural_draft_vertical: {
    coolingCapacity: 5, airDistribution: 6, maintenance: 10, noiseLevel: 10, ahCost: 4,
    fanOnTop: false, forCondensing: false,
    airflow: "natural_convection_no_fan_vertical_tubes",
    bestUse: "low_duty_remote_location_zero_power_cooling",
  },
  air_cooled_condenser: {
    coolingCapacity: 10, airDistribution: 8, maintenance: 6, noiseLevel: 4, ahCost: 9,
    fanOnTop: true, forCondensing: true,
    airflow: "large_fan_bank_a_frame_steam_condensation",
    bestUse: "power_plant_steam_condenser_dry_cooling",
  },
  fin_fan_recirculation: {
    coolingCapacity: 7, airDistribution: 8, maintenance: 7, noiseLevel: 6, ahCost: 7,
    fanOnTop: true, forCondensing: false,
    airflow: "louver_controlled_recirculation_freeze_protect",
    bestUse: "cold_climate_freeze_protection_winter_oper",
  },
};

function get(t: AirCooledHxType): AirCooledHxData {
  return DATA[t];
}

export const coolingCapacity = (t: AirCooledHxType) => get(t).coolingCapacity;
export const airDistribution = (t: AirCooledHxType) => get(t).airDistribution;
export const maintenance = (t: AirCooledHxType) => get(t).maintenance;
export const noiseLevel = (t: AirCooledHxType) => get(t).noiseLevel;
export const ahCost = (t: AirCooledHxType) => get(t).ahCost;
export const fanOnTop = (t: AirCooledHxType) => get(t).fanOnTop;
export const forCondensing = (t: AirCooledHxType) => get(t).forCondensing;
export const airflow = (t: AirCooledHxType) => get(t).airflow;
export const bestUse = (t: AirCooledHxType) => get(t).bestUse;
export const airCooledHxTypes = (): AirCooledHxType[] =>
  Object.keys(DATA) as AirCooledHxType[];
