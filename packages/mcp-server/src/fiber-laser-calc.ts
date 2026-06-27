export type FiberLaserType =
  | "continuous_wave"
  | "pulsed_nanosecond"
  | "ultrafast_femtosecond"
  | "quasi_continuous"
  | "single_mode_mopa";

interface FiberLaserData {
  power: number;
  beamQuality: number;
  pulseControl: number;
  wallPlugEfficiency: number;
  flCost: number;
  maintenance: boolean;
  forCutting: boolean;
  source: string;
  bestUse: string;
}

const DATA: Record<FiberLaserType, FiberLaserData> = {
  continuous_wave: {
    power: 10, beamQuality: 8, pulseControl: 3, wallPlugEfficiency: 9, flCost: 7,
    maintenance: false, forCutting: true,
    source: "ytterbium_doped_fiber_cw_1070nm_multikilowatt_high_power",
    bestUse: "metal_cutting_welding_cladding_high_power_industrial_use",
  },
  pulsed_nanosecond: {
    power: 6, beamQuality: 8, pulseControl: 8, wallPlugEfficiency: 7, flCost: 6,
    maintenance: false, forCutting: false,
    source: "q_switched_fiber_nanosecond_pulse_high_peak_power_marking",
    bestUse: "laser_marking_engraving_cleaning_surface_texturing_ablation",
  },
  ultrafast_femtosecond: {
    power: 4, beamQuality: 10, pulseControl: 10, wallPlugEfficiency: 5, flCost: 10,
    maintenance: false, forCutting: false,
    source: "mode_locked_fiber_femtosecond_ultrashort_pulse_cold_ablate",
    bestUse: "medical_stent_cutting_glass_drilling_cold_ablation_micro",
  },
  quasi_continuous: {
    power: 8, beamQuality: 8, pulseControl: 7, wallPlugEfficiency: 8, flCost: 7,
    maintenance: false, forCutting: true,
    source: "modulated_cw_quasi_continuous_high_peak_pulsed_drilling",
    bestUse: "spot_welding_drilling_seam_welding_battery_tab_precision",
  },
  single_mode_mopa: {
    power: 5, beamQuality: 10, pulseControl: 9, wallPlugEfficiency: 7, flCost: 8,
    maintenance: false, forCutting: false,
    source: "master_oscillator_power_amplifier_single_mode_tunable_pulse",
    bestUse: "color_marking_annealing_black_white_mark_stainless_anodize",
  },
};

function get(t: FiberLaserType): FiberLaserData {
  return DATA[t];
}

export const power = (t: FiberLaserType) => get(t).power;
export const beamQuality = (t: FiberLaserType) => get(t).beamQuality;
export const pulseControl = (t: FiberLaserType) => get(t).pulseControl;
export const wallPlugEfficiency = (t: FiberLaserType) => get(t).wallPlugEfficiency;
export const flCost = (t: FiberLaserType) => get(t).flCost;
export const maintenance = (t: FiberLaserType) => get(t).maintenance;
export const forCutting = (t: FiberLaserType) => get(t).forCutting;
export const source = (t: FiberLaserType) => get(t).source;
export const bestUse = (t: FiberLaserType) => get(t).bestUse;
export const fiberLaserTypes = (): FiberLaserType[] =>
  Object.keys(DATA) as FiberLaserType[];
