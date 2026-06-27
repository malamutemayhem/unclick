export type RfMixerType =
  | "passive_diode_ring"
  | "active_gilbert_cell"
  | "image_reject_hartley"
  | "subharmonic_antipar"
  | "iq_quadrature_mix";

const DATA: Record<RfMixerType, {
  conversionLoss: number; linearity: number; noiseFigure: number;
  isolation: number; mixerCost: number; requiresLo: boolean;
  forWideband: boolean; topology: string; bestUse: string;
}> = {
  passive_diode_ring: { conversionLoss: 6, linearity: 9, noiseFigure: 6, isolation: 8, mixerCost: 3, requiresLo: true, forWideband: true, topology: "schottky_ring_double", bestUse: "broadband_test_instrument" },
  active_gilbert_cell: { conversionLoss: 9, linearity: 6, noiseFigure: 8, isolation: 7, mixerCost: 4, requiresLo: true, forWideband: false, topology: "cross_coupled_diff", bestUse: "integrated_rf_ic_mixer" },
  image_reject_hartley: { conversionLoss: 7, linearity: 7, noiseFigure: 7, isolation: 9, mixerCost: 5, requiresLo: true, forWideband: false, topology: "hartley_90deg_hybrid", bestUse: "single_conversion_no_filter" },
  subharmonic_antipar: { conversionLoss: 5, linearity: 8, noiseFigure: 5, isolation: 7, mixerCost: 6, requiresLo: true, forWideband: true, topology: "antiparallel_diode_2xlo", bestUse: "mmwave_60ghz_frontend" },
  iq_quadrature_mix: { conversionLoss: 8, linearity: 7, noiseFigure: 7, isolation: 8, mixerCost: 5, requiresLo: true, forWideband: true, topology: "iq_0_90_lo_split", bestUse: "direct_conversion_sdr" },
};

const get = (t: RfMixerType) => DATA[t];

export const conversionLoss = (t: RfMixerType) => get(t).conversionLoss;
export const linearity = (t: RfMixerType) => get(t).linearity;
export const noiseFigure = (t: RfMixerType) => get(t).noiseFigure;
export const isolation = (t: RfMixerType) => get(t).isolation;
export const mixerCost = (t: RfMixerType) => get(t).mixerCost;
export const requiresLo = (t: RfMixerType) => get(t).requiresLo;
export const forWideband = (t: RfMixerType) => get(t).forWideband;
export const topology = (t: RfMixerType) => get(t).topology;
export const bestUse = (t: RfMixerType) => get(t).bestUse;
export const rfMixers = (): RfMixerType[] => Object.keys(DATA) as RfMixerType[];
