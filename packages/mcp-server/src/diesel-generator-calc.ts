export type DieselGeneratorType =
  | "standby_emergency_gen"
  | "prime_power_continuous"
  | "portable_towable_gen"
  | "marine_propulsion_gen"
  | "containerized_gen_set";

interface DieselGeneratorData {
  powerOutput: number;
  fuelEfficiency: number;
  reliability: number;
  startupSpeed: number;
  dgCost: number;
  portable: boolean;
  forCriticalPower: boolean;
  engine: string;
  bestUse: string;
}

const DATA: Record<DieselGeneratorType, DieselGeneratorData> = {
  standby_emergency_gen: {
    powerOutput: 7, fuelEfficiency: 6, reliability: 10, startupSpeed: 9, dgCost: 6,
    portable: false, forCriticalPower: true,
    engine: "turbocharged_diesel_ats_transfer_switch_battery_start",
    bestUse: "hospital_data_center_emergency_backup_power_supply",
  },
  prime_power_continuous: {
    powerOutput: 9, fuelEfficiency: 8, reliability: 9, startupSpeed: 6, dgCost: 8,
    portable: false, forCriticalPower: true,
    engine: "heavy_duty_diesel_continuous_rated_load_management",
    bestUse: "remote_mine_site_island_grid_no_utility_available",
  },
  portable_towable_gen: {
    powerOutput: 4, fuelEfficiency: 5, reliability: 7, startupSpeed: 8, dgCost: 3,
    portable: true, forCriticalPower: false,
    engine: "compact_diesel_trailer_mounted_weather_enclosure",
    bestUse: "construction_site_outdoor_event_temporary_power",
  },
  marine_propulsion_gen: {
    powerOutput: 8, fuelEfficiency: 7, reliability: 9, startupSpeed: 7, dgCost: 9,
    portable: false, forCriticalPower: true,
    engine: "medium_speed_diesel_marine_grade_vibration_isolated",
    bestUse: "ship_vessel_offshore_platform_marine_power_supply",
  },
  containerized_gen_set: {
    powerOutput: 8, fuelEfficiency: 7, reliability: 8, startupSpeed: 8, dgCost: 7,
    portable: true, forCriticalPower: true,
    engine: "iso_container_integrated_fuel_tank_switchgear_control",
    bestUse: "rapid_deployment_disaster_relief_modular_power_plant",
  },
};

function get(t: DieselGeneratorType): DieselGeneratorData {
  return DATA[t];
}

export const powerOutput = (t: DieselGeneratorType) => get(t).powerOutput;
export const fuelEfficiency = (t: DieselGeneratorType) => get(t).fuelEfficiency;
export const reliability = (t: DieselGeneratorType) => get(t).reliability;
export const startupSpeed = (t: DieselGeneratorType) => get(t).startupSpeed;
export const dgCost = (t: DieselGeneratorType) => get(t).dgCost;
export const portable = (t: DieselGeneratorType) => get(t).portable;
export const forCriticalPower = (t: DieselGeneratorType) => get(t).forCriticalPower;
export const engine = (t: DieselGeneratorType) => get(t).engine;
export const bestUse = (t: DieselGeneratorType) => get(t).bestUse;
export const dieselGeneratorTypes = (): DieselGeneratorType[] =>
  Object.keys(DATA) as DieselGeneratorType[];
