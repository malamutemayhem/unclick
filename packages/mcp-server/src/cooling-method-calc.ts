export type CoolingMethod =
  | "forced_air_fan"
  | "direct_liquid_cold"
  | "immersion_2phase"
  | "thermoelectric_peltier"
  | "rear_door_hx";

const DATA: Record<CoolingMethod, {
  heatRemoval: number; efficiency: number; noise: number;
  complexity: number; coolCost: number; pumpRequired: boolean;
  forHpc: boolean; medium: string; bestUse: string;
}> = {
  forced_air_fan: {
    heatRemoval: 4, efficiency: 5, noise: 3,
    complexity: 2, coolCost: 2, pumpRequired: false,
    forHpc: false, medium: "ambient_air_duct",
    bestUse: "standard_rack_cooling",
  },
  direct_liquid_cold: {
    heatRemoval: 8, efficiency: 8, noise: 8,
    complexity: 7, coolCost: 7, pumpRequired: true,
    forHpc: true, medium: "water_glycol_cold_plate",
    bestUse: "gpu_cluster_rack",
  },
  immersion_2phase: {
    heatRemoval: 10, efficiency: 10, noise: 10,
    complexity: 9, coolCost: 9, pumpRequired: false,
    forHpc: true, medium: "dielectric_fluorocarbon",
    bestUse: "high_density_ai_pod",
  },
  thermoelectric_peltier: {
    heatRemoval: 3, efficiency: 2, noise: 9,
    complexity: 4, coolCost: 5, pumpRequired: false,
    forHpc: false, medium: "bismuth_telluride_module",
    bestUse: "laser_diode_temp_ctrl",
  },
  rear_door_hx: {
    heatRemoval: 7, efficiency: 7, noise: 7,
    complexity: 5, coolCost: 6, pumpRequired: true,
    forHpc: true, medium: "chilled_water_coil",
    bestUse: "retrofit_hot_aisle",
  },
};

const get = (t: CoolingMethod) => DATA[t];

export const heatRemoval = (t: CoolingMethod) => get(t).heatRemoval;
export const efficiency = (t: CoolingMethod) => get(t).efficiency;
export const noise = (t: CoolingMethod) => get(t).noise;
export const complexity = (t: CoolingMethod) => get(t).complexity;
export const coolCost = (t: CoolingMethod) => get(t).coolCost;
export const pumpRequired = (t: CoolingMethod) => get(t).pumpRequired;
export const forHpc = (t: CoolingMethod) => get(t).forHpc;
export const medium = (t: CoolingMethod) => get(t).medium;
export const bestUse = (t: CoolingMethod) => get(t).bestUse;
export const coolingMethods = (): CoolingMethod[] => Object.keys(DATA) as CoolingMethod[];
