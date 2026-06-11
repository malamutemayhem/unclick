// thermal-paste-calc - thermal paste/compound types

export type ThermalPaste =
  | "silicone_based_standard"
  | "metal_oxide_ceramic"
  | "liquid_metal_gallium"
  | "carbon_fiber_compound"
  | "phase_change_pad";

const DATA: Record<ThermalPaste, {
  conductivity: number; applyEase: number; longevity: number; cleanEase: number;
  cost: number; conductive: boolean; nonCuring: boolean; baseCompound: string; bestUse: string;
}> = {
  silicone_based_standard:  { conductivity: 5, applyEase: 9, longevity: 7, cleanEase: 8, cost: 2, conductive: false, nonCuring: true, baseCompound: "silicone_oil_filler", bestUse: "general_cpu_mount" },
  metal_oxide_ceramic:      { conductivity: 7, applyEase: 7, longevity: 8, cleanEase: 7, cost: 4, conductive: false, nonCuring: true, baseCompound: "zinc_oxide_ceramic", bestUse: "safe_high_perform" },
  liquid_metal_gallium:     { conductivity: 10, applyEase: 4, longevity: 9, cleanEase: 3, cost: 9, conductive: true, nonCuring: true, baseCompound: "gallium_indium_alloy", bestUse: "extreme_overclock" },
  carbon_fiber_compound:    { conductivity: 8, applyEase: 6, longevity: 10, cleanEase: 6, cost: 6, conductive: false, nonCuring: true, baseCompound: "carbon_fiber_matrix", bestUse: "long_term_stable" },
  phase_change_pad:         { conductivity: 6, applyEase: 10, longevity: 6, cleanEase: 9, cost: 5, conductive: false, nonCuring: false, baseCompound: "wax_phase_change", bestUse: "easy_install_pad" },
};

const get = (p: ThermalPaste) => DATA[p];
export const conductivity = (p: ThermalPaste) => get(p).conductivity;
export const applyEase = (p: ThermalPaste) => get(p).applyEase;
export const longevity = (p: ThermalPaste) => get(p).longevity;
export const cleanEase = (p: ThermalPaste) => get(p).cleanEase;
export const pasteCost = (p: ThermalPaste) => get(p).cost;
export const conductive = (p: ThermalPaste) => get(p).conductive;
export const nonCuring = (p: ThermalPaste) => get(p).nonCuring;
export const baseCompound = (p: ThermalPaste) => get(p).baseCompound;
export const bestUse = (p: ThermalPaste) => get(p).bestUse;
export const thermalPastes = (): ThermalPaste[] => Object.keys(DATA) as ThermalPaste[];
