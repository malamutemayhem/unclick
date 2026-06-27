export type HeatPipeSysType =
  | "gravity_thermosyphon"
  | "sintered_wick_capillary"
  | "loop_heat_pipe"
  | "pulsating_oscillating"
  | "vapor_chamber_flat";

interface HeatPipeSysData {
  heatFlux: number;
  orientation: number;
  distance: number;
  reliability: number;
  hpCost: number;
  passive: boolean;
  forElectronics: boolean;
  working: string;
  bestUse: string;
}

const DATA: Record<HeatPipeSysType, HeatPipeSysData> = {
  gravity_thermosyphon: {
    heatFlux: 7, orientation: 3, distance: 5, reliability: 9, hpCost: 3,
    passive: true, forElectronics: false,
    working: "water_or_refrigerant_gravity_return",
    bestUse: "waste_heat_boiler_economizer_vertical",
  },
  sintered_wick_capillary: {
    heatFlux: 8, orientation: 8, distance: 6, reliability: 8, hpCost: 5,
    passive: true, forElectronics: true,
    working: "copper_water_sintered_powder_wick",
    bestUse: "electronics_cpu_gpu_thermal_management",
  },
  loop_heat_pipe: {
    heatFlux: 9, orientation: 9, distance: 10, reliability: 7, hpCost: 8,
    passive: true, forElectronics: true,
    working: "ammonia_or_propylene_capillary_evap",
    bestUse: "spacecraft_satellite_long_distance_cool",
  },
  pulsating_oscillating: {
    heatFlux: 6, orientation: 6, distance: 4, reliability: 6, hpCost: 4,
    passive: true, forElectronics: true,
    working: "liquid_slug_vapor_plug_oscillate",
    bestUse: "compact_device_flexible_form_factor",
  },
  vapor_chamber_flat: {
    heatFlux: 10, orientation: 7, distance: 3, reliability: 9, hpCost: 6,
    passive: true, forElectronics: true,
    working: "flat_copper_water_2d_heat_spread",
    bestUse: "high_power_chip_uniform_heat_spread",
  },
};

function get(t: HeatPipeSysType): HeatPipeSysData {
  return DATA[t];
}

export const heatFlux = (t: HeatPipeSysType) => get(t).heatFlux;
export const orientation = (t: HeatPipeSysType) => get(t).orientation;
export const distance = (t: HeatPipeSysType) => get(t).distance;
export const reliability = (t: HeatPipeSysType) => get(t).reliability;
export const hpCost = (t: HeatPipeSysType) => get(t).hpCost;
export const passive = (t: HeatPipeSysType) => get(t).passive;
export const forElectronics = (t: HeatPipeSysType) => get(t).forElectronics;
export const working = (t: HeatPipeSysType) => get(t).working;
export const bestUse = (t: HeatPipeSysType) => get(t).bestUse;
export const heatPipeSysTypes = (): HeatPipeSysType[] =>
  Object.keys(DATA) as HeatPipeSysType[];
