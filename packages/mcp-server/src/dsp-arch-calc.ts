export type DspArch =
  | "fixed_point_16bit"
  | "fixed_point_32bit"
  | "floating_point_32"
  | "vliw_multi_issue"
  | "simd_vector_unit";

const DATA: Record<DspArch, {
  throughput: number; precision: number; powerEff: number;
  codeSize: number; dspCost: number; fpu: boolean;
  forAudio: boolean; pipeline: string; bestUse: string;
}> = {
  fixed_point_16bit: {
    throughput: 6, precision: 4, powerEff: 10,
    codeSize: 9, dspCost: 1, fpu: false,
    forAudio: true, pipeline: "single_mac_accumulate",
    bestUse: "hearing_aid_codec",
  },
  fixed_point_32bit: {
    throughput: 7, precision: 7, powerEff: 8,
    codeSize: 8, dspCost: 2, fpu: false,
    forAudio: true, pipeline: "dual_mac_saturate",
    bestUse: "voice_recognition_edge",
  },
  floating_point_32: {
    throughput: 8, precision: 9, powerEff: 6,
    codeSize: 6, dspCost: 4, fpu: true,
    forAudio: true, pipeline: "fmac_normalize_round",
    bestUse: "audio_effects_studio",
  },
  vliw_multi_issue: {
    throughput: 10, precision: 8, powerEff: 5,
    codeSize: 4, dspCost: 6, fpu: true,
    forAudio: false, pipeline: "8_way_parallel_dispatch",
    bestUse: "telecom_baseband_modem",
  },
  simd_vector_unit: {
    throughput: 9, precision: 8, powerEff: 7,
    codeSize: 5, dspCost: 5, fpu: true,
    forAudio: false, pipeline: "128bit_lane_packed_ops",
    bestUse: "image_video_inference",
  },
};

const get = (t: DspArch) => DATA[t];

export const throughput = (t: DspArch) => get(t).throughput;
export const precision = (t: DspArch) => get(t).precision;
export const powerEff = (t: DspArch) => get(t).powerEff;
export const codeSize = (t: DspArch) => get(t).codeSize;
export const dspCost = (t: DspArch) => get(t).dspCost;
export const fpu = (t: DspArch) => get(t).fpu;
export const forAudio = (t: DspArch) => get(t).forAudio;
export const pipeline = (t: DspArch) => get(t).pipeline;
export const bestUse = (t: DspArch) => get(t).bestUse;
export const dspArchs = (): DspArch[] => Object.keys(DATA) as DspArch[];
