export type CoherentOptic =
  | "dp_qpsk_100g"
  | "dp_16qam_400g"
  | "dp_64qam_800g"
  | "probabilistic_shaping"
  | "ofdm_optical";

const DATA: Record<CoherentOptic, {
  capacity: number; reach: number; spectralEff: number;
  complexity: number; optCost: number; softDecision: boolean;
  forMetro: boolean; modulation: string; bestUse: string;
}> = {
  dp_qpsk_100g: {
    capacity: 4, reach: 9, spectralEff: 4,
    complexity: 4, optCost: 4, softDecision: false,
    forMetro: false, modulation: "dual_pol_4qam",
    bestUse: "ultra_long_haul_backbone",
  },
  dp_16qam_400g: {
    capacity: 7, reach: 6, spectralEff: 7,
    complexity: 6, optCost: 6, softDecision: true,
    forMetro: true, modulation: "dual_pol_16qam",
    bestUse: "metro_dci_400g",
  },
  dp_64qam_800g: {
    capacity: 9, reach: 4, spectralEff: 9,
    complexity: 8, optCost: 8, softDecision: true,
    forMetro: true, modulation: "dual_pol_64qam",
    bestUse: "short_reach_800g_zr_plus",
  },
  probabilistic_shaping: {
    capacity: 8, reach: 7, spectralEff: 8,
    complexity: 9, optCost: 9, softDecision: true,
    forMetro: true, modulation: "shaped_qam_variable",
    bestUse: "flexible_rate_open_line",
  },
  ofdm_optical: {
    capacity: 7, reach: 5, spectralEff: 8,
    complexity: 7, optCost: 7, softDecision: true,
    forMetro: true, modulation: "multi_subcarrier_ofdm",
    bestUse: "elastic_optical_network",
  },
};

const get = (t: CoherentOptic) => DATA[t];

export const capacity = (t: CoherentOptic) => get(t).capacity;
export const reach = (t: CoherentOptic) => get(t).reach;
export const spectralEff = (t: CoherentOptic) => get(t).spectralEff;
export const complexity = (t: CoherentOptic) => get(t).complexity;
export const optCost = (t: CoherentOptic) => get(t).optCost;
export const softDecision = (t: CoherentOptic) => get(t).softDecision;
export const forMetro = (t: CoherentOptic) => get(t).forMetro;
export const modulation = (t: CoherentOptic) => get(t).modulation;
export const bestUse = (t: CoherentOptic) => get(t).bestUse;
export const coherentOptics = (): CoherentOptic[] => Object.keys(DATA) as CoherentOptic[];
