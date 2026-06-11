export type ErrorCorrectionType =
  | "hamming_sec_ded"
  | "bch_primitive_cyclic"
  | "reed_solomon_symbol"
  | "ldpc_sparse_graph"
  | "polar_arikan_successive";

const DATA: Record<ErrorCorrectionType, {
  codingGain: number; complexity: number; burstCorrect: number;
  flexibility: number; ecCost: number; softDecode: boolean;
  forStorage: boolean; structure: string; bestUse: string;
}> = {
  hamming_sec_ded: {
    codingGain: 3, complexity: 1, burstCorrect: 2,
    flexibility: 3, ecCost: 1, softDecode: false,
    forStorage: true, structure: "parity_check_matrix_simple",
    bestUse: "ecc_memory_dimm_single_bit_fix",
  },
  bch_primitive_cyclic: {
    codingGain: 7, complexity: 5, burstCorrect: 5,
    flexibility: 7, ecCost: 2, softDecode: false,
    forStorage: true, structure: "galois_field_cyclic_poly",
    bestUse: "nand_flash_ssd_multi_bit_ecc",
  },
  reed_solomon_symbol: {
    codingGain: 8, complexity: 6, burstCorrect: 10,
    flexibility: 6, ecCost: 3, softDecode: false,
    forStorage: true, structure: "symbol_block_erasure_correct",
    bestUse: "optical_disc_qr_code_deep_space",
  },
  ldpc_sparse_graph: {
    codingGain: 10, complexity: 8, burstCorrect: 6,
    flexibility: 8, ecCost: 4, softDecode: true,
    forStorage: false, structure: "sparse_bipartite_graph_belief",
    bestUse: "5g_nr_wifi6_satellite_broadband",
  },
  polar_arikan_successive: {
    codingGain: 9, complexity: 7, burstCorrect: 5,
    flexibility: 9, ecCost: 3, softDecode: true,
    forStorage: false, structure: "channel_polarize_frozen_bits",
    bestUse: "5g_control_channel_iot_short",
  },
};

const get = (t: ErrorCorrectionType) => DATA[t];

export const codingGain = (t: ErrorCorrectionType) => get(t).codingGain;
export const complexity = (t: ErrorCorrectionType) => get(t).complexity;
export const burstCorrect = (t: ErrorCorrectionType) => get(t).burstCorrect;
export const flexibility = (t: ErrorCorrectionType) => get(t).flexibility;
export const ecCost = (t: ErrorCorrectionType) => get(t).ecCost;
export const softDecode = (t: ErrorCorrectionType) => get(t).softDecode;
export const forStorage = (t: ErrorCorrectionType) => get(t).forStorage;
export const structure = (t: ErrorCorrectionType) => get(t).structure;
export const bestUse = (t: ErrorCorrectionType) => get(t).bestUse;
export const errorCorrectionTypes = (): ErrorCorrectionType[] => Object.keys(DATA) as ErrorCorrectionType[];
