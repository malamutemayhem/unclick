export type OpticalModulator =
  | "eam_electro_absorb"
  | "mzm_mach_zehnder"
  | "ring_resonator"
  | "iq_nested_mzm"
  | "soa_gate_switch";

const DATA: Record<OpticalModulator, {
  bandwidth: number; extinctionRatio: number; insertionLoss: number;
  chirp: number; modCost: number; integrated: boolean;
  forCoherent: boolean; platform: string; bestUse: string;
}> = {
  eam_electro_absorb: {
    bandwidth: 6, extinctionRatio: 6, insertionLoss: 5,
    chirp: 4, modCost: 4, integrated: true,
    forCoherent: false, platform: "inp_monolithic_dfb",
    bestUse: "10g_direct_detect_link",
  },
  mzm_mach_zehnder: {
    bandwidth: 8, extinctionRatio: 9, insertionLoss: 6,
    chirp: 8, modCost: 7, integrated: false,
    forCoherent: true, platform: "linbo3_x_cut_tf",
    bestUse: "long_haul_dwdm_channel",
  },
  ring_resonator: {
    bandwidth: 7, extinctionRatio: 7, insertionLoss: 4,
    chirp: 5, modCost: 3, integrated: true,
    forCoherent: false, platform: "silicon_photonics_soi",
    bestUse: "datacenter_co_pkg_optic",
  },
  iq_nested_mzm: {
    bandwidth: 9, extinctionRatio: 10, insertionLoss: 7,
    chirp: 10, modCost: 9, integrated: false,
    forCoherent: true, platform: "inp_or_linbo3_nested",
    bestUse: "coherent_dp_qpsk_16qam",
  },
  soa_gate_switch: {
    bandwidth: 5, extinctionRatio: 8, insertionLoss: 3,
    chirp: 3, modCost: 6, integrated: true,
    forCoherent: false, platform: "inp_soa_gate_array",
    bestUse: "optical_packet_switching",
  },
};

const get = (t: OpticalModulator) => DATA[t];

export const bandwidth = (t: OpticalModulator) => get(t).bandwidth;
export const extinctionRatio = (t: OpticalModulator) => get(t).extinctionRatio;
export const insertionLoss = (t: OpticalModulator) => get(t).insertionLoss;
export const chirp = (t: OpticalModulator) => get(t).chirp;
export const modCost = (t: OpticalModulator) => get(t).modCost;
export const integrated = (t: OpticalModulator) => get(t).integrated;
export const forCoherent = (t: OpticalModulator) => get(t).forCoherent;
export const platform = (t: OpticalModulator) => get(t).platform;
export const bestUse = (t: OpticalModulator) => get(t).bestUse;
export const opticalModulators = (): OpticalModulator[] => Object.keys(DATA) as OpticalModulator[];
