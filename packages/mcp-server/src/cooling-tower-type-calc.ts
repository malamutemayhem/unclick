export type CoolingTowerType =
  | "natural_draft_hyperbolic"
  | "mechanical_induced_draft"
  | "mechanical_forced_draft"
  | "crossflow_splash_fill"
  | "dry_cooler_fin_tube";

interface CoolingTowerData {
  capacity: number;
  efficiency: number;
  noise: number;
  waterUse: number;
  ctCost: number;
  fan: boolean;
  forPower: boolean;
  airflow: string;
  bestUse: string;
}

const DATA: Record<CoolingTowerType, CoolingTowerData> = {
  natural_draft_hyperbolic: {
    capacity: 10, efficiency: 8, noise: 10, waterUse: 7, ctCost: 10,
    fan: false, forPower: true,
    airflow: "buoyancy_driven_chimney_stack",
    bestUse: "large_power_plant_nuclear_thermal",
  },
  mechanical_induced_draft: {
    capacity: 8, efficiency: 9, noise: 5, waterUse: 8, ctCost: 6,
    fan: true, forPower: false,
    airflow: "fan_top_pulls_air_upward",
    bestUse: "hvac_industrial_process_cooling",
  },
  mechanical_forced_draft: {
    capacity: 7, efficiency: 7, noise: 4, waterUse: 7, ctCost: 5,
    fan: true, forPower: false,
    airflow: "fan_bottom_pushes_air_up",
    bestUse: "indoor_install_freeze_protection",
  },
  crossflow_splash_fill: {
    capacity: 7, efficiency: 6, noise: 6, waterUse: 6, ctCost: 4,
    fan: true, forPower: false,
    airflow: "horizontal_air_vertical_water",
    bestUse: "dirty_water_industrial_easy_clean",
  },
  dry_cooler_fin_tube: {
    capacity: 5, efficiency: 5, noise: 6, waterUse: 10, ctCost: 7,
    fan: true, forPower: false,
    airflow: "air_over_finned_tube_no_evap",
    bestUse: "water_scarce_data_center_zero_plume",
  },
};

function get(t: CoolingTowerType): CoolingTowerData {
  return DATA[t];
}

export const capacity = (t: CoolingTowerType) => get(t).capacity;
export const efficiency = (t: CoolingTowerType) => get(t).efficiency;
export const noise = (t: CoolingTowerType) => get(t).noise;
export const waterUse = (t: CoolingTowerType) => get(t).waterUse;
export const ctCost = (t: CoolingTowerType) => get(t).ctCost;
export const fan = (t: CoolingTowerType) => get(t).fan;
export const forPower = (t: CoolingTowerType) => get(t).forPower;
export const airflow = (t: CoolingTowerType) => get(t).airflow;
export const bestUse = (t: CoolingTowerType) => get(t).bestUse;
export const coolingTowerTypes = (): CoolingTowerType[] =>
  Object.keys(DATA) as CoolingTowerType[];
