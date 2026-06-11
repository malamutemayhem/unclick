export type OpticalAmp =
  | "edfa_erbium_fiber"
  | "soa_semiconductor"
  | "raman_distributed"
  | "tdfa_thulium_fiber"
  | "hybrid_raman_edfa";

const DATA: Record<OpticalAmp, {
  gain: number; noiseFigure: number; bandwidth: number;
  saturationPower: number; oaCost: number; distributed: boolean;
  forCband: boolean; medium: string; bestUse: string;
}> = {
  edfa_erbium_fiber: {
    gain: 9, noiseFigure: 8, bandwidth: 6,
    saturationPower: 8, oaCost: 5, distributed: false,
    forCband: true, medium: "erbium_doped_silica_fiber",
    bestUse: "dwdm_inline_booster_preamp",
  },
  soa_semiconductor: {
    gain: 6, noiseFigure: 4, bandwidth: 9,
    saturationPower: 4, oaCost: 3, distributed: false,
    forCband: false, medium: "ingaasp_active_waveguide",
    bestUse: "metro_access_gate_switch",
  },
  raman_distributed: {
    gain: 7, noiseFigure: 10, bandwidth: 8,
    saturationPower: 10, oaCost: 7, distributed: true,
    forCband: true, medium: "transmission_fiber_itself",
    bestUse: "submarine_ultra_long_haul",
  },
  tdfa_thulium_fiber: {
    gain: 8, noiseFigure: 7, bandwidth: 10,
    saturationPower: 7, oaCost: 8, distributed: false,
    forCband: false, medium: "thulium_doped_zblan_fiber",
    bestUse: "sband_capacity_expansion",
  },
  hybrid_raman_edfa: {
    gain: 10, noiseFigure: 9, bandwidth: 7,
    saturationPower: 9, oaCost: 10, distributed: true,
    forCband: true, medium: "raman_pre_edfa_boost",
    bestUse: "transoceanic_max_reach",
  },
};

const get = (t: OpticalAmp) => DATA[t];

export const gain = (t: OpticalAmp) => get(t).gain;
export const noiseFigure = (t: OpticalAmp) => get(t).noiseFigure;
export const bandwidth = (t: OpticalAmp) => get(t).bandwidth;
export const saturationPower = (t: OpticalAmp) => get(t).saturationPower;
export const oaCost = (t: OpticalAmp) => get(t).oaCost;
export const distributed = (t: OpticalAmp) => get(t).distributed;
export const forCband = (t: OpticalAmp) => get(t).forCband;
export const medium = (t: OpticalAmp) => get(t).medium;
export const bestUse = (t: OpticalAmp) => get(t).bestUse;
export const opticalAmps = (): OpticalAmp[] => Object.keys(DATA) as OpticalAmp[];
