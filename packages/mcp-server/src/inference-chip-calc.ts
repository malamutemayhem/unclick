export type InferenceChip =
  | "gpu_inference_mode"
  | "asic_fixed_model"
  | "mcu_tinyml"
  | "dsp_vision"
  | "analog_imc";

const DATA: Record<InferenceChip, {
  throughput: number; latency: number; powerEff: number;
  flexibility: number; infCost: number; batchOptimized: boolean;
  forEdge: boolean; precision: string; bestUse: string;
}> = {
  gpu_inference_mode: {
    throughput: 9, latency: 6, powerEff: 5,
    flexibility: 9, infCost: 8, batchOptimized: true,
    forEdge: false, precision: "fp16_int8_mixed",
    bestUse: "cloud_llm_serving",
  },
  asic_fixed_model: {
    throughput: 8, latency: 9, powerEff: 9,
    flexibility: 2, infCost: 5, batchOptimized: true,
    forEdge: true, precision: "int8_int4_custom",
    bestUse: "video_analytics_edge",
  },
  mcu_tinyml: {
    throughput: 2, latency: 8, powerEff: 10,
    flexibility: 5, infCost: 1, batchOptimized: false,
    forEdge: true, precision: "int8_binary_micro",
    bestUse: "keyword_wake_word",
  },
  dsp_vision: {
    throughput: 5, latency: 7, powerEff: 8,
    flexibility: 6, infCost: 3, batchOptimized: false,
    forEdge: true, precision: "fixed_q15_simd",
    bestUse: "camera_isp_neural",
  },
  analog_imc: {
    throughput: 7, latency: 10, powerEff: 10,
    flexibility: 3, infCost: 6, batchOptimized: false,
    forEdge: true, precision: "analog_1bit_crossbar",
    bestUse: "ultra_low_power_sensor",
  },
};

const get = (t: InferenceChip) => DATA[t];

export const throughput = (t: InferenceChip) => get(t).throughput;
export const latency = (t: InferenceChip) => get(t).latency;
export const powerEff = (t: InferenceChip) => get(t).powerEff;
export const flexibility = (t: InferenceChip) => get(t).flexibility;
export const infCost = (t: InferenceChip) => get(t).infCost;
export const batchOptimized = (t: InferenceChip) => get(t).batchOptimized;
export const forEdge = (t: InferenceChip) => get(t).forEdge;
export const precision = (t: InferenceChip) => get(t).precision;
export const bestUse = (t: InferenceChip) => get(t).bestUse;
export const inferenceChips = (): InferenceChip[] => Object.keys(DATA) as InferenceChip[];
