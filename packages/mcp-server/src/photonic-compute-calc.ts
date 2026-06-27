export type PhotonicCompute =
  | "mzi_mesh_linear"
  | "microring_weight_bank"
  | "diffractive_free_space"
  | "photonic_reservoir"
  | "electro_optic_hybrid";

const DATA: Record<PhotonicCompute, {
  throughput: number; latency: number; powerEff: number;
  scalability: number; optCost: number; programmable: boolean;
  forInference: boolean; mechanism: string; bestUse: string;
}> = {
  mzi_mesh_linear: {
    throughput: 8, latency: 10, powerEff: 8,
    scalability: 7, optCost: 8, programmable: true,
    forInference: true, mechanism: "unitary_matrix_decomp",
    bestUse: "matrix_vector_multiply",
  },
  microring_weight_bank: {
    throughput: 7, latency: 9, powerEff: 9,
    scalability: 6, optCost: 7, programmable: true,
    forInference: true, mechanism: "resonance_weight_tuning",
    bestUse: "neural_net_dot_product",
  },
  diffractive_free_space: {
    throughput: 10, latency: 10, powerEff: 10,
    scalability: 4, optCost: 5, programmable: false,
    forInference: true, mechanism: "fourier_lens_cascade",
    bestUse: "image_classification_fixed",
  },
  photonic_reservoir: {
    throughput: 6, latency: 8, powerEff: 7,
    scalability: 5, optCost: 6, programmable: false,
    forInference: false, mechanism: "nonlinear_delay_loop",
    bestUse: "temporal_pattern_recognition",
  },
  electro_optic_hybrid: {
    throughput: 9, latency: 9, powerEff: 7,
    scalability: 8, optCost: 9, programmable: true,
    forInference: true, mechanism: "dac_modulator_adc_detect",
    bestUse: "datacenter_ai_accelerator",
  },
};

const get = (t: PhotonicCompute) => DATA[t];

export const throughput = (t: PhotonicCompute) => get(t).throughput;
export const latency = (t: PhotonicCompute) => get(t).latency;
export const powerEff = (t: PhotonicCompute) => get(t).powerEff;
export const scalability = (t: PhotonicCompute) => get(t).scalability;
export const optCost = (t: PhotonicCompute) => get(t).optCost;
export const programmable = (t: PhotonicCompute) => get(t).programmable;
export const forInference = (t: PhotonicCompute) => get(t).forInference;
export const mechanism = (t: PhotonicCompute) => get(t).mechanism;
export const bestUse = (t: PhotonicCompute) => get(t).bestUse;
export const photonicComputes = (): PhotonicCompute[] => Object.keys(DATA) as PhotonicCompute[];
