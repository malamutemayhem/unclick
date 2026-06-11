export type Modulator =
  | "mzi_silicon_pn"
  | "ring_resonator_si"
  | "eam_electro_absorb"
  | "eo_lithium_niobate"
  | "iq_nested_coherent";

const DATA: Record<Modulator, {
  bandwidth: number; extinctionRatio: number; insertionLoss: number;
  chirp: number; mdCost: number; polarizationIndep: boolean;
  forCoherent: boolean; mechanism: string; bestUse: string;
}> = {
  mzi_silicon_pn: {
    bandwidth: 8, extinctionRatio: 7, insertionLoss: 5,
    chirp: 6, mdCost: 3, polarizationIndep: false,
    forCoherent: false, mechanism: "carrier_depletion_phase_shift",
    bestUse: "100g_imdd_datacenter_link",
  },
  ring_resonator_si: {
    bandwidth: 7, extinctionRatio: 9, insertionLoss: 7,
    chirp: 4, mdCost: 2, polarizationIndep: false,
    forCoherent: false, mechanism: "resonance_shift_carrier_inject",
    bestUse: "wdm_microring_array_mux",
  },
  eam_electro_absorb: {
    bandwidth: 10, extinctionRatio: 8, insertionLoss: 4,
    chirp: 3, mdCost: 6, polarizationIndep: false,
    forCoherent: false, mechanism: "qcse_exciton_absorption",
    bestUse: "56gbaud_pam4_short_reach",
  },
  eo_lithium_niobate: {
    bandwidth: 10, extinctionRatio: 10, insertionLoss: 8,
    chirp: 10, mdCost: 8, polarizationIndep: true,
    forCoherent: true, mechanism: "pockels_linear_eo_effect",
    bestUse: "400g_dp_16qam_long_haul",
  },
  iq_nested_coherent: {
    bandwidth: 9, extinctionRatio: 9, insertionLoss: 6,
    chirp: 9, mdCost: 10, polarizationIndep: true,
    forCoherent: true, mechanism: "dual_parallel_mzi_iq_bias",
    bestUse: "800g_coherent_dsp_transceiver",
  },
};

const get = (t: Modulator) => DATA[t];

export const bandwidth = (t: Modulator) => get(t).bandwidth;
export const extinctionRatio = (t: Modulator) => get(t).extinctionRatio;
export const insertionLoss = (t: Modulator) => get(t).insertionLoss;
export const chirp = (t: Modulator) => get(t).chirp;
export const mdCost = (t: Modulator) => get(t).mdCost;
export const polarizationIndep = (t: Modulator) => get(t).polarizationIndep;
export const forCoherent = (t: Modulator) => get(t).forCoherent;
export const mechanism = (t: Modulator) => get(t).mechanism;
export const bestUse = (t: Modulator) => get(t).bestUse;
export const modulators = (): Modulator[] => Object.keys(DATA) as Modulator[];
