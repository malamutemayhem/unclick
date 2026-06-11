export type ThermalInterface =
  | "thermal_grease"
  | "phase_change_pad"
  | "indium_foil"
  | "graphite_sheet"
  | "liquid_metal";

const DATA: Record<ThermalInterface, {
  conductivity: number; thickness: number; pumpOut: number;
  reworkability: number; timCost: number; electricIsolate: boolean;
  forServer: boolean; material: string; bestUse: string;
}> = {
  thermal_grease: {
    conductivity: 5, thickness: 6, pumpOut: 4,
    reworkability: 9, timCost: 2, electricIsolate: false,
    forServer: false, material: "silicone_metal_oxide",
    bestUse: "consumer_cpu_cooler",
  },
  phase_change_pad: {
    conductivity: 6, thickness: 7, pumpOut: 8,
    reworkability: 7, timCost: 5, electricIsolate: false,
    forServer: true, material: "paraffin_wax_filler",
    bestUse: "server_lid_heatsink",
  },
  indium_foil: {
    conductivity: 9, thickness: 5, pumpOut: 10,
    reworkability: 5, timCost: 9, electricIsolate: false,
    forServer: true, material: "pure_indium_sheet",
    bestUse: "high_power_igbt_module",
  },
  graphite_sheet: {
    conductivity: 7, thickness: 8, pumpOut: 9,
    reworkability: 6, timCost: 4, electricIsolate: false,
    forServer: false, material: "pyrolytic_graphite",
    bestUse: "mobile_phone_spreader",
  },
  liquid_metal: {
    conductivity: 10, thickness: 9, pumpOut: 7,
    reworkability: 3, timCost: 7, electricIsolate: false,
    forServer: false, material: "gallium_indium_tin",
    bestUse: "extreme_overclock_ihs",
  },
};

const get = (t: ThermalInterface) => DATA[t];

export const conductivity = (t: ThermalInterface) => get(t).conductivity;
export const thickness = (t: ThermalInterface) => get(t).thickness;
export const pumpOut = (t: ThermalInterface) => get(t).pumpOut;
export const reworkability = (t: ThermalInterface) => get(t).reworkability;
export const timCost = (t: ThermalInterface) => get(t).timCost;
export const electricIsolate = (t: ThermalInterface) => get(t).electricIsolate;
export const forServer = (t: ThermalInterface) => get(t).forServer;
export const material = (t: ThermalInterface) => get(t).material;
export const bestUse = (t: ThermalInterface) => get(t).bestUse;
export const thermalInterfaces = (): ThermalInterface[] => Object.keys(DATA) as ThermalInterface[];
