export type ChannelCode =
  | "ldpc_sparse_parity"
  | "turbo_parallel_concat"
  | "polar_successive_cancel"
  | "convolutional_viterbi"
  | "reed_solomon_block";

const DATA: Record<ChannelCode, {
  codingGain: number; complexity: number; latency: number;
  flexibility: number; chCost: number; softDecode: boolean;
  forDeepSpace: boolean; decoder: string; bestUse: string;
}> = {
  ldpc_sparse_parity: {
    codingGain: 10, complexity: 7, latency: 6,
    flexibility: 8, chCost: 3, softDecode: true,
    forDeepSpace: false, decoder: "belief_propagation_iterative",
    bestUse: "5g_nr_data_channel_throughput",
  },
  turbo_parallel_concat: {
    codingGain: 9, complexity: 8, latency: 5,
    flexibility: 6, chCost: 4, softDecode: true,
    forDeepSpace: true, decoder: "map_iterative_siso_exchange",
    bestUse: "4g_lte_traffic_channel",
  },
  polar_successive_cancel: {
    codingGain: 8, complexity: 5, latency: 7,
    flexibility: 9, chCost: 2, softDecode: true,
    forDeepSpace: false, decoder: "successive_cancellation_list",
    bestUse: "5g_nr_control_channel_reliable",
  },
  convolutional_viterbi: {
    codingGain: 6, complexity: 3, latency: 9,
    flexibility: 5, chCost: 1, softDecode: true,
    forDeepSpace: true, decoder: "trellis_viterbi_max_likelihood",
    bestUse: "legacy_satellite_voice_link",
  },
  reed_solomon_block: {
    codingGain: 5, complexity: 4, latency: 8,
    flexibility: 4, chCost: 1, softDecode: false,
    forDeepSpace: true, decoder: "berlekamp_massey_algebraic",
    bestUse: "optical_fiber_burst_error_fix",
  },
};

const get = (t: ChannelCode) => DATA[t];

export const codingGain = (t: ChannelCode) => get(t).codingGain;
export const complexity = (t: ChannelCode) => get(t).complexity;
export const latency = (t: ChannelCode) => get(t).latency;
export const flexibility = (t: ChannelCode) => get(t).flexibility;
export const chCost = (t: ChannelCode) => get(t).chCost;
export const softDecode = (t: ChannelCode) => get(t).softDecode;
export const forDeepSpace = (t: ChannelCode) => get(t).forDeepSpace;
export const decoder = (t: ChannelCode) => get(t).decoder;
export const bestUse = (t: ChannelCode) => get(t).bestUse;
export const channelCodes = (): ChannelCode[] => Object.keys(DATA) as ChannelCode[];
