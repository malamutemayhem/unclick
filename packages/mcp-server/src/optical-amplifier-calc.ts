export type OpticalAmplifier =
  | "edfa_erbium"
  | "soa_semiconductor"
  | "raman_distributed"
  | "tdfa_thulium"
  | "parametric_opa";

const DATA: Record<OpticalAmplifier, {
  gain: number; noiseFigure: number; bandwidth: number;
  saturationPower: number; ampCost: number; integrated: boolean;
  forLongHaul: boolean; medium: string; bestUse: string;
}> = {
  edfa_erbium: {
    gain: 9, noiseFigure: 7, bandwidth: 7,
    saturationPower: 8, ampCost: 7, integrated: false,
    forLongHaul: true, medium: "erbium_doped_fiber",
    bestUse: "c_band_trunk_amplifier",
  },
  soa_semiconductor: {
    gain: 6, noiseFigure: 5, bandwidth: 8,
    saturationPower: 5, ampCost: 4, integrated: true,
    forLongHaul: false, medium: "iii_v_waveguide",
    bestUse: "photonic_ic_booster",
  },
  raman_distributed: {
    gain: 7, noiseFigure: 8, bandwidth: 9,
    saturationPower: 6, ampCost: 8, integrated: false,
    forLongHaul: true, medium: "silica_fiber_itself",
    bestUse: "ultra_long_haul_submarine",
  },
  tdfa_thulium: {
    gain: 7, noiseFigure: 6, bandwidth: 7,
    saturationPower: 7, ampCost: 6, integrated: false,
    forLongHaul: true, medium: "thulium_doped_fiber",
    bestUse: "s_band_expansion",
  },
  parametric_opa: {
    gain: 8, noiseFigure: 9, bandwidth: 6,
    saturationPower: 5, ampCost: 9, integrated: false,
    forLongHaul: false, medium: "nonlinear_hnlf",
    bestUse: "phase_sensitive_regen",
  },
};

const get = (t: OpticalAmplifier) => DATA[t];

export const gain = (t: OpticalAmplifier) => get(t).gain;
export const noiseFigure = (t: OpticalAmplifier) => get(t).noiseFigure;
export const bandwidth = (t: OpticalAmplifier) => get(t).bandwidth;
export const saturationPower = (t: OpticalAmplifier) => get(t).saturationPower;
export const ampCost = (t: OpticalAmplifier) => get(t).ampCost;
export const integrated = (t: OpticalAmplifier) => get(t).integrated;
export const forLongHaul = (t: OpticalAmplifier) => get(t).forLongHaul;
export const medium = (t: OpticalAmplifier) => get(t).medium;
export const bestUse = (t: OpticalAmplifier) => get(t).bestUse;
export const opticalAmplifiers = (): OpticalAmplifier[] => Object.keys(DATA) as OpticalAmplifier[];
