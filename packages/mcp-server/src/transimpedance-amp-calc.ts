export type TransimpedanceAmp =
  | "resistive_shunt"
  | "capacitive_reset"
  | "regulated_cascode_tia"
  | "cherry_hooper"
  | "differential_tia";

const DATA: Record<TransimpedanceAmp, {
  bandwidth: number; transimpedance: number; noise: number;
  dynamicRange: number; tiaCost: number; differential: boolean;
  forFiber: boolean; feedback: string; bestUse: string;
}> = {
  resistive_shunt: {
    bandwidth: 5, transimpedance: 6, noise: 5,
    dynamicRange: 6, tiaCost: 2, differential: false,
    forFiber: false, feedback: "single_resistor_rf",
    bestUse: "photodiode_dc_monitor",
  },
  capacitive_reset: {
    bandwidth: 7, transimpedance: 8, noise: 7,
    dynamicRange: 9, tiaCost: 5, differential: false,
    forFiber: false, feedback: "integrator_periodic_rst",
    bestUse: "ct_scanner_pixel",
  },
  regulated_cascode_tia: {
    bandwidth: 9, transimpedance: 7, noise: 8,
    dynamicRange: 7, tiaCost: 6, differential: false,
    forFiber: true, feedback: "low_z_cascode_input",
    bestUse: "burst_mode_pon_rx",
  },
  cherry_hooper: {
    bandwidth: 10, transimpedance: 5, noise: 6,
    dynamicRange: 5, tiaCost: 7, differential: true,
    forFiber: true, feedback: "shunt_series_cascade",
    bestUse: "100g_coherent_rx",
  },
  differential_tia: {
    bandwidth: 8, transimpedance: 7, noise: 9,
    dynamicRange: 8, tiaCost: 8, differential: true,
    forFiber: true, feedback: "balanced_twin_path",
    bestUse: "lidar_apd_readout",
  },
};

const get = (t: TransimpedanceAmp) => DATA[t];

export const bandwidth = (t: TransimpedanceAmp) => get(t).bandwidth;
export const transimpedance = (t: TransimpedanceAmp) => get(t).transimpedance;
export const noise = (t: TransimpedanceAmp) => get(t).noise;
export const dynamicRange = (t: TransimpedanceAmp) => get(t).dynamicRange;
export const tiaCost = (t: TransimpedanceAmp) => get(t).tiaCost;
export const differential = (t: TransimpedanceAmp) => get(t).differential;
export const forFiber = (t: TransimpedanceAmp) => get(t).forFiber;
export const feedback = (t: TransimpedanceAmp) => get(t).feedback;
export const bestUse = (t: TransimpedanceAmp) => get(t).bestUse;
export const transimpedanceAmps = (): TransimpedanceAmp[] => Object.keys(DATA) as TransimpedanceAmp[];
