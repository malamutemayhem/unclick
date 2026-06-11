export type EyeDiagram =
  | "nrz_2level"
  | "pam4_4level"
  | "pam6_coded"
  | "duobinary_partial"
  | "ofdm_constellation";

const DATA: Record<EyeDiagram, {
  snrMargin: number; dataRate: number; complexity: number;
  spectralEff: number; eyeCost: number; fecRequired: boolean;
  forOptical: boolean; encoding: string; bestUse: string;
}> = {
  nrz_2level: {
    snrMargin: 10, dataRate: 5, complexity: 2,
    spectralEff: 4, eyeCost: 2, fecRequired: false,
    forOptical: true, encoding: "binary_on_off_keying",
    bestUse: "short_reach_25g_nrz",
  },
  pam4_4level: {
    snrMargin: 5, dataRate: 9, complexity: 7,
    spectralEff: 8, eyeCost: 6, fecRequired: true,
    forOptical: true, encoding: "four_level_amplitude",
    bestUse: "112g_serdes_electrical",
  },
  pam6_coded: {
    snrMargin: 4, dataRate: 10, complexity: 9,
    spectralEff: 9, eyeCost: 8, fecRequired: true,
    forOptical: false, encoding: "six_level_trellis_coded",
    bestUse: "next_gen_ethernet_224g",
  },
  duobinary_partial: {
    snrMargin: 7, dataRate: 7, complexity: 5,
    spectralEff: 7, eyeCost: 4, fecRequired: false,
    forOptical: true, encoding: "partial_response_controlled_isi",
    bestUse: "legacy_40g_optical",
  },
  ofdm_constellation: {
    snrMargin: 6, dataRate: 8, complexity: 10,
    spectralEff: 10, eyeCost: 9, fecRequired: true,
    forOptical: true, encoding: "multi_carrier_qam_subcarrier",
    bestUse: "coherent_optical_flexible",
  },
};

const get = (t: EyeDiagram) => DATA[t];

export const snrMargin = (t: EyeDiagram) => get(t).snrMargin;
export const dataRate = (t: EyeDiagram) => get(t).dataRate;
export const complexity = (t: EyeDiagram) => get(t).complexity;
export const spectralEff = (t: EyeDiagram) => get(t).spectralEff;
export const eyeCost = (t: EyeDiagram) => get(t).eyeCost;
export const fecRequired = (t: EyeDiagram) => get(t).fecRequired;
export const forOptical = (t: EyeDiagram) => get(t).forOptical;
export const encoding = (t: EyeDiagram) => get(t).encoding;
export const bestUse = (t: EyeDiagram) => get(t).bestUse;
export const eyeDiagrams = (): EyeDiagram[] => Object.keys(DATA) as EyeDiagram[];
