export type ThermalPadType =
  | "silicone_gap_filler"
  | "graphite_sheet_thin"
  | "phase_change_pad"
  | "ceramic_filled_hard"
  | "putty_conform_thick";

const DATA: Record<ThermalPadType, {
  conductivity: number; conformability: number; compressibility: number;
  electricIsolate: number; padCost: number; reusable: boolean;
  electricInsulate: boolean; material: string; bestUse: string;
}> = {
  silicone_gap_filler: { conductivity: 6, conformability: 9, compressibility: 8, electricIsolate: 9, padCost: 4, reusable: false, electricInsulate: true, material: "silicone_ceramic_fill", bestUse: "general_ic_heatsink_gap" },
  graphite_sheet_thin: { conductivity: 10, conformability: 5, compressibility: 3, electricIsolate: 2, padCost: 6, reusable: true, electricInsulate: false, material: "synthetic_graphite", bestUse: "thin_high_conduct_spread" },
  phase_change_pad: { conductivity: 8, conformability: 10, compressibility: 10, electricIsolate: 8, padCost: 7, reusable: false, electricInsulate: true, material: "paraffin_phase_change", bestUse: "cpu_gpu_zero_pressure" },
  ceramic_filled_hard: { conductivity: 9, conformability: 3, compressibility: 2, electricIsolate: 10, padCost: 5, reusable: true, electricInsulate: true, material: "alumina_ceramic_sheet", bestUse: "power_device_isolate" },
  putty_conform_thick: { conductivity: 5, conformability: 10, compressibility: 10, electricIsolate: 7, padCost: 5, reusable: false, electricInsulate: true, material: "silicone_putty_thick", bestUse: "irregular_gap_fill" },
};

const get = (t: ThermalPadType) => DATA[t];

export const conductivity = (t: ThermalPadType) => get(t).conductivity;
export const conformability = (t: ThermalPadType) => get(t).conformability;
export const compressibility = (t: ThermalPadType) => get(t).compressibility;
export const electricIsolate = (t: ThermalPadType) => get(t).electricIsolate;
export const padCost = (t: ThermalPadType) => get(t).padCost;
export const reusable = (t: ThermalPadType) => get(t).reusable;
export const electricInsulate = (t: ThermalPadType) => get(t).electricInsulate;
export const material = (t: ThermalPadType) => get(t).material;
export const bestUse = (t: ThermalPadType) => get(t).bestUse;
export const thermalPads = (): ThermalPadType[] => Object.keys(DATA) as ThermalPadType[];
